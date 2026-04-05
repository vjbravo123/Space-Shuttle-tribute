import { NextResponse } from "next/server";
import { connectDB, Story } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    console.log(id);

    const story = await Story.findById(id);
    if (!story)
      return NextResponse.json(
        { success: false, error: "Story not found" },
        { status: 404 }
      );

    const related = await Story.find({
      mission: story.mission,
      _id: { $ne: story._id },
    }).limit(3);

    return NextResponse.json({ success: true, data: story, related });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}