import connectToDb from "../../../backend/dbConfig/dbConnect";
import UserModel from "../../../backend/models/UserModel";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectToDb();
    const reqBody = await request?.json();
    const { email, password } = reqBody;

    const existingUserByEmail = await UserModel.findOne({ email });

    if (!existingUserByEmail) {
      return NextResponse.json(
        {
          success: true,
          message: "User not found please check Email",
        },
        { status: 401 }
      );
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      existingUserByEmail.password = hashedPassword;
      existingUserByEmail.forgotPasswordToken = null;
      existingUserByEmail.forgotPasswordTokenExpiry = null;

      existingUserByEmail.save();

      return NextResponse.json(
        {
          success: true,
          message: "Password Updated Successfully",
        },
        { status: 200 }
      );
    }

    // save the use

    // send verification email
  } catch (error) {
    NextResponse.json(
      { error: error.message, message: "something went wrong", success: false },
      { status: 500 }
    );
  }
}
