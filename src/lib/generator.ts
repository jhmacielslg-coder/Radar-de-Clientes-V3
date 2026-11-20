export type TemplateType =
  | "previa"
  | "inauguracao"
  | "autoridade"
  | "conversao"
  | "delivery";

export interface ScriptLeadData {
  name: string;
  niche: string;
  city: string;
  rating: number;
  reviewsCount: number;
  previewUrl?: string;
}

export interface ScriptOption {
  id: TemplateType;
  title: string;
  description: string;
  generate: (lead: ScriptLeadData) => string;
}

export const scriptTemplates: Record<TemplateType, ScriptOption> = {
  previa: {
    id: "previa",
    title: "Prévia Pronta (Mais Recomendada)",
    description: "Abordagem com o link do site modelo pronto para impressionar o cliente.",
    generate: (lead) => {
      const link = lead.previewUrl ? `\n👉 Veja a demonstração aqui: ${lead.previewUrl}\n` : "";
      return `Olá! Tudo bem? Vi o perfil da ${lead.name} no Google Maps com nota ${lead.rating} em ${lead.city}.\n\nReparei que vocês ainda não possuem um site oficial para apresentar seus serviços e facilitar agendamentos. Montei uma prévia de como ficaria uma página moderna para vocês captarem novos clientes pela internet:${link}\nPosso te mostrar como colocar no ar com o domínio de vocês sem compromisso?`;
    },
  },
  inauguracao: {
    id: "inauguracao",
    title: "Boas-Vindas / Recém-Aberta (Receita Federal)",
    description: "Abordagem parabenizando pela abertura recente e entregando o site modelo pronto.",
    generate: (lead) => {
      const link = lead.previewUrl ? `\n👉 Veja a demonstração do site que preparei: ${lead.previewUrl}\n` : "";
      return `Olá! Tudo bem? Parabéns pela recente abertura da ${lead.name} em ${lead.city}! 🚀\n\nVi que vocês oficializaram o CNPJ recentemente. Quem está no início precisa ser encontrado rápido no Google e construir confiança para conquistar os primeiros clientes.\n\nMontei uma prévia exclusiva de como ficaria um site moderno e focado em conversão para vocês:${link}\nO que acha de darmos uma olhada rápida sem compromisso para colocar no ar com o domínio oficial de vocês?`;
    },
  },
  autoridade: {
    id: "autoridade",
    title: "Foco em Avaliações & Autoridade",
    description: "Valoriza a boa reputação e mostra o site destacando as estrelas no Maps.",
    generate: (lead) => {
      const link = lead.previewUrl ? `\n🔗 Link da página modelo: ${lead.previewUrl}\n` : "";
      return `Olá equipe da ${lead.name}! Parabéns pelas ${lead.reviewsCount} avaliações positivas no Google Maps!\n\nVocês têm uma excelente reputação local, mas quando um cliente pesquisa pelo negócio no Google, não encontra uma página oficial com tabela de serviços e WhatsApp direto.\n\nDesenvolvemos sites de alta conversão para o setor de ${lead.niche}. Preparei este modelo exclusivo para vocês:${link}\nGostariam de ver como posicionar o negócio no topo da sua região?`;
    },
  },
  conversao: {
    id: "conversao",
    title: "Agendamento & Captação Direta",
    description: "Foco em tirar clientes do concorrente e facilitar o contato.",
    generate: (lead) => {
      const link = lead.previewUrl ? `\n👉 Acesse a prévia: ${lead.previewUrl}\n` : "";
      return `Boa tarde! Encontrei a ${lead.name} pesquisando por ${lead.niche} em ${lead.city}.\n\nHoje, mais de 70% das pessoas que pesquisam no Maps decidem agendar quando encontram um site rápido com botão de atendimento direto no WhatsApp. Veja uma demonstração que criei para vocês:${link}\nVocês gostariam de aumentar o número de chamados diários com essa página própria?`;
    },
  },
  delivery: {
    id: "delivery",
    title: "Economia de Taxas (Alimentação/Delivery)",
    description: "Ideal para restaurantes, marmitarias, docerias e comércios locais.",
    generate: (lead) => {
      const link = lead.previewUrl ? `\n📲 Demonstração do cardápio: ${lead.previewUrl}\n` : "";
      return `Olá! Sou fã da comida da ${lead.name} em ${lead.city}.\n\nNotei que vocês ainda não têm um catálogo ou cardápio digital próprio para receber pedidos direto pelo WhatsApp sem pagar altas taxas de intermediação de aplicativos de entrega. Veja como ficaria a página de vocês:${link}\nVocês teriam interesse em conhecer uma solução prática para isso?`;
    },
  },
};

export function generateOpportunityDiagnostic(
  niche: string,
  rating: number,
  reviewsCount: number,
  city: string
): string {
  if (reviewsCount > 50 && rating >= 4.7) {
    return `Negócio consolidado com ${reviewsCount} avaliações e nota ${rating} no Google Maps em ${city}. Os clientes já confiam na marca, porém a ausência de um site profissional faz com que potenciais novos clientes procurem concorrentes que oferecem agendamento online imediato.`;
  }

  if (reviewsCount > 20) {
    return `Empresa ativa e com boa reputação (${reviewsCount} avaliações). Depende exclusivamente do perfil do Maps e telefone fixo para conversão. Uma landing page com botão WhatsApp e galeria de serviços aumentaria em até 40% o volume de contatos diários.`;
  }

  return `Empresa com perfil verificado no Google Maps em ${city}, mas sem canal digital proprietário. A criação de um site com SEO local garantirá destaque nas buscas orgânicas da região para o segmento de ${niche}.`;
}
