"use client";

import Link from "next/link";
import { Mail, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/utils/FormInput";
import Logo from "@/components/utils/Logo";
import Button3DV2 from "@/components/utils/Button3DV2";

// 1. Schéma de validation Zod
const forgotPasswordSchema = z.object({
  email: z.string().email("Veuillez entrer une adresse email valide"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  // 2. React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // 3. Soumission (API Next.js ou Server Action)
  const onSubmit = async (values: ForgotPasswordValues) => {
    try {
      // Remplace par ton appel API réel
      // const response = await fetch('/api/auth/forgot-password', { ... })
      console.log("Envoi à :", values.email);

      // Simuler un délai réseau
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSent(true);
    } catch (error) {
      console.error("Erreur d'envoi", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm">
        {/* Logo avec Link Next.js */}
        <div className="mb-10">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        {sent ? (
          /* État Succès */
          <div className="space-y-4 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10">
              <CheckCircle2 className="h-7 w-7 text-green-500" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              Email envoyé !
            </h2>
            <p className="font-body text-sm text-muted-foreground">
              Vérifiez votre boîte mail et cliquez sur le lien pour
              réinitialiser votre mot de passe.
            </p>
            <Link href="/auth" className="block">
              <Button
                size="lg"
                variant="outline"
                className="font-body mt-4 w-full cursor-pointer rounded-xl px-4"
              >
                Retour à la connexion
              </Button>
            </Link>
          </div>
        ) : (
          /* État Formulaire */
          <>
            <h1 className="font-display mb-1 text-3xl font-bold text-foreground">
              Mot de passe oublié
            </h1>
            <p className="font-body mb-8 text-sm text-muted-foreground">
              Entrez votre email, nous vous enverrons un lien de
              réinitialisation.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <FormInput
                label="Email"
                type="email"
                icon={Mail}
                placeholder="jean@email.com"
                autoComplete="email"
                error={errors.email?.message}
                {...register("email")}
              />

              <Button3DV2
                type="submit"
                disabled={isSubmitting}
                label={isSubmitting ? "Envoi en cours..." : "Envoyer le lien"}
                fullWidth
                breakpoints={[
                  { tw: "sm", width: 80, height: 48, fontSize: 16 },
                ]}
              />
            </form>

            <div className="mt-5 text-center">
              <Link
                href="/auth"
                className="font-body text-sm text-accent hover:underline"
              >
                Retour à la connexion
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
