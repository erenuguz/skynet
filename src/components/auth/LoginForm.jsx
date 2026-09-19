import './LoginForm.css';

export default function LoginForm() {
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
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
                    required
                />
            </div>

            <button className="login-form__submit" type="submit">
                Giriş Yap
            </button>
        </form>
    );
}
