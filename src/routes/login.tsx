import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Building2 } from "lucide-react";
import { login, useSession } from "@/lib/auth-mock";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Entrar — Gestão Cordial" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const session = useSession();
  const [usuario, setUsuario] = useState("ricardo");
  const [senha, setSenha] = useState("cordial");
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (session) navigate({ to: "/" });
  }, [session, navigate]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const u = login(usuario, senha);
    if (!u) {
      setErro("Usuário ou senha inválidos.");
      return;
    }
    navigate({ to: "/" });
  }

  return (
    <div
      className="relative flex min-h-screen items-center justify-center px-6 font-sans"
      style={{ color: "#f5f1eb" }}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #0f1318 0%, #171b21 55%, #2a3038 100%)",
          }}
        />
        <div
          className="animate-mesh absolute -top-[20%] -left-[15%] h-[70%] w-[80%] rounded-full blur-[140px]"
          style={{ background: "rgba(30, 100, 125, 0.55)" }}
        />
        <div
          className="animate-mesh absolute -bottom-[15%] -right-[15%] h-[70%] w-[80%] rounded-full blur-[140px]"
          style={{ background: "rgba(217, 120, 45, 0.4)", animationDelay: "-8s" }}
        />
      </div>

      <div
        className="w-full max-w-sm rounded-3xl p-7"
        style={{
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(26px) saturate(150%)",
          border: "1px solid rgba(255, 255, 255, 0.16)",
          boxShadow:
            "0 30px 80px -20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.18)",
        }}
      >
        <div className="mb-6 flex items-center gap-3">
          <div
            className="grid size-11 place-items-center rounded-2xl"
            style={{ background: "rgba(95,175,199,0.18)", color: "#5fafc7" }}
          >
            <Building2 className="size-5" />
          </div>
          <div>
            <p
              className="text-[10px] font-bold uppercase tracking-[0.22em]"
              style={{ color: "#5fafc7" }}
            >
              Gestão Cordial
            </p>
            <h1 className="text-lg font-semibold tracking-tight text-white">
              Painel integrado de gestão imobiliária
            </h1>
            <p className="mt-0.5 text-[10px] text-white/55">
              Cordial Imóveis + Morar Imóveis
            </p>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="text-[11px] font-medium uppercase tracking-wider text-white/55">
              Usuário
            </span>
            <input
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-white/35 focus:bg-white/15"
            />
          </label>
          <label className="block">
            <span className="text-[11px] font-medium uppercase tracking-wider text-white/55">
              Senha
            </span>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="mt-1 w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-white/35 focus:bg-white/15"
            />
          </label>
          {erro && (
            <p className="text-xs" style={{ color: "#f0a86d" }}>
              {erro}
            </p>
          )}
          <button
            type="submit"
            className="system-button w-full rounded-xl py-3 text-sm font-semibold active:scale-[0.99]"
          >
            Entrar
          </button>
          <p className="text-center text-[11px] text-white/50">
            Perfis demo: <strong>ricardo</strong>, <strong>clara</strong>, <strong>marcos</strong>{" "}
            ou <strong>daniela</strong> · senha <strong>cordial</strong>
          </p>
        </form>
      </div>
    </div>
  );
}
