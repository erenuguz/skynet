import {useEffect, useState} from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '@/firebase';

export default function useAuthUser() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsLoading(false);
        });

        return unsubscribe;
    }, []);

    return {user, isLoading};
}
