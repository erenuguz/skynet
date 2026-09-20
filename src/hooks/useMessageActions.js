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
    const {showError} = useToast();

    const runAction = async (action, errorMessage) => {
        if (isPending.current) return false;

        isPending.current = true;
        setIsProcessing(true);

        try {
            await action();
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
        return runAction(async () => {
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
        }, 'Mesaj gönderilemedi.');
    };

    const updateMessage = async (messageId, text) => {
        return runAction(async () => {
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
        }, 'Mesaj güncellenemedi.');
    };

    const deleteMessage = async (messageId) => {
        return runAction(async () => {
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
        }, 'Mesaj silinemedi.');
    };

    return {
        createMessage,
        updateMessage,
        deleteMessage,
        isProcessing,
    };
}
