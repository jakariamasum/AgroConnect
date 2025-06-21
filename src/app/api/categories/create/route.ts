import { createCategory } from "@/services/categories";
import { ApiResponse } from "@/types/response.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const newCategory = await createCategory(data);
    console.log("New category created:", newCategory);

    if (!newCategory) {
      const response: ApiResponse<null> = {
        success: false,
        message: "Failed to create category",
        data: null,
      };
      return NextResponse.json(response, { status: 400 });
    }
    const response: ApiResponse<typeof newCategory> = {
      success: true,
      message: "Category created successfully",
      data: newCategory,
    };
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    const response: ApiResponse<null> = {
      success: false,
      message: "Failed to create category",
      data: null,
    };
    return NextResponse.json(response, { status: 400 });
  }
}
