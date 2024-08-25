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

    const verifyToken = user.verifyToken;
    const isTokenExpired = new Date(user.verifyTokenExpiry) < new Date();

    if (user?.isVerified) {
      return NextResponse.json(
        {
          success: true,
          message: "This user is already verified",
        },
        { status: 401 }
      );
    }
    if (token === verifyToken) {
      if (!isTokenExpired) {
        user.isVerified = true;
        await user.save();
        return NextResponse.json(
          {
            success: true,
            message: "User is verified successfully",
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            message:
              "Your verify token expired please Register again to get a new code.",
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
