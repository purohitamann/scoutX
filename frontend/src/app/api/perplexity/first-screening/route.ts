import { NextRequest } from "next/server";
import pool from "@/actions/db";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export async function POST(req: NextRequest) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const body = await req.json();
    const { candidate_name, candidateId, job_name, job_description, phone_number } = body;
const id = "0000"
    // Call the backend create-call endpoint
    const response = await fetch(`${BACKEND_URL}/create-call/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        candidate_name,
        job_name,
        job_description,
        phone_number
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`Backend API error: ${response.statusText}`);
    }

    // Insert screening call record
    await client.query(
      `INSERT INTO screening_calls (
        candidate_id, 
        candidate_name, 
        phone_number, 
        job_title, 
        job_description, 
        status, 
        result,
        call_id,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())`,
      [
        candidateId,
        candidate_name,
        phone_number,
        job_name, // using as job_title
        job_description,
        data.results?.[0]?.status || 'queued',
        JSON.stringify(data.results?.[0]), // just the result object
        data.results?.[0]?.id || null
      ]
    );
    


    await client.query('COMMIT');

    return new Response(
      JSON.stringify({
        message: `First screening initiated for ${candidate_name} for ${job_name}`,
        status: "success",
        call_data: data.call_data
      }),
      {
        status: 200,
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        }
      }
    );
  } catch (error) {
    await client.query('ROLLBACK');
    console.error("Error in first screening:", error);
    
    // Log the error to a separate table for monitoring
    try {
      await client.query(
        `INSERT INTO error_logs (
          error_type,
          error_message,
          error_details,
          created_at
        ) VALUES ($1, $2, $3, NOW())`,
        [
          'first_screening_error',
          error instanceof Error ? error.message : 'Unknown error',
          JSON.stringify(error)
        ]
      );
    } catch (logError) {
      console.error("Failed to log error:", logError);
    }

    return new Response(
      JSON.stringify({ 
        error: "Failed to process first screening",
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        }
      }
    );
  } finally {
    client.release();
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }
  });
}

// {'results': [{'id': '96957394-2164-454b-bd8f-64dca0cfdfa5', 'assistantId': '5a5c8aa0-649f-4de6-9630-728e12275da3', 'phoneNumberId': '2840de11-bb64-4d66-b58b-b919ec2ac0e4', 'type': 'outboundPhoneCall', 'createdAt': '2025-03-30T10:12:58.468Z', 'updatedAt': '2025-03-30T10:12:58.468Z', 'orgId': '1413b37a-5903-4246-b306-1e06824d2d7d', 'cost': 0, 'phoneNumber': {'twilioAuthToken': 'a59ddef0197ce533de085f11a95f51f1', 'twilioAccountSid': 'AC8249b49b775707de422a623d2da30c27', 'twilioPhoneNumber': '+19143346292'}, 'customer': {'number': '+19052263909'}, 'status': 'queued', 'phoneCallProvider': 'twilio', 'phoneCallProviderId': 'CAa0a2591630d5fb056605e7b0b0ae3bf9', 'phoneCallTransport': 'pstn', 'assistantOverrides': {'variableValues': {'job_name': 'Data Analyst', 'candidate_name': 'Parth Patel', 'job_description': "Work with Scotiabank's analytics team to analyze customer trends and optimize financial services."}}, 'name': 'ScoutX_API', 'monitor': {'listenUrl': 'wss://phone-call-websocket.aws-us-west-2-backend-production1.vapi.ai/96957394-2164-454b-bd8f-64dca0cfdfa5/listen', 'controlUrl': 'https://phone-call-websocket.aws-us-west-2-backend-production1.vapi.ai/96957394-2164-454b-bd8f-64dca0cfdfa5/control'}, 'transport': {}}], 'errors': []}