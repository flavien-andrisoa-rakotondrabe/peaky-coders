import { SearchX } from "lucide-react";
import Link from "next/link";
import Button3DV2 from "@/components/utils/Button3DV2";
import BigLogo from "@/components/utils/BigLogo";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm">
        <BigLogo />

        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
            <SearchX className="h-7 w-7 text-accent" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground">
            404
          </h2>
          <p className="font-body text-sm text-muted-foreground">
            Cette page n'existe pas !<br /> Pour revenir à la page d'acceuil,
            cliquez sur le bouton suivant:
          </p>
          <Link href="/">
            <Button3DV2
              label={"Revenir à l'acceuil"}
              breakpoints={[{ tw: "sm", width: 260, height: 48, fontSize: 16 }]}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
