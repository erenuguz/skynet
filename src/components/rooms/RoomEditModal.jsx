import Modal from '@/components/ui/modal/Modal';
import RoomForm from '@/components/rooms/RoomForm';
import useRoomActions from '@/hooks/useRoomActions';

export default function RoomEditModal({userId, room, onClose}) {
    const {updateRoomName, isProcessing} = useRoomActions(userId);

    const handleSubmit = async (name) => {
        if (name === room.name.trim()) {
            onClose();
            return;
        }

        const isUpdated = await updateRoomName(room.id, name);

        if (isUpdated) {
            onClose();
        }
    };

    const handleClose = () => {
        if (!isProcessing) {
            onClose();
        }
    };

    return (
        <Modal title="Odayı düzenle" onClose={handleClose}>
            <RoomForm
                initialName={room.name}
                submitLabel="Kaydet"
                isSubmitting={isProcessing}
                onSubmit={handleSubmit}
                onCancel={handleClose}
            />
        </Modal>
    );
}
