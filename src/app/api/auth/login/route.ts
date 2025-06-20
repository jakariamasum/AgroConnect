import { envConfig } from "@/config";
import { getUserByEmail, updateLastLogin } from "@/services/auth";
import { ApiResponse } from "@/types/response.types";
import { token_helper } from "@/utils/token_helper";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const user = await getUserByEmail(data.email);

    if (!user) {
      const response: ApiResponse<null> = {
        success: false,
        message: "User not found",
        data: null,
      };
      return NextResponse.json(response, { status: 404 });
    }

    const isValidPassword = await bcrypt.compare(data.password, user.password);

    if (!isValidPassword) {
      const response: ApiResponse<null> = {
        success: false,
        message: "Incorrect email or password",
        data: null,
      };
      await updateLastLogin(user.id);

      return NextResponse.json(response, { status: 401 });
    }

    const token = token_helper.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });
    const role = user.role;
    const redirectUrl =
      role === "BUYER"
        ? `${envConfig.next_public_url}/buyers/dashboard`
        : `${envConfig.next_public_url}/farmers/dashboard`;

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        data: { redirectUrl, token },
      },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    response.cookies.set("userId", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return response;
  } catch (error) {
    console.error("login route error: ", error);
    const response: ApiResponse<null> = {
      success: false,
      message: "Error during login",
      data: null,
    };
    return NextResponse.json(response, { status: 500 });
  }
}
