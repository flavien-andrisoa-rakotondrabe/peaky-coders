import type { LucideIcon } from 'lucide-react';

import type { TextareaHTMLAttributes, ChangeEvent } from 'react';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface FormTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    name: string;
    error?: string;
    icon?: LucideIcon;
    clearError?: (name: any) => void;
    setData: (name: any, value: any) => void;
    edit?: boolean;
    maxLength?: number;
}

export const FormTextArea = ({
    label,
    name,
    error,
    icon: Icon,
    placeholder,
    value,
    setData,
    clearError,
    edit = true,
    maxLength,
    className,
    ...props
}: FormTextAreaProps) => {
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setData(name, e.target.value);

        if (error && clearError) {
            clearError(name);
        }
    };

    const currentLength = ((value as string) || '').length;

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
                {Icon && (
                    <Icon className="absolute top-5 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                )}

                <Textarea
                    {...props}
                    id={name}
                    name={name}
                    value={value || ''}
                    placeholder={placeholder}
                    disabled={!edit}
                    onChange={handleChange}
                    aria-invalid={!!error}
                    className={cn(
                        'font-body resize-none rounded-xl border-border bg-muted/30 px-4 py-3 ring-ring ring-offset-2 transition-colors focus-visible:border-border/50 focus-visible:bg-card focus-visible:ring-2',
                        Icon && 'pl-10',
                        error &&
                            'border-destructive focus-visible:ring-destructive',
                        className,
                    )}
                />
            </div>

            {/* Zone Error + Counter */}
            <div className="mt-1 flex items-start justify-between gap-4">
                <div className="flex-1">
                    {error && <FieldError className="mt-0">{error}</FieldError>}
                </div>

                {maxLength && (
                    <p
                        className={cn(
                            'font-body text-xs tabular-nums transition-colors',
                            currentLength >= maxLength
                                ? 'font-bold text-destructive'
                                : 'text-muted-foreground',
                        )}
                    >
                        {currentLength}/{maxLength}
                    </p>
                )}
            </div>
        </Field>
    );
};
