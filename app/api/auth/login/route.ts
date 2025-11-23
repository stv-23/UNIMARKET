import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "3600";

function createCookie(token: string) {
  return serialize("unimarket_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: Number(JWT_EXPIRES_IN),
  });
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Faltan credenciales" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });

    // Payload mínimo
    const payload = { sub: user.id, email: user.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: Number(JWT_EXPIRES_IN) });

    const cookie = createCookie(token);
    const res = NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email }
    });
    res.headers.set("Set-Cookie", cookie);
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}


