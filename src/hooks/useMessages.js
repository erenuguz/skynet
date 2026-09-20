import {useEffect, useState} from 'react';
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore';
import {db} from '@/firebase';

export default function useMessages(userId, roomId) {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const messagesQuery = query(
            collection(db, 'users', userId, 'rooms', roomId, 'messages'),
            orderBy('createdAt', 'asc')
        );

        const unsubscribe = onSnapshot(
            messagesQuery,
            (snapshot) => {
                const messageList = snapshot.docs.map((messageDocument) => ({
                    id: messageDocument.id,
                    ...messageDocument.data(),
                }));

                setMessages(messageList);
                setHasError(false);
                setIsLoading(false);
            },
            () => {
                setHasError(true);
                setIsLoading(false);
            }
        );

        return unsubscribe;
    }, [userId, roomId]);

    return {
        messages,
        isLoading,
        hasError,
    };
}
