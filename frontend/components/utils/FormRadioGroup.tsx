import { Badge } from '@/components/ui/badge';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

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
    value: string;
    setData: (name: any, value: any) => void;
    error?: string;
    clearError?: (name: any) => void;
    edit?: boolean;
    className?: string;
}

export const FormRadioGroup = ({
    label,
    name,
    options,
    value,
    setData,
    error,
    clearError,
    edit = true,
    className,
}: FormRadioGroupProps) => {
    return (
        <Field
            className={cn(edit ? '' : 'pointer-events-none cursor-not-allowed')}
        >
            <FieldLabel
                className={cn(
                    'font-body text-xs font-semibold tracking-wide text-muted-foreground uppercase',
                    error && 'text-destructive',
                )}
            >
                {label}
            </FieldLabel>

            <div className="relative mt-1">
                <RadioGroup
                    disabled={!edit}
                    className={cn('grid gap-4', className)}
                    value={value || ''}
                    onValueChange={(val) => {
                        setData(name, val);

                        if (error && clearError) {
                            clearError(name);
                        }
                    }}
                >
                    {options.map((item) => {
                        const isSelected = value === item.value;
                        const active = item.active ?? true;

                        return (
                            <FieldLabel
                                key={`${name}-${item.value}`}
                                htmlFor={item.value}
                                className={cn(
                                    'rounded-xl border border-foreground/10 p-2 transition-colors',
                                    isSelected
                                        ? 'border-background! bg-accent! text-white'
                                        : [
                                              'cursor-pointer',
                                              edit && 'hover:bg-muted/30',
                                          ],
                                    !active && 'pointer-events-none opacity-50',
                                )}
                            >
                                <Field
                                    orientation="horizontal"
                                    className={cn(
                                        'items-center gap-3',
                                        item.description && 'items-start',
                                    )}
                                >
                                    <RadioGroupItem
                                        id={item.value}
                                        disabled={!active}
                                        value={item.value}
                                        className={cn(
                                            'mt-1 border-foreground/10 data-checked:border-white data-checked:bg-accent',
                                            isSelected ? '' : 'cursor-pointer',
                                        )}
                                    />
                                    <div className="relative flex flex-1 flex-col gap-1">
                                        <Label
                                            htmlFor={item.value}
                                            className={cn(
                                                'font-semibold',
                                                isSelected
                                                    ? ''
                                                    : 'cursor-pointer',
                                                !edit && 'opacity-50',
                                            )}
                                        >
                                            {item.label}
                                        </Label>
                                        {item?.description && (
                                            <span
                                                className={cn(
                                                    'text-xs leading-tight font-normal',
                                                    isSelected
                                                        ? 'text-white/80'
                                                        : 'text-muted-foreground',
                                                )}
                                            >
                                                {item.description}
                                            </span>
                                        )}

                                        {!active && (
                                            <Badge className="font-body border-0 bg-muted text-xs text-muted-foreground">
                                                Bientôt
                                            </Badge>
                                        )}
                                    </div>
                                </Field>
                            </FieldLabel>
                        );
                    })}
                </RadioGroup>
            </div>
            <FieldError>{error}</FieldError>
        </Field>
    );
};
