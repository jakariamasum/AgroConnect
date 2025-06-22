import { createProduct, getProducts } from "@/services/products";
import { ApiResponse } from "@/types/response.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const newProduct = await createProduct(data);
    console.log("New product created:", newProduct);

    if (!newProduct) {
      const response: ApiResponse<null> = {
        success: false,
        message: "Failed to create product",
        data: null,
      };
      return NextResponse.json(response, { status: 400 });
    }
    const response: ApiResponse<typeof newProduct> = {
      success: true,
      message: "Product created successfully",
      data: newProduct,
    };
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    const response: ApiResponse<null> = {
      success: false,
      message: "Failed to create product",
      data: null,
    };
    return NextResponse.json(response, { status: 400 });
  }
}

export async function GET() {
  try {
    const products = await getProducts();
    console.log("Products retrieved:", products);

    if (!products || products.length === 0) {
      const response: ApiResponse<null> = {
        success: false,
        message: "No products found",
        data: null,
      };
      return NextResponse.json(response, { status: 404 });
    }
    const response: ApiResponse<typeof products> = {
      success: true,
      message: "Products retrieved successfully",
      data: products,
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error retrieving products:", error);
    const response: ApiResponse<null> = {
      success: false,
      message: "Failed to retrieve products",
      data: null,
    };
    return NextResponse.json(response, { status: 500 });
  }
}
