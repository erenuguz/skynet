import MessageEditor from '@/components/messages/MessageEditor';
import MessageMenu from '@/components/messages/MessageMenu';
import formatMessageDate from '@/utils/formatMessageDate';
import './MessageItem.css';

export default function MessageItem({
    userId,
    roomId,
    message,
    isEditing,
    isHighlighted,
    onEdit,
    onDelete,
    onFinishEditing,
}) {
    const className = [
        'message-item',
        isEditing ? 'message-item--editing' : '',
        isHighlighted ? 'message-item--highlighted' : '',
    ]
        .filter(Boolean)
        .join(' ');

    if (isEditing) {
        return (
            <article className={className} id={`message-${message.id}`}>
                <MessageEditor
                    userId={userId}
                    roomId={roomId}
                    message={message}
                    onFinish={onFinishEditing}
                    onCancel={onFinishEditing}
                />
            </article>
        );
    }

    const createdDate = message.createdAt?.toDate?.();
    const formattedDate = formatMessageDate(message.createdAt);

    return (
        <article className={className} id={`message-${message.id}`}>
            <div className="message-item__body">
                <p className="message-item__text">{message.text}</p>

                <MessageMenu
                    message={message}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            </div>

            <footer className="message-item__meta">
                {formattedDate && (
                    <time dateTime={createdDate.toISOString()}>
                        {formattedDate}
                    </time>
                )}

                {message.editedAt && (
                    <span className="message-item__edited">(düzenlendi)</span>
                )}
            </footer>
        </article>
    );
}
