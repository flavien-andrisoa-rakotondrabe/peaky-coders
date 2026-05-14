import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";

/**
 * T extends FieldValues permet au composant d'accepter n'importe quelle
 * structure de formulaire définie dans ton useForm.
 */
interface FormCheckboxProps<T extends FieldValues> {
  name: Path<T>; // Garantit que le name existe dans le schéma du formulaire
  label: string;
  control: Control<T>; // Le moteur de contrôle typé
  disabled?: boolean;
  className?: string;
}

export const FormCheckbox = <T extends FieldValues>({
  name,
  label,
  control,
  disabled,
  className,
}: FormCheckboxProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Field
          orientation="horizontal"
          className={cn("flex items-center gap-2", className)}
        >
          <Checkbox
            id={name}
            // field.value peut être undefined au chargement, on force le booléen
            checked={!!field.value}
            onCheckedChange={field.onChange}
            onBlur={field.onBlur}
            disabled={disabled}
            className={cn(
              "cursor-pointer border-border bg-muted/30 transition-colors",
              "data-[state=checked]:border-accent data-[state=checked]:bg-accent data-[state=checked]:text-white",
            )}
          />
          <FieldLabel
            htmlFor={name}
            className={cn(
              "cursor-pointer text-sm font-medium leading-none text-muted-foreground transition-colors hover:text-foreground",
              disabled && "cursor-not-allowed opacity-50",
            )}
          >
            {label}
          </FieldLabel>
        </Field>
      )}
    />
  );
};

// Optionnel : pour le debugging dans React DevTools
FormCheckbox.displayName = "FormCheckbox";
