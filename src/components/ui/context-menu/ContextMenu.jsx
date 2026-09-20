import {useEffect, useId, useRef, useState} from 'react';
import IconButton from '@/components/ui/IconButton';
import './ContextMenu.css';

export default function ContextMenu({label, items}) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    const triggerRef = useRef(null);
    const menuId = useId();

    useEffect(() => {
        if (!isOpen) return undefined;

        const handlePointerDown = (event) => {
            if (!containerRef.current?.contains(event.target)) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
                triggerRef.current?.focus();
            }
        };

        document.addEventListener('pointerdown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    const handleItemClick = (onSelect) => {
        setIsOpen(false);
        onSelect?.();
    };

    return (
        <div className="context-menu" ref={containerRef}>
            <IconButton
                ref={triggerRef}
                className="context-menu__trigger"
                label={label}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                aria-controls={isOpen ? menuId : undefined}
                onClick={() => setIsOpen((current) => !current)}
            >
                <span aria-hidden="true">•••</span>
            </IconButton>

            {isOpen && (
                <div className="context-menu__panel" id={menuId} role="menu">
                    {items.map((item) => (
                        <button
                            className={[
                                'context-menu__item',
                                item.danger ? 'context-menu__item--danger' : '',
                            ]
                                .filter(Boolean)
                                .join(' ')}
                            key={item.id}
                            type="button"
                            role="menuitem"
                            onClick={() => handleItemClick(item.onSelect)}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
