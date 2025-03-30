import { NextRequest } from "next/server";
import pool  from "@/actions/db"; // Ensure you have a shared DB pool connection

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const jobId = params.id;
    const result = await pool.query("SELECT * FROM jobs WHERE id = $1", [jobId]);

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: "Job not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (error) {
    console.error("Error fetching job:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
