import { NextResponse } from "next/server";
import connectToDb from "../../../backend/dbConfig/dbConnect";
import UserModel from "../../../backend/models/UserModel";
import { VERIFY } from "../../../utils/constants";
import { sendVerificationEmail } from "../../../backend/helpers/sendVerificationEmail";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    await connectToDb();
    const reqBody = await request?.json();
    const { name, email, password, username } = reqBody;

    // const existingUserByusername = await UserModel?.findOne({ username });
    // if (existingUserByusername && existingUserByusername?.isverified) {
    //   return Response.json(
    //     {
    //       success: false,
    //       message: "Username already Taken",
    //     },
    //     { status: 401}
    //   );
    // }

    const existingUserByEmail = await UserModel.findOne({ email });
    let verifyToken = Math.floor(100000 + Math.random() * 900000).toString();
    if (existingUserByEmail) {
      if (existingUserByEmail?.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exists with this email",
          },
          { status: 401 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyToken = verifyToken;
        existingUserByEmail.username = username;
        existingUserByEmail.verifyTokenExpiry = new Date(Date.now() + 3600000);
        await existingUserByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date(Date.now() + 3600000);

      // save the use
      const newUser = new UserModel({
        username,
        name,
        email,
        password: hashedPassword,
        verifyToken,
        verifyTokenExpiry: expiryDate,
        isVerified: false,
      });
      await newUser?.save();
    }
    // send verification email
    const emailResponse = await sendVerificationEmail({
      email,
      username,
      verifyToken,
      type: VERIFY,
    });

    if (!emailResponse.success) {
      return NextResponse.json(
        {
          success: false,
          message: "email registration failed",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        userData: { name, email, username },
        message: "User registered successfully Please verify your Email now",
        success: true,
      },
      { status: 200 }
    );
    // isVerified
  } catch (error) {
    NextResponse.json(
      { error: error.message, message: "something went wrong", success: false },
      { status: 500 }
    );
    // process.exit(1);
  }
}
