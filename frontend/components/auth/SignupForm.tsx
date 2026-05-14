import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { FormInput } from "@/components/utils/FormInput";
import Link from "next/link";
import Button3DV2 from "@/components/utils/Button3DV2";

// 1. Schéma de validation Zod
const signupSchema = z
  .object({
    firstName: z.string().min(2, "Prénom requis"),
    lastName: z.string().min(2, "Nom requis"),
    tel: z.string().min(10, "Numéro de téléphone invalide"),
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "Minimum 6 caractères"),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Les mots de passe ne correspondent pas",
    path: ["password_confirmation"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignupForm({
  onSwitchToLogin,
}: {
  onSwitchToLogin: () => void;
}) {
  const [showPwd, setShowPwd] = useState(false);

  // 2. Initialisation React Hook Form
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      tel: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  // 3. Action de soumission
  const onSubmit = async (values: SignupFormValues) => {
    // Simuler l'envoi ou utiliser Inertia post
    console.log("Données envoyées :", values);
    // Exemple Inertia : post(`/${locale}/auth/register`, values, { onSuccess: () => reset() });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="mb-5 space-y-1">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Créer un compte
        </h1>
        <p className="font-body text-sm text-muted-foreground">
          Déjà inscrit ?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="cursor-pointer font-semibold text-accent hover:underline"
          >
            Se connecter
          </button>
        </p>
      </div>

      {/* Ligne Prénom / Nom */}
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

      {/* Téléphone & Email */}
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
        label="Email"
        type="email"
        icon={Mail}
        placeholder="jean@email.com"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />

      {/* Mot de passe avec toggle visuel */}
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
            className="text-muted-foreground hover:text-foreground outline-none"
          >
            {showPwd ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </button>
        }
      />

      {/* Confirmation mot de passe */}
      <FormInput
        label="Confirmer mot de passe"
        type="password"
        icon={Lock}
        placeholder="Confirmez votre mot de passe"
        autoComplete="new-password"
        error={errors.password_confirmation?.message}
        {...register("password_confirmation")}
      />

      {/* Bouton de soumission */}
      <Button3DV2
        type="submit"
        disabled={isSubmitting}
        label={isSubmitting ? "Inscription..." : "S'inscrire"}
        fullWidth
      />

      {/* Liens légaux */}
      <p className="font-body text-center text-xs text-muted-foreground px-4">
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
    </form>
  );
}
