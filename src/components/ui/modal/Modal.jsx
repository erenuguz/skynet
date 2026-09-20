import {useEffect, useId} from 'react';
import {createPortal} from 'react-dom';
import IconButton from '@/components/ui/IconButton';
import './Modal.css';

export default function Modal({title, onClose, children}) {
    const titleId = useId();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return createPortal(
        <div className="modal-overlay" onMouseDown={handleOverlayClick}>
            <section
                className="modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
            >
                <header className="modal__header">
                    <h2 className="modal__title" id={titleId}>
                        {title}
                    </h2>

                    <IconButton label="Pencereyi kapat" onClick={onClose}>
                        <span aria-hidden="true">×</span>
                    </IconButton>
                </header>

                <div className="modal__content">{children}</div>
            </section>
        </div>,
        document.body
    );
}
