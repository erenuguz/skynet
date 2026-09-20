import Modal from '@/components/ui/modal/Modal';
import RoomForm from '@/components/rooms/RoomForm';
import useRoomActions from '@/hooks/useRoomActions';

export default function RoomCreateModal({
    userId,
    nextOrder,
    onCreated,
    onClose,
}) {
    const {createRoom, isProcessing} = useRoomActions(userId);

    const handleSubmit = async (name) => {
        const roomId = await createRoom(name, nextOrder);

        if (roomId) {
            onCreated(roomId);
        }
    };

    const handleClose = () => {
        if (!isProcessing) {
            onClose();
        }
    };

    return (
        <Modal title="Yeni oda oluştur" onClose={handleClose}>
            <RoomForm
                submitLabel="Oluştur"
                isSubmitting={isProcessing}
                onSubmit={handleSubmit}
                onCancel={handleClose}
            />
        </Modal>
    );
}
