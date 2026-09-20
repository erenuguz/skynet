import IconButton from '@/components/ui/IconButton';
import './SidebarHeader.css';

export default function SidebarHeader({onClose}) {
    return (
        <header className="sidebar-header">
            <div className="sidebar-header__brand">
                <span className="sidebar-header__logo" aria-hidden="true">
                    S
                </span>

                <span className="sidebar-header__name">Skynet</span>
            </div>

            <IconButton label="Yan paneli kapat" onClick={onClose}>
                <span aria-hidden="true">←</span>
            </IconButton>
        </header>
    );
}
