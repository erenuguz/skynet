import ContextMenu from '@/components/ui/context-menu/ContextMenu';

export default function MessageMenu({message, onEdit, onDelete}) {
    const items = [
        {
            id: 'edit',
            label: 'Düzenle',
            onSelect: () => onEdit(message),
        },
        {
            id: 'delete',
            label: 'Sil',
            danger: true,
            onSelect: () => onDelete(message),
        },
    ];

    return <ContextMenu label="Mesaj seçenekleri" items={items} />;
}
