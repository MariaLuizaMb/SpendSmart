import { useNavigate } from "react-router-dom";
import { obterUsuario, removerAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const navigate = useNavigate();
  const usuario = obterUsuario();

  function sair() {
    removerAuth();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button variant="outline" onClick={sair}>
            Sair
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Bem-vinda ao SpendSmart</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Usuário:</strong> {usuario?.nome}
            </p>
            <p>
              <strong>Email:</strong> {usuario?.email}
            </p>
            <p className="mt-4 text-slate-600">
              Essa é uma rota protegida inicial. Depois você pode colocar aqui:
              lançamentos, categorias, orçamentos e gráficos.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
