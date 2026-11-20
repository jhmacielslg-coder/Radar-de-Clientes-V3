import React from "react";
import Link from "next/link";
import { Compass, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-bg text-text-1">
      <header className="border-b border-border bg-surface/50 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange to-purple flex items-center justify-center text-white">
              <Compass className="w-4 h-4" />
            </div>
            <span className="font-display font-bold text-base text-white">Radar de Clientes</span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-1.5" /> Voltar ao Início
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="font-display text-3xl font-bold text-white mb-2">Política de Privacidade</h1>
        <p className="text-xs text-text-4 mb-8">Última atualização: Novembro de 2026</p>

        <div className="space-y-6 text-sm text-text-2 leading-relaxed">
          <section className="p-6 rounded-xl border border-border bg-surface space-y-3">
            <h2 className="text-base font-semibold text-white">1. Informações que Coletamos</h2>
            <p>
              Coletamos apenas as informações essenciais para a prestação do serviço: nome, e-mail para acesso, nome da agência/empresa e os registros de empresas que você salva em seu painel pessoal.
            </p>
          </section>

          <section className="p-6 rounded-xl border border-border bg-surface space-y-3">
            <h2 className="text-base font-semibold text-white">2. Segurança dos Dados</h2>
            <p>
              Suas senhas são criptografadas com algoritmos seguros de hashing e seus dados são armazenados em infraestrutura de banco de dados com autenticação robusta e isolamento por usuário (Row Level Security).
            </p>
          </section>

          <section className="p-6 rounded-xl border border-border bg-surface space-y-3">
            <h2 className="text-base font-semibold text-white">3. Não Compartilhamento</h2>
            <p>
              Não comercializamos, alugamos ou compartilhamos suas informações pessoais ou sua lista de leads com terceiros para fins de marketing.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

