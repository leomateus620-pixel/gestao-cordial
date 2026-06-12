import { Menu } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LiquidButton } from "./liquid-button";
import { moduleItems } from "./module-menu";
import { SidebarMenu } from "./sidebar-menu";

export function MobileDrawer({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <LiquidButton variant="glass" size="icon" aria-label="Abrir módulos">
          <Menu className="size-4" />
        </LiquidButton>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[86%] max-w-[360px] border-white/60 bg-background/80 p-5 backdrop-blur-2xl"
      >
        <SheetHeader className="mb-4 text-left">
          <SheetTitle className="text-base">Módulos</SheetTitle>
          <SheetDescription>Acesse as áreas da Gestão Cordial.</SheetDescription>
        </SheetHeader>
        <SidebarMenu
          pathname={pathname}
          items={moduleItems}
          variant="list"
          onNavigate={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
}
