import { NextResponse } from "next/server";
import connectToDb from "../../../../../backend/dbConfig/dbConnect";
import PlaylistModel from "../../../../../backend/models/PlalistModel";

export async function GET(request, { params }) {
  try {
    await connectToDb();

    // const { searchParams } = new URL(request.url);
    const { searchParams } = new URL(request.url);
    const { username } = params;
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = 20;

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    const pipeline = [
      {
        $match: { authorUsername: username },
      },
      {
        $project: {
          title: 1,
          domain: 1,
          description: 1,
          authorUsername: 1,
          authorName: 1,
          authorId: 1,
          tumbnailVideoLink: 1,
          listArray: 1,
          videosCount: { $size: "$listArray" },
        },
      },
      { $skip: skip },
      { $limit: limit },
    ];

    // Fetch the playlists with pagination
    const usersLibraries = await PlaylistModel.aggregate(pipeline);

    // Count total documents
    const totalCount = await PlaylistModel.countDocuments({
      authorUsername: username,
    });

    return NextResponse.json(
      {
        message: `${username} all playlists`,
        success: true,
        data: usersLibraries,
        pagination: {
          totalCount,
          currentPage: page,
          totalPages: Math.ceil(totalCount / limit),
          hasNextPage: page < Math.ceil(totalCount / limit),
          hasPreviousPage: page > 1,
        },
      },
      { status: 200 }
    );
    // // isVerified
  } catch (error) {
    NextResponse.json(
      { error: error.message, message: "something went wrong", success: false },
      { status: 500 }
    );
  }
}
