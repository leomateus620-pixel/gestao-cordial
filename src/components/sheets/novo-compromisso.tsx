import { useState } from "react";
import { FormSheet, Field, inputCls, submitCls } from "./form-shell";
import { useApp } from "@/store/app-store";
import type { Compromisso, AgencyId } from "@/lib/mock/data";

export function NovoCompromissoSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const corretores = useApp((s) => s.corretores);
  const clientes = useApp((s) => s.clientes);
  const imoveis = useApp((s) => s.imoveis);
  const add = useApp((s) => s.addCompromisso);

  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState<Compromisso["tipo"]>("Visita");
  const [data, setData] = useState(new Date().toISOString().slice(0, 16));
  const [duracaoMin, setDuracao] = useState(60);
  const [corretorId, setCorretorId] = useState(corretores[0]?.id ?? "");
  const [clienteId, setClienteId] = useState(clientes[0]?.id ?? "");
  const [imovelId, setImovelId] = useState(imoveis[0]?.id ?? "");
  const [local, setLocal] = useState("");
  const [status, setStatus] = useState<Compromisso["status"]>("Agendado");
  const [observacoes, setObservacoes] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const cor = corretores.find((c) => c.id === corretorId);
    if (!cor || !titulo.trim()) return;
    add({
      titulo,
      tipo,
      data: new Date(data).toISOString(),
      duracaoMin,
      corretorId,
      clienteId,
      imovelId,
      imobiliaria: cor.imobiliaria as AgencyId,
      local,
      status,
      observacoes,
    });
    onOpenChange(false);
    setTitulo("");
    setLocal("");
    setObservacoes("");
  }

  return (
    <FormSheet open={open} onOpenChange={onOpenChange} title="Novo compromisso">
      <form onSubmit={submit} className="space-y-4">
        <Field label="Título">
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className={inputCls}
            required
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Tipo">
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value as Compromisso["tipo"])}
              className={inputCls}
            >
              {(
                ["Visita", "Reunião", "Vistoria", "Assinatura", "Retorno", "Captação"] as const
              ).map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Duração (min)">
            <input
              type="number"
              value={duracaoMin}
              onChange={(e) => setDuracao(Number(e.target.value))}
              className={inputCls}
            />
          </Field>
        </div>
        <Field label="Data e hora">
          <input
            type="datetime-local"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className={inputCls}
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Local">
            <input
              value={local}
              onChange={(e) => setLocal(e.target.value)}
              className={inputCls}
              placeholder="Endereço ou videochamada"
            />
          </Field>
          <Field label="Status">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Compromisso["status"])}
              className={inputCls}
            >
              <option>Agendado</option>
              <option>Confirmado</option>
              <option>Concluído</option>
              <option>Cancelado</option>
            </select>
          </Field>
        </div>
        <Field label="Corretor">
          <select
            value={corretorId}
            onChange={(e) => setCorretorId(e.target.value)}
            className={inputCls}
          >
            {corretores.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Cliente">
          <select
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
            className={inputCls}
          >
            {clientes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Imóvel">
          <select
            value={imovelId}
            onChange={(e) => setImovelId(e.target.value)}
            className={inputCls}
          >
            {imoveis.map((i) => (
              <option key={i.id} value={i.id}>
                {i.titulo}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Observações">
          <textarea
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            rows={3}
            className={inputCls}
            placeholder="Checklist, documentos e contexto do atendimento..."
          />
        </Field>
        <button type="submit" className={submitCls}>
          Salvar compromisso
        </button>
      </form>
    </FormSheet>
  );
}
