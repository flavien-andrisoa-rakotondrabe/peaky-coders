import { Link, useForm } from '@inertiajs/react';
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    ArrowRight,
    CheckCircle2,
    User,
    Phone,
} from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/utils/FormInput';
import { useLocale } from '@/hooks/useLocale';
import { USER_ROLES } from '@/lib/constants/user';
import { cn } from '@/lib/utils';

export function SignupForm({
    onSwitchToLogin,
}: {
    onSwitchToLogin: () => void;
}) {
    const { locale } = useLocale();

    const [showPwd, setShowPwd] = useState(false);

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
        firstName: '',
        lastName: '',
        tel: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: USER_ROLES[0].value,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        post(`/${locale}/auth/register`, {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-5 space-y-1">
                <h1 className="font-display text-2xl font-bold text-foreground">
                    Créer un compte
                </h1>
                <p className="font-body text-sm text-muted-foreground">
                    Déjà inscrit ?{' '}
                    <button
                        type="button"
                        onClick={onSwitchToLogin}
                        className="cursor-pointer font-semibold text-accent hover:underline"
                    >
                        Se connecter
                    </button>
                </p>
            </div>

            {/* Role selector */}
            <div className="grid grid-cols-2 gap-3">
                {USER_ROLES.map((item) => (
                    <button
                        key={`role-${item.value}`}
                        type="button"
                        onClick={() => setData('role', item.value)}
                        className={cn(
                            'relative flex flex-col items-start gap-1.5 rounded-2xl border-2 p-4 text-left transition-all',
                            data.role === item.value
                                ? 'border-accent bg-accent/5 shadow-card'
                                : 'border-border bg-card hover:border-accent/40',
                        )}
                    >
                        {data.role === item.value && (
                            <CheckCircle2 className="absolute top-2.5 right-2.5 h-4 w-4 text-accent" />
                        )}
                        <item.icon
                            className={cn(
                                'h-5 w-5',
                                data.role === item.value
                                    ? 'text-accent'
                                    : 'text-muted-foreground',
                            )}
                        />
                        <span
                            className={cn(
                                'font-body text-sm leading-tight font-semibold',
                                data.role === item.value
                                    ? 'text-accent'
                                    : 'text-foreground',
                            )}
                        >
                            {item.label}
                        </span>
                        <span className="font-body text-xs text-muted-foreground">
                            {item.desc}
                        </span>
                    </button>
                ))}
            </div>

            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
                <FormInput
                    label={'Prénom'}
                    name="firstName"
                    icon={User}
                    value={data.firstName}
                    setData={setData}
                    error={errors.firstName}
                    clearError={clearErrors}
                    placeholder="Jean"
                    autoComplete="given-name"
                    required
                />

                <FormInput
                    label={'Nom'}
                    name="lastName"
                    icon={User}
                    value={data.lastName}
                    setData={setData}
                    error={errors.lastName}
                    clearError={clearErrors}
                    placeholder="Dupont"
                    autoComplete="family-name"
                    required
                />
            </div>

            <FormInput
                label={'Téléphone'}
                name="tel"
                type="tel"
                icon={Phone}
                value={data.tel}
                setData={setData}
                error={errors.tel}
                clearError={clearErrors}
                placeholder="+33 6 00 00 00 00"
                autoComplete="tel"
                required
            />

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
                label={'Mot de passe'}
                name="password"
                type={showPwd ? 'text' : 'password'}
                icon={Lock}
                value={data.password}
                setData={setData}
                error={errors.password}
                clearError={clearErrors}
                placeholder="Min. 6 caractères"
                autoComplete="new-password"
                required
            >
                <button
                    type="button"
                    onClick={() => setShowPwd((prev) => !prev)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground"
                >
                    {showPwd ? (
                        <Eye className="h-4 w-4" />
                    ) : (
                        <EyeOff className="h-4 w-4" />
                    )}
                </button>
            </FormInput>

            <FormInput
                label="Confirmer mot de passe"
                name="password_confirmation"
                type="password"
                icon={Lock}
                value={data.password_confirmation}
                setData={setData}
                error={errors.password_confirmation}
                clearError={clearErrors}
                placeholder="Min. 6 caractères"
                autoComplete="new-password"
                required
                onChange={(e) => {
                    setData('password_confirmation', e.target.value);

                    if (errors.password || errors.password_confirmation) {
                        clearErrors('password', 'password_confirmation');
                    }
                }}
            />

            <Button
                type="submit"
                disabled={processing || hasErrors}
                className="font-body h-12 w-full gap-2 rounded-xl bg-gradient-coral text-base font-semibold text-white shadow-hero hover:opacity-90"
                size="lg"
            >
                {processing ? 'Création du compte...' : 'Créer mon compte'}
                {!processing && <ArrowRight className="h-4 w-4" />}
            </Button>

            <p className="font-body text-center text-xs text-muted-foreground">
                En vous inscrivant, vous acceptez nos{' '}
                <Link
                    href={`/${locale}/legal#cgu`}
                    className="text-accent hover:underline"
                >
                    CGU
                </Link>{' '}
                et notre{' '}
                <Link
                    href={`/${locale}/confidentialite#cgu`}
                    className="text-accent hover:underline"
                >
                    politique de confidentialité
                </Link>
                .
            </p>
        </form>
    );
}
