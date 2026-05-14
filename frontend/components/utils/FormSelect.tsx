import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface SelectOption {
  label: string;
  value: string;
}

interface FormSelectProps {
  label: string;
  name: string;
  options: SelectOption[];
  value?: string; // Optionnel car géré par Controller
  onValueChange?: (value: string) => void; // Remplacer setData
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  onBlur?: () => void; // Pour la validation RHF au toucher
}

export const FormSelect = ({
  label,
  name,
  options,
  value,
  onValueChange,
  onBlur,
  error,
  placeholder = "Sélectionner...",
  disabled,
  className,
}: FormSelectProps) => {
  return (
    <Field>
      <FieldLabel
        htmlFor={name}
        className={cn(
          "font-body text-xs font-semibold tracking-wide text-muted-foreground uppercase",
          error && "text-destructive",
        )}
      >
        {label}
      </FieldLabel>

      <div className="relative mt-1">
        <Select disabled={disabled} value={value} onValueChange={onValueChange}>
          <SelectTrigger
            id={name}
            onBlur={onBlur}
            className={cn(
              "font-body min-h-12 w-full rounded-xl border-border bg-muted/30 px-4 ring-ring ring-offset-2 transition-colors focus:ring-2",
              error && "border-destructive focus:ring-destructive",
              className,
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>

          <SelectContent
            position="popper"
            align="start"
            className="w-[var(--radix-select-trigger-width)] p-2"
          >
            {options.map((item) => (
              <SelectItem
                key={`${name}-${item.value}`}
                value={item.value}
                className="font-body cursor-pointer rounded-sm px-2 py-1.5"
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
};
