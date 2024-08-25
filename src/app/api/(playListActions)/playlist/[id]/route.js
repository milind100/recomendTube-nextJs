import { NextResponse } from "next/server";
import connectToDb from "../../../../../backend/dbConfig/dbConnect";
import PlaylistModel from "../../../../../backend/models/PlalistModel";
import { head } from "../../../../../utils/javascript";
import { getToken } from "next-auth/jwt";

export async function GET(request, { params }) {
  try {
    await connectToDb();
    const { id } = params;

    const playlist = await PlaylistModel.find({ _id: id });

    if (!playlist) {
      return NextResponse.json(
        {
          message: `Playlist Not Found`,
          success: false,
          playlist,
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        message: `Playlist Fetched successfully`,
        success: true,
        playlist: head(playlist),
      },
      { status: 200 }
    );
  } catch (error) {
    NextResponse.json(
      { error: error.message, message: "something went wrong", success: false },
      { status: 500 }
    );
  }
}
export async function DELETE(request, { params }) {
  try {
    await connectToDb();

    // eslint-disable-next-line no-undef
    const secret = process.env.NEXTAUTH_SECRET;

    const token = await getToken({ req: request, secret });

    if (!token) {
      return NextResponse.json(
        {
          message: "Unauthorized",
          success: false,
        },
        { status: 401 }
      );
    }

    const { id } = params;
    const playlist = await PlaylistModel.findById(id);

    if (!playlist) {
      return NextResponse.json(
        {
          message: `Playlist Not Found`,
          success: false,
          playlist,
        },
        { status: 401 }
      );
    }
    if (playlist?.authorUsername !== token?.username) {
      return NextResponse.json(
        {
          message: "You are not authorized to delete this playlist",
          success: false,
        },
        { status: 403 }
      );
    }

    await PlaylistModel.findByIdAndDelete(id);

    return NextResponse.json(
      {
        message: `${playlist?.title} Playlist Deleted successfully`,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    NextResponse.json(
      { error: error.message, message: "something went wrong", success: false },
      { status: 500 }
    );
  }
}
export async function PATCH(request, { params }) {
  try {
    await connectToDb();

    // eslint-disable-next-line no-undef
    const secret = process.env.NEXTAUTH_SECRET;

    const token = await getToken({ req: request, secret });

    if (!token) {
      return NextResponse.json(
        {
          message: "Unauthorized",
          success: false,
        },
        { status: 401 }
      );
    }

    const { id } = params;
    const playlist = await PlaylistModel.findById(id);

    if (!playlist) {
      return NextResponse.json(
        {
          message: `Playlist Not Found`,
          success: false,
          playlist,
        },
        { status: 401 }
      );
    }
    if (playlist?.authorUsername !== token?.username) {
      return NextResponse.json(
        {
          message: "You are not authorized to delete this playlist",
          success: false,
        },
        { status: 403 }
      );
    }
    const reqBody = await request?.json();
    const { title, domain, description, authorUsername, authorId, videoList } =
      reqBody;

    playlist.title = title;
    playlist.domain = domain;
    playlist.description = description;
    playlist.authorUsername = authorUsername;
    playlist.authorId = authorId;
    playlist.listArray = videoList;
    playlist.tumbnailVideoLink = videoList[0]?.link ?? "";

    await playlist.save();

    // await PlaylistModel.findByIdAndDelete(id);

    return NextResponse.json(
      {
        message: `${playlist?.title} Playlist Updatedsuccessfully`,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    NextResponse.json(
      { error: error.message, message: "something went wrong", success: false },
      { status: 500 }
    );
  }
}
