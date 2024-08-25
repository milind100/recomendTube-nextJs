// import { NextResponse } from "next/server";
// import connectToDb from "../../../backend/dbConfig/dbConnect";
// import UserModel from "../../../backend/models/UserModel";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// export async function POST(request) {
//   try {
//     await connectToDb();
//     const reqBody = await request.json();
//     const { email, password } = reqBody;

//     // find the use by email
//     const user = await UserModel.findOne({ email });

//     if (!user) {
//       return Response.json(
//         {
//           success: false,
//           message: "user name or password is wrong",
//         },
//         { status: 401 }
//       );
//     }

//     //check password

//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) {
//       return Response.json(
//         {
//           success: false,
//           message: "user name or password is wrong",
//         },
//         { status: 401 }
//       );
//     }

//     const tokenData = {
//       id: user._id,
//       username: user.username,
//       name: user.name,
//       email: user.email,
//       isVerified: user.isVerified,
//       isAdmin: user.isAdmin,
//       // expiry: new Date(Date.now() + 300000),
//     };

//     // create token

//     const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });

//     const response = NextResponse.json(
//       { email: email, message: "Login successfull", success: true },
//       { status: 200 }
//     );

//     response.cookies.set("token", token, {
//       httpOnly: true,
//     });

//     return response;
//   } catch (error) {
//     return NextResponse.json(
//       { error: error.message, message: "something went wrong", success: false },
//       { status: 500 }
//     );
//   }
// }
