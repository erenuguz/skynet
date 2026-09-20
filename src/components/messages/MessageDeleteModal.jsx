import ConfirmModal from '@/components/ui/modal/ConfirmModal';
import useMessageActions from '@/hooks/useMessageActions';

export default function MessageDeleteModal({userId, roomId, message, onClose}) {
    const {deleteMessage, isProcessing} = useMessageActions(userId, roomId);

    const handleDelete = async () => {
        const isDeleted = await deleteMessage(message.id);

        if (isDeleted) {
            onClose();
        }
    };

    const handleClose = () => {
        if (!isProcessing) {
            onClose();
        }
    };

    return (
        <ConfirmModal
            title="Mesajı sil"
            message="Bu mesaj kalıcı olarak silinecek."
            confirmLabel="Mesajı Sil"
            isProcessing={isProcessing}
            onConfirm={handleDelete}
            onClose={handleClose}
        />
    );
}
