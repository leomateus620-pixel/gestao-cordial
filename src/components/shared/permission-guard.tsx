import type { ReactNode } from "react";
import { ShieldAlert } from "lucide-react";
import { EmptyState } from "./empty-state";

export function PermissionGuard({
  allowed,
  children,
  fallback,
}: {
  allowed: boolean;
  children: ReactNode;
  fallback?: ReactNode;
}) {
  if (allowed) return <>{children}</>;

  return (
    <>
      {fallback ?? (
        <EmptyState
          icon={<ShieldAlert className="size-5" />}
          title="Acesso restrito"
          description="Você não tem permissão para visualizar este conteúdo."
        />
      )}
    </>
  );
}
