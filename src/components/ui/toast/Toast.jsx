import './Toast.css';

export default function Toast({message, onClose}) {
    return (
        <div className="toast">
            <p className="toast__message" role="alert">
                {message}
            </p>

            <button
                className="toast__close"
                type="button"
                aria-label="Bildirimi kapat"
                onClick={onClose}
            >
                <span aria-hidden="true">×</span>
            </button>
        </div>
    );
}
