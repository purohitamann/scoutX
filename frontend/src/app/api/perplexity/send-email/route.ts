import { NextRequest } from "next/server";
import pool from "@/actions/db";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { candidate_email, candidate_name, job_title } = body;

    // Call Python backend to send email
    const response = await fetch(`${BACKEND_URL}/send-email/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ candidate_email, candidate_name, job_title }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error || "Failed to send confirmation email.");
    }

    return new Response(
      JSON.stringify({ message: "Confirmation email sent!", status: "success" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);

    return new Response(
      JSON.stringify({ error: "Failed to send email", details: error }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
