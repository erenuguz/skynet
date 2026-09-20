import {useState} from 'react';
import useMessageActions from '@/hooks/useMessageActions';
import './MessageEditor.css';

import {MESSAGE_MAX_LENGTH} from '@/constants/limits';

export default function MessageEditor({
    userId,
    roomId,
    message,
    onFinish,
    onCancel,
}) {
    const [text, setText] = useState(message.text);
    const [error, setError] = useState('');

    const {updateMessage, isProcessing} = useMessageActions(userId, roomId);

    const handleChange = (event) => {
        setText(event.target.value);

        if (error) {
            setError('');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!text.trim()) {
            setError('Mesaj boş olamaz.');
            return;
        }

        if (text === message.text) {
            onCancel();
            return;
        }

        const isUpdated = await updateMessage(message.id, text);

        if (isUpdated) {
            onFinish();
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            onCancel();
        }

        if (
            event.key === 'Enter' &&
            event.ctrlKey &&
            !event.nativeEvent.isComposing
        ) {
            event.preventDefault();
            event.currentTarget.form?.requestSubmit();
        }
    };

    return (
        <form className="message-editor" onSubmit={handleSubmit}>
            <textarea
                className={[
                    'message-editor__input',
                    error ? 'message-editor__input--error' : '',
                ]
                    .filter(Boolean)
                    .join(' ')}
                value={text}
                maxLength={MESSAGE_MAX_LENGTH}
                disabled={isProcessing}
                aria-label="Mesajı düzenle"
                autoFocus
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />

            {error && (
                <p className="message-editor__error" role="alert">
                    {error}
                </p>
            )}

            <div className="message-editor__footer">
                <span className="message-editor__hint">
                    Kaydetmek için Ctrl + Enter
                </span>

                <div className="message-editor__actions">
                    <button
                        className="message-editor__button message-editor__button--secondary"
                        type="button"
                        disabled={isProcessing}
                        onClick={onCancel}
                    >
                        İptal
                    </button>

                    <button
                        className="message-editor__button message-editor__button--primary"
                        type="submit"
                        disabled={isProcessing}
                    >
                        {isProcessing ? 'Kaydediliyor…' : 'Kaydet'}
                    </button>
                </div>
            </div>
        </form>
    );
}
