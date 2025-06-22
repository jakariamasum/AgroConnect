import {
  deleteProduct,
  getProductById,
  updateProduct,
} from "@/services/products";
import { ApiResponse } from "@/types/response.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      const response: ApiResponse<null> = {
        success: false,
        message: "Product ID is required",
        data: null,
      };
      return NextResponse.json(response, { status: 400 });
    }

    const product = await getProductById(id);
    console.log("Product retrieved:", product);

    if (!product) {
      const response: ApiResponse<null> = {
        success: false,
        message: "Product not found",
        data: null,
      };
      return NextResponse.json(response, { status: 404 });
    }
    const response: ApiResponse<typeof product> = {
      success: true,
      message: "Product retrieved successfully",
      data: product,
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error retrieving product:", error);
    const response: ApiResponse<null> = {
      success: false,
      message: "Failed to retrieve product",
      data: null,
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await req.json();

    if (!id) {
      const response: ApiResponse<null> = {
        success: false,
        message: "Product ID is required",
        data: null,
      };
      return NextResponse.json(response, { status: 400 });
    }

    if (!data || Object.keys(data).length === 0) {
      const response: ApiResponse<null> = {
        success: false,
        message: "No data provided for update",
        data: null,
      };
      return NextResponse.json(response, { status: 400 });
    }

    const updatedProduct = await updateProduct(id, data);
    console.log("Product updated:", updatedProduct);

    if (!updatedProduct) {
      const response: ApiResponse<null> = {
        success: false,
        message: "Product not found or update failed",
        data: null,
      };
      return NextResponse.json(response, { status: 404 });
    }
    const response: ApiResponse<typeof updatedProduct> = {
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    const response: ApiResponse<null> = {
      success: false,
      message: "Failed to update product",
      data: null,
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      const response: ApiResponse<null> = {
        success: false,
        message: "Product ID is required",
        data: null,
      };
      return NextResponse.json(response, { status: 400 });
    }

    const deletedProduct = await deleteProduct(id);
    console.log("Product deleted:", deletedProduct);

    if (!deletedProduct) {
      const response: ApiResponse<null> = {
        success: false,
        message: "Product not found",
        data: null,
      };
      return NextResponse.json(response, { status: 404 });
    }
    const response: ApiResponse<typeof deletedProduct> = {
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    const response: ApiResponse<null> = {
      success: false,
      message: "Failed to delete product",
      data: null,
    };
    return NextResponse.json(response, { status: 500 });
  }
}
