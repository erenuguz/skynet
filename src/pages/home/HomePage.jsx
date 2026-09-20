import {useEffect, useState} from 'react';
import Sidebar from '@/components/layout/sidebar/Sidebar';
import ChatHeader from '@/components/messages/ChatHeader';
import MessagesPanel from '@/components/messages/MessagesPanel';
import RoomCreateModal from '@/components/rooms/RoomCreateModal';
import RoomDeleteModal from '@/components/rooms/RoomDeleteModal';
import RoomEditModal from '@/components/rooms/RoomEditModal';
import RoomEmptyState from '@/components/rooms/RoomEmptyState';
import ContentState from '@/components/ui/content-state/ContentState';
import useRooms from '@/hooks/useRooms';
import './HomePage.css';

const MOBILE_BREAKPOINT = '(max-width: 48rem)';

export default function HomePage({user}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(
        () => !window.matchMedia(MOBILE_BREAKPOINT).matches
    );
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);
    const [roomToEdit, setRoomToEdit] = useState(null);
    const [roomToDelete, setRoomToDelete] = useState(null);

    const {
        rooms,
        isLoading: isRoomsLoading,
        hasError: hasRoomsError,
    } = useRooms(user.uid);

    const selectedRoom =
        rooms.find((room) => room.id === selectedRoomId) ?? rooms[0] ?? null;

    const nextRoomOrder =
        rooms.reduce((highestOrder, room) => {
            const roomOrder = Number(room.order);

            if (!Number.isFinite(roomOrder)) {
                return highestOrder;
            }

            return Math.max(highestOrder, roomOrder);
        }, 0) + 1;

    useEffect(() => {
        if (!isSidebarOpen) return undefined;

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsSidebarOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isSidebarOpen]);

    const handleSelectRoom = (roomId) => {
        setSelectedRoomId(roomId);

        if (window.matchMedia(MOBILE_BREAKPOINT).matches) {
            setIsSidebarOpen(false);
        }
    };

    const handleRoomCreated = (roomId) => {
        setSelectedRoomId(roomId);
        setIsCreateRoomOpen(false);

        if (window.matchMedia(MOBILE_BREAKPOINT).matches) {
            setIsSidebarOpen(false);
        }
    };

    const handleRoomDeleted = (roomId) => {
        if (selectedRoom?.id === roomId) {
            const nextRoom = rooms.find((room) => room.id !== roomId) ?? null;

            setSelectedRoomId(nextRoom?.id ?? null);
        }

        setRoomToDelete(null);
    };

    const renderContent = () => {
        if (isRoomsLoading) {
            return <ContentState title="Odalar yükleniyor…" isLoading />;
        }

        if (hasRoomsError) {
            return (
                <ContentState
                    title="Odalar yüklenemedi"
                    description="Bağlantını kontrol edip tekrar deneyebilirsin."
                    variant="error"
                    actionLabel="Tekrar dene"
                    onAction={() => window.location.reload()}
                />
            );
        }

        if (!selectedRoom) {
            return (
                <RoomEmptyState
                    onCreateRoom={() => setIsCreateRoomOpen(true)}
                />
            );
        }

        return (
            <MessagesPanel
                key={selectedRoom.id}
                userId={user.uid}
                roomId={selectedRoom.id}
            />
        );
    };

    return (
        <>
            <main className="home-page">
                {isSidebarOpen && (
                    <>
                        <button
                            className="home-page__sidebar-backdrop"
                            type="button"
                            aria-label="Kenar çubuğunu kapat"
                            onClick={() => setIsSidebarOpen(false)}
                        />

                        <Sidebar
                            user={user}
                            rooms={rooms}
                            isRoomsLoading={isRoomsLoading}
                            hasRoomsError={hasRoomsError}
                            selectedRoomId={selectedRoom?.id ?? null}
                            onSelectRoom={handleSelectRoom}
                            onCreateRoom={() => setIsCreateRoomOpen(true)}
                            onEditRoom={setRoomToEdit}
                            onDeleteRoom={setRoomToDelete}
                            onClose={() => setIsSidebarOpen(false)}
                        />
                    </>
                )}

                <section className="home-content">
                    <ChatHeader
                        roomName={selectedRoom?.name}
                        isSidebarOpen={isSidebarOpen}
                        onOpenSidebar={() => setIsSidebarOpen(true)}
                    />

                    <div className="home-content__body">{renderContent()}</div>
                </section>
            </main>

            {isCreateRoomOpen && (
                <RoomCreateModal
                    userId={user.uid}
                    nextOrder={nextRoomOrder}
                    onCreated={handleRoomCreated}
                    onClose={() => setIsCreateRoomOpen(false)}
                />
            )}

            {roomToEdit && (
                <RoomEditModal
                    key={roomToEdit.id}
                    userId={user.uid}
                    room={roomToEdit}
                    onClose={() => setRoomToEdit(null)}
                />
            )}

            {roomToDelete && (
                <RoomDeleteModal
                    key={roomToDelete.id}
                    userId={user.uid}
                    room={roomToDelete}
                    onDeleted={handleRoomDeleted}
                    onClose={() => setRoomToDelete(null)}
                />
            )}
        </>
    );
}
