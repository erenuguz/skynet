import ContextMenu from '@/components/ui/context-menu/ContextMenu';

export default function RoomMenu({room, onEdit, onDelete}) {
    const items = [
        {
            id: 'edit',
            label: 'Düzenle',
            onSelect: () => onEdit?.(room),
        },
        {
            id: 'delete',
            label: 'Sil',
            danger: true,
            onSelect: () => onDelete?.(room),
        },
    ];

    return <ContextMenu label={`${room.name} oda seçenekleri`} items={items} />;
}
