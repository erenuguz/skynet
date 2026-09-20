import GlobalMessageSearch from '@/components/messages/search/GlobalMessageSearch';
import IconButton from '@/components/ui/IconButton';
import './ChatHeader.css';

export default function ChatHeader({
    userId,
    rooms,
    roomName,
    isSidebarOpen,
    onOpenSidebar,
    onSearchResultSelect,
}) {
    return (
        <header className="chat-header">
            {!isSidebarOpen && (
                <IconButton label="Yan paneli aç" onClick={onOpenSidebar}>
                    <span aria-hidden="true">☰</span>
                </IconButton>
            )}

            <div className="chat-header__room">
                <span className="chat-header__room-icon" aria-hidden="true">
                    #
                </span>

                <h2 className="chat-header__room-name">
                    {roomName || 'Oda seçilmedi'}
                </h2>
            </div>

            <GlobalMessageSearch
                userId={userId}
                rooms={rooms}
                onSelectResult={onSearchResultSelect}
            />
        </header>
    );
}
