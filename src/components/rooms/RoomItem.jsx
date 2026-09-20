import RoomMenu from '@/components/rooms/RoomMenu';
import './RoomItem.css';

export default function RoomItem({
    room,
    isSelected,
    onSelect,
    onEdit,
    onDelete,
}) {
    return (
        <li className="room-item">
            <button
                className={[
                    'room-item__select',
                    isSelected ? 'room-item__select--active' : '',
                ]
                    .filter(Boolean)
                    .join(' ')}
                type="button"
                aria-current={isSelected ? 'page' : undefined}
                onClick={() => onSelect(room.id)}
            >
                <span className="room-item__icon" aria-hidden="true">
                    #
                </span>

                <span className="room-item__name">{room.name}</span>
            </button>

            <RoomMenu room={room} onEdit={onEdit} onDelete={onDelete} />
        </li>
    );
}
