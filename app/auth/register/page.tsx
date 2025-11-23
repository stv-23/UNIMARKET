"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Manejo genérico de inputs (más limpio)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al registrar usuario");
        return;
      }

      alert("Usuario creado correctamente");
      router.push("/auth/login");
    } catch {
      setError("Error con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (

    <main className="flex flex-col items-center justify-center min-h-screen bg-background p-6">
      <h1 className="text-4xl font-bold text-primary mb-8 tracking-tight">
        Crear cuenta
      </h1>

      <form
        className="bg-card p-8 rounded-xl shadow-2xl border border-border w-full max-w-sm space-y-5"
        onSubmit={handleRegister}
      >
        <div>
          <span className="text-muted-foreground text-sm font-medium mb-1 block">Nombre</span>
          <input
            type="text"
            name="name"
            className="w-full p-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <span className="text-muted-foreground text-sm font-medium mb-1 block">Correo</span>
          <input
            type="email"
            name="email"
            className="w-full p-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <span className="text-muted-foreground text-sm font-medium mb-1 block">Contraseña</span>
          <input
            type="password"
            name="password"
            className="w-full p-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && (
          <p className="text-destructive text-center text-sm font-medium">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-primary-foreground p-3 rounded-lg hover:bg-blue-600 transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50 font-bold mt-2"
        >
          {loading ? "Creando..." : "Crear cuenta"}
        </button>
        
        <div className="mt-4 text-center">
          <span className="text-sm text-muted-foreground">¿Ya tienes cuenta? </span>
          <Link href="/auth/login" className="text-sm text-primary hover:underline font-medium">
            Inicia Sesión
          </Link>
        </div>
      </form>
    </main>
  );
}




