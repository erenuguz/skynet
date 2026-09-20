import RoomItem from '@/components/rooms/RoomItem';
import './RoomList.css';

export default function RoomList({
    rooms,
    isLoading,
    hasError,
    selectedRoomId,
    onSelect,
    onEdit,
    onDelete,
}) {
    if (isLoading) {
        return (
            <p className="room-list__status" role="status">
                Odalar yükleniyor…
            </p>
        );
    }

    if (hasError) {
        return (
            <p
                className="room-list__status room-list__status--error"
                role="alert"
            >
                Odalar yüklenemedi.
            </p>
        );
    }

    if (rooms.length === 0) {
        return <p className="room-list__status">Henüz oda bulunmuyor.</p>;
    }

    return (
        <ul className="room-list">
            {rooms.map((room) => (
                <RoomItem
                    key={room.id}
                    room={room}
                    isSelected={room.id === selectedRoomId}
                    onSelect={onSelect}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}
