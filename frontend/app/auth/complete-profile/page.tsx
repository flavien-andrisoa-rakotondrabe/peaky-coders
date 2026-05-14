"use client";

import Link from "next/link";
import { Eye, EyeOff, Lock, ArrowRight, User, Phone } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/utils/FormInput";
import Logo from "@/components/utils/Logo";

// 1. Schéma de validation
const completeProfileSchema = z
  .object({
    firstName: z.string().min(2, "Prénom requis"),
    lastName: z.string().min(2, "Nom requis"),
    tel: z.string().min(10, "Numéro de téléphone invalide"),
    password: z.string().min(6, "Minimum 6 caractères"),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Les mots de passe ne correspondent pas",
    path: ["password_confirmation"],
  });

type CompleteProfileValues = z.infer<typeof completeProfileSchema>;

interface Props {
  socialUser?: {
    firstName: string;
    lastName: string;
  };
}

export default function CompleteProfilePage({ socialUser }: Props) {
  const [showPwd, setShowPwd] = useState(false);

  // 2. React Hook Form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CompleteProfileValues>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      firstName: socialUser?.firstName || "",
      lastName: socialUser?.lastName || "",
      tel: "",
      password: "",
      password_confirmation: "",
      role: "client",
    },
  });

  const onSubmit = async (values: CompleteProfileValues) => {
    console.log("Submit profile:", values);
    // await fetch('/api/auth/complete-profile', { method: 'POST', body: JSON.stringify(values) });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-10 flex items-center gap-2">
          <Logo />
        </Link>

        <div className="flex flex-col gap-4">
          <div className="mb-5 space-y-1">
            <h1 className="font-display text-2xl font-bold text-foreground">
              Compléter mon profil
            </h1>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <FormInput
                label="Prénom"
                icon={User}
                placeholder="Jean"
                autoComplete="given-name"
                error={errors.firstName?.message}
                {...register("firstName")}
              />

              <FormInput
                label="Nom"
                icon={User}
                placeholder="Dupont"
                autoComplete="family-name"
                error={errors.lastName?.message}
                {...register("lastName")}
              />
            </div>

            <FormInput
              label="Téléphone"
              type="tel"
              icon={Phone}
              placeholder="+33 6 00 00 00 00"
              autoComplete="tel"
              error={errors.tel?.message}
              {...register("tel")}
            />

            <FormInput
              label="Mot de passe"
              type={showPwd ? "text" : "password"}
              icon={Lock}
              placeholder="Min. 6 caractères"
              autoComplete="new-password"
              error={errors.password?.message}
              {...register("password")}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {showPwd ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </button>
              }
            />

            <FormInput
              label="Confirmer mot de passe"
              type="password"
              icon={Lock}
              placeholder="Confirmez votre mot de passe"
              autoComplete="new-password"
              error={errors.password_confirmation?.message}
              {...register("password_confirmation")}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="font-body h-12 w-full gap-2 rounded-xl bg-gradient-coral text-base font-semibold text-white shadow-hero hover:opacity-90 disabled:opacity-50"
              size="lg"
            >
              {isSubmitting ? "Chargement..." : "Continuer"}
              {!isSubmitting && <ArrowRight className="h-4 w-4" />}
            </Button>
          </form>

          <p className="font-body mt-2 text-center text-xs text-muted-foreground px-4">
            En vous inscrivant, vous acceptez nos{" "}
            <Link href="/legal#cgu" className="text-accent hover:underline">
              CGU
            </Link>{" "}
            et notre{" "}
            <Link
              href="/confidentialite#cgu"
              className="text-accent hover:underline"
            >
              politique de confidentialité
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
