import {useRef, useState} from 'react';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    serverTimestamp,
    updateDoc,
    writeBatch,
} from 'firebase/firestore';
import {db} from '@/firebase';
import useToast from '@/hooks/useToast';

const DELETE_BATCH_SIZE = 400;

export default function useRoomActions(userId) {
    const [isProcessing, setIsProcessing] = useState(false);
    const isPending = useRef(false);
    const {showError} = useToast();

    const runAction = async (action, errorMessage) => {
        if (isPending.current) return null;

        isPending.current = true;
        setIsProcessing(true);

        try {
            return await action();
        } catch {
            showError(errorMessage);
            return null;
        } finally {
            isPending.current = false;
            setIsProcessing(false);
        }
    };

    const createRoom = async (name, order) => {
        return runAction(async () => {
            const roomsReference = collection(db, 'users', userId, 'rooms');

            const roomReference = await addDoc(roomsReference, {
                name,
                order,
                createdAt: serverTimestamp(),
            });

            return roomReference.id;
        }, 'Oda oluşturulamadı.');
    };

    const updateRoomName = async (roomId, name) => {
        return runAction(async () => {
            const roomReference = doc(db, 'users', userId, 'rooms', roomId);

            await updateDoc(roomReference, {
                name,
            });

            return true;
        }, 'Oda adı güncellenemedi.');
    };

    const deleteRoom = async (roomId) => {
        return runAction(async () => {
            const messagesReference = collection(
                db,
                'users',
                userId,
                'rooms',
                roomId,
                'messages'
            );

            const messagesSnapshot = await getDocs(messagesReference);

            for (
                let index = 0;
                index < messagesSnapshot.docs.length;
                index += DELETE_BATCH_SIZE
            ) {
                const messageGroup = messagesSnapshot.docs.slice(
                    index,
                    index + DELETE_BATCH_SIZE
                );

                const batch = writeBatch(db);

                messageGroup.forEach((messageDocument) => {
                    batch.delete(messageDocument.ref);
                });

                await batch.commit();
            }

            const roomReference = doc(db, 'users', userId, 'rooms', roomId);

            await deleteDoc(roomReference);

            return true;
        }, 'Oda silinemedi.');
    };

    return {
        createRoom,
        updateRoomName,
        deleteRoom,
        isProcessing,
    };
}
