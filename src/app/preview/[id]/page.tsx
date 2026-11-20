import React, { Suspense } from "react";
import Link from "next/link";
import {
  Star,
  MapPin,
  Phone,
  Shield,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  Clock,
  Award,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { generateLandingPageContent } from "@/lib/landing-generator";
import { createClient } from "@/lib/supabase/server";

interface PreviewPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function PreviewContent({
  params,
  searchParams,
}: PreviewPageProps) {
  const { id } = await params;
  const sParams = await searchParams;

  // 1. Tentar buscar dados do lead no Supabase
  let leadData: any = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("leads").select("*").eq("id", id).single();
    if (data) {
      leadData = data;
    }
  } catch (e) {
    // Se falhar ou estiver offline, usamos parâmetros da URL ou dados padrão
  }

  // 2. Extrair parâmetros (Supabase -> QueryParams -> Padrão)
  const name =
    leadData?.name ||
    (typeof sParams.name === "string" ? sParams.name : null) ||
    "Clínica Sorriso & Arte";

  const niche =
    leadData?.niche ||
    (typeof sParams.niche === "string" ? sParams.niche : null) ||
    "Clínica Odontológica";

  const city =
    leadData?.city ||
    (typeof sParams.city === "string" ? sParams.city : null) ||
    "Campinas, SP";

  const address =
    leadData?.address ||
    (typeof sParams.address === "string" ? sParams.address : null) ||
    "Av. Barão de Itapura, 1420 - Guanabara";

  const phone =
    leadData?.phone ||
    (typeof sParams.phone === "string" ? sParams.phone : null) ||
    "19998214433";

  const rating =
    Number(leadData?.rating) ||
    (typeof sParams.rating === "string" ? Number(sParams.rating) : 4.9);

  const reviewsCount =
    Number(leadData?.reviews_count ?? leadData?.reviewsCount) ||
    (typeof sParams.reviews === "string" ? Number(sParams.reviews) : 84);

  // 3. Gerar todo o conteúdo dinâmico da landing page
  const page = generateLandingPageContent({
    name,
    niche,
    city,
    address,
    phone,
    rating,
    reviewsCount,
  });

  const cleanPhone = phone.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(
    page.whatsappMessage
  )}`;

  return (
    <div className="min-h-screen bg-[#0E0E10] text-[#EDEDED] font-sans selection:bg-[#723CEB] selection:text-white">
      {/* 🚀 Top Bar de Demonstração para Prospecção Comercial */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-[#FF902F] via-[#723CEB] to-[#4C11CE] text-white px-4 py-2 text-xs font-medium shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A2F4AF] animate-pulse" />
            <span>
              <strong>Demonstração Exclusiva</strong> preparada para <u>{page.companyName}</u>.
            </span>
          </div>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              `Olá! Vi a demonstração de site pronta para a ${page.companyName}: ${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/preview/${id}. Gostaria de conversar para colocar no ar!`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold transition-all"
          >
            Quer este site no ar com seu domínio? Fale comigo
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Header / Navbar da Empresa */}
      <header className="border-b border-white/10 bg-[#141417]/80 backdrop-blur-md sticky top-[36px] z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#723CEB] to-[#FF902F] flex items-center justify-center font-bold text-white text-base shadow-lg shadow-purple/20">
              {page.companyName.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base text-white tracking-tight leading-none">
                {page.companyName}
              </span>
              <span className="text-[11px] text-[#A0A0A5] mt-1">{page.niche}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-xs transition-all shadow-md shadow-green/10"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              <span className="hidden sm:inline">Agendar pelo WhatsApp</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 overflow-hidden">
        {/* Glow de fundo */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#723CEB]/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          {/* Badge de Google Maps */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-semibold mb-6 shadow-sm">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span>
              Nota {page.rating} no Google Maps ({page.reviewsCount} avaliações)
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.18]">
            {page.heroHeadline}
          </h1>

          <p className="mt-6 text-sm sm:text-lg text-[#A0A0A5] max-w-2xl mx-auto leading-relaxed">
            {page.heroSubheadline}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#FF902F] to-[#723CEB] hover:brightness-110 text-white font-bold text-sm sm:text-base transition-all shadow-xl shadow-purple/25 active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              Agendar Avaliação Agora
              <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-6 text-xs text-[#808085]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Atendimento Rápido
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-400" /> {page.city}
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-400" /> Profissionais Certificados
            </span>
          </div>
        </div>
      </section>

      {/* Serviços Especializados */}
      <section className="py-20 border-t border-white/5 bg-[#141417]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#B69CFF]">
              Nossas Especialidades
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
              Tratamentos e Serviços de Alta Performance
            </h2>
            <p className="mt-3 text-sm text-[#A0A0A5]">
              Cuidado rigoroso e resultados comprovados para sua total satisfação.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {page.services.map((service, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-[#18181D] p-6 hover:border-[#723CEB]/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#723CEB]/10 border border-[#723CEB]/30 flex items-center justify-center text-[#B69CFF] mb-5 group-hover:scale-105 transition-transform">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-white">{service.title}</h3>
                  <p className="mt-2 text-xs text-[#A0A0A5] leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center text-xs font-semibold text-[#B69CFF] group-hover:text-white transition-colors gap-1"
                >
                  Saiba mais <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais / Por que Escolher */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#18181D] to-[#121215] p-8 sm:p-12">
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                Padrão de Qualidade
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                Por que a {page.companyName} é referência em {page.city}?
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              {page.differentiators.map((diff, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#A2F4AF] flex-none" />
                    <h3 className="font-bold text-sm text-white">{diff.title}</h3>
                  </div>
                  <p className="text-xs text-[#A0A0A5] leading-relaxed pl-7">
                    {diff.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prova Social: Avaliações do Google Maps */}
      <section className="py-20 border-t border-white/5 bg-[#141417]/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              Opinião dos Clientes
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              O que dizem sobre nós no Google Maps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {page.testimonials.map((test, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-[#18181D] p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-amber-400">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#6E6E73]">{test.timeAgo}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#D0D0D5] leading-relaxed italic">
                    "{test.comment}"
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-[#FF902F] flex items-center justify-center font-bold text-xs text-black">
                    {test.author.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">{test.author}</span>
                    <span className="text-[10px] text-[#808085]">Avaliação verificada no Google</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Localização e Contato */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="rounded-2xl border border-white/10 bg-[#18181D] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#A2F4AF]">
                <Clock className="w-4 h-4" />
                <span>Atendimento de Segunda a Sexta</span>
              </div>
              <h3 className="text-xl font-bold text-white">Venha nos visitar em {page.city}</h3>
              <p className="text-xs text-[#A0A0A5] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-white/50" />
                {page.address}
              </p>
              <p className="text-xs text-[#A0A0A5] flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-white/50" />
                Telefone: {page.phone}
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-sm transition-all shadow-lg shadow-green/20"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              Chamar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0E0E10] py-8 text-xs text-[#707075] text-center">
        <p>© {new Date().getFullYear()} {page.companyName}. Todos os direitos reservados.</p>
        <p className="mt-1 text-[11px] text-[#55555A]">
          Demonstração gerada por Radar de Clientes • Prospecção Ativa Inteligente
        </p>
      </footer>

      {/* Botão Flutuante do WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Agendar no WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:scale-110 active:scale-95 text-black flex items-center justify-center shadow-2xl shadow-green/40 transition-all"
      >
        <MessageCircle className="w-7 h-7 fill-black" />
      </a>
    </div>
  );
}

export default function PreviewLandingPage(props: PreviewPageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0E0E10]" />}>
      <PreviewContent {...props} />
    </Suspense>
  );
}
