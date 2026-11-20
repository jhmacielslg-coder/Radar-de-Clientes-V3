import { NextResponse } from "next/server";
import { searchReceitaCompanies } from "@/lib/receita-radar";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      uf,
      cityCode,
      cityName,
      niche,
      days = 90,
      onlyWhats = false,
      withoutMei = false,
      limit = 50,
    } = body;

    if (!uf || (!cityCode && !cityName)) {
      return NextResponse.json(
        { error: "Estado (UF) e Cidade são obrigatórios." },
        { status: 400 }
      );
    }

    const leads = await searchReceitaCompanies({
      uf: uf.toUpperCase(),
      cityCode: cityCode || "",
      cityName: cityName || "",
      niche: niche || "",
      days: Number(days) || 90,
      onlyWhats: Boolean(onlyWhats),
      withoutMei: Boolean(withoutMei),
      limit: Number(limit) || 50,
    });

    return NextResponse.json({
      success: true,
      total: leads.length,
      leads,
    });
  } catch (error: any) {
    console.error("Erro na busca da Receita:", error);
    return NextResponse.json(
      { error: error.message || "Erro ao processar busca na Receita Federal." },
      { status: 500 }
    );
  }
}
