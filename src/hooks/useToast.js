import {useContext} from 'react';
import {ToastContext} from '@/contexts/ToastContext';

export default function useToast() {
    const context = useContext(ToastContext);

    if (context === null) {
        throw new Error('useToast, ToastProvider içinde kullanılmalıdır.');
    }

    return context;
}
