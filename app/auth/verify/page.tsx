"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyPage() {
  const [codeInput, setCodeInput] = useState("");
  const router = useRouter();

  const handleVerify = () => {
    const realCode = localStorage.getItem("verification_code");

    if (codeInput === realCode) {
      alert("Código correcto. Registro completado.");
      router.push("/home");
    } else {
      alert("Código incorrecto.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-blue-50 px-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Verifica tu correo
      </h1>

      <p className="text-gray-700 mb-4 text-center max-w-sm">
        Te enviamos un código de 6 dígitos. Escríbelo aquí:
      </p>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <input
          type="text"
          maxLength={6}
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value)}
          className="w-full p-2 border rounded-md text-center tracking-widest text-xl"
        />

        <button
          onClick={handleVerify}
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition mt-4"
        >
          Verificar
        </button>
      </div>
    </main>
  );
}
