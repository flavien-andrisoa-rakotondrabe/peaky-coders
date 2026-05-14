import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface SelectOption {
    label: string;
    value: string;
}

interface FormSelectProps {
    label: string;
    name: string;
    options: SelectOption[];
    value: string;
    setData: (name: any, value: any) => void;
    error?: string;
    clearError?: (name?: any) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}

export const FormSelect = ({
    label,
    name,
    options,
    value,
    setData,
    error,
    clearError,
    placeholder = 'Sélectionner...',
    disabled,
    className,
}: FormSelectProps) => {
    return (
        <Field>
            <FieldLabel
                htmlFor={name}
                className={cn(
                    'font-body text-xs font-semibold tracking-wide text-muted-foreground uppercase',
                    error && 'text-destructive',
                )}
            >
                {label}
            </FieldLabel>

            <div className="relative mt-1">
                <Select
                    disabled={disabled}
                    value={value}
                    onValueChange={(val) => {
                        setData(name, val);

                        if (error && clearError) {
                            clearError(name);
                        }
                    }}
                >
                    <SelectTrigger
                        id={name}
                        className={cn(
                            'font-body min-h-12 w-full rounded-xl border-border bg-muted/30 px-4 ring-ring ring-offset-2 transition-colors focus:ring-2',
                            error &&
                                'border-destructive focus:ring-destructive',
                            className,
                        )}
                    >
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>

                    <SelectContent
                        position="popper"
                        align="start"
                        className="w-[calc(100%-1rem)] p-2"
                    >
                        {options.map((item) => (
                            <SelectItem
                                key={`${name}-${item.value}`}
                                value={item.value}
                                className="font-body w-[calc(100%-1rem)] cursor-pointer rounded-sm px-2 py-1.5"
                            >
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <FieldError>{error}</FieldError>
        </Field>
    );
};
