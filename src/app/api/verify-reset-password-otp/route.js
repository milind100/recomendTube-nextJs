import { NextResponse } from "next/server";
import connectToDb from "../../../backend/dbConfig/dbConnect";
import UserModel from "../../../backend/models/UserModel";

export async function POST(request) {
  try {
    await connectToDb();
    const reqBody = await request.json();
    const { token, email } = reqBody;

    // find the use by username
    const user = await UserModel.findOne({ email });

    const forgotPasswordToken = user.forgotPasswordToken;
    const isTokenExpired =
      new Date(user?.forgotPasswordTokenExpiry) < new Date();

    if (!user) {
      return NextResponse.json(
        {
          success: true,
          message: "User not found please check Email",
        },
        { status: 401 }
      );
    }
    if (token === forgotPasswordToken) {
      if (!isTokenExpired) {
        return NextResponse.json(
          {
            success: true,
            verified: true,
            message: "User is verified successfully",
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "Your  token is expired please try again.",
          },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Your token is invalid please provide valid token",
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error verifying user:", error);
    return NextResponse.json(
      { success: false, message: "Error verifying user" },
      { status: 500 }
    );
  }
}
