import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Listar todos os leads salvos no Supabase (Acesso Direto)
export async function GET() {
  try {
    const supabase = await createClient();

    const { data: leads, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ leads });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Salvar um novo lead no Supabase (Acesso Direto)
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    const {
      google_place_id,
      name,
      niche,
      city,
      address,
      rating,
      reviews_count,
      reviewsCount,
      phone,
      opportunity_reason,
      opportunityReason,
      suggested_message,
      suggestedMessage,
      notes,
    } = body;

    if (!name || !niche || !city) {
      return NextResponse.json(
        { error: "Nome, nicho e cidade são obrigatórios." },
        { status: 400 }
      );
    }

    const { data: lead, error } = await supabase
      .from("leads")
      .insert({
        google_place_id: google_place_id || `place-${Date.now()}`,
        name,
        niche,
        city,
        address: address || city,
        rating: rating || 5.0,
        reviews_count: reviews_count ?? reviewsCount ?? 0,
        phone: phone || "",
        opportunity_reason: opportunity_reason || opportunityReason || "",
        suggested_message: suggested_message || suggestedMessage || "",
        notes: notes || "",
        status: "novo",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, lead });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
