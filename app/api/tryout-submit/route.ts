import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !(session.user as any).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    const { tryoutId, verbal, numerikal, digitSimbol, diagram, timeSaved, accuracy } = data;

    if (!tryoutId || typeof verbal !== 'number') {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const result = await prisma.tryoutResult.create({
      data: {
        userId: (session.user as any).id,
        tryoutId,
        verbal,
        numerikal,
        digitSimbol,
        diagram,
        timeSaved,
        accuracy,
      }
    });

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error('Tryout Submit Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
