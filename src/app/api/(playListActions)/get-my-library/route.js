import { NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";
import connectToDb from "../../../../backend/dbConfig/dbConnect";
import PlaylistModel from "../../../../backend/models/PlalistModel";

export async function GET(request) {
  try {
    await connectToDb();

    // eslint-disable-next-line no-undef
    const secret = process.env.NEXTAUTH_SECRET;

    const token = await getToken({ req: request, secret });

    if (!token) {
      return NextResponse.json(
        {
          message: "you are not authorised",
          success: false,
        },
        { status: 401 }
      );
    }
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = 20;

    const skip = (page - 1) * limit;

    const pipeline = [
      {
        $match: { authorUsername: token?.username },
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
          videosCount: { $size: "$listArray" },
        },
      },
      { $skip: skip },
      { $limit: limit },
    ];

    const usersLibraries = await PlaylistModel.aggregate(pipeline);

    const totalCount = await PlaylistModel.countDocuments({
      authorUsername: token?.username,
    });

    return NextResponse.json(
      {
        message: `${token?.username} all playlists`,
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
  } catch (error) {
    console.error("Error getting my playlist:", error); // Log the error for debugging
    return NextResponse.json(
      { message: "Something went wrong during username check", success: false },
      { status: 500 }
    );
  }
}
