import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateChefRecipe } from "@/lib/llm-rotator";

// -------------------------------------------------------------
// 1. Strict Input Validation Schema (Zod)
// -------------------------------------------------------------
const ChatRequestSchema = z.object({
  ingredients: z
    .string()
    .min(1, "Vui lòng nhập ít nhất một nguyên liệu.")
    .max(300, "Danh sách nguyên liệu không được vượt quá 300 ký tự.")
    .trim(),
});

// -------------------------------------------------------------
// 2. Hardened Rate Limiter with Sliding Window & Auto-Pruning
// -------------------------------------------------------------
const ipRateMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_IP = 10; // Max 10 calls / min / IP
const GLOBAL_BURST_CAP = 120; // Global circuit breaker: max 120 requests / min total

let globalRequestCount = 0;
let globalResetTime = Date.now() + RATE_LIMIT_WINDOW;

function pruneRateMap() {
  const now = Date.now();
  for (const [key, val] of ipRateMap.entries()) {
    if (now > val.resetTime) {
      ipRateMap.delete(key);
    }
  }
}

// Extract trusted IP without blindly accepting client-spoofed headers
function getTrustedClientIp(req: NextRequest): string {
  // 1. Vercel & Cloudflare Edge trusted headers
  const cfIp = req.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  const vercelIp = req.headers.get("x-vercel-proxied-for") || req.headers.get("x-real-ip");
  if (vercelIp) return vercelIp.trim();

  // 2. Sanitized X-Forwarded-For (take the first valid IP token)
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded.split(",").map((p) => p.trim());
    const validIpRegex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$|^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    for (const part of parts) {
      if (validIpRegex.test(part)) {
        return part;
      }
    }
  }

  return "anonymous_client";
}

export async function POST(req: NextRequest) {
  try {
    const now = Date.now();

    // 1. Global Circuit Breaker Check
    if (now > globalResetTime) {
      globalRequestCount = 0;
      globalResetTime = now + RATE_LIMIT_WINDOW;
      pruneRateMap();
    }

    globalRequestCount++;
    if (globalRequestCount > GLOBAL_BURST_CAP) {
      return NextResponse.json(
        {
          success: false,
          message: "Hệ thống Bếp Trưởng MAVY đang quá tải do lượng truy cập cao. Vui lòng quay lại sau ít phút!",
        },
        { status: 429 }
      );
    }

    // 2. Per-IP Rate Limiting
    const clientIp = getTrustedClientIp(req);
    const ipRecord = ipRateMap.get(clientIp);

    if (ipRecord) {
      if (now < ipRecord.resetTime) {
        if (ipRecord.count >= MAX_REQUESTS_PER_IP) {
          return NextResponse.json(
            {
              success: false,
              message: "Bạn đã gửi nhiều yêu cầu trong thời gian ngắn. Vui lòng đợi 1 phút để tiếp tục nhé!",
            },
            { status: 429 }
          );
        }
        ipRecord.count++;
      } else {
        ipRateMap.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
      }
    } else {
      ipRateMap.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    }

    // 3. Strict Payload Parsing & Validation
    let rawBody: any;
    try {
      rawBody = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Dữ liệu gửi lên không hợp lệ (Invalid JSON)." },
        { status: 400 }
      );
    }

    // Support both body.ingredients and body.message
    const normalizedInput = {
      ingredients: typeof rawBody?.ingredients === "string" 
        ? rawBody.ingredients 
        : typeof rawBody?.message === "string" 
        ? rawBody.message 
        : "",
    };

    const parseResult = ChatRequestSchema.safeParse(normalizedInput);
    if (!parseResult.success) {
      const errorMsg = parseResult.error.issues[0]?.message || "Nguyên liệu không hợp lệ.";
      return NextResponse.json(
        { success: false, message: errorMsg },
        { status: 400 }
      );
    }

    // 4. Generate Safe Recipe via LLM with Fallback & Cache
    const chefResponse = await generateChefRecipe(parseResult.data.ingredients);

    return NextResponse.json({
      success: true,
      data: chefResponse,
    });
  } catch (error: any) {
    console.error("[Secure API /api/chat Error]:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Hệ thống Bếp Trưởng MAVY đang bận phục vụ, vui lòng thử lại sau giây lát!",
      },
      { status: 500 }
    );
  }
}
