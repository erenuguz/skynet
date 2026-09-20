import {useState} from 'react';
import {ToastContext} from '@/contexts/ToastContext';
import Toast from '@/components/ui/toast/Toast';

export default function ToastProvider({children}) {
    const [toast, setToast] = useState(null);

    const showError = (message) => {
        setToast({message});
    };

    const dismiss = () => {
        setToast(null);
    };

    return (
        <ToastContext.Provider value={{showError, dismiss}}>
            {children}

            {toast && <Toast message={toast.message} onClose={dismiss} />}
        </ToastContext.Provider>
    );
}
