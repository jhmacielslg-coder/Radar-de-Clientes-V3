import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  // Modo de Uso Exclusivo / Acesso Total Direto
  // Se o usuário acessar /entrar ou /cadastrar, redireciona direto para o painel /hoje
  if (
    request.nextUrl.pathname === "/entrar" ||
    request.nextUrl.pathname === "/cadastrar"
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/hoje";
    return NextResponse.redirect(url);
  }

  // Permite acesso irrestrito a todas as páginas sem exigência de login ou senha
  return NextResponse.next();
}
