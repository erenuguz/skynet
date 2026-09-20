import useAuthUser from '@/hooks/useAuthUser';
import HomePage from '@/pages/home/HomePage';
import LoginPage from '@/pages/login/LoginPage';

export default function App() {
    const {user, isLoading} = useAuthUser();

    if (isLoading) {
        return (
            <main>
                <p role="status">Oturum kontrol ediliyor…</p>
            </main>
        );
    }

    return user ? <HomePage user={user} /> : <LoginPage />;
}
