import { Link, useForm } from '@inertiajs/react';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Separator } from '@/components/ui/separator';
import { FormInput } from '@/components/utils/FormInput';
import { useLocale } from '@/hooks/useLocale';

export function LoginForm({
    onSwitchToSignup,
}: {
    onSwitchToSignup: () => void;
}) {
    const { locale } = useLocale();

    const [showPwd, setShowPwd] = useState(false);
    const [loadingOauth, setLoadingOauth] = useState<'google' | null>(null);

    const {
        post,
        data,
        setData,
        errors,
        hasErrors,
        clearErrors,
        processing,
        reset,
    } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        post(`/${locale}/auth/login`, {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <div className="space-y-5">
            <div className="mb-6 space-y-1">
                <h1 className="font-display text-2xl font-bold text-foreground">
                    Connexion
                </h1>
                <p className="font-body text-sm text-muted-foreground">
                    Pas encore de compte ?{' '}
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
                <form onSubmit={handleSubmit} className="space-y-5">
                    <FieldGroup>
                        <FormInput
                            label={'Email'}
                            name="email"
                            type="email"
                            icon={Mail}
                            value={data.email}
                            setData={setData}
                            error={errors.email}
                            clearError={clearErrors}
                            placeholder="jean@email.com"
                            autoComplete="email"
                            required
                        />

                        <FormInput
                            label="Mot de passe"
                            name="password"
                            type={showPwd ? 'text' : 'password'}
                            icon={Lock}
                            value={data.password}
                            setData={setData}
                            error={errors.password}
                            clearError={clearErrors}
                            placeholder="Mot de passe"
                            autoComplete="current-password"
                            required
                            labelAction={
                                <Link
                                    href={`/${locale}/auth/forgot-password`}
                                    className="font-body text-xs text-accent hover:underline"
                                >
                                    Mot de passe oublié ?
                                </Link>
                            }
                            rightElement={
                                <button
                                    type="button"
                                    onClick={() => setShowPwd(!showPwd)}
                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showPwd ? (
                                        <Eye className="h-4 w-4" />
                                    ) : (
                                        <EyeOff className="h-4 w-4" />
                                    )}
                                </button>
                            }
                        />

                        <Field orientation="horizontal">
                            <Checkbox
                                id="remember"
                                name="remember"
                                checked={data.remember}
                                onCheckedChange={(checked: boolean) =>
                                    setData('remember', checked)
                                }
                                className="cursor-pointer border-border bg-muted/30 data-[state=checked]:border-accent data-[state=checked]:bg-accent"
                            />
                            <FieldLabel
                                htmlFor="remember"
                                className="text-muted-foreground"
                            >
                                Se souvenir de moi
                            </FieldLabel>
                        </Field>
                    </FieldGroup>

                    <Button
                        type="submit"
                        disabled={processing || hasErrors}
                        className="font-body h-12 w-full gap-2 rounded-xl bg-gradient-coral text-base font-semibold text-white shadow-hero hover:opacity-90"
                        size="lg"
                    >
                        {processing ? 'Connexion...' : 'Se connecter'}
                        {!processing && <ArrowRight className="h-4 w-4" />}
                    </Button>
                </form>

                <div className="relative flex items-center justify-center">
                    <Separator />
                    <p className="absolute flex h-8 w-8 items-center justify-center rounded-full bg-background text-center text-xs font-semibold text-muted-foreground uppercase">
                        ou
                    </p>
                </div>

                <a
                    href="/auth/google/redirect"
                    onClick={() => setLoadingOauth('google')}
                >
                    <Button
                        size="lg"
                        variant="outline"
                        disabled={loadingOauth === 'google'}
                        className="flex h-12 w-full items-center justify-center gap-3"
                    >
                        <img
                            src="/icons/google.svg"
                            alt="G"
                            className="h-6 w-6"
                        />
                        <span>Continuer avec Google</span>
                    </Button>
                </a>
            </div>
        </div>
    );
}
