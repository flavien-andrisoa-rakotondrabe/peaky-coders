<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 8px;
            padding: 40px;
        }

        .header {
            text-align: center;
            margin-bottom: 32px;
        }

        .header h1 {
            color: #1a1a1a;
            font-size: 24px;
            margin: 0;
        }

        p {
            color: #444;
            line-height: 1.6;
        }

        .footer {
            margin-top: 40px;
            text-align: center;
            color: #999;
            font-size: 12px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <img src="{{ $message->embed(public_path('images/logo.png')) }}" alt="{{ config('app.name') }}" width="150"
                style="display: block; margin: 0 auto 16px;">
            <h1>Bienvenue sur Mada Smart !</h1>
        </div>

        <p>Bonjour {{ $user->first_name }},</p>

        <p>
            Votre compte a bien été créé. Nous sommes ravis de vous accueillir sur
            <strong>Mada Smart</strong>.
        </p>

        <p>
            Vous pouvez dès maintenant vous connecter et profiter de toutes les fonctionnalités
            de la plateforme.
        </p>

        <p>À bientôt,<br>L'équipe Mada Smart</p>

        <div class="footer">
            Cet email a été envoyé automatiquement, merci de ne pas y répondre.
        </div>
    </div>
</body>

</html>
