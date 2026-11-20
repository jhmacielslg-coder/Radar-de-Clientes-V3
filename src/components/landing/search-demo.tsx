"use client";

import React, { useState } from "react";
import { Search, MapPin, Building2, Star, MessageSquare, ExternalLink, Check, Copy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DemoCompany {
  id: string;
  name: string;
  niche: string;
  city: string;
  address: string;
  rating: number;
  reviewsCount: number;
  phone: string;
  opportunityReason: string;
  suggestedMessage: string;
}

const mockCompanies: Record<string, DemoCompany[]> = {
  odontologia: [
    {
      id: "1",
      name: "Clínica Sorriso & Arte",
      niche: "Clínica Odontológica",
      city: "Campinas, SP",
      address: "Av. Barão de Itapura, 1420 - Guanabara",
      rating: 4.9,
      reviewsCount: 84,
      phone: "(19) 99821-4433",
      opportunityReason: "Excelente reputação no Google Maps (84 avaliações 5 estrelas), mas não possui site oficial para agendamento de consultas ou apresentação dos tratamentos estéticos.",
      suggestedMessage: "Olá Dr(a)! Vi o perfil da Clínica Sorriso & Arte no Google com 84 avaliações excelentes. Notei que vocês ainda não têm um site para agendamentos e apresentação de tratamentos. Preparei uma prévia de como ficaria a página de vocês para captar mais pacientes. Posso te enviar o link?",
    },
    {
      id: "2",
      name: "Odonto Clean Especialidades",
      niche: "Clínica Odontológica",
      city: "São Paulo, SP",
      address: "R. Domingos de Morais, 810 - Vila Mariana",
      rating: 4.8,
      reviewsCount: 52,
      phone: "(11) 98765-1234",
      opportunityReason: "Localização nobre em São Paulo com alta busca por implantes e ortodontia, porém depende 100% de telefone sem canal digital próprio.",
      suggestedMessage: "Olá pessoal da Odonto Clean! Notei o destaque de vocês na Vila Mariana com nota 4.8 no Google Maps. Vocês ainda não têm uma página online para receber novos pacientes. Desenvolvemos páginas de alta conversão para clínicas. Podemos conversar 2 minutos?",
    },
  ],
  mecanica: [
    {
      id: "3",
      name: "Auto Mecânica & Centro Automotivo Silva",
      niche: "Oficina Mecânica",
      city: "Curitiba, PR",
      address: "R. Marechal Floriano Peixoto, 3200 - Parolin",
      rating: 4.7,
      reviewsCount: 119,
      phone: "(41) 99123-5566",
      opportunityReason: "Mais de 100 avaliações de confiança, mas quando clientes procuram os serviços ou orçamentos online não encontram tabela de serviços nem catálogo web.",
      suggestedMessage: "Boa tarde! Tudo bem? Encontrei a oficina de vocês no Google Maps com mais de 100 avaliações positivas. Vi que vocês ainda não possuem um site para pedidos de orçamento rápido pelo WhatsApp. Gostariam de ver uma prévia sem compromisso?",
    },
  ],
  estetica: [
    {
      id: "4",
      name: "Espaço Dermo Estética Avançada",
      niche: "Estética e Bem-Estar",
      city: "Belo Horizonte, MG",
      address: "Rua Fernandes Tourinho, 250 - Savassi",
      rating: 5.0,
      reviewsCount: 67,
      phone: "(31) 99344-7788",
      opportunityReason: "Nota máxima (5.0) em região de alto poder aquisitivo (Savassi). Pacientes que buscam procedimentos como harmonização facial não encontram galeria antes/depois no Google.",
      suggestedMessage: "Olá! Vi as avaliações impecáveis da clínica de vocês na Savassi no Google Maps. Notei que ainda não possuem um site institucional com galeria de procedimentos e botão direto para o WhatsApp. Posso compartilhar uma ideia de site moderna com vocês?",
    },
  ],
};

export function SearchDemo() {
  const [selectedNiche, setSelectedNiche] = useState("odontologia");
  const [cityInput, setCityInput] = useState("Campinas, SP");
  const [activeCompany, setActiveCompany] = useState<DemoCompany>(mockCompanies.odontologia[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleNicheChange = (niche: string) => {
    setSelectedNiche(niche);
    const list = mockCompanies[niche] || mockCompanies.odontologia;
    setActiveCompany(list[0]);
  };

  const handleCopyMessage = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const currentList = mockCompanies[selectedNiche] || mockCompanies.odontologia;

  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl border border-border bg-surface p-4 sm:p-7 shadow-2xl backdrop-blur-sm">
      {/* Search Bar Simulator */}
      <div className="flex flex-col md:flex-row items-center gap-3 pb-6 border-b border-border">
        <div className="w-full md:w-1/2 flex items-center rounded-xl border border-border-2 bg-surface-2 px-3.5 py-2.5 transition-colors focus-within:border-purple">
          <Building2 className="w-5 h-5 text-text-4 mr-2.5 flex-none" />
          <select
            value={selectedNiche}
            onChange={(e) => handleNicheChange(e.target.value)}
            className="w-full bg-transparent text-sm text-text-1 font-medium outline-none cursor-pointer"
          >
            <option value="odontologia" className="bg-surface text-text-1">Dentistas & Clínicas Odontológicas</option>
            <option value="mecanica" className="bg-surface text-text-1">Oficinas Mecânicas & Autocenters</option>
            <option value="estetica" className="bg-surface text-text-1">Clínicas de Estética & Harmonização</option>
          </select>
        </div>

        <div className="w-full md:w-1/2 flex items-center rounded-xl border border-border-2 bg-surface-2 px-3.5 py-2.5 transition-colors focus-within:border-purple">
          <MapPin className="w-5 h-5 text-text-4 mr-2.5 flex-none" />
          <input
            type="text"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            placeholder="Digite sua cidade (ex: Curitiba, PR)"
            className="w-full bg-transparent text-sm text-text-1 font-medium outline-none placeholder:text-text-4"
          />
        </div>

        <Button variant="gradient" size="lg" className="w-full md:w-auto px-7 flex-none">
          <Search className="w-4 h-4 mr-2" />
          Buscar Oportunidades
        </Button>
      </div>

      {/* Simulator Results Header */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-text-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
          <span>Mostrando empresas ativas no Google Maps <strong>sem website cadastrado</strong></span>
        </div>
        <Badge variant="purple">Simulação em Tempo Real</Badge>
      </div>

      {/* Simulator Two-Column View */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: List of Discovered Leads */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {currentList.map((company) => {
            const isSelected = activeCompany.id === company.id;
            return (
              <div
                key={company.id}
                onClick={() => setActiveCompany(company)}
                className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                  isSelected
                    ? "border-purple bg-surface-3 shadow-md shadow-purple/10"
                    : "border-border-2 bg-surface-2 hover:border-border-strong hover:bg-surface-3"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-display font-semibold text-text-1 text-sm">{company.name}</h4>
                  <Badge variant="danger" className="text-[10px] px-2 py-0">Sem Site</Badge>
                </div>

                <div className="mt-1 flex items-center gap-3 text-xs text-text-3">
                  <span className="flex items-center text-amber gap-1 font-medium">
                    <Star className="w-3.5 h-3.5 fill-amber" />
                    {company.rating} ({company.reviewsCount})
                  </span>
                  <span>•</span>
                  <span className="truncate">{company.city}</span>
                </div>

                <p className="mt-2 text-xs text-text-4 line-clamp-1">{company.address}</p>
              </div>
            );
          })}
        </div>

        {/* Right Column: Lead Deep-Dive & WhatsApp Suggestion */}
        <div className="lg:col-span-7 rounded-xl border border-border-2 bg-surface-2 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-border-2 pb-3">
              <div>
                <span className="text-xs text-text-4 font-mono uppercase tracking-wider">Oportunidade Selecionada</span>
                <h3 className="font-display text-lg font-bold text-text-1">{activeCompany.name}</h3>
              </div>
              <Badge variant="success">Alta Conversão</Badge>
            </div>

            {/* Opportunity reason */}
            <div className="mt-4 p-3 rounded-lg bg-surface-3 border border-border-2">
              <span className="text-xs font-semibold text-purple-text block mb-1">💡 Por que abordar esta empresa?</span>
              <p className="text-xs text-text-2 leading-relaxed">{activeCompany.opportunityReason}</p>
            </div>

            {/* Generated WhatsApp Script */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-text-3 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-green" />
                  Sugestão de Mensagem para WhatsApp:
                </span>
                <button
                  onClick={() => handleCopyMessage(activeCompany.suggestedMessage, activeCompany.id)}
                  className="text-xs text-text-3 hover:text-white flex items-center gap-1 transition-colors"
                >
                  {copiedId === activeCompany.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green" /> Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copiar texto
                    </>
                  )}
                </button>
              </div>
              <div className="p-3.5 rounded-lg bg-bg border border-border font-mono text-xs text-text-2 leading-relaxed select-all">
                {activeCompany.suggestedMessage}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-5 pt-3 border-t border-border-2 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-text-4">Telefone verificado: <strong>{activeCompany.phone}</strong></span>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(activeCompany.suggestedMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-black font-semibold text-xs transition-colors shadow-md"
            >
              Abrir no WhatsApp
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

