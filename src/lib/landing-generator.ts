export interface LandingPageData {
  companyName: string;
  niche: string;
  city: string;
  address: string;
  phone: string;
  rating: number;
  reviewsCount: number;
  heroHeadline: string;
  heroSubheadline: string;
  services: {
    title: string;
    description: string;
    icon: string;
  }[];
  differentiators: {
    title: string;
    description: string;
  }[];
  testimonials: {
    author: string;
    rating: number;
    comment: string;
    timeAgo: string;
  }[];
  whatsappMessage: string;
}

export function generateLandingPageContent(params: {
  name: string;
  niche: string;
  city: string;
  address?: string;
  phone?: string;
  rating?: number;
  reviewsCount?: number;
}): LandingPageData {
  const {
    name,
    niche,
    city,
    address = "Atendimento com agendamento",
    phone = "11999998888",
    rating = 4.9,
    reviewsCount = 45,
  } = params;

  const nicheLower = niche.toLowerCase();

  // 1. ODONTOLOGIA / DENTISTAS
  if (nicheLower.includes("odonto") || nicheLower.includes("dentist")) {
    return {
      companyName: name,
      niche: "Clínica Odontológica",
      city,
      address,
      phone,
      rating,
      reviewsCount,
      heroHeadline: `O sorriso que você sempre sonhou, com atendimento humanizado em ${city}.`,
      heroSubheadline: `Tecnologia de ponta, especialistas dedicados e tratamentos sem dor. Agende sua avaliação hoje mesmo e comprove a qualidade aprovada por centenas de pacientes.`,
      services: [
        {
          title: "Implantes & Próteses",
          description: "Recupere sua mastigação, segurança e estética com materiais premium de alta durabilidade.",
          icon: "Sparkles",
        },
        {
          title: "Ortodontia & Alinhadores",
          description: "Aparelhos estéticos e alinhadores invisíveis para corrigir seu sorriso com discrição e conforto.",
          icon: "Shield",
        },
        {
          title: "Clareamento Dental a Laser",
          description: "Dentes visivelmente mais brancos em poucas sessões com segurança e sem sensibilidade excessiva.",
          icon: "Zap",
        },
        {
          title: "Lentes de Contato Dental",
          description: "Harmonização de formato, cor e proporção dos dentes para um sorriso uniforme e brilhante.",
          icon: "CheckCircle",
        },
      ],
      differentiators: [
        { title: "Avaliação Personalizada", description: "Diagnóstico completo com raio-x e plano de tratamento sob medida." },
        { title: "Tecnologia Sem Dor", description: "Técnicas de anestesia moderna e equipamentos de precisão." },
        { title: "Ambiente Confortável", description: "Consultórios modernos preparados para o seu relaxamento." },
      ],
      testimonials: [
        {
          author: "Mariana Costa",
          rating: 5,
          comment: "Atendimento impecável! O Dr. foi super atencioso e o resultado do meu clareamento superou as expectativas.",
          timeAgo: "há 2 semanas",
        },
        {
          author: "Carlos Eduardo Silva",
          rating: 5,
          comment: "Melhor clínica de Campinas! Fiz implante e não senti nenhuma dor. Recomendo de olhos fechados.",
          timeAgo: "há 1 mês",
        },
      ],
      whatsappMessage: `Olá! Vim pelo site da ${name} e gostaria de agendar uma avaliação odontológica.`,
    };
  }

  // 2. ESTÉTICA / BELEZA / DERMATOLOGIA
  if (
    nicheLower.includes("estétic") ||
    nicheLower.includes("estetic") ||
    nicheLower.includes("beleza") ||
    nicheLower.includes("dermato")
  ) {
    return {
      companyName: name,
      niche: "Estética & Bem-Estar",
      city,
      address,
      phone,
      rating,
      reviewsCount,
      heroHeadline: `Realce sua beleza natural com protocolos exclusivos e tecnologia avançada em ${city}.`,
      heroSubheadline: `Cuidamos da sua pele, corpo e autoestima com tratamentos personalizados e profissionais certificados. Resultados elegantes e seguros.`,
      services: [
        {
          title: "Harmonização Facial & Botox",
          description: "Linhas de expressão suavizadas e contornos faciais definidos com elegância e naturalidade.",
          icon: "Sparkles",
        },
        {
          title: "Bioestimuladores de Colágeno",
          description: "Recupere a firmeza, viço e elasticidade da pele com as melhores marcas mundiais.",
          icon: "Shield",
        },
        {
          title: "Limpeza de Pele Profunda",
          description: "Extração delicada de cravos e impurezas com hidratação profunda e máscara de LED calmante.",
          icon: "CheckCircle",
        },
        {
          title: "Tratamentos Corporais",
          description: "Redução de medidas, combate à celulite e flacidez com drenagem e aparelhos modernos.",
          icon: "Zap",
        },
      ],
      differentiators: [
        { title: "Avaliação Facial Completa", description: "Mapeamento detalhado das necessidades reais da sua pele." },
        { title: "Produtos Originais e Lacrados", description: "Trabalhamos apenas com marcas consagradas e certificadas pela ANVISA." },
        { title: "Acompanhamento Pós-Procedimento", description: "Suporte dedicado para garantir o melhor resultado e cicatrização." },
      ],
      testimonials: [
        {
          author: "Beatriz Ribeiro",
          rating: 5,
          comment: "Fiz botox e bioestimulador e amei demais! Ficou super natural, ninguém percebeu que fiz procedimento, só elogiaram que rejuvenesci.",
          timeAgo: "há 3 semanas",
        },
        {
          author: "Fernanda Lima",
          rating: 5,
          comment: "Ambiente acolhedor, café maravilhoso e atendimento nota 10. Sempre volto para a limpeza de pele.",
          timeAgo: "há 1 mês",
        },
      ],
      whatsappMessage: `Olá! Vim pelo site do ${name} e gostaria de saber mais sobre os procedimentos e agendar um horário.`,
    };
  }

  // 3. OFICINAS MECÂNICAS / AUTOCENTERS
  if (
    nicheLower.includes("mecanic") ||
    nicheLower.includes("mecânic") ||
    nicheLower.includes("auto") ||
    nicheLower.includes("pneu") ||
    nicheLower.includes("oficina")
  ) {
    return {
      companyName: name,
      niche: "Centro Automotivo & Mecânica",
      city,
      address,
      phone,
      rating,
      reviewsCount,
      heroHeadline: `A oficina mecânica de confiança que o seu carro precisa em ${city}.`,
      heroSubheadline: `Orçamento transparente sem surpresas, peças originais com garantia e diagnóstico computadorizado de última geração. Rodando com segurança e tranquilidade.`,
      services: [
        {
          title: "Revisão Preventiva Completa",
          description: "Checagem detalhada de mais de 40 itens essenciais antes de viagens ou revisões periódicas.",
          icon: "Shield",
        },
        {
          title: "Freios, Suspensão & Direção",
          description: "Pastilhas, discos, amortecedores e terminais com mão de obra especializada e garantia.",
          icon: "CheckCircle",
        },
        {
          title: "Diagnóstico Eletrônico (Scanner)",
          description: "Identificação rápida e precisa de falhas no painel, injeção eletrônica e sensores.",
          icon: "Zap",
        },
        {
          title: "Troca de Óleo & Filtros",
          description: "Lubrificantes recomendados pelo fabricante para máxima durabilidade do motor.",
          icon: "Sparkles",
        },
      ],
      differentiators: [
        { title: "Orçamento Detalhado", description: "Nenhuma peça é trocada sem sua autorização prévia por WhatsApp." },
        { title: "Garantia de Serviços", description: "Garantia total de peças e mão de obra em todos os reparos realizados." },
        { title: "Entrega no Prazo", description: "Respeito ao seu tempo com agendamento e cumprimento rigoroso do prazo." },
      ],
      testimonials: [
        {
          author: "Rodrigo Mendonça",
          rating: 5,
          comment: "Oficina de extrema honestidade! O mecânico me mostrou as peças velhas e explicou tudo certinho. Preço justo.",
          timeAgo: "há 2 semanas",
        },
        {
          author: "Paulo Sérgio",
          rating: 5,
          comment: "Descobriram um barulho na suspensão que nenhuma outra oficina achava. O carro ficou zero de novo.",
          timeAgo: "há 3 semanas",
        },
      ],
      whatsappMessage: `Olá! Vim pelo site da ${name} e gostaria de solicitar um orçamento para o meu carro.`,
    };
  }

  // 4. RESTAURANTES / GASTRONOMIA / DELIVERY
  if (
    nicheLower.includes("restaurante") ||
    nicheLower.includes("pizz") ||
    nicheLower.includes("hamburg") ||
    nicheLower.includes("burger") ||
    nicheLower.includes("comida")
  ) {
    return {
      companyName: name,
      niche: "Gastronomia & Delivery",
      city,
      address,
      phone,
      rating,
      reviewsCount,
      heroHeadline: `O melhor da gastronomia artesanal em ${city}, direto na sua mesa ou no seu delivery.`,
      heroSubheadline: `Ingredientes selecionados todos os dias, receitas autênticas e entregas rápidas na temperatura perfeita. Peça direto e ganhe vantagens exclusivas.`,
      services: [
        {
          title: "Cardápio Artesanal",
          description: "Pratos preparados com ingredientes frescos e receitas exclusivas do nosso chef.",
          icon: "Sparkles",
        },
        {
          title: "Delivery Rápido & Seguro",
          description: "Embalagens térmicas especiais para sua refeição chegar quentinha e crocante.",
          icon: "Zap",
        },
        {
          title: "Atendimento para Famílias & Eventos",
          description: "Espaço aconchegante para confraternizações, aniversários e encontros em família.",
          icon: "CheckCircle",
        },
        {
          title: "Sobremesas & Bebidas Especiais",
          description: "Carta de bebidas selecionadas e doces artesanais para fechar sua refeição com chave de ouro.",
          icon: "Shield",
        },
      ],
      differentiators: [
        { title: "Ingredientes Frescos", description: "Seleção rigorosa de carnes, queijos e temperos naturais." },
        { title: "Peça Direto sem Taxas", description: "Economize pedindo direto no nosso WhatsApp oficial." },
        { title: "Nota 4.9 no Google Maps", description: "Centenas de clientes satisfeitos e apaixonados pelo nosso sabor." },
      ],
      testimonials: [
        {
          author: "Juliana Martins",
          rating: 5,
          comment: "Comida espetacular! O pedido chegou super rápido, bem embalado e delicioso. Viramos clientes fiéis.",
          timeAgo: "há 4 dias",
        },
      ],
      whatsappMessage: `Olá! Vim pelo site da ${name} e gostaria de ver o cardápio de hoje e fazer um pedido.`,
    };
  }

  // 5. GENÉRICO PROFISSIONAL PARA QUALQUER OUTRO NICHO
  return {
    companyName: name,
    niche,
    city,
    address,
    phone,
    rating,
    reviewsCount,
    heroHeadline: `Soluções especializadas em ${niche} com excelência e confiança em ${city}.`,
    heroSubheadline: `Mais de ${reviewsCount} avaliações 5 estrelas no Google Maps comprovam nosso compromisso com a qualidade, pontualidade e satisfação total de nossos clientes.`,
    services: [
      {
        title: "Atendimento Personalizado",
        description: "Entendemos a fundo a sua necessidade para oferecer a solução exata com o melhor custo-benefício.",
        icon: "CheckCircle",
      },
      {
        title: "Profissionais Especializados",
        description: "Equipe treinada, experiente e focada na excelência em cada etapa do atendimento.",
        icon: "Shield",
      },
      {
        title: "Agilidade & Pontualidade",
        description: "Respeito ao seu tempo com prazos claros e comunicação transparente em todos os momentos.",
        icon: "Zap",
      },
      {
        title: "Garantia de Qualidade",
        description: "Trabalhamos apenas com as melhores práticas e materiais para garantir sua satisfação.",
        icon: "Sparkles",
      },
    ],
    differentiators: [
      { title: "Empresa Bem Avaliada", description: `Nota média de ${rating} estrelas no Google Maps pelos clientes de ${city}.` },
      { title: "Atendimento Rápido via WhatsApp", description: "Tire suas dúvidas e solicite orçamentos sem burocracia." },
      { title: "Transparência Total", description: "Condições claras, preços justos e sem letras miúdas." },
    ],
    testimonials: [
      {
        author: "Marcos Vinicius",
        rating: 5,
        comment: "Empresa nota 10! Atendimento rápido, resolveram meu problema com eficiência e muita educação.",
        timeAgo: "há 1 semana",
      },
    ],
    whatsappMessage: `Olá! Encontrei a ${name} no site e gostaria de solicitar um orçamento e saber mais sobre os serviços de ${niche}.`,
  };
}
