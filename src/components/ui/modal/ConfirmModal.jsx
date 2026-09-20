import Modal from '@/components/ui/modal/Modal';
import './ConfirmModal.css';

export default function ConfirmModal({
    title,
    message,
    confirmLabel,
    isProcessing,
    onConfirm,
    onClose,
}) {
    return (
        <Modal title={title} onClose={onClose}>
            <div className="confirm-modal">
                <p className="confirm-modal__message">{message}</p>

                <div className="confirm-modal__actions">
                    <button
                        className="confirm-modal__button confirm-modal__button--secondary"
                        type="button"
                        disabled={isProcessing}
                        onClick={onClose}
                    >
                        İptal
                    </button>

                    <button
                        className="confirm-modal__button confirm-modal__button--danger"
                        type="button"
                        disabled={isProcessing}
                        onClick={onConfirm}
                    >
                        {isProcessing ? 'Siliniyor…' : confirmLabel}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
