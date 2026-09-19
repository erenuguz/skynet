import LoginForm from '@/components/auth/LoginForm';
import './LoginPage.css';

export default function LoginPage() {
    return (
        <main className="login-page">
            <section className="login-card" aria-labelledby="login-title">
                <header className="login-card__header">
                    <h1 className="login-card__title" id="login-title">
                        Skynet
                    </h1>

                    <p className="login-card__description">
                        Kişisel bilgi alanına giriş yap.
                    </p>
                </header>

                <LoginForm />
            </section>
        </main>
    );
}
