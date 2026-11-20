import React from "react";
import Link from "next/link";
import { Compass, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermosPage() {
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
        <h1 className="font-display text-3xl font-bold text-white mb-2">Termos de Uso</h1>
        <p className="text-xs text-text-4 mb-8">Última atualização: Novembro de 2026</p>

        <div className="space-y-6 text-sm text-text-2 leading-relaxed">
          <section className="p-6 rounded-xl border border-border bg-surface space-y-3">
            <h2 className="text-base font-semibold text-white">1. Objeto e Finalidade</h2>
            <p>
              O <strong>Radar de Clientes</strong> é uma plataforma de inteligência e qualificação de oportunidades comerciais que auxilia profissionais de marketing, desenvolvedores e agências a identificar estabelecimentos comerciais cadastrados publicamente em serviços de mapas que não possuem website associado.
            </p>
          </section>

          <section className="p-6 rounded-xl border border-border bg-surface space-y-3">
            <h2 className="text-base font-semibold text-white">2. Dados Públicos e Fontes</h2>
            <p>
              As informações apresentadas (como nomes de empresas, notas, contagem de avaliações e telefones comerciais) provêm de dados tornados publicamente acessíveis pelas próprias empresas em perfis de negócios locais. O Radar de Clientes não comercializa cadastros restritos ou dados pessoais confidenciais.
            </p>
          </section>

          <section className="p-6 rounded-xl border border-border bg-surface space-y-3">
            <h2 className="text-base font-semibold text-white">3. Responsabilidade pelo Contato Comercial</h2>
            <p>
              A plataforma fornece apenas sugestões e modelos de abordagem para WhatsApp. O envio e a condução da conversa comercial são de total responsabilidade do usuário, devendo sempre respeitar as leis locais de proteção ao consumidor e práticas éticas de prospecção comercial.
            </p>
          </section>

          <section className="p-6 rounded-xl border border-border bg-surface space-y-3">
            <h2 className="text-base font-semibold text-white">4. Cancelamento e Garantia</h2>
            <p>
              O usuário pode cancelar sua assinatura mensal a qualquer momento através do painel da conta, mantendo o acesso até o término do período contratado. Em caso de arrependimento em até 7 dias corridos a contar da primeira contratação, o reembolso integral poderá ser solicitado.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

