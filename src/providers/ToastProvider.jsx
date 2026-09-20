import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Toast from '@/components/ui/toast/Toast';
import {ToastContext} from '@/contexts/ToastContext';

const TOAST_DURATION = 4000;

export default function ToastProvider({children}) {
    const [toast, setToast] = useState(null);
    const nextToastId = useRef(0);

    const showToast = useCallback((message, type) => {
        nextToastId.current += 1;

        setToast({
            id: nextToastId.current,
            message,
            type,
        });
    }, []);

    const showSuccess = useCallback(
        (message) => {
            showToast(message, 'success');
        },
        [showToast]
    );

    const showError = useCallback(
        (message) => {
            showToast(message, 'error');
        },
        [showToast]
    );

    const dismiss = useCallback(() => {
        setToast(null);
    }, []);

    useEffect(() => {
        if (!toast) return undefined;

        const timeoutId = window.setTimeout(dismiss, TOAST_DURATION);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [toast, dismiss]);

    const contextValue = useMemo(
        () => ({
            showSuccess,
            showError,
            dismiss,
        }),
        [showSuccess, showError, dismiss]
    );

    return (
        <ToastContext.Provider value={contextValue}>
            {children}

            {toast && (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    onClose={dismiss}
                />
            )}
        </ToastContext.Provider>
    );
}
