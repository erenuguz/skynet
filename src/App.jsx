import LoadingScreen from '@/components/ui/loading/LoadingScreen';
import useAuthUser from '@/hooks/useAuthUser';
import HomePage from '@/pages/home/HomePage';
import LoginPage from '@/pages/login/LoginPage';

export default function App() {
    const {user, isLoading} = useAuthUser();

    if (isLoading) {
        return <LoadingScreen />;
    }

    return user ? <HomePage user={user} /> : <LoginPage />;
}
