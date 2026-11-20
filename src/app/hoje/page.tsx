"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Compass,
  Search,
  Building2,
  MapPin,
  Star,
  ExternalLink,
  MessageSquare,
  Copy,
  Check,
  Plus,
  Sparkles,
  Phone,
  ShieldCheck,
  Download,
  Trash2,
  FileText,
  Globe,
  Share2,
  Landmark,
  Calendar,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { scriptTemplates, type TemplateType } from "@/lib/generator";

interface Lead {
  id: string;
  name: string;
  niche: string;
  city: string;
  address: string;
  rating: number;
  reviews_count?: number;
  reviewsCount?: number;
  phone: string;
  status: "novo" | "contatado" | "negociacao" | "fechado";
  opportunity_reason?: string;
  opportunityReason?: string;
  suggested_message?: string;
  suggestedMessage?: string;
  notes?: string;
}

const defaultInitialLeads: Lead[] = [
  {
    id: "lead-1",
    name: "Clínica Sorriso & Arte",
    niche: "Odontologia",
    city: "Campinas, SP",
    address: "Av. Barão de Itapura, 1420 - Guanabara",
    rating: 4.9,
    reviewsCount: 84,
    phone: "19998214433",
    status: "novo",
    notes: "Primeiro contato agendado para demonstrar página modelo.",
    opportunityReason: "Empresa de alto padrão com 84 avaliações 5 estrelas no Google Maps, mas sem site para catálogo ou agendamento online.",
  },
  {
    id: "lead-2",
    name: "Auto Mecânica & Peças Brasil",
    niche: "Oficina Mecânica",
    city: "Campinas, SP",
    address: "R. Carolina Florence, 780 - Vila Nova",
    rating: 4.7,
    reviewsCount: 62,
    phone: "19981239988",
    status: "contatado",
    notes: "Falei com o dono Roberto pelo WhatsApp. Pediu para mandar a prévia.",
    opportunityReason: "Negócio tradicional com grande clientela local, mas clientes não encontram tabela de serviços nem formulário de orçamento.",
  },
  {
    id: "lead-3",
    name: "Studio Bella Estética Avançada",
    niche: "Estética",
    city: "São Paulo, SP",
    address: "Rua Pamplona, 1120 - Jardim Paulista",
    rating: 5.0,
    reviewsCount: 41,
    phone: "11976543210",
    status: "negociacao",
    notes: "Proposta enviada no valor de R$ 1.800 para criação de landing page.",
    opportunityReason: "Nota máxima (5.0) em área nobre. Procedimentos estéticos exigem fotos antes/depois que o Google Maps não valoriza adequadamente.",
  },
];

export default function WorkspacePage() {
  const [leads, setLeads] = useState<Lead[]>(defaultInitialLeads);
  const [selectedLead, setSelectedLead] = useState<Lead>(defaultInitialLeads[0]);
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Script customization
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>("previa");
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [notesInput, setNotesInput] = useState<string>("");

  // Search modal state
  const [isSearching, setIsSearching] = useState(false);
  const [searchSource, setSearchSource] = useState<"receita" | "maps">("receita");
  const [searchNiche, setSearchNiche] = useState("Clínica Odontológica");
  const [searchCity, setSearchCity] = useState("Campinas, SP");
  const [showSearchModal, setShowSearchModal] = useState(false);

  // Receita Federal state
  const [receitaUf, setReceitaUf] = useState("SP");
  const [receitaCity, setReceitaCity] = useState("Campinas");
  const [receitaNiche, setReceitaNiche] = useState("");
  const [receitaDays, setReceitaDays] = useState(90);
  const [receitaOnlyWhats, setReceitaOnlyWhats] = useState(true);
  const [receitaWithoutMei, setReceitaWithoutMei] = useState(true);
  const [cidadesData, setCidadesData] = useState<Record<string, { codigo: string; nome: string; totalEmpresas: number }[]>>({});

  useEffect(() => {
    fetch("/api/receita/cidades")
      .then((r) => r.json())
      .then((data) => {
        if (data.cidades) {
          setCidadesData(data.cidades);
        }
      })
      .catch((err) => console.error("Erro ao carregar cidades da Receita:", err));
  }, []);

  // Gera o link da landing page para o lead selecionado
  const getPreviewUrl = (lead: Lead) => {
    if (typeof window !== "undefined") {
      const origin = window.location.origin;
      return `${origin}/preview/${lead.id}?name=${encodeURIComponent(
        lead.name
      )}&niche=${encodeURIComponent(lead.niche)}&city=${encodeURIComponent(
        lead.city
      )}&rating=${lead.rating}&reviews=${lead.reviews_count ?? lead.reviewsCount ?? 40}&phone=${lead.phone}`;
    }
    return `/preview/${lead.id}`;
  };

  // Sincroniza script dinâmico com link da landing page quando template ou lead muda
  useEffect(() => {
    if (selectedLead) {
      const template = scriptTemplates[selectedTemplate];
      const rev = selectedLead.reviews_count ?? selectedLead.reviewsCount ?? 20;
      const previewUrl = getPreviewUrl(selectedLead);

      const generated = template.generate({
        name: selectedLead.name,
        niche: selectedLead.niche,
        city: selectedLead.city,
        rating: selectedLead.rating,
        reviewsCount: rev,
        previewUrl,
      });

      setCurrentMessage(generated);
      setNotesInput(selectedLead.notes || "");
    }
  }, [selectedLead, selectedTemplate]);

  // Carrega leads salvos no Supabase na montagem da tela
  useEffect(() => {
    async function fetchSupabaseLeads() {
      try {
        const res = await fetch("/api/leads");
        if (res.ok) {
          const data = await res.json();
          if (data.leads && data.leads.length > 0) {
            setLeads(data.leads);
            setSelectedLead(data.leads[0]);
          }
        }
      } catch (err) {
        console.warn("Usando leads padrão locais:", err);
      }
    }

    fetchSupabaseLeads();
  }, []);

  const handleCopyMessage = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyPreviewUrl = () => {
    const url = getPreviewUrl(selectedLead);
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleStatusChange = async (id: string, newStatus: Lead["status"]) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
    if (selectedLead.id === id) {
      setSelectedLead((prev) => ({ ...prev, status: newStatus }));
    }

    try {
      await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (e) {
      console.warn("Status atualizado localmente");
    }
  };

  const handleSaveNotes = async () => {
    setLeads((prev) =>
      prev.map((l) => (l.id === selectedLead.id ? { ...l, notes: notesInput } : l))
    );
    setSelectedLead((prev) => ({ ...prev, notes: notesInput }));

    try {
      await fetch(`/api/leads/${selectedLead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: notesInput }),
      });
    } catch (e) {
      console.warn("Notas salvas localmente");
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm("Deseja realmente remover este lead do seu painel?")) return;

    const remaining = leads.filter((l) => l.id !== id);
    setLeads(remaining);
    if (remaining.length > 0) {
      setSelectedLead(remaining[0]);
    }

    try {
      await fetch(`/api/leads/${id}`, { method: "DELETE" });
    } catch (e) {
      console.warn("Lead removido localmente");
    }
  };

  const handleExportCSV = () => {
    const headers = [
      "ID",
      "Nome",
      "Nicho",
      "Cidade",
      "Endereco",
      "Nota",
      "Avaliacoes",
      "Telefone",
      "Status",
      "Notas",
      "Link_Landing_Page",
      "WhatsApp_Link",
    ];

    const rows = leads.map((l) => {
      const cleanPhone = l.phone.replace(/\D/g, "");
      const waLink = `https://wa.me/55${cleanPhone}`;
      const previewLink = getPreviewUrl(l);
      return [
        `"${l.id}"`,
        `"${l.name.replace(/"/g, '""')}"`,
        `"${l.niche}"`,
        `"${l.city}"`,
        `"${l.address.replace(/"/g, '""')}"`,
        l.rating,
        l.reviews_count ?? l.reviewsCount ?? 0,
        `"${l.phone}"`,
        `"${l.status}"`,
        `"${(l.notes || "").replace(/"/g, '""')}"`,
        `"${previewLink}"`,
        `"${waLink}"`,
      ].join(",");
    });

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `radar_leads_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExecuteSearch = async () => {
    setIsSearching(true);
    try {
      if (searchSource === "receita") {
        const selectedUfList = cidadesData[receitaUf] || [];
        const matchCity = selectedUfList.find(
          (c) => c.nome.toLowerCase() === receitaCity.trim().toLowerCase()
        );

        const res = await fetch("/api/receita/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uf: receitaUf,
            cityCode: matchCity ? matchCity.codigo : "",
            cityName: receitaCity,
            niche: receitaNiche,
            days: receitaDays,
            onlyWhats: receitaOnlyWhats,
            withoutMei: receitaWithoutMei,
            limit: 30,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const newLeads: Lead[] = (data.leads || []).map((l: any) => ({
            id: l.id,
            name: l.name,
            niche: l.niche,
            city: l.city,
            address: l.address,
            rating: l.rating || 5.0,
            reviews_count: 0,
            reviewsCount: 0,
            phone: l.phone,
            status: "novo",
            opportunity_reason: l.opportunityReason,
            suggested_message: l.suggestedMessage,
          }));

          if (newLeads.length > 0) {
            setLeads((prev) => [...newLeads, ...prev]);
            setSelectedLead(newLeads[0]);
            setSelectedTemplate("inauguracao"); // Ativa o script de inauguração automaticamente!

            for (const nl of newLeads) {
              try {
                await fetch("/api/leads", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(nl),
                });
              } catch (e) {}
            }
          }
        }
      } else {
        const res = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ niche: searchNiche, city: searchCity }),
        });

        if (res.ok) {
          const data = await res.json();
          const newLeads: Lead[] = data.leads || [];

          if (newLeads.length > 0) {
            setLeads((prev) => [...newLeads, ...prev]);
            setSelectedLead(newLeads[0]);

            for (const nl of newLeads) {
              try {
                await fetch("/api/leads", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(nl),
                });
              } catch (e) {}
            }
          }
        }
      }
    } catch (err) {
      console.error("Erro na busca:", err);
    } finally {
      setIsSearching(false);
      setShowSearchModal(false);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus =
      statusFilter === "todos" ? true : lead.status === statusFilter;
    const matchesQuery =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.niche.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  const leadReason =
    selectedLead.opportunity_reason || selectedLead.opportunityReason || "";
  const rev = selectedLead.reviews_count ?? selectedLead.reviewsCount ?? 0;

  return (
    <div className="flex h-screen bg-bg text-text-1 overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-border bg-surface flex flex-col justify-between hidden md:flex">
        <div>
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-border">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange to-purple flex items-center justify-center text-white shadow-sm">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-base text-white">
                Radar de Clientes
              </span>
            </Link>
          </div>

          {/* User Mode: Acesso Total */}
          <div className="p-4 mx-3 my-4 rounded-xl border border-green/30 bg-green/10">
            <div className="flex items-center gap-2 text-xs font-semibold text-green">
              <ShieldCheck className="w-4 h-4 text-green" />
              <span>Acesso Total Habilitado</span>
            </div>
            <p className="mt-1 text-[11px] text-text-3">
              IA de Sites Ativa: Prévia automática gerada para cada empresa.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-surface-3 text-white text-xs font-semibold">
              <Compass className="w-4 h-4 text-purple" />
              Oportunidades Salvas
            </button>
            <button
              onClick={handleExportCSV}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-text-3 hover:text-white hover:bg-surface-2 text-xs font-medium transition-colors"
            >
              <Download className="w-4 h-4 text-green" />
              Exportar Planilha (CSV)
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange to-purple text-white flex items-center justify-center font-bold text-xs flex-none shadow">
            H
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-white truncate">
              Henrique
            </span>
            <span className="text-[10px] text-green flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green" /> Acesso Ilimitado
            </span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Action Bar */}
        <header className="h-16 border-b border-border bg-surface/50 px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-text-4 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filtrar por nome, nicho ou cidade..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-4 rounded-lg border border-border-2 bg-surface-2 text-xs text-text-1 placeholder:text-text-4 outline-none focus:border-purple"
              />
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCSV}
              className="text-xs font-semibold hidden sm:inline-flex"
            >
              <Download className="w-3.5 h-3.5 mr-1.5 text-green" />
              Exportar CSV
            </Button>
            <Button
              variant="gradient"
              size="sm"
              onClick={() => setShowSearchModal(true)}
              className="font-bold text-xs"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Nova Prospecção no Maps
            </Button>
          </div>
        </header>

        {/* Filter Pills */}
        <div className="px-6 py-3 border-b border-border bg-bg flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-text-4 mr-1">Status:</span>
            {[
              { id: "todos", label: "Todos" },
              { id: "novo", label: "Novos" },
              { id: "contatado", label: "Contatados" },
              { id: "negociacao", label: "Em Negociação" },
              { id: "fechado", label: "Fechados" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1 rounded-md transition-colors ${
                  statusFilter === tab.id
                    ? "bg-surface-3 text-white font-semibold border border-border-strong"
                    : "text-text-3 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-text-4">
            Mostrando <strong>{filteredLeads.length}</strong> empresas sem site
          </span>
        </div>

        {/* Two-Pane Workspace Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Column: Leads List */}
          <div className="w-full lg:w-5/12 border-r border-border overflow-y-auto p-4 space-y-3">
            {filteredLeads.map((lead) => {
              const isSelected = selectedLead.id === lead.id;
              const statusBadges = {
                novo: <Badge variant="neutral">Novo</Badge>,
                contatado: <Badge variant="purple">Contatado</Badge>,
                negociacao: <Badge variant="warning">Negociando</Badge>,
                fechado: <Badge variant="success">Fechado</Badge>,
              };

              const leadRev = lead.reviews_count ?? lead.reviewsCount ?? 0;

              return (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "border-purple bg-surface-2 shadow-sm"
                      : "border-border-2 bg-surface hover:border-border-strong hover:bg-surface-2"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-display font-bold text-sm text-white">
                      {lead.name}
                    </h4>
                    {statusBadges[lead.status]}
                  </div>

                  <div className="mt-1 flex items-center gap-3 text-xs text-text-3">
                    <span className="flex items-center text-amber gap-1 font-medium">
                      <Star className="w-3 h-3 fill-amber" />
                      {lead.rating} ({leadRev})
                    </span>
                    <span>•</span>
                    <span className="truncate">{lead.niche}</span>
                    <span>•</span>
                    <span className="truncate">{lead.city}</span>
                  </div>

                  <p className="mt-2 text-xs text-text-4 truncate">{lead.address}</p>

                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className="text-purple-text flex items-center gap-1">
                      <Globe className="w-3 h-3" /> Prévia de Site Pronta
                    </span>
                    {lead.id.startsWith("receita-") ? (
                      <span className="text-amber text-[10px] font-semibold bg-amber/10 px-1.5 py-0.5 rounded border border-amber/20 flex items-center gap-1">
                        <Landmark className="w-2.5 h-2.5" /> CNPJ Novo
                      </span>
                    ) : lead.notes ? (
                      <span className="text-text-4 truncate max-w-[150px]">
                        📝 {lead.notes}
                      </span>
                    ) : null}
                  </div>
                </div>
              );
            })}

            {filteredLeads.length === 0 && (
              <div className="text-center py-12 text-text-4 text-xs">
                Nenhum lead encontrado com o filtro atual.
              </div>
            )}
          </div>

          {/* Right Column: Lead Dossier, Landing Page Generator & WhatsApp Action Center */}
          <div className="hidden lg:flex flex-1 flex-col overflow-y-auto bg-surface/30 p-6 space-y-5">
            {/* 🌐 Gerador de Landing Page com IA (Destaque Principal) */}
            <div className="rounded-xl border border-purple/40 bg-gradient-to-r from-purple/20 via-purple/10 to-orange/10 p-5 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="purple" className="font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber" />
                      Landing Page Criada por IA
                    </Badge>
                    <span className="text-xs text-green font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />{" "}
                      Pronta para Apresentar
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-white text-base">
                    Demonstração Personalizada para {selectedLead.name}
                  </h3>
                  <p className="text-xs text-text-3">
                    Inclui avaliações do Maps ({selectedLead.rating} ⭐), tratamentos do nicho de {selectedLead.niche} e botão com o telefone {selectedLead.phone}.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 flex-none w-full sm:w-auto">
                  <button
                    onClick={() => window.open(getPreviewUrl(selectedLead), "_blank")}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-white hover:bg-neutral-200 text-black font-bold text-xs transition-all shadow-md active:scale-95"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Abrir Site Modelo
                  </button>
                  <button
                    onClick={handleCopyPreviewUrl}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-border-2 bg-surface-2 text-white font-semibold text-xs hover:border-border-strong hover:bg-surface-3 transition-all"
                  >
                    {copiedLink ? (
                      <Check className="w-3.5 h-3.5 text-green" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    {copiedLink ? "Link Copiado!" : "Copiar Link"}
                  </button>
                </div>
              </div>
            </div>

            {/* Cartão de Detalhes do Lead */}
            <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
              {/* Header */}
              <div className="flex items-start justify-between border-b border-border-2 pb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {selectedLead.id.startsWith("receita-") ? (
                      <Badge variant="purple" className="flex items-center gap-1 font-semibold">
                        <Landmark className="w-3 h-3 text-amber" /> Recém-Aberta (Receita Federal)
                      </Badge>
                    ) : (
                      <Badge variant="danger">Sem Site no Google Maps</Badge>
                    )}
                    <Badge variant="neutral">{selectedLead.niche}</Badge>
                  </div>
                  <h2 className="font-display text-2xl font-bold text-white">
                    {selectedLead.name}
                  </h2>
                  <p className="text-xs text-text-3 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-text-4" />{" "}
                    {selectedLead.address}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Status Switcher */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-text-4">Status:</span>
                    <select
                      value={selectedLead.status}
                      onChange={(e) =>
                        handleStatusChange(
                          selectedLead.id,
                          e.target.value as Lead["status"]
                        )
                      }
                      className="h-8 rounded-md border border-border-2 bg-surface-2 px-2.5 text-xs text-white outline-none cursor-pointer focus:border-purple"
                    >
                      <option value="novo">Novo</option>
                      <option value="contatado">Contatado</option>
                      <option value="negociacao">Em Negociação</option>
                      <option value="fechado">Fechado</option>
                    </select>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteLead(selectedLead.id)}
                    title="Excluir lead"
                    className="p-1.5 rounded-md text-text-4 hover:text-red hover:bg-red-bg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Opportunity Diagnostic */}
              <div className="mt-5 p-4 rounded-xl border border-border-2 bg-surface-2">
                <span className="text-xs font-bold text-purple-text flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-4 h-4 text-purple" />
                  Diagnóstico Inteligente da Oportunidade:
                </span>
                <p className="text-xs text-text-2 leading-relaxed">
                  {leadReason}
                </p>
              </div>

              {/* Template Selector Bar */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-green" />
                    Escolha o Estilo da Abordagem (Já com o Link da Landing Page):
                  </span>
                  <button
                    onClick={() => handleCopyMessage(currentMessage, selectedLead.id)}
                    className="text-xs text-text-3 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    {copiedId === selectedLead.id ? (
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

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-3">
                  {(Object.keys(scriptTemplates) as TemplateType[]).map((tKey) => {
                    const t = scriptTemplates[tKey];
                    const isSelected = selectedTemplate === tKey;
                    return (
                      <button
                        key={tKey}
                        onClick={() => setSelectedTemplate(tKey)}
                        className={`p-2.5 rounded-lg border text-left transition-all ${
                          isSelected
                            ? "border-purple bg-purple/15 text-white font-semibold"
                            : "border-border-2 bg-surface-2 text-text-3 hover:text-white hover:border-border-strong"
                        }`}
                      >
                        <span className="block text-xs truncate">{t.title}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Editable WhatsApp Script */}
                <textarea
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  rows={7}
                  className="w-full p-4 rounded-xl bg-bg border border-border text-xs text-text-2 leading-relaxed font-mono resize-none focus:border-purple outline-none"
                />
              </div>

              {/* Action Buttons Row */}
              <div className="mt-5 pt-4 border-t border-border-2 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-text-3">
                  <Phone className="w-4 h-4 text-text-4" />
                  Telefone: <strong>{selectedLead.phone}</strong>
                </div>

                <a
                  href={`https://wa.me/55${selectedLead.phone.replace(
                    /\D/g,
                    ""
                  )}?text=${encodeURIComponent(currentMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-xs transition-colors shadow-md shadow-green/10"
                >
                  Abrir no WhatsApp com Link da Página
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Notes & Follow-up Section */}
            <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-purple" />
                  Histórico de Contato & Anotações Internas:
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSaveNotes}
                  className="text-xs h-7"
                >
                  Salvar Nota
                </Button>
              </div>
              <textarea
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                placeholder="Ex: Mandei o link da landing page para o Dr. Pedro às 14h. Ele achou incrível e pediu proposta para colocar no domínio próprio..."
                rows={3}
                className="w-full p-3.5 rounded-lg bg-surface-2 border border-border-2 text-xs text-text-1 placeholder:text-text-4 resize-none outline-none focus:border-purple"
              />
            </div>
          </div>
        </div>
      </div>

      {/* New Search Modal with Receita Federal & Google Maps Tabs */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-surface p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple" />
                  Radar de Prospecção
                </h3>
                <p className="text-xs text-text-3 mt-0.5">
                  Escolha a fonte oficial para localizar novas oportunidades.
                </p>
              </div>
            </div>

            {/* Source Switcher Tabs */}
            <div className="mt-4 grid grid-cols-2 gap-2 p-1 bg-surface-2 rounded-xl border border-border-2">
              <button
                type="button"
                onClick={() => setSearchSource("receita")}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  searchSource === "receita"
                    ? "bg-purple text-white shadow-sm"
                    : "text-text-3 hover:text-white"
                }`}
              >
                <Landmark className="w-3.5 h-3.5" />
                Receita Federal
                <span className="text-[10px] bg-green/20 text-green px-1.5 py-0.2 rounded-full font-bold">
                  Novo
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSearchSource("maps")}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  searchSource === "maps"
                    ? "bg-purple text-white shadow-sm"
                    : "text-text-3 hover:text-white"
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                Google Maps
              </button>
            </div>

            {/* Tab 1: Receita Federal (CNPJs Recentes) */}
            {searchSource === "receita" ? (
              <div className="mt-4 space-y-3.5">
                <div className="p-3 rounded-lg bg-purple/10 border border-purple/20 text-xs text-purple-text flex items-start gap-2">
                  <Flame className="w-4 h-4 text-amber flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Timing perfeito:</strong> Empresas abertas nos últimos 30 a 90 dias com telefone/WhatsApp oficial cadastrado. Ideal para oferecer o primeiro site antes da concorrência!
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1">
                    <label className="block text-xs font-medium text-text-3 mb-1">
                      Estado (UF)
                    </label>
                    <select
                      value={receitaUf}
                      onChange={(e) => {
                        setReceitaUf(e.target.value);
                        const firstCity = cidadesData[e.target.value]?.[0]?.nome;
                        if (firstCity) setReceitaCity(firstCity);
                      }}
                      className="w-full h-9 rounded-lg border border-border-2 bg-surface-2 px-2.5 text-xs text-white outline-none cursor-pointer focus:border-purple"
                    >
                      {[
                        "SP", "RJ", "MG", "PR", "SC", "RS", "BA", "DF", "GO", "PE",
                        "CE", "ES", "PA", "MT", "MS", "MA", "PB", "RN", "AL", "PI",
                        "SE", "RO", "TO", "AC", "AP", "RR", "AM"
                      ].map((uf) => (
                        <option key={uf} value={uf}>
                          {uf}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-text-3 mb-1">
                      Cidade
                    </label>
                    <div className="flex items-center rounded-lg border border-border-2 bg-surface-2 px-3 h-9">
                      <MapPin className="w-3.5 h-3.5 text-text-4 mr-2" />
                      <input
                        type="text"
                        list="lista-cidades-receita"
                        value={receitaCity}
                        onChange={(e) => setReceitaCity(e.target.value)}
                        placeholder="Ex: Campinas"
                        className="w-full bg-transparent text-xs text-text-1 outline-none"
                      />
                      <datalist id="lista-cidades-receita">
                        {(cidadesData[receitaUf] || []).map((c) => (
                          <option key={c.codigo} value={c.nome}>
                            {c.totalEmpresas} empresas novas
                          </option>
                        ))}
                      </datalist>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-3 mb-1">
                    Ramo / Nicho (opcional)
                  </label>
                  <div className="flex items-center rounded-lg border border-border-2 bg-surface-2 px-3 h-9">
                    <Building2 className="w-3.5 h-3.5 text-text-4 mr-2" />
                    <input
                      type="text"
                      value={receitaNiche}
                      onChange={(e) => setReceitaNiche(e.target.value)}
                      placeholder="Ex: odonto, estetica, mecanica, pizzaria..."
                      className="w-full bg-transparent text-xs text-text-1 outline-none"
                    />
                  </div>
                  <span className="text-[10px] text-text-4 mt-0.5 block">
                    Deixe em branco para ver todas as novas empresas da cidade.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-3 mb-1">
                    Período de Abertura
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[30, 60, 90].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setReceitaDays(d)}
                        className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition-all ${
                          receitaDays === d
                            ? "border-purple bg-purple/20 text-white font-bold"
                            : "border-border-2 bg-surface-2 text-text-3 hover:text-white"
                        }`}
                      >
                        {d} dias
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filtros de Qualificação */}
                <div className="pt-1 space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-text-2 hover:text-white">
                    <input
                      type="checkbox"
                      checked={receitaOnlyWhats}
                      onChange={(e) => setReceitaOnlyWhats(e.target.checked)}
                      className="rounded border-border-2 bg-surface-2 text-purple focus:ring-0 w-3.5 h-3.5"
                    />
                    <span>Somente contatos com WhatsApp (celular)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs text-text-2 hover:text-white">
                    <input
                      type="checkbox"
                      checked={receitaWithoutMei}
                      onChange={(e) => setReceitaWithoutMei(e.target.checked)}
                      className="rounded border-border-2 bg-surface-2 text-purple focus:ring-0 w-3.5 h-3.5"
                    />
                    <span>Apenas Empresas Maiores (Sem MEI - ME / LTDA)</span>
                  </label>
                </div>
              </div>
            ) : (
              /* Tab 2: Google Maps */
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-text-3 mb-1.5">
                    Nicho / Ramo de Atividade
                  </label>
                  <div className="flex items-center rounded-lg border border-border-2 bg-surface-2 px-3 py-2">
                    <Building2 className="w-4 h-4 text-text-4 mr-2" />
                    <input
                      type="text"
                      value={searchNiche}
                      onChange={(e) => setSearchNiche(e.target.value)}
                      placeholder="Ex: Clínicas Odontológicas, Pizzarias, Mecânicas"
                      className="w-full bg-transparent text-xs text-text-1 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-3 mb-1.5">
                    Cidade e Estado
                  </label>
                  <div className="flex items-center rounded-lg border border-border-2 bg-surface-2 px-3 py-2">
                    <MapPin className="w-4 h-4 text-text-4 mr-2" />
                    <input
                      type="text"
                      value={searchCity}
                      onChange={(e) => setSearchCity(e.target.value)}
                      placeholder="Ex: Campinas, SP ou Curitiba, PR"
                      className="w-full bg-transparent text-xs text-text-1 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-border-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSearchModal(false)}
                disabled={isSearching}
              >
                Cancelar
              </Button>
              <Button
                variant="gradient"
                size="sm"
                loading={isSearching}
                onClick={handleExecuteSearch}
                className="font-bold"
              >
                {searchSource === "receita" ? "Buscar Novos CNPJs" : "Buscar no Maps"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
