import {useCallback, useEffect, useRef, useState} from 'react';
import {collection, getDocs, orderBy, query} from 'firebase/firestore';
import {db} from '@/firebase';

export default function useGlobalMessageSearch(userId, rooms) {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const requestIdRef = useRef(0);

    const loadMessages = useCallback(async () => {
        const requestId = requestIdRef.current + 1;
        requestIdRef.current = requestId;

        if (!userId || rooms.length === 0) {
            setMessages([]);
            setHasError(false);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setHasError(false);

        try {
            const roomMessageGroups = await Promise.all(
                rooms.map(async (room) => {
                    const messagesQuery = query(
                        collection(
                            db,
                            'users',
                            userId,
                            'rooms',
                            room.id,
                            'messages'
                        ),
                        orderBy('createdAt', 'desc')
                    );

                    const snapshot = await getDocs(messagesQuery);

                    return snapshot.docs.map((messageDocument) => ({
                        ...messageDocument.data(),
                        id: messageDocument.id,
                        roomId: room.id,
                        roomName: room.name,
                    }));
                })
            );

            if (requestIdRef.current !== requestId) return;

            const messageList = roomMessageGroups
                .flat()
                .sort((firstMessage, secondMessage) => {
                    const firstTime = firstMessage.createdAt?.toMillis?.() ?? 0;
                    const secondTime =
                        secondMessage.createdAt?.toMillis?.() ?? 0;

                    return secondTime - firstTime;
                });

            setMessages(messageList);
        } catch {
            if (requestIdRef.current !== requestId) return;

            setMessages([]);
            setHasError(true);
        } finally {
            if (requestIdRef.current === requestId) {
                setIsLoading(false);
            }
        }
    }, [userId, rooms]);

    useEffect(() => {
        return () => {
            requestIdRef.current += 1;
        };
    }, []);

    return {
        messages,
        isLoading,
        hasError,
        loadMessages,
    };
}
