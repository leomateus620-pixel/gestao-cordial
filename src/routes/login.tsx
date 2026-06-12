import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  LogIn,
  UserRound,
} from "lucide-react";
import { login, useSession } from "@/lib/auth-mock";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Entrar — Gestão Cordial & Morar" }] }),
  component: LoginPage,
});

const LOGO_SRC = "/logo-gestao-cordial-morar.svg";

function LoginPage() {
  const navigate = useNavigate();
  const session = useSession();
  const [usuario, setUsuario] = useState("ricardo");
  const [senha, setSenha] = useState("cordial");
  const [erro, setErro] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [logoDisponivel, setLogoDisponivel] = useState(true);

  useEffect(() => {
    if (session) navigate({ to: "/" });
  }, [session, navigate]);

  const camposPreenchidos = usuario.trim().length > 0 && senha.length > 0;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (carregando || !camposPreenchidos) return;
    setInfo(null);
    setErro(null);
    setCarregando(true);

    window.setTimeout(() => {
      const u = login(usuario, senha);
      if (!u) {
        setErro("Usuário ou senha inválidos.");
        setCarregando(false);
        return;
      }
      navigate({ to: "/" });
    }, 420);
  }

  function solicitarRecuperacao() {
    setErro(null);
    setInfo("Solicite a redefinição de senha ao administrador do sistema.");
  }

  return (
    <main className="login-premium-shell min-h-svh overflow-x-hidden px-4 py-6 text-[#1E2329] sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="login-premium-grid absolute inset-0" />
        <div className="animate-mesh absolute -left-24 top-[-18%] h-80 w-80 rounded-full bg-[#5FAFC7]/25 blur-[92px] sm:h-[32rem] sm:w-[32rem]" />
        <div
          className="animate-mesh absolute bottom-[-18%] right-[-18%] h-96 w-96 rounded-full bg-[#D9782D]/20 blur-[104px] sm:h-[34rem] sm:w-[34rem]"
          style={{ animationDelay: "-8s" }}
        />
        <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FBF8F4]/6 blur-[130px]" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-[calc(100svh-3rem)] w-full max-w-6xl items-center justify-center pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(0.5rem,env(safe-area-inset-top))]">
        <div className="login-frame login-card-enter grid w-full max-w-[26.5rem] overflow-hidden rounded-[1.75rem] sm:max-w-[28.5rem] sm:rounded-[2.25rem] lg:max-w-[64rem] lg:grid-cols-[1.05fr_1fr]">
          <aside className="login-brand-panel relative flex flex-col gap-6 p-6 text-[#F5F1EB] sm:p-8 lg:justify-between lg:gap-12 lg:p-12">
            <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#D9782D]/14 blur-[70px]" />
              <div className="absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-[#5FAFC7]/16 blur-[80px]" />
              <div className="login-accent-hairline absolute inset-x-8 bottom-0 h-px lg:hidden" />
            </div>

            <div className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
              {logoDisponivel ? (
                <img
                  src={LOGO_SRC}
                  alt="Gestão Cordial & Morar — Sistema Integrado de Gestão Imobiliária"
                  className="h-auto max-h-16 w-auto max-w-[16rem] object-contain drop-shadow-[0_14px_30px_rgba(0,0,0,0.28)] sm:max-h-20 sm:max-w-[19rem] lg:max-h-24 lg:max-w-[22rem]"
                  onError={() => setLogoDisponivel(false)}
                />
              ) : (
                <div className="flex items-center gap-4">
                  <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#2B7FA3] to-[#174D61] text-lg font-bold tracking-tight text-white shadow-[0_14px_30px_rgba(0,0,0,0.32)] ring-1 ring-white/20">
                    C&M
                  </div>
                  <div className="text-left">
                    <p className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                      Gestão Cordial & Morar
                    </p>
                    <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.22em] text-[#F5F1EB]/65 sm:text-xs">
                      Sistema Integrado de Gestão Imobiliária
                    </p>
                  </div>
                </div>
              )}

              <p className="mt-4 text-sm font-medium tracking-wide text-[#F5F1EB]/78 lg:mt-6 lg:text-base">
                Painel integrado de gestão imobiliária
              </p>
            </div>

            <p className="relative hidden max-w-sm text-sm leading-6 text-[#F5F1EB]/60 lg:block">
              Imóveis, clientes, contratos e financeiro das duas imobiliárias reunidos em uma
              única operação, com segurança e clareza.
            </p>

            <div className="relative flex flex-col gap-5">
              <div className="flex flex-wrap justify-center gap-2 text-xs font-semibold text-[#F5F1EB]/85 lg:justify-start">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/8 px-3 py-1.5 backdrop-blur-md">
                  <span className="size-2 rounded-full bg-[#2B7FA3] shadow-[0_0_0_4px_rgba(43,127,163,0.18)]" />
                  Cordial Imóveis
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/8 px-3 py-1.5 backdrop-blur-md">
                  <span className="size-2 rounded-full bg-[#E07A2E] shadow-[0_0_0_4px_rgba(224,122,46,0.18)]" />
                  Morar Imóveis
                </span>
              </div>

              <div className="hidden lg:block">
                <div className="login-accent-hairline mb-4 h-px w-full" />
                <p className="text-xs leading-5 text-[#F5F1EB]/50">
                  Ambiente exclusivo para as equipes Cordial e Morar.
                </p>
              </div>
            </div>
          </aside>

          <div className="login-card-glass relative flex flex-col justify-center p-6 sm:p-9 lg:p-12">
            <div className="mb-6 sm:mb-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#D9782D] sm:text-xs">
                Acesso integrado
              </p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#171B21] sm:text-3xl">
                Acessar sistema
              </h1>
              <p className="mt-2 max-w-[22rem] text-sm leading-6 text-[#6B7280]">
                Informe seu usuário ou e-mail para entrar no painel das imobiliárias.
              </p>
            </div>

            <form onSubmit={submit} className="space-y-4" noValidate>
              <label className="block">
                <span className="text-sm font-semibold text-[#1E2329]">Usuário ou e-mail</span>
                <div
                  className={`login-input-wrap mt-2 flex items-center gap-3 rounded-2xl border border-[#E6DDD2] bg-white/66 px-4 transition ${erro ? "login-input-erro" : ""}`}
                >
                  <UserRound className="size-5 shrink-0 text-[#6B7280]" aria-hidden="true" />
                  <input
                    value={usuario}
                    onChange={(e) => {
                      setUsuario(e.target.value);
                      setErro(null);
                      setInfo(null);
                    }}
                    autoComplete="username"
                    inputMode="email"
                    aria-invalid={erro ? true : undefined}
                    placeholder="ex: ricardo ou ricardo@email.com"
                    className="min-h-14 w-full bg-transparent text-base font-medium text-[#1E2329] outline-none placeholder:text-[#6B7280]/58"
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-[#1E2329]">Senha</span>
                <div
                  className={`login-input-wrap mt-2 flex items-center gap-3 rounded-2xl border border-[#E6DDD2] bg-white/66 px-4 transition ${erro ? "login-input-erro" : ""}`}
                >
                  <LockKeyhole className="size-5 shrink-0 text-[#6B7280]" aria-hidden="true" />
                  <input
                    type={senhaVisivel ? "text" : "password"}
                    value={senha}
                    onChange={(e) => {
                      setSenha(e.target.value);
                      setErro(null);
                      setInfo(null);
                    }}
                    autoComplete="current-password"
                    aria-invalid={erro ? true : undefined}
                    placeholder="Digite sua senha"
                    className="min-h-14 w-full bg-transparent text-base font-medium text-[#1E2329] outline-none placeholder:text-[#6B7280]/58"
                  />
                  <button
                    type="button"
                    onClick={() => setSenhaVisivel((visivel) => !visivel)}
                    className="-mr-1 grid size-10 shrink-0 place-items-center rounded-full text-[#2A3038] transition hover:bg-[#1E647D]/8 hover:text-[#1E647D] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#1E647D]/12"
                    aria-label={senhaVisivel ? "Ocultar senha" : "Visualizar senha"}
                  >
                    {senhaVisivel ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
              </label>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={solicitarRecuperacao}
                  className="text-sm font-semibold text-[#1E647D] transition hover:text-[#B95F20] focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#1E647D]/12"
                >
                  Esqueceu a senha?
                </button>
              </div>

              {erro && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 rounded-2xl border border-[#C94C4C]/30 bg-[#C94C4C]/10 px-4 py-3 text-sm font-medium text-[#8E2F2F]"
                >
                  <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  <span>{erro}</span>
                </div>
              )}

              {info && (
                <p
                  role="status"
                  className="rounded-2xl border border-[#1E647D]/16 bg-[#1E647D]/8 px-4 py-3 text-sm font-medium text-[#174D61]"
                >
                  {info}
                </p>
              )}

              <button
                type="submit"
                disabled={carregando || !camposPreenchidos}
                className="login-submit group relative mt-2 flex min-h-14 w-full items-center justify-center overflow-hidden rounded-2xl px-5 text-base font-bold text-white shadow-[0_14px_32px_rgba(30,100,125,0.28)] transition active:scale-[0.99] disabled:active:scale-100"
              >
                <span
                  className="absolute inset-y-0 right-0 w-24 translate-x-10 bg-[#D9782D]/20 blur-2xl transition group-hover:translate-x-0"
                  aria-hidden="true"
                />
                {carregando ? (
                  <>
                    <Loader2 className="relative mr-2 size-5 animate-spin" aria-hidden="true" />
                    <span className="relative">Entrando…</span>
                  </>
                ) : (
                  <>
                    <LogIn className="relative mr-2 size-5" aria-hidden="true" />
                    <span className="relative">Entrar no sistema</span>
                  </>
                )}
              </button>

              <p className="px-2 text-center text-xs leading-5 text-[#6B7280]">
                Acesso restrito aos usuários autorizados da Cordial Imóveis e Morar Imóveis.
              </p>
            </form>

            <div className="mt-6 rounded-2xl border border-[#E6DDD2]/80 bg-white/46 px-4 py-3 text-center text-[11px] leading-5 text-[#6B7280]">
              Perfis demo: <strong className="text-[#1E2329]">ricardo</strong>,{" "}
              <strong className="text-[#1E2329]">bruna</strong>,{" "}
              <strong className="text-[#1E2329]">clara</strong>,{" "}
              <strong className="text-[#1E2329]">marcos</strong> ou{" "}
              <strong className="text-[#1E2329]">daniela</strong> · senha{" "}
              <strong className="text-[#1E2329]">cordial</strong>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
