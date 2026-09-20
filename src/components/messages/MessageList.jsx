import {useEffect, useRef} from 'react';
import MessageItem from '@/components/messages/MessageItem';
import './MessageList.css';

export default function MessageList({
    userId,
    roomId,
    messages,
    isLoading,
    hasError,
    editingMessageId,
    onEditMessage,
    onDeleteMessage,
    onFinishEditing,
}) {
    const listEndRef = useRef(null);

    useEffect(() => {
        listEndRef.current?.scrollIntoView({
            block: 'end',
        });
    }, [messages.length]);

    if (isLoading) {
        return (
            <p className="message-list__status" role="status">
                Mesajlar yükleniyor…
            </p>
        );
    }

    if (hasError) {
        return (
            <p
                className="message-list__status message-list__status--error"
                role="alert"
            >
                Mesajlar yüklenemedi.
            </p>
        );
    }

    if (messages.length === 0) {
        return (
            <div className="message-list__empty">
                <p className="message-list__empty-title">Bu oda henüz boş.</p>

                <p className="message-list__empty-description">
                    İlk mesajını yazarak başlayabilirsin.
                </p>
            </div>
        );
    }

    return (
        <div className="message-list" role="log" aria-live="polite">
            <div className="message-list__content">
                {messages.map((message) => (
                    <MessageItem
                        key={message.id}
                        userId={userId}
                        roomId={roomId}
                        message={message}
                        isEditing={message.id === editingMessageId}
                        onEdit={onEditMessage}
                        onDelete={onDeleteMessage}
                        onFinishEditing={onFinishEditing}
                    />
                ))}

                <div
                    ref={listEndRef}
                    className="message-list__end"
                    aria-hidden="true"
                />
            </div>
        </div>
    );
}
