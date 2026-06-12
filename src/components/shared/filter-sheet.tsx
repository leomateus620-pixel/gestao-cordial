import type { ReactNode } from "react";
import { SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LiquidButton } from "./liquid-button";

export function FilterSheet({
  title = "Filtros",
  description = "Refine os resultados exibidos.",
  children,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <LiquidButton variant="glass" size="sm">
          <SlidersHorizontal className="size-4" /> Filtrar
        </LiquidButton>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="rounded-t-[2rem] border-white/60 bg-background/90 p-5 backdrop-blur-2xl"
      >
        <SheetHeader className="mb-4 text-left">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}
