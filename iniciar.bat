@echo off
title Radar de Clientes - Servidor Local Seguro
cd /d "%~dp0"
echo ======================================================
echo    RADAR DE CLIENTES - INICIANDO SISTEMA SEGURO
echo ======================================================
echo.
echo Abrindo o painel no navegador em http://localhost:3000/hoje ...
start http://localhost:3000/hoje
npm run dev
