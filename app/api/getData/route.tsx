import dbConnect from "@/lib/dbConfig";
import DataModel from "@/models/DataModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();
  
  try {
    const data = await DataModel.find({});
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: "Error retrieving data" }, { status: 500 });
  }
}
