import type { LucideIcon } from "lucide-react";
import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// On simplifie les Props : plus besoin de setData ou clearError
interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
  icon?: LucideIcon;
  rightElement?: ReactNode;
  labelAction?: ReactNode;
  edit?: boolean;
}

// Utilisation de forwardRef pour que RHF puisse piloter l'input
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      name,
      error,
      icon: Icon,
      placeholder,
      labelAction,
      rightElement,
      edit = true,
      className,
      type = "text",
      children,
      ...props
    },
    ref,
  ) => {
    // On unifie ce qui s'affiche à droite de l'input
    const contentRight = rightElement || children;

    return (
      <Field orientation="vertical">
        <div className="mb-1 flex items-center justify-between gap-2">
          <FieldLabel
            htmlFor={name}
            className={cn(
              "font-body text-xs font-semibold tracking-wide text-muted-foreground uppercase",
              error && "text-destructive",
            )}
          >
            {label}
          </FieldLabel>
          {labelAction && <div className="shrink-0">{labelAction}</div>}
        </div>

        <div className="relative">
          {Icon && (
            <Icon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          )}

          <Input
            {...props}
            id={name}
            name={name}
            type={type}
            ref={ref} // CRUCIAL : on passe la ref ici
            disabled={!edit}
            aria-invalid={!!error}
            className={cn(
              "font-body h-12 rounded-xl border-border bg-muted/30 px-4 ring-ring ring-offset-2 transition-colors focus-visible:border-border/50 focus-visible:bg-card focus-visible:ring-2",
              Icon && "pl-10",
              contentRight && "pr-10",
              error && "border-destructive focus-visible:ring-destructive",
              className,
            )}
          />

          {contentRight && (
            <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center">
              {contentRight}
            </div>
          )}
        </div>

        {error && <FieldError>{error}</FieldError>}
      </Field>
    );
  },
);

FormInput.displayName = "FormInput";
