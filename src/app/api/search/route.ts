import { NextResponse } from "next/server";
import { searchPlacesWithoutWebsite } from "@/lib/places";

export async function POST(request: Request) {
  try {
    const { niche, city } = await request.json();

    if (!niche || !city) {
      return NextResponse.json(
        { error: "Nicho e cidade são obrigatórios." },
        { status: 400 }
      );
    }

    const results = await searchPlacesWithoutWebsite(niche, city);

    return NextResponse.json({
      success: true,
      total: results.length,
      leads: results,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Erro interno ao processar busca." },
      { status: 500 }
    );
  }
}

