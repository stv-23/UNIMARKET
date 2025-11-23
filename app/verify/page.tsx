"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleVerify = async () => {
    const savedCode = localStorage.getItem("verification_code");
    const email = localStorage.getItem("email_pending");
    const name = localStorage.getItem("name_pending");
    const password = localStorage.getItem("pass_pending");

    if (code !== savedCode) {
      setError("Código incorrecto");
      return;
    }

    // Guardar en BD
    const res = await fetch("/api/auth/save-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, password }),
    });

    const data = await res.json();

    if (!data.success) {
      setError(data.error || "Error al guardar usuario");
      return;
    }

    // Limpiar
    localStorage.removeItem("verification_code");
    localStorage.removeItem("email_pending");
    localStorage.removeItem("name_pending");
    localStorage.removeItem("pass_pending");

    router.push("/home");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Verifica tu correo</h1>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <input
          type="text"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full p-3 border border-gray-600 rounded-lg text-xl text-black"
        />

        {error && <p className="text-red-600 text-center mt-2">{error}</p>}

        <button
          onClick={handleVerify}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mt-4"
        >
          Verificar
        </button>
      </div>
    </main>
  );
}








