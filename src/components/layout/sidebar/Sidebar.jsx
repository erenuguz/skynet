import RoomList from '@/components/rooms/RoomList';
import IconButton from '@/components/ui/IconButton';
import SidebarHeader from './SidebarHeader';
import UserProfile from './UserProfile';
import useLogout from '@/hooks/useLogout';
import './Sidebar.css';

export default function Sidebar({
    user,
    rooms,
    isRoomsLoading,
    hasRoomsError,
    selectedRoomId,
    onSelectRoom,
    onCreateRoom,
    onEditRoom,
    onDeleteRoom,
    onClose,
}) {
    const {logout, isLoggingOut} = useLogout();

    return (
        <aside className="sidebar" id="app-sidebar">
            <SidebarHeader onClose={onClose} />

            <div className="sidebar__content">
                <UserProfile user={user} />

                <section
                    className="sidebar__rooms"
                    aria-labelledby="rooms-title"
                >
                    <header className="sidebar__section-header">
                        <h2 className="sidebar__section-title" id="rooms-title">
                            Odalar
                        </h2>

                        <IconButton
                            className="sidebar__add-room"
                            label="Yeni oda oluştur"
                            onClick={onCreateRoom}
                        >
                            <span aria-hidden="true">+</span>
                        </IconButton>
                    </header>

                    <RoomList
                        rooms={rooms}
                        isLoading={isRoomsLoading}
                        hasError={hasRoomsError}
                        selectedRoomId={selectedRoomId}
                        onSelect={onSelectRoom}
                        onEdit={onEditRoom}
                        onDelete={onDeleteRoom}
                    />
                </section>
            </div>

            <footer className="sidebar__footer">
                <button
                    className="sidebar__logout"
                    type="button"
                    disabled={isLoggingOut}
                    onClick={logout}
                >
                    {isLoggingOut ? 'Çıkış yapılıyor…' : 'Çıkış Yap'}
                </button>
            </footer>
        </aside>
    );
}
