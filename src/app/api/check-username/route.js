import { NextResponse } from "next/server";
import connectToDb from "../../../backend/dbConfig/dbConnect";
import UserModel from "../../../backend/models/UserModel";

export async function GET(request) {
  try {
    await connectToDb();

    const url = new URL(request.url);
    const username = new URLSearchParams(url.search)?.get("username");

    const user = await UserModel.findOne({ username });

    if (user) {
      return NextResponse.json(
        { message: "User already exists", success: true },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { username, message: "Username is available", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking username:", error); // Log the error for debugging
    return NextResponse.json(
      { message: "Something went wrong during username check", success: false },
      { status: 500 }
    );
  }
}
