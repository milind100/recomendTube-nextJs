import { NextResponse } from "next/server";
import connectToDb from "../../../../backend/dbConfig/dbConnect";
import PlaylistModel from "../../../../backend/models/PlalistModel";

export async function GET(request) {
  try {
    await connectToDb();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = 20;
    const searchQuery = searchParams.get("search");

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Initialize aggregation pipeline
    const pipeline = [];

    // Add search condition if searchQuery is provided
    if (searchQuery) {
      pipeline.push({
        $match: {
          $or: [
            { authorUsername: { $regex: searchQuery, $options: "i" } },
            { title: { $regex: searchQuery, $options: "i" } },
            { domain: { $regex: searchQuery, $options: "i" } },
            { authorName: { $regex: searchQuery, $options: "i" } },
          ],
        },
      });
    }

    // Add project stage to the pipeline
    pipeline.push({
      $project: {
        title: 1,
        domain: 1,
        description: 1,
        authorUsername: 1,
        authorName: 1,
        authorId: 1,
        tumbnailVideoLink: 1,
        videosCount: { $size: "$listArray" }, // Add listArray size as a new field
      },
    });

    // Add pagination stages (skip and limit)
    pipeline.push({ $skip: skip }, { $limit: limit });

    // Fetch the playlists with the constructed pipeline
    const AllLibraries = await PlaylistModel.aggregate(pipeline);

    // Count the total number of playlists for pagination
    const totalPlaylists = searchQuery
      ? await PlaylistModel.countDocuments({
          $or: [
            { authorUsername: { $regex: searchQuery, $options: "i" } },
            { title: { $regex: searchQuery, $options: "i" } },
            { domain: { $regex: searchQuery, $options: "i" } },
            { authorName: { $regex: searchQuery, $options: "i" } },
          ],
        })
      : await PlaylistModel.countDocuments();

    return NextResponse.json(
      {
        message: searchQuery ? "Filtered Playlists" : "All Playlists",
        success: true,
        data: AllLibraries,
        pagination: {
          totalPlaylists,
          currentPage: page,
          totalPages: Math.ceil(totalPlaylists / limit),
          hasNextPage: page < Math.ceil(totalPlaylists / limit),
          hasPreviousPage: page > 1,
        },
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
