/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { axiosAuth } from "@/api/axiosClientInstance";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    console.log(
      "Received request to /api/auth/register, Content-Type:",
      contentType,
    );

    let response;
    if (contentType.includes("application/json")) {
      const body = await request.json();
      console.log("Forwarding JSON:", body);
      response = await axiosAuth.post("/api/auth/register", body);
    } else {
      throw new Error("Unsupported Content-Type: " + contentType);
    }

    console.log("External API response:", response.data);
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Registration error:", error.message, error.stack, {
      response: error.response?.data,
      status: error.response?.status,
    });
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Registration failed",
        data: null,
      },
      { status: error.response?.status || 500 },
    );
  }
}
