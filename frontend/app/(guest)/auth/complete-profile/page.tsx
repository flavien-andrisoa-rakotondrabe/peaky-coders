"use client";

import Link from "next/link";
import { Eye, EyeOff, Lock, User, Phone, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { FormInput } from "@/components/utils/FormInput";
import Logo from "@/components/utils/Logo";
import Button3DV2 from "@/components/utils/Button3DV2";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/providers/AuthProvider";

// 1. Schéma de validation
const completeProfileSchema = z
  .object({
    first_name: z.string().min(2, "Prénom requis"),
    last_name: z.string().min(2, "Nom requis"),
    email: z.string().email("Email invalide"),
    phone: z.string().min(10, "Numéro de téléphone invalide"),
    password: z.string().min(6, "Minimum 6 caractères"),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Les mots de passe ne correspondent pas",
    path: ["password_confirmation"],
  });

type CompleteProfileValues = z.infer<typeof completeProfileSchema>;
interface SocialUserInterface {
  email: string | null;
  last_name: string | null;
  first_name: string | null;
  avatar: string | null;
}

export default function CompleteProfilePage() {
  const router = useRouter();
  const { refreshUser } = useAuth();

  const [showPwd, setShowPwd] = useState(false);

  const [socialUser, setSocialUser] = useState<SocialUserInterface | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CompleteProfileValues>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
    },
  });

  useEffect(() => {
    const fetchSocial = async () => {
      try {
        const { data } = await api.get("/api/auth/social/me");

        if (!data) {
          router.push("/auth");
          return;
        }

        reset({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
          phone: "",
          password: "",
          password_confirmation: "",
        });

        setSocialUser(data);
      } catch {
        router.push("/auth");
      }
    };

    fetchSocial();
  }, [router, reset]);

  const onSubmit = async (values: CompleteProfileValues) => {
    try {
      await api.get("/sanctum/csrf-cookie");

      const res = await api.post("/api/auth/complete-profile", values);

      if (res.status === 200 || res.status === 201) {
        toast.success("Profil complété !");

        await refreshUser();

        router.push("/home");
      }
    } catch (error: any) {
      // Validation Laravel (422)
      if (error.response?.status === 422) {
        toast.error("Données invalides. Vérifier le formulaire.");
        return;
      }

      // Non autorisé / session expirée
      if (error.response?.status === 401) {
        toast.error("Session expirée. Reconnecte-toi.");
        router.push("/auth");
        return;
      }

      // Cas social cookie expiré (ton backend)
      if (error.response?.status === 404) {
        toast.error("Session sociale introuvable.");
        router.push("/auth");
        return;
      }

      // Erreur générique
      toast.error("Une erreur inattendue est survenue.");
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-sm">
        <div className="mb-10">
          <Link href="/">
            <Logo />
          </Link>
        </div>

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
                placeholder="Votre prénom"
                autoComplete="given-name"
                error={errors.first_name?.message}
                {...register("first_name")}
              />

              <FormInput
                label="Nom"
                icon={User}
                placeholder="Votre nom"
                autoComplete="family-name"
                error={errors.last_name?.message}
                {...register("last_name")}
              />
            </div>

            <FormInput
              label="Téléphone"
              type="tel"
              icon={Phone}
              placeholder="+33 6 00 00 00 00"
              autoComplete="tel"
              error={errors.phone?.message}
              {...register("phone")}
            />

            {!socialUser?.email && (
              <FormInput
                label="Email"
                type="email"
                icon={Mail}
                placeholder="email@domain.com"
                autoComplete="email"
                error={errors.email?.message}
                {...register("email")}
              />
            )}

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

            <Button3DV2
              type="submit"
              disabled={isSubmitting}
              label={isSubmitting ? "Accès..." : "Continuer"}
              fullWidth
              breakpoints={[{ tw: "sm", width: 80, height: 48, fontSize: 16 }]}
            />
          </form>

          <p className="font-body mt-2 text-center text-xs text-muted-foreground px-4">
            En continuant, vous acceptez nos{" "}
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
