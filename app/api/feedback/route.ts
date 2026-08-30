import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { message, email } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Pesan tidak boleh kosong" }, { status: 400 });
    }

    const feedback = await prisma.feedback.create({
      data: {
        message,
        email: email || "Anonymous",
      },
    });

    return NextResponse.json({ success: true, feedback });
  } catch (error) {
    console.error("Feedback error:", error);
    return NextResponse.json({ error: "Gagal mengirim feedback" }, { status: 500 });
  }
}
