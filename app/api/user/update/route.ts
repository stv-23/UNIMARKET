import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "secret";

export async function PATCH(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("unimarket_token");

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let decoded: any;
    try {
      decoded = verify(token.value, JWT_SECRET);
    } catch (error) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const body = await req.json();
    const { name, email, bio, university, birthDate } = body;

    // Validación de edad (18+)
    if (birthDate) {
      const birth = new Date(birthDate);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
      }

      if (age < 18) {
        return NextResponse.json(
          { message: "Debes ser mayor de 18 años." },
          { status: 400 }
        );
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(decoded.sub) },
      data: {
        name,
        email,
        bio,
        university,
        birthDate: birthDate ? new Date(birthDate) : undefined,
      },
    });

    // No devolver la contraseña
    const { password, ...userWithoutPassword } = updatedUser;

    return NextResponse.json({ user: userWithoutPassword }, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Error updating user" },
      { status: 500 }
    );
  }
}
