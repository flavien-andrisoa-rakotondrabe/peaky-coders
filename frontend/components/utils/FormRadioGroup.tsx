import { Badge } from "@/components/ui/badge";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface RadioOption {
  label: string;
  value: string;
  description?: string;
  active?: boolean;
}

interface FormRadioGroupProps {
  label: string;
  name: string;
  options: RadioOption[];
  value?: string;
  onValueChange?: (value: string) => void; // Remplace setData
  error?: string;
  edit?: boolean;
  className?: string;
  onBlur?: () => void;
}

export const FormRadioGroup = ({
  label,
  name,
  options,
  value,
  onValueChange,
  onBlur,
  error,
  edit = true,
  className,
}: FormRadioGroupProps) => {
  return (
    <Field className={cn(!edit && "pointer-events-none cursor-not-allowed")}>
      <FieldLabel
        className={cn(
          "font-body text-xs font-semibold tracking-wide text-muted-foreground uppercase",
          error && "text-destructive",
        )}
      >
        {label}
      </FieldLabel>

      <div className="relative mt-1">
        <RadioGroup
          disabled={!edit}
          className={cn("grid gap-4", className)}
          value={value || ""}
          onValueChange={onValueChange}
          onBlur={onBlur}
        >
          {options.map((item) => {
            const isSelected = value === item.value;
            const active = item.active ?? true;

            return (
              <FieldLabel
                key={`${name}-${item.value}`}
                htmlFor={`${name}-${item.value}`}
                className={cn(
                  "rounded-xl border border-foreground/10 p-2 transition-colors",
                  isSelected
                    ? "border-green-500 bg-primary text-primary-foreground" // bg-primary au lieu de bg-accent! pour suivre shadcn
                    : ["cursor-pointer", edit && "hover:bg-muted/30"],
                  !active && "pointer-events-none opacity-50",
                )}
              >
                <Field
                  orientation="horizontal"
                  className={cn(
                    "items-center gap-3",
                    item.description && "items-start",
                  )}
                >
                  <RadioGroupItem
                    id={`${name}-${item.value}`}
                    disabled={!active}
                    value={item.value}
                    className={cn(
                      "mt-1 border-foreground/10 data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500 data-[state=checked]:text-green-500",
                      isSelected
                        ? "border-green-500 data-[state=checked]:border-green-500"
                        : "cursor-pointer",
                    )}
                  />
                  <div className="relative flex flex-1 flex-col gap-1">
                    <Label
                      htmlFor={`${name}-${item.value}`}
                      className={cn(
                        "font-semibold",
                        isSelected ? "text-green-500" : "cursor-pointer",
                        !edit && "opacity-50",
                      )}
                    >
                      {item.label}
                    </Label>
                    {item.description && (
                      <span
                        className={cn(
                          "text-xs leading-tight font-normal",
                          isSelected ? "opacity-80" : "text-muted-foreground",
                        )}
                      >
                        {item.description}
                      </span>
                    )}

                    {!active && (
                      <div className="mt-1">
                        <Badge className="font-body border-0 bg-muted text-[10px] text-muted-foreground uppercase">
                          Bientôt
                        </Badge>
                      </div>
                    )}
                  </div>
                </Field>
              </FieldLabel>
            );
          })}
        </RadioGroup>
      </div>
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
};
