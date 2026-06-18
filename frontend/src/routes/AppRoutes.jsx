import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "@/pages/Login";
import Cadastro from "@/pages/Cadastro";
import Home from "@/pages/Home";
import Perfil from "@/pages/Perfil";
import ContasBancarias from "@/pages/contasBancarias";
import Transacoes from "@/pages/Transacoes";
import Dashboard from "@/pages/Dashboard";
import Categorias from "@/pages/Categorias";
import { estaAutenticado } from "@/lib/auth";

function RotaPrivada({ children }) {
  return estaAutenticado() ? children : <Navigate to="/" replace />;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route
          path="/home"
          element={
            <RotaPrivada>
              <Home />
            </RotaPrivada>
          }
        />
        <Route
          path="/contas-bancarias"
          element={
            <RotaPrivada>
              <ContasBancarias />
            </RotaPrivada>
          }
        />
        <Route
          path="/transacoes"
          element={
            <RotaPrivada>
              <Transacoes />
            </RotaPrivada>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RotaPrivada>
              <Dashboard />
            </RotaPrivada>
          }
        />
        <Route
          path="/categorias"
          element={
            <RotaPrivada>
              <Categorias />
            </RotaPrivada>
          }
        />
        <Route
          path="/orcamentos"
          element={
            <RotaPrivada>
              <Categorias />
            </RotaPrivada>
          }
        />
        <Route
          path="/perfil"
          element={
            <RotaPrivada>
              <Perfil />
            </RotaPrivada>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
