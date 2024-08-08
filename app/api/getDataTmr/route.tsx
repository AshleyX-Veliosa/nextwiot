import dbConfig from "@/lib/dbConfig";
import TmrModel from "@/models/TmrModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConfig();

  try {
    const data = await TmrModel.find({});//didnt work yet it must find lastest data that added
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: "Error retrieving data" }, { status: 500 });
  }
}
