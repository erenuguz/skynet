import {useState} from 'react';
import {signOut} from 'firebase/auth';
import {auth} from '@/firebase';
import useToast from '@/hooks/useToast';

export default function useLogout() {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const {showError} = useToast();

    const logout = async () => {
        if (isLoggingOut) return;

        setIsLoggingOut(true);

        try {
            await signOut(auth);
        } catch {
            showError('Çıkış yapılamadı. Lütfen tekrar dene.');
            setIsLoggingOut(false);
        }
    };

    return {logout, isLoggingOut};
}
