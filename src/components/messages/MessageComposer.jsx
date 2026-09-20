import {useRef, useState} from 'react';
import useMessageActions from '@/hooks/useMessageActions';
import './MessageComposer.css';

import {MESSAGE_MAX_LENGTH} from '@/constants/limits';

export default function MessageComposer({userId, roomId}) {
    const [text, setText] = useState('');
    const textareaRef = useRef(null);

    const {createMessage, isProcessing} = useMessageActions(userId, roomId);

    const resizeTextarea = (textarea) => {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const handleChange = (event) => {
        setText(event.target.value);
        resizeTextarea(event.target);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!text.trim() || isProcessing) return;

        const isCreated = await createMessage(text);

        if (isCreated) {
            setText('');

            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
                textareaRef.current.focus();
            }
        }
    };

    const handleKeyDown = (event) => {
        if (
            event.key === 'Enter' &&
            !event.shiftKey &&
            !event.nativeEvent.isComposing
        ) {
            event.preventDefault();
            event.currentTarget.form?.requestSubmit();
        }
    };

    return (
        <form className="message-composer" onSubmit={handleSubmit}>
            <div className="message-composer__container">
                <textarea
                    ref={textareaRef}
                    className="message-composer__input"
                    name="message"
                    value={text}
                    rows={1}
                    maxLength={MESSAGE_MAX_LENGTH}
                    placeholder="Bir mesaj yaz…"
                    aria-label="Mesaj"
                    disabled={isProcessing}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />

                <button
                    className="message-composer__submit"
                    type="submit"
                    disabled={isProcessing || !text.trim()}
                >
                    {isProcessing ? 'Gönderiliyor…' : 'Gönder'}
                </button>
            </div>

            <p className="message-composer__hint">
                Göndermek için Enter, yeni satır için Shift + Enter
            </p>
        </form>
    );
}
