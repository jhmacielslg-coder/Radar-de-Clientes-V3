# 🚀 Radar de Clientes V3

Sistema inteligente de prospecção comercial, qualificação de leads e geração instantânea de Landing Pages com IA para vendas de alta conversão no WhatsApp.

---

## 🌟 Principais Funcionalidades

### 1. 🏛️ Motor de Dados da Receita Federal (CNPJs Recém-Abertos)
- Consulta à base pública oficial de mais de **1,3 milhão de novas empresas** abertas nos últimos 90 dias em todo o Brasil.
- **Filtro Sem MEI:** Foco em empresas **ME, EPP e LTDA** que possuem capital e poder de investimento.
- **Filtro Só WhatsApp:** Garante números de celular com WhatsApp ativo.
- **Busca por Sinônimos:** Reconhece termos informais (ex: *odonto, pizzaria, mecânica, estética*) e mapeia para os códigos oficiais de CNAE.

### 2. 📍 Prospecção no Google Maps
- Identificação de negócios locais com boas avaliações, mas que **não possuem site oficial** cadastrado.

### 3. 🤖 Gerador de Landing Pages com IA (`/preview/[id]`)
- Gera instantaneamente um site modelo completo, responsivo e personalizado com os dados reais do lead (Nome, Nicho, Cidade, Telefone, Horários e Avaliações).
- Barra superior de demonstração comercial para fechar negócio com o cliente.
- Botão flutuante de WhatsApp já com mensagem de atendimento pré-configurada.

### 4. 💬 Gerador de Roteiros Comerciais para WhatsApp
- Roteiros dinâmicos que já embutem o link da prévia do site no texto:
  - **Boas-Vindas / Inauguração** (ideal para novos CNPJs da Receita Federal)
  - **Prévia Pronta**
  - **Autoridade & Avaliações**
  - **Conversão Direta**
  - **Delivery / Economia de Taxas**

### 5. 🔒 Segurança & Performance
- Next.js 16 (Turbopack) com 0 vulnerabilidades.
- Cabeçalhos de segurança HTTP (OWASP): `X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`, `Referrer-Policy`.
- Execução local privativa e integração com Supabase SSR.

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Linguagem:** TypeScript
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Banco de Dados:** [Supabase](https://supabase.com/) (PostgreSQL & SSR Client)

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ (recomendado Node 20+)
- npm ou yarn

### Instalação
```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
# Ou no Windows, execute iniciar.bat
```

Acesse: **[http://localhost:3000/hoje](http://localhost:3000/hoje)**

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env.local` baseado no `.env.example`:

```env
NEXT_PUBLIC_SUPABASE_URL=seu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=seu_supabase_anon_key
GOOGLE_PLACES_API_KEY=sua_chave_opcional
```

---

Desenvolvido para prospecção ativa de alto impacto.
