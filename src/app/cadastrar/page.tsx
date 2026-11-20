"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Compass, Mail, Lock, User, Building, ArrowRight, Eye, EyeOff, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

export default function CadastrarPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password.length >= 8) {
      setStep(2);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Erro ao conectar com Google.");
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: name,
            company_name: company,
          },
        },
      });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      // Se cadastro exigir confirmação de e-mail ou logar direto:
      if (data.session) {
        router.push("/hoje");
        router.refresh();
      } else {
        // Redireciona com aviso ou vai para login
        router.push("/entrar?msg=confirm");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Erro inesperado ao cadastrar.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-4 py-12">
      <div className="w-full max-w-[420px]">
        {/* Brand Header */}
        <div className="mb-8 flex justify-center">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange to-purple flex items-center justify-center text-white shadow-md shadow-purple/20">
              <Compass className="w-5 h-5" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-white">
              Radar de Clientes
            </span>
          </Link>
        </div>

        {/* Main Card */}
        <div className="rounded-xl border border-border bg-surface p-6 sm:p-8 shadow-xl">
          <header className="mb-6">
            <h1 className="font-display text-2xl font-bold tracking-tight text-white">Criar conta</h1>
            <p className="mt-1.5 text-xs text-text-3">
              Configure sua conta de administrador para prospecção.
            </p>
          </header>

          {/* Feedback de Erro */}
          {errorMsg && (
            <div className="mb-5 p-3 rounded-lg border border-red-border bg-red-bg flex items-start gap-2.5 text-xs text-red">
              <ShieldAlert className="w-4 h-4 flex-none mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Social Auth (Google) */}
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={handleGoogleSignup}
                disabled={loading}
                className="inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-lg border border-border-2 bg-surface-2 px-4 text-xs font-semibold text-text-1 transition-colors hover:border-border-strong hover:bg-surface-3 disabled:opacity-50"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Criar conta com o Google
              </button>

              <div className="relative flex items-center justify-center my-1">
                <div className="border-t border-border w-full" />
                <span className="bg-surface px-3 text-[11px] font-medium text-text-4 uppercase absolute">
                  ou use seu email
                </span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={step === 1 ? handleNextStep : handleSubmit} className="flex flex-col gap-4 mt-2">
            {step === 1 ? (
              <>
                <div>
                  <label className="block text-xs font-medium text-text-3 mb-1.5">Email</label>
                  <Input
                    type="email"
                    required
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={<Mail className="w-4 h-4" />}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-3 mb-1.5">Senha</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={8}
                      placeholder="Mínimo 8 caracteres"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      icon={<Lock className="w-4 h-4" />}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-4 hover:text-text-2 text-xs"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button variant="white" size="lg" className="w-full mt-2 font-bold">
                  Continuar
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </>
            ) : (
              <>
                <div className="p-3 rounded-lg bg-surface-2 border border-border-2 text-xs text-text-3 mb-1">
                  Conta: <strong>{email}</strong>
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-3 mb-1.5">Seu nome</label>
                  <Input
                    type="text"
                    required
                    placeholder="Seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    icon={<User className="w-4 h-4" />}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-3 mb-1.5">
                    Nome da sua agência ou negócio (opcional)
                  </label>
                  <Input
                    type="text"
                    placeholder="Ex: Minha Agência Digital"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    icon={<Building className="w-4 h-4" />}
                  />
                </div>

                <div className="flex gap-2.5 mt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => setStep(1)}
                    className="w-1/3"
                  >
                    Voltar
                  </Button>
                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    loading={loading}
                    className="w-2/3 font-bold"
                  >
                    Finalizar Cadastro
                  </Button>
                </div>
              </>
            )}
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center text-xs text-text-3">
            Já tem conta?{" "}
            <Link href="/entrar" className="text-purple-text font-semibold hover:underline">
              Entrar
            </Link>
          </div>
        </div>

        {/* Legal Links */}
        <nav className="mt-6 text-center text-[11px] text-text-4 flex items-center justify-center gap-3">
          <Link href="/termos" className="hover:text-text-3 transition-colors">Termos de Uso</Link>
          <span>•</span>
          <Link href="/privacidade" className="hover:text-text-3 transition-colors">Política de Privacidade</Link>
        </nav>
      </div>
    </div>
  );
}
