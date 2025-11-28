import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { email, code } = await req.json();

    await resend.emails.send({
      from: "UniMarket <onboarding@resend.dev>",
      to: email,
      subject: "Tu código de verificación",
      text: `Tu código de verificación es: ${code}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("ERROR ENVIANDO CORREO:", error);
    return NextResponse.json({ error: "No se pudo enviar el correo" }, { status: 500 });
  }
}




