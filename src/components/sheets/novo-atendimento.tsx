import { AtendimentoFormModal } from "@/components/atendimentos/AtendimentoFormModal";
import { useApp } from "@/store/app-store";

/**
 * Compatibility wrapper for dashboard shortcuts that still use the historical sheet name.
 */
export function NovoAtendimentoSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const addAtendimento = useApp((state) => state.addAtendimento);

  return <AtendimentoFormModal open={open} onOpenChange={onOpenChange} onSubmit={addAtendimento} />;
}
