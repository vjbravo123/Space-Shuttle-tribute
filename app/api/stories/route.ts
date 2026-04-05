import { NextResponse } from "next/server";
import { connectDB, Story } from "../../../lib/db";
import cloudinary from "../../../lib/cloudinary";



export async function POST(req: Request) {
     console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
  console.log("API Key exists:", !!process.env.CLOUDINARY_API_KEY);
  console.log("API Secret exists:", !!process.env.CLOUDINARY_API_SECRET);
  try {
    await connectDB();
    const formData = await req.formData();
    
    const name = formData.get("name");
    const email = formData.get("email");
    const title = formData.get("title");
    const narrative = formData.get("narrative");
    const mission = formData.get("mission");
    const file = formData.get("image") as File | null;

    let imageUrl = "";

    // 1. Upload to Cloudinary if file exists
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      const uploadResponse: any = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "tribute_stories" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });
      imageUrl = uploadResponse.secure_url;
    }

    // 2. Save to MongoDB
    const newStory = await Story.create({
      name,
      email,
      title,
      narrative,
      mission,
      imageUrl,
    });

    return NextResponse.json({ success: true, data: newStory }, { status: 201 });
  } catch (error: any) {
    console.error("Submission Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    
    const mission = searchParams.get("mission");
    const search = searchParams.get("search");

    let query: any = {};

    if (mission && mission !== 'all') {
      query.mission = mission;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
        { narrative: { $regex: search, $options: "i" } }
      ];
    }

    const stories = await Story.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: stories });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}