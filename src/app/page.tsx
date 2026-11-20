import React from "react";
import Link from "next/link";
import {
  Compass,
  ArrowRight,
  Sparkles,
  Target,
  MessageCircle,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchDemo } from "@/components/landing/search-demo";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-text-1">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-bg/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange to-purple flex items-center justify-center text-white shadow-md shadow-purple/20 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold tracking-tight text-white">Radar de Clientes</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-3">
            <a href="#como-funciona" className="hover:text-text-1 transition-colors">Como Funciona</a>
            <a href="#faq" className="hover:text-text-1 transition-colors">Dúvidas Frequentes</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/hoje">
              <Button variant="gradient" size="sm" className="font-bold">
                Acessar Meu Painel
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple/15 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple/30 bg-purple/10 text-xs font-medium text-purple-text mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Painel Privado de Prospecção</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
              Encontre empresas sem site no Google Maps por nicho e cidade.
            </h1>

            <p className="mt-6 text-base sm:text-xl text-text-2 max-w-2xl mx-auto leading-relaxed">
              Descubra negócios com clientes reais e boas avaliações que ainda não possuem site. Copie a abordagem ideal para WhatsApp e inicie a prospecção direta.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/hoje">
                <Button variant="gradient" size="lg" className="h-13 px-8 text-base font-bold">
                  Abrir Meu Espaço de Trabalho
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <a href="#como-funciona">
                <Button variant="outline" size="lg" className="h-13 px-6 text-base">
                  Como Funciona
                </Button>
              </a>
            </div>

            <div className="mt-4 flex items-center justify-center gap-6 text-xs text-text-4">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green" /> Acesso total e direto
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green" /> Conectado ao Supabase
              </span>
            </div>

            {/* Interactive Live Demo */}
            <div className="mt-14 sm:mt-20">
              <SearchDemo />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="como-funciona" className="py-20 border-t border-border bg-surface/40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-purple-text">Fluxo Direto</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-2">
                Como transformar o Maps na sua máquina de clientes
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="rounded-2xl border border-border bg-surface p-7">
                <div className="w-12 h-12 rounded-xl bg-surface-3 border border-border-2 flex items-center justify-center text-orange mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-text-4">PASSO 01</span>
                <h3 className="font-display text-lg font-bold text-white mt-1">Busca Direcionada</h3>
                <p className="mt-2 text-sm text-text-3 leading-relaxed">
                  Digite o nicho (odontologia, estética, mecânicas) e a sua cidade. O sistema encontra estabelecimentos ativos sem site cadastrado.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-7">
                <div className="w-12 h-12 rounded-xl bg-surface-3 border border-border-2 flex items-center justify-center text-purple mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-text-4">PASSO 02</span>
                <h3 className="font-display text-lg font-bold text-white mt-1">Diagnóstico Automático</h3>
                <p className="mt-2 text-sm text-text-3 leading-relaxed">
                  O sistema analisa as avaliações no Maps e gera o roteiro perfeito destacando por que o negócio precisa de um site profissional.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-7">
                <div className="w-12 h-12 rounded-xl bg-surface-3 border border-border-2 flex items-center justify-center text-green mb-6">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-text-4">PASSO 03</span>
                <h3 className="font-display text-lg font-bold text-white mt-1">1-Clique no WhatsApp</h3>
                <p className="mt-2 text-sm text-text-3 leading-relaxed">
                  O botão abre direto o WhatsApp Web ou o app no celular com a mensagem preenchida para envio imediato.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 border-t border-border bg-surface/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-purple-text">Tire suas dúvidas</span>
              <h2 className="font-display text-3xl font-bold text-white mt-1">Perguntas Frequentes</h2>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-surface p-5">
                <h3 className="text-base font-semibold text-white">Como as empresas são qualificadas?</h3>
                <p className="mt-2 text-sm text-text-3 leading-relaxed">
                  Avaliamos perfis no Google Maps. Se a empresa não tiver URL de website cadastrada e possuir avaliações ativas, é filtrada como oportunidade.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-surface p-5">
                <h3 className="text-base font-semibold text-white">Os dados ficam salvos onde?</h3>
                <p className="mt-2 text-sm text-text-3 leading-relaxed">
                  Seus leads e anotações são salvos diretamente no seu banco de dados Supabase na nuvem.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 border-t border-border text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Pronto para prospectar agora?
            </h2>
            <p className="mt-4 text-text-2 text-base">
              Acesse seu painel e comece a fechar novos contratos hoje.
            </p>
            <div className="mt-8">
              <Link href="/hoje">
                <Button variant="white" size="lg" className="h-12 px-8 font-bold">
                  Abrir Meu Painel (/hoje)
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-bg py-8 text-xs text-text-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-purple" />
            <span className="font-semibold text-text-2">Radar de Clientes</span>
          </div>
          <Link href="/hoje" className="text-purple-text hover:underline font-semibold">
            Ir para o Painel →
          </Link>
        </div>
      </footer>
    </div>
  );
}
