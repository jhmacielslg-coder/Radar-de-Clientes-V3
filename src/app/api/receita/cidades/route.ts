import { NextResponse } from "next/server";
import { getReceitaCidades, getReceitaMeta } from "@/lib/receita-radar";

export async function GET() {
  try {
    const [cidades, meta] = await Promise.all([
      getReceitaCidades(),
      getReceitaMeta(),
    ]);

    return NextResponse.json({
      success: true,
      meta,
      cidades,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Erro ao carregar cidades da Receita Federal." },
      { status: 500 }
    );
  }
}
