import { NextResponse } from "next/server";
import connectToDb from "../../../backend/dbConfig/dbConnect";
import UserModel from "../../../backend/models/UserModel";
import { FORGOT_PASSWORD, VERIFY } from "../../../utils/constants";
import { sendVerificationEmail } from "../../../backend/helpers/sendVerificationEmail";

export async function POST(request) {
  try {
    await connectToDb();
    const reqBody = await request?.json();
    const { email, type } = reqBody;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User with this email does not exists.",
        },
        { status: 401 }
      );
    }

    let verifyToken = Math.floor(100000 + Math.random() * 900000).toString();
    let tokenExpiry = new Date(Date.now() + 3600000);

    switch (type) {
      case VERIFY:
        user.verifyToken = verifyToken;
        user.verifyTokenExpiry = tokenExpiry;
        break;
      case FORGOT_PASSWORD:
        user.forgotPasswordToken = verifyToken;
        user.forgotPasswordTokenExpiry = tokenExpiry;
        break;
      default:
        return NextResponse.json(
          { success: false, message: "Invalid type provided." },
          { status: 401 }
        );
    }

    await user.save();

    const emailResponse = await sendVerificationEmail({
      email,
      username: user.username,
      verifyToken,
      type,
    });

    if (!emailResponse.success) {
      return NextResponse.json(
        {
          success: false,
          message: "email register failed",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `Email sent successfully`,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "something went wrong", success: false },
      { status: 500 }
    );
  }
}
