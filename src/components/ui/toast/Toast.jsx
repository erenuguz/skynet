import './Toast.css';

export default function Toast({message, type = 'error', onClose}) {
    const role = type === 'error' ? 'alert' : 'status';

    return (
        <div className={`toast toast--${type}`} role={role} aria-atomic="true">
            <p className="toast__message">{message}</p>

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
