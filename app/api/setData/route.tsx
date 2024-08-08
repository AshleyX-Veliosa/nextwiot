import dbConnect from "@/lib/dbConfig";
import DataModel from "@/models/DataModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();

    // Ensure body is an array
    const dataToSave = Array.isArray(body) ? body : [body];
    // Validate records
    const invalidRecords = dataToSave.filter(({ Humidity, Temperature, TimeString }) => 
      !Humidity || 
      !Temperature || 
      !TimeString
    );
    if (invalidRecords.length) {
      console.error("Invalid records:", invalidRecords);
      return NextResponse.json(
        { error: "Missing fields in one or more records." },
        { status: 400 }
      );
    }

    // Save records to the database
    await DataModel.insertMany(dataToSave);

    return NextResponse.json(
      { message: "Data received and saved successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error receiving or saving data" },
      { status: 500 }
    );
  }
}
