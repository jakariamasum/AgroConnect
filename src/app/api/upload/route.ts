/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: "No file uploaded or invalid file" },
        { status: 400 }
      );
    }

    // Read the file as a buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Generate unique file name with extension
    const originalName = (file as any).name || "unknown";
    const ext = path.extname(originalName) || ".jpg";
    const fileName = randomUUID() + ext;

    // Define upload directory (public/uploads)
    const uploadDir = path.resolve(process.cwd(), "public", "uploads");

    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Write file to disk
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, buffer);

    const url = `/uploads/${fileName}`;

    return NextResponse.json({ url }, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
};
