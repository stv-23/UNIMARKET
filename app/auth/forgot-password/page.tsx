"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
      } else {
        setError(data.error || "Error al enviar el correo");
      }
    } catch (error) {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-6">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Recuperar Contraseña</h1>
        <p className="text-sm text-gray-600 mb-4 text-center">
          Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
        </p>
        
        {message && <div className="bg-green-50 text-green-700 p-3 rounded mb-4 text-sm">{message}</div>}
        {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="correo@ejemplo.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border mb-4 rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition disabled:bg-blue-300"
          >
            {loading ? "Enviando..." : "Enviar enlace"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link href="/auth/login" className="text-sm text-blue-600 hover:underline">
            Volver al inicio de sesión
          </Link>
        </div>
      </div>
    </main>
  );
}
