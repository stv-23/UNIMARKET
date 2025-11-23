"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Credenciales incorrectas");
        setLoading(false);
        return;
      }
      // Cookie httpOnly ya fue seteada por el backend
      // Ahora podemos pedir /api/auth/me para obtener usuario real
      const meRes = await fetch("/api/auth/me");
      const me = await meRes.json();
      if (me.user) {
        // opcional: guardamos algo ligero en localStorage solo para UX
        localStorage.setItem("user", JSON.stringify(me.user));
      }
      router.push("/market");
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background p-6">
      <form className="bg-card p-8 rounded-xl shadow-2xl border border-border w-full max-w-sm" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold mb-6 text-center text-primary">Iniciar sesión</h1>
        <div className="space-y-4">
          <input 
            name="email" 
            type="email" 
            placeholder="Correo electrónico" 
            value={form.email} 
            onChange={handleChange} 
            className="w-full p-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          />
          <input 
            name="password" 
            type="password" 
            placeholder="Contraseña" 
            value={form.password} 
            onChange={handleChange} 
            className="w-full p-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          />
        </div>
        {error && <p className="text-destructive mt-4 text-sm text-center font-medium">{error}</p>}
        <button 
          disabled={loading} 
          className="w-full bg-primary text-primary-foreground p-3 rounded-lg mt-6 font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
        <div className="mt-6 text-center">
          <Link href="/auth/forgot-password" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <div className="mt-4 text-center">
          <span className="text-sm text-muted-foreground">¿No tienes cuenta? </span>
          <Link href="/auth/register" className="text-sm text-primary hover:underline font-medium">
            Regístrate
          </Link>
        </div>
      </form>
    </main>
  );
}



