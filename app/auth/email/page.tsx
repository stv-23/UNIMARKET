"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EmailPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendCode = async () => {
    if (!email.includes("@")) {
      alert("Ingresa un correo válido.");
      return;
    }

    setLoading(true);

    // Generar código
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Guardar el código en localStorage
    localStorage.setItem("verification_code", code);
    localStorage.setItem("user_email", email);

    // Enviar a la API
    const response = await fetch("/api/auth/send-code", {
      method: "POST",
      body: JSON.stringify({ email, code }),
    });

    setLoading(false);

    if (response.ok) {
      router.push("/auth/verify");
    } else {
      alert("Error enviando el código.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-blue-50 px-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Registro</h1>

      <p className="text-gray-700 mb-4 text-center max-w-sm">
        Ingresa tu correo para enviarte un código de verificación.
      </p>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="correo@example.com"
        />

        <button
          onClick={handleSendCode}
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition mt-4"
        >
          {loading ? "Enviando..." : "Enviar código"}
        </button>
      </div>
    </main>
  );
}

