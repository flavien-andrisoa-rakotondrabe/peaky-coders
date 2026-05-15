"use client";

import Image from "next/image";
import Link from "next/link";
import Button3DV2 from "@/components/utils/Button3DV2";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { FormInput } from "@/components/utils/FormInput";
import { Separator } from "@/components/ui/separator";
import { FormCheckbox } from "@/components/utils/FormCheckbox";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { useDispatch } from "react-redux";

// 1. Définition du schéma de validation avec Zod
const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string(),
  remember: z.boolean(),
});

// Typage TypeScript extrait du schéma
type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm({
  onSwitchToSignup,
}: {
  onSwitchToSignup: () => void;
}) {
  const router = useRouter();
  const { refreshUser } = useAuth();

  const [showPwd, setShowPwd] = useState(false);

  // 2. Initialisation de React Hook Form
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  // 3. Gestion de la soumission
  const onSubmit = async (values: LoginFormValues) => {
    try {
      await api.get("/sanctum/csrf-cookie");

      const res = await api.post("/api/auth/login", values);

      if (res.status === 201 || res.status === 200) {
        toast.success("Connexion réussie !");

        await refreshUser();

        router.push("/home");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        setError("email", { message: "Informations non valides." });
      } else {
        toast.error("Une erreur inattendue est survenue.");
      }
    } finally {
    }
  };

  const facebookOAuth = () => {
    const redirectUri = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/facebook/redirect`;

    window.location.href = redirectUri;
  };

  const googleOAuth = () => {
    const redirectUri = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/redirect`;

    window.location.href = redirectUri;
  };

  return (
    <div className="space-y-5">
      <div className="mb-6 space-y-1">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Connexion
        </h1>
        <p className="font-body text-sm text-muted-foreground">
          Pas encore de compte ?{" "}
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="cursor-pointer font-semibold text-accent hover:underline"
          >
            Créer un compte
          </button>
        </p>
      </div>

      <div className="flex flex-col gap-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FieldGroup>
            {/* Email */}
            <FormInput
              label="Email"
              type="email"
              icon={Mail}
              placeholder="email@domain.com"
              autoComplete="email"
              error={errors.email?.message}
              {...register("email")}
            />

            {/* Mot de passe */}
            <FormInput
              label="Mot de passe"
              type={showPwd ? "text" : "password"}
              icon={Lock}
              placeholder="Mot de passe"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register("password")}
              labelAction={
                <Link
                  href="/forgot-password"
                  className="font-body text-xs text-accent hover:underline"
                >
                  Mot de passe oublié ?
                </Link>
              }
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

            {/* Se souvenir de moi */}
            <FormCheckbox
              name="remember"
              label="Se souvenir de moi"
              control={control}
            />
          </FieldGroup>

          <Button3DV2
            type="submit"
            disabled={isSubmitting}
            label={isSubmitting ? "Connexion..." : "Se connecter"}
            fullWidth
            breakpoints={[{ tw: "sm", width: 120, height: 48, fontSize: 16 }]}
          />
        </form>

        <div className="relative flex items-center justify-center">
          <Separator />
          <p className="absolute flex h-8 w-8 items-center justify-center rounded-full bg-background text-center text-xs font-semibold text-muted-foreground uppercase">
            ou
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            size="lg"
            variant="outline"
            className="flex h-12 w-full items-center justify-center gap-3 cursor-pointer hover:bg-foreground/10"
            onClick={facebookOAuth}
          >
            <Image
              src="/icons/facebook.webp"
              alt="F"
              height={32}
              width={32}
              className="h-8 w-8"
            />

            <span>Continuer avec Facebook</span>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="flex h-12 w-full items-center justify-center gap-3 cursor-pointer hover:bg-foreground/10"
            onClick={googleOAuth}
          >
            <Image
              src="/icons/google.svg"
              alt="G"
              height={20}
              width={20}
              className="h-5 w-5"
            />

            <span>Continuer avec Google</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
