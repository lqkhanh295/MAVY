import { NextRequest, NextResponse } from "next/server";
import { generateChefRecipe } from "@/lib/llm-rotator";

// In-memory IP rate limiter: 20 requests per minute per IP
const ipRateMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "local_client";
    const now = Date.now();

    // Check rate limit
    const currentRate = ipRateMap.get(ip);
    if (currentRate) {
      if (now < currentRate.resetTime) {
        if (currentRate.count >= MAX_REQUESTS_PER_WINDOW) {
          return NextResponse.json(
            {
              success: false,
              message: "Bạn đang gửi yêu cầu quá nhanh. Vui lòng thử lại sau ít phút nhé!",
            },
            { status: 429 }
          );
        }
        currentRate.count++;
      } else {
        ipRateMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
      }
    } else {
      ipRateMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    }

    const body = await req.json();
    const ingredients = (body.ingredients || body.message || "").trim();

    if (!ingredients) {
      return NextResponse.json(
        {
          success: false,
          message: "Vui lòng nhập ít nhất một nguyên liệu hoặc câu hỏi về món ăn.",
        },
        { status: 400 }
      );
    }

    const chefResponse = await generateChefRecipe(ingredients);

    return NextResponse.json({
      success: true,
      data: chefResponse,
    });
  } catch (error: any) {
    console.error("[API /api/chat Error]:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Hệ thống Bếp Trưởng MAVY đang bận phục vụ, vui lòng thử lại sau giây lát!",
        error: process.env.NODE_ENV === "development" ? error?.message : undefined,
      },
      { status: 500 }
    );
  }
}
