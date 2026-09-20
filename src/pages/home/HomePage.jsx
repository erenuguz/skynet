import {useState} from 'react';
import Sidebar from '@/components/layout/sidebar/Sidebar';
import ChatHeader from '@/components/messages/ChatHeader';
import MessagesPanel from '@/components/messages/MessagesPanel';
import RoomCreateModal from '@/components/rooms/RoomCreateModal';
import RoomDeleteModal from '@/components/rooms/RoomDeleteModal';
import RoomEditModal from '@/components/rooms/RoomEditModal';
import useRooms from '@/hooks/useRooms';
import './HomePage.css';

export default function HomePage({user}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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

    const handleRoomCreated = (roomId) => {
        setSelectedRoomId(roomId);
        setIsCreateRoomOpen(false);
    };

    return (
        <>
            <main className="home-page">
                {isSidebarOpen && (
                    <Sidebar
                        user={user}
                        rooms={rooms}
                        isRoomsLoading={isRoomsLoading}
                        hasRoomsError={hasRoomsError}
                        selectedRoomId={selectedRoom?.id ?? null}
                        onSelectRoom={setSelectedRoomId}
                        onCreateRoom={() => setIsCreateRoomOpen(true)}
                        onEditRoom={setRoomToEdit}
                        onDeleteRoom={setRoomToDelete}
                        onClose={() => setIsSidebarOpen(false)}
                    />
                )}

                <section className="home-content">
                    <ChatHeader
                        roomName={selectedRoom?.name}
                        isSidebarOpen={isSidebarOpen}
                        onOpenSidebar={() => setIsSidebarOpen(true)}
                    />

                    <div className="home-content__body">
                        {selectedRoom ? (
                            <MessagesPanel
                                key={selectedRoom.id}
                                userId={user.uid}
                                roomId={selectedRoom.id}
                            />
                        ) : (
                            !isRoomsLoading && (
                                <p className="home-content__message">
                                    Görüntülemek için bir oda oluştur.
                                </p>
                            )
                        )}
                    </div>
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
                    onClose={() => setRoomToDelete(null)}
                />
            )}
        </>
    );
}
