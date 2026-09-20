import ConfirmModal from '@/components/ui/modal/ConfirmModal';
import useRoomActions from '@/hooks/useRoomActions';

export default function RoomDeleteModal({userId, room, onDeleted, onClose}) {
    const {deleteRoom, isProcessing} = useRoomActions(userId);

    const handleDelete = async () => {
        const isDeleted = await deleteRoom(room.id);

        if (isDeleted) {
            onDeleted(room.id);
        }
    };

    const handleClose = () => {
        if (!isProcessing) {
            onClose();
        }
    };

    return (
        <ConfirmModal
            title="Odayı sil"
            message={
                <>
                    <strong>{room.name}</strong> odası ve içindeki bütün
                    mesajlar kalıcı olarak silinecek.
                </>
            }
            confirmLabel="Odayı Sil"
            isProcessing={isProcessing}
            onConfirm={handleDelete}
            onClose={handleClose}
        />
    );
}
