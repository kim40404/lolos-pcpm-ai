import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Update the user's isPremium status in the database and add 500 tokens
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { 
        isPremium: true,
        aiQuota: { increment: 500 }
      }
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Upgrade Error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server saat memproses upgrade.' },
      { status: 500 }
    );
  }
}
