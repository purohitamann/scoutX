// src/app/api/candidates/route.ts
import { NextResponse } from 'next/server';
import pool from '../../../actions/db';  // Import the pool from the db module


async function getJobsFromDb() {
  const result = await pool.query('SELECT * FROM jobs');
  return result.rows;
}


export async function GET() {
  try {
    const candidates = await getJobsFromDb();
    if (candidates.length === 0) {
      return NextResponse.json({ error: 'No candidates found' }, { status: 404 });
    } else {
      return NextResponse.json(candidates, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching candidates:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
