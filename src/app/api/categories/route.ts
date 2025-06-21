import { getCategories } from "@/services/categories";
import { ApiResponse } from "@/types/response.types";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await getCategories({
    search: "",
  });
  const response: ApiResponse<typeof categories> = {
    success: true,
    message: "Categories fetched successfully",
    data: categories,
  };
  return NextResponse.json(response, { status: 200 });
}
