import {useEffect, useState} from 'react';
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore';
import {db} from '@/firebase';

export default function useRooms(userId) {
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const roomsQuery = query(
            collection(db, 'users', userId, 'rooms'),
            orderBy('order', 'asc')
        );

        const unsubscribe = onSnapshot(
            roomsQuery,
            (snapshot) => {
                const roomList = snapshot.docs.map((roomDocument) => ({
                    id: roomDocument.id,
                    ...roomDocument.data(),
                }));

                setRooms(roomList);
                setHasError(false);
                setIsLoading(false);
            },
            () => {
                setHasError(true);
                setIsLoading(false);
            }
        );

        return unsubscribe;
    }, [userId]);

    return {rooms, isLoading, hasError};
}
