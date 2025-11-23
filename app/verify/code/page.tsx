"use client";

import { useState } from "react";

export default function VerifyCodePage() {
  const [code, setCode] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6); // solo números, máx 6
    setCode(value);
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-blue-50 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-blue-700">
          Verificar tu cuenta
        </h2>

        <p className="mt-4 text-gray-700">
          Ingresa el código de 6 dígitos que enviamos a tu correo.
        </p>

        <input
          value={code}
          onChange={handleInput}
          maxLength={6}
          className="mt-6 text-center tracking-widest text-3xl w-full border p-4 rounded-lg"
          placeholder="••••••"
        />

        <button
          disabled={code.length !== 6}
          className={`mt-6 w-full py-3 rounded-lg transition ${
            code.length === 6
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-300 text-gray-600"
          }`}
        >
          Verificar código
        </button>

        <p className="mt-4 text-sm text-gray-500">
          ¿No recibiste el código?{" "}
          <a href="#" className="text-blue-600 underline">
            Reenviar
          </a>
        </p>
      </div>
    </main>
  );
}
