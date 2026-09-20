import {useRef, useState} from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '@/firebase';
import useToast from '@/hooks/useToast';
import getAuthErrorMessage from '@/utils/getAuthErrorMessage';

export default function useLogin() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isPending = useRef(false);
    const {showError, dismiss} = useToast();

    const login = async (email, password) => {
        if (isPending.current) return;

        isPending.current = true;
        setIsSubmitting(true);
        dismiss();

        try {
            await signInWithEmailAndPassword(auth, email.trim(), password);
        } catch (error) {
            showError(getAuthErrorMessage(error.code));
        } finally {
            isPending.current = false;
            setIsSubmitting(false);
        }
    };

    return {login, isSubmitting};
}
