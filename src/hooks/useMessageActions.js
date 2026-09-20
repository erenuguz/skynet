import {useRef, useState} from 'react';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    serverTimestamp,
    updateDoc,
} from 'firebase/firestore';
import {db} from '@/firebase';
import useToast from '@/hooks/useToast';

export default function useMessageActions(userId, roomId) {
    const [isProcessing, setIsProcessing] = useState(false);
    const isPending = useRef(false);
    const {showSuccess, showError} = useToast();

    const runAction = async ({action, errorMessage, successMessage}) => {
        if (isPending.current) return false;

        isPending.current = true;
        setIsProcessing(true);

        try {
            await action();

            if (successMessage) {
                showSuccess(successMessage);
            }

            return true;
        } catch {
            showError(errorMessage);
            return false;
        } finally {
            isPending.current = false;
            setIsProcessing(false);
        }
    };

    const createMessage = async (text) => {
        return runAction({
            action: async () => {
                const messagesReference = collection(
                    db,
                    'users',
                    userId,
                    'rooms',
                    roomId,
                    'messages'
                );

                await addDoc(messagesReference, {
                    text,
                    createdAt: serverTimestamp(),
                    editedAt: null,
                });
            },
            errorMessage: 'Mesaj gönderilemedi.',
        });
    };

    const updateMessage = async (messageId, text) => {
        return runAction({
            action: async () => {
                const messageReference = doc(
                    db,
                    'users',
                    userId,
                    'rooms',
                    roomId,
                    'messages',
                    messageId
                );

                await updateDoc(messageReference, {
                    text,
                    editedAt: serverTimestamp(),
                });
            },
            successMessage: 'Mesaj güncellendi.',
            errorMessage: 'Mesaj güncellenemedi.',
        });
    };

    const deleteMessage = async (messageId) => {
        return runAction({
            action: async () => {
                const messageReference = doc(
                    db,
                    'users',
                    userId,
                    'rooms',
                    roomId,
                    'messages',
                    messageId
                );

                await deleteDoc(messageReference);
            },
            successMessage: 'Mesaj silindi.',
            errorMessage: 'Mesaj silinemedi.',
        });
    };

    return {
        createMessage,
        updateMessage,
        deleteMessage,
        isProcessing,
    };
}
