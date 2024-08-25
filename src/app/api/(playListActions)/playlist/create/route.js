import { NextResponse } from "next/server";
import connectToDb from "../../../../../backend/dbConfig/dbConnect";
import UserModel from "../../../../../backend/models/UserModel";
import PlaylistModel from "../../../../../backend/models/PlalistModel";

export async function POST(request) {
  try {
    await connectToDb();
    const reqBody = await request?.json();
    const { title, domain, description, authorUsername, authorId, videoList } =
      reqBody;

    // Find the author
    const findAuthor = await UserModel.findOne({ _id: authorId });

    if (!findAuthor) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 401 }
      );
    }

    // Create a new playlist
    const newPlaylist = new PlaylistModel({
      title,
      domain,
      description,
      authorId,
      authorUsername,
      authorName: findAuthor?.name,
      listArray: videoList,
      tumbnailVideoLink: videoList[0]?.link ?? "",
    });

    await newPlaylist.save();

    // Update playlist count for the user
    await UserModel.updateOne(
      { _id: authorId },
      { $inc: { PlylistCount: 1 } } // Increment PlylistCount by 1
    );

    return NextResponse.json(
      {
        message: "Your playlist was created successfully",
        success: true,
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
