import { NextResponse } from "next/server";
import connectToDb from "../../../backend/dbConfig/dbConnect";
import UserModel from "../../../backend/models/UserModel";
import { sendVerificationEmail } from "../../../backend/helpers/sendVerificationEmail";
import { VERIFY } from "../../../utils/constants";

export async function POST(request) {
  try {
    await connectToDb();
    const reqBody = await request?.json();

    const { email, newEmail, username } = reqBody;

    const existingUserByOldEmail = await UserModel?.findOne({
      email,
      username,
    });

    if (!existingUserByOldEmail) {
      return NextResponse.json(
        {
          message: "something went wrong user not found register again",
          success: false,
        },
        { status: 401 }
      );
    } else if (existingUserByOldEmail?.isVerified) {
      return Response.json(
        {
          success: false,
          message: `${email} is already verified please login`,
        },
        { status: 401 }
      );
    }

    const isNewEmailAvialable = await UserModel?.findOne({
      email: newEmail,
    });
    if (isNewEmailAvialable) {
      if (isNewEmailAvialable?.isVerified) {
        return Response.json(
          {
            success: false,
            message: `${newEmail} already verifies please login `,
          },
          { status: 401 }
        );
      } else {
        await UserModel.deleteOne({ email: newEmail });
      }
    }

    let verifyToken = Math.floor(100000 + Math.random() * 900000).toString();

    existingUserByOldEmail.email = newEmail;
    existingUserByOldEmail.verifyToken = verifyToken;

    await existingUserByOldEmail.save;

    const emailResponse = await sendVerificationEmail({
      email: newEmail,
      username,
      verifyToken,
      type: VERIFY,
    });

    if (!emailResponse.success) {
      return NextResponse.json(
        {
          success: false,
          message: "email sending failed",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        email: email,
        message: "Verification email sent successfully",
        success: true,
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
