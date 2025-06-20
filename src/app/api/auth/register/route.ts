import prisma from "@/lib/prisma";
import { ApiResponse } from "@/types/response.types";
import { token_helper } from "@/utils/token_helper";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      const response: ApiResponse<null> = {
        success: false,
        message: "User already exists with this email",
        data: null,
      };
      return NextResponse.json(response, { status: 400 });
    }

    console.log("Creating user with data:", data);
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        role: data.role,

        buyerProfile:
          data.role === "BUYER"
            ? {
                create: {
                  businessType: data.businessType,
                },
              }
            : undefined,

        farmerProfile:
          data.role === "FARMER"
            ? {
                create: {
                  farmName: "",
                  farmSize: parseFloat(data.farmSize),
                  farmingExperience: parseInt(data.experience),
                  crops: data.crops,
                },
              }
            : undefined,
        addresses: {
          create: {
            firstName: data.name,
            lastName: "",
            city: data.location,
            state: "",
            zipCode: "",
            addressLine1: "",
          },
        },
      },
    });

    const token = token_helper.generateToken(user.id, user.role);
    const response: ApiResponse<string> = {
      success: true,
      message: "User registered successfully",
      data: token,
    };
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);

    const response: ApiResponse<string> = {
      success: false,
      message: "Server error",
      data:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
