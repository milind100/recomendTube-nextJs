import { NextResponse } from "next/server";
import connectToDb from "../../../../backend/dbConfig/dbConnect";
import PlaylistModel from "../../../../backend/models/PlalistModel";

export async function GET() {
  try {
    await connectToDb();

    const pipeline = [
      {
        $group: {
          _id: "$authorUsername",
          authorName: { $first: "$authorName" },
          playlistCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          authorUsername: "$_id",
          authorName: 1,
          playlistCount: 1,
        },
      },
    ];

    const authors = await PlaylistModel.aggregate(pipeline);

    return NextResponse.json(
      {
        message: "Authors fetched successfully",
        success: true,
        data: [...authors],
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Something went wrong", success: false },
      { status: 500 }
    );
  }
}
