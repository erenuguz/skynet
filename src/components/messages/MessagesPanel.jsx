import {useState} from 'react';
import MessageComposer from '@/components/messages/MessageComposer';
import MessageDeleteModal from '@/components/messages/MessageDeleteModal';
import MessageList from '@/components/messages/MessageList';
import useMessages from '@/hooks/useMessages';
import './MessagesPanel.css';

export default function MessagesPanel({userId, roomId}) {
    const [editingMessageId, setEditingMessageId] = useState(null);
    const [messageToDelete, setMessageToDelete] = useState(null);

    const {messages, isLoading, hasError} = useMessages(userId, roomId);

    const handleEditMessage = (message) => {
        setEditingMessageId(message.id);
    };

    return (
        <>
            <div className="messages-panel">
                <MessageList
                    userId={userId}
                    roomId={roomId}
                    messages={messages}
                    isLoading={isLoading}
                    hasError={hasError}
                    editingMessageId={editingMessageId}
                    onEditMessage={handleEditMessage}
                    onDeleteMessage={setMessageToDelete}
                    onFinishEditing={() => setEditingMessageId(null)}
                />

                {!hasError && (
                    <MessageComposer userId={userId} roomId={roomId} />
                )}
            </div>

            {messageToDelete && (
                <MessageDeleteModal
                    key={messageToDelete.id}
                    userId={userId}
                    roomId={roomId}
                    message={messageToDelete}
                    onClose={() => setMessageToDelete(null)}
                />
            )}
        </>
    );
}
