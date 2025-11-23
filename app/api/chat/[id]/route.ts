import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { JWTPayload } from "@/lib/types";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("unimarket_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    const userId = Number(decoded.sub);
    const { id } = await params;
    const conversationId = parseInt(id);

    // Verify user is part of conversation
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { users: true },
    });

    if (!conversation || !conversation.users.some((u) => u.id === userId)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
      include: { sender: { select: { id: true, name: true } } },
    });

    return NextResponse.json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    return NextResponse.json({ error: "Error fetching messages" }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("unimarket_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    const userId = Number(decoded.sub);
    const { id } = await params;
    const conversationId = parseInt(id);
    const { content } = await req.json();

    const message = await prisma.message.create({
      data: {
        content,
        conversationId,
        senderId: userId,
      },
    });

    // Update conversation timestamp
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });

    return NextResponse.json(message);
  } catch (err) {
    console.error("Error sending message:", err);
    return NextResponse.json({ error: "Error sending message" }, { status: 500 });
  }
}
