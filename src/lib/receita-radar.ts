import { scriptTemplates } from "./generator";

export interface ReceitaLead {
  id: string;
  cnpj: string;
  name: string;
  razaoSocial: string;
  niche: string;
  cnaeCode: string;
  city: string;
  uf: string;
  address: string;
  bairro: string;
  cep: string;
  phone: string;
  whatsapp: boolean;
  email: string;
  isMei: boolean;
  dataAbertura: string; // YYYY-MM-DD
  diasAberto: number;
  rating: number;
  reviewsCount: number;
  opportunityReason: string;
  suggestedMessage: string;
}

export interface CidadeOption {
  codigo: string;
  nome: string;
  totalEmpresas: number;
  partes?: number;
}

// Cache em memória no processo Node.js para evitar requisições repetidas aos arquivos estáticos
let cachedCidades: Record<string, [string, string, number, number?][]> | null = null;
let cachedCnaes: Record<string, string> | null = null;
let cachedMeta: { mes: string; ref: string; corte: string; total: number; gerado: string } | null = null;

const BASE_URL = "https://radar-empresas.pages.dev";

// Mapeamento de termos comuns para raízes de CNAE (sinônimos de mercado)
const SINONIMOS: Record<string, string[]> = {
  dentista: ["odontolog"],
  odonto: ["odontolog"],
  academia: ["condicionamento fisico"],
  salao: ["cabeleireir", "beleza"],
  cabeleireiro: ["cabeleireir"],
  barbearia: ["cabeleireir"],
  barbeiro: ["cabeleireir"],
  manicure: ["manicure"],
  estetica: ["estetica", "beleza"],
  advogado: ["advocacia", "juridic"],
  advocacia: ["advocacia"],
  contador: ["contabil"],
  contabilidade: ["contabil"],
  mecanica: ["manutencao e reparacao de veiculos", "reparacao"],
  oficina: ["reparacao", "manutencao"],
  pet: ["animais", "veterinar"],
  petshop: ["animais"],
  veterinario: ["veterinar"],
  medico: ["atividade medica", "clinica"],
  clinica: ["clinica", "atividade medica", "odontolog", "fisioterap"],
  psicologo: ["psicolog"],
  nutricionista: ["nutricion", "nutricao"],
  fisioterapia: ["fisioterap"],
  fisioterapeuta: ["fisioterap"],
  imobiliaria: ["imoveis", "imobiliari"],
  corretor: ["imoveis", "corretor"],
  roupa: ["vestuario", "confecc"],
  roupas: ["vestuario", "confecc"],
  moda: ["vestuario", "confecc"],
  restaurante: ["restaurante"],
  lanchonete: ["lanchonete"],
  comida: ["alimenta", "restaurante", "lanchonete"],
  pizzaria: ["pizzaria", "restaurante", "lanchonete"],
  hamburgueria: ["lanchonete", "restaurante"],
  delivery: ["restaurante", "lanchonete", "alimenta"],
  construtora: ["construcao", "edificios"],
  obra: ["construcao", "obras"],
  pedreiro: ["construcao", "alvenaria"],
  eletricista: ["eletric"],
  encanador: ["hidraulic"],
  marketing: ["marketing", "publicidade"],
  agencia: ["agencia", "publicidade"],
  site: ["web", "informatica", "sistemas"],
  ti: ["informatica", "sistemas", "software"],
  escola: ["ensino", "educacao"],
  curso: ["ensino", "treinamento"],
  mercado: ["mercad", "supermerc"],
  farmacia: ["farmac"],
  otica: ["optic", "otica"],
  loja: ["comercio varejista", "loja"],
  transporte: ["transporte"],
  frete: ["transporte de carga"],
  limpeza: ["limpeza"],
  festa: ["festas", "eventos"],
  evento: ["eventos", "festas"],
  fotografo: ["fotograf"],
};

const PALAVRAS_VAZIAS = new Set(["de", "da", "do", "das", "dos", "e", "para", "pra", "com"]);

function normalizarTexto(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function capitalizarTitulo(texto: string): string {
  return texto
    .toLowerCase()
    .replace(/(^|[\s(/-])(\p{L})/gu, (_, a, b) => a + b.toUpperCase())
    .replace(/\b(De|Da|Do|Das|Dos|E|Em|Ltda|Me|Epp)\b/g, (m) =>
      ["Ltda", "Me", "Epp"].includes(m) ? m.toUpperCase() : m.toLowerCase()
    );
}

function formatarTelefone(tel: string): string {
  const limpo = tel.replace(/\D/g, "");
  if (limpo.length === 11) {
    return `(${limpo.slice(0, 2)}) ${limpo.slice(2, 7)}-${limpo.slice(7)}`;
  } else if (limpo.length === 10) {
    return `(${limpo.slice(0, 2)}) ${limpo.slice(2, 6)}-${limpo.slice(6)}`;
  }
  return tel;
}

function expandirAlternativas(termo: string): string[] {
  const limpo = normalizarTexto(termo);
  const singular = limpo.length > 3 && limpo.endsWith("s") ? limpo.slice(0, -1) : limpo;
  const sin1 = SINONIMOS[limpo] || [];
  const sin2 = SINONIMOS[singular] || [];
  return Array.from(new Set([limpo, singular, ...sin1, ...sin2])).filter(Boolean);
}

// 1. Obter Metadados da base
export async function getReceitaMeta() {
  if (cachedMeta) return cachedMeta;
  try {
    const res = await fetch(`${BASE_URL}/dados/meta.json`, { next: { revalidate: 86400 } });
    if (!res.ok) throw new Error("Falha ao obter meta.json");
    cachedMeta = await res.json();
    return cachedMeta;
  } catch (err) {
    return {
      mes: "2026-11",
      ref: "20261114",
      corte: "20260816",
      total: 1300000,
      gerado: new Date().toISOString(),
    };
  }
}

// 2. Obter dicionário de CNAEs
export async function getReceitaCnaes(): Promise<Record<string, string>> {
  if (cachedCnaes) return cachedCnaes;
  try {
    const res = await fetch(`${BASE_URL}/dados/cnaes.json`, { next: { revalidate: 86400 } });
    if (!res.ok) throw new Error("Falha ao obter cnaes.json");
    cachedCnaes = await res.json();
    return cachedCnaes!;
  } catch (err) {
    return {};
  }
}

// 3. Obter lista de cidades agrupadas por UF
export async function getReceitaCidades(): Promise<Record<string, CidadeOption[]>> {
  if (cachedCidades) {
    const map: Record<string, CidadeOption[]> = {};
    for (const [uf, lista] of Object.entries(cachedCidades)) {
      map[uf] = lista.map(([codigo, nome, total, partes]) => ({
        codigo,
        nome,
        totalEmpresas: total,
        partes,
      }));
    }
    return map;
  }

  try {
    const res = await fetch(`${BASE_URL}/dados/cidades.json`, { next: { revalidate: 86400 } });
    if (!res.ok) throw new Error("Falha ao obter cidades.json");
    const raw = await res.json();
    cachedCidades = raw;

    const map: Record<string, CidadeOption[]> = {};
    for (const [uf, lista] of Object.entries(raw as Record<string, [string, string, number, number?][]>)) {
      map[uf] = lista.map(([codigo, nome, total, partes]) => ({
        codigo,
        nome,
        totalEmpresas: total,
        partes,
      }));
    }
    return map;
  } catch (err) {
    return {};
  }
}

// 4. Buscar e filtrar empresas de uma cidade
export interface SearchReceitaParams {
  uf: string;
  cityCode: string;
  cityName: string;
  niche?: string;
  days?: number; // 30, 60 ou 90
  onlyWhats?: boolean;
  withoutMei?: boolean;
  limit?: number;
}

export async function searchReceitaCompanies(
  params: SearchReceitaParams
): Promise<ReceitaLead[]> {
  const {
    uf,
    cityCode,
    cityName,
    niche = "",
    days = 90,
    onlyWhats = false,
    withoutMei = false,
    limit = 50,
  } = params;

  const [meta, cnaes, todasCidades] = await Promise.all([
    getReceitaMeta(),
    getReceitaCnaes(),
    getReceitaCidades(),
  ]);

  // Descobrir se a cidade tem múltiplas partes
  const cidadeInfo = (todasCidades[uf.toUpperCase()] || []).find(
    (c) => c.codigo === cityCode || normalizarTexto(c.nome) === normalizarTexto(cityName)
  );

  const codigo = cidadeInfo?.codigo || cityCode;
  const nomeRealCidade = cidadeInfo?.nome || cityName;
  const partesQtd = cidadeInfo?.partes || 1;

  // Carregar todos os fragmentos da cidade
  const urls =
    partesQtd > 1
      ? Array.from({ length: partesQtd }, (_, i) => `${BASE_URL}/dados/m/${codigo}-${i}.json`)
      : [`${BASE_URL}/dados/m/${codigo}.json`];

  let rawEmpresas: any[] = [];
  try {
    const respostas = await Promise.all(
      urls.map(async (url) => {
        const r = await fetch(url, { next: { revalidate: 3600 } });
        if (!r.ok) return [];
        return r.json();
      })
    );
    rawEmpresas = respostas.flat();
  } catch (err) {
    console.error("Erro ao baixar dados da cidade da Receita Federal:", err);
    return [];
  }

  // Calcular data de corte
  const refStr = meta?.ref || "20261114";
  const refDate = new Date(
    +refStr.slice(0, 4),
    +refStr.slice(4, 6) - 1,
    +refStr.slice(6, 8)
  );
  const corteDate = new Date(refDate);
  corteDate.setDate(corteDate.getDate() - days);
  const corteStr = corteDate.toISOString().slice(0, 10).replace(/-/g, "");

  // Preparar termos de busca por nicho
  const termos = normalizarTexto(niche.trim())
    .split(/[\s,]+/)
    .filter((t) => t && !PALAVRAS_VAZIAS.has(t))
    .map(expandirAlternativas);

  const leads: ReceitaLead[] = [];

  for (const item of rawEmpresas) {
    // Layout do array da empresa:
    // [cnpj, fantasia, razao, data(YYYYMMDD), cnae, bairro, logradouro, cep, tel, whats(1/0), tel2, email, mei(1/0)]
    const [
      cnpj,
      fantasia,
      razao,
      dataAberturaRaw,
      cnaeCode,
      bairro,
      logradouro,
      cep,
      tel,
      whats,
      tel2,
      email,
      mei,
    ] = item;

    // Filtro por data
    if (dataAberturaRaw <= corteStr) continue;

    // Filtro por WhatsApp
    if (onlyWhats && !whats) continue;

    // Filtro Sem MEI (somente ME / EPP / LTDA)
    if (withoutMei && mei) continue;

    // Filtro por nicho / ramo
    const descricaoCnae = cnaes[cnaeCode] || "";
    if (termos.length > 0) {
      const alvo = normalizarTexto(`${descricaoCnae} ${fantasia} ${razao}`);
      const matchesAll = termos.every((alternativas) =>
        alternativas.some((alt) => alvo.includes(alt))
      );
      if (!matchesAll) continue;
    }

    const nomeEmpresa = capitalizarTitulo(fantasia || razao || "Empresa Recém-Criada");
    const telefoneFinal = tel || tel2 || "";
    const cleanPhone = telefoneFinal.replace(/\D/g, "");

    // Calcular dias desde a abertura
    const ano = +dataAberturaRaw.slice(0, 4);
    const mes = +dataAberturaRaw.slice(4, 6) - 1;
    const dia = +dataAberturaRaw.slice(6, 8);
    const dataEmpresa = new Date(ano, mes, dia);
    const diferencaMs = Math.abs(refDate.getTime() - dataEmpresa.getTime());
    const diasAberto = Math.max(1, Math.round(diferencaMs / (1000 * 60 * 60 * 24)));
    const dataFormatadaBR = `${String(dia).padStart(2, "0")}/${String(mes + 1).padStart(2, "0")}/${ano}`;

    const enderecoCompleto = [logradouro, bairro, cep ? `CEP ${cep}` : ""]
      .filter(Boolean)
      .join(", ");

    const tipoEmpresa = mei ? "MEI" : "ME/LTDA";
    const opportunityReason = `Empresa aberta há ${diasAberto} dias (em ${dataFormatadaBR}) • ${tipoEmpresa} • Sem site oficial cadastrado no CNPJ.`;

    const leadId = `receita-${cnpj.replace(/\D/g, "")}`;

    // Gerar mensagem de abordagem sugerida usando o novo template de boas-vindas
    const leadDataParaScript = {
      name: nomeEmpresa,
      niche: descricaoCnae || niche || "Comércio & Serviços",
      city: nomeRealCidade,
      rating: 5.0,
      reviewsCount: 0,
      previewUrl: `http://localhost:3000/preview/${leadId}?name=${encodeURIComponent(
        nomeEmpresa
      )}&niche=${encodeURIComponent(
        descricaoCnae || niche
      )}&city=${encodeURIComponent(nomeRealCidade)}&phone=${cleanPhone}`,
    };

    const suggestedMessage = scriptTemplates.inauguracao
      ? scriptTemplates.inauguracao.generate(leadDataParaScript)
      : `Olá! Parabéns pela recente abertura da ${nomeEmpresa} em ${nomeRealCidade}!`;

    leads.push({
      id: leadId,
      cnpj,
      name: nomeEmpresa,
      razaoSocial: capitalizarTitulo(razao || fantasia || ""),
      niche: descricaoCnae || "Negócio Local",
      cnaeCode,
      city: `${nomeRealCidade}, ${uf.toUpperCase()}`,
      uf: uf.toUpperCase(),
      address: enderecoCompleto,
      bairro: bairro || "",
      cep: cep || "",
      phone: formatarTelefone(telefoneFinal),
      whatsapp: Boolean(whats),
      email: email || "",
      isMei: Boolean(mei),
      dataAbertura: `${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`,
      diasAberto,
      rating: 5.0,
      reviewsCount: 0,
      opportunityReason,
      suggestedMessage,
    });

    if (leads.length >= limit) break;
  }

  return leads;
}
