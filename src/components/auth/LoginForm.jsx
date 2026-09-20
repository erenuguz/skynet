import useLogin from '@/hooks/useLogin';
import './LoginForm.css';

export default function LoginForm() {
    const {login, isSubmitting} = useLogin();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        await login(
            String(formData.get('email') ?? ''),
            String(formData.get('password') ?? '')
        );
    };

    return (
        <form
            className="login-form"
            onSubmit={handleSubmit}
            aria-busy={isSubmitting}
        >
            <div className="login-form__field">
                <label className="login-form__label" htmlFor="login-email">
                    E-posta
                </label>

                <input
                    className="login-form__input"
                    id="login-email"
                    name="email"
                    type="email"
                    placeholder="E-posta adresin"
                    autoComplete="username"
                    autoCapitalize="none"
                    spellCheck={false}
                    disabled={isSubmitting}
                    required
                />
            </div>

            <div className="login-form__field">
                <label className="login-form__label" htmlFor="login-password">
                    Şifre
                </label>

                <input
                    className="login-form__input"
                    id="login-password"
                    name="password"
                    type="password"
                    placeholder="Şifren"
                    autoComplete="current-password"
                    disabled={isSubmitting}
                    required
                />
            </div>

            <button
                className="login-form__submit"
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Giriş yapılıyor…' : 'Giriş Yap'}
            </button>
        </form>
    );
}
