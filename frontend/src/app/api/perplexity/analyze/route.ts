import { NextRequest } from "next/server";
import pool from "@/actions/db";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export async function GET(req: NextRequest) {
  try {
    // Get candidate_id from URL search params
    const searchParams = req.nextUrl.searchParams;
    const candidateId = searchParams.get('candidate_id');

    if (!candidateId) {
      return new Response(
        JSON.stringify({ error: "candidate_id is required" }),
        { status: 400 }
      );
    }

    // Call the backend analyze endpoint with candidate_id as query parameter
    const response = await fetch(`${BACKEND_URL}/analyze/?candidate_id=${candidateId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.statusText}`);
    }

    const data = await response.json();

    return new Response(
      JSON.stringify(data),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        }
      }
    );
  } catch (error) {
    console.error("Error in analyze:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to analyze candidate",
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        }
      }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }
  });
}
