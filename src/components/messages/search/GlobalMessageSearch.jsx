import {useEffect, useMemo, useRef, useState} from 'react';
import useGlobalMessageSearch from '@/hooks/useGlobalMessageSearch';
import formatMessageDate from '@/utils/formatMessageDate';
import './GlobalMessageSearch.css';

const MINIMUM_QUERY_LENGTH = 2;
const MAXIMUM_RESULT_COUNT = 50;

function normalizeSearchText(value) {
    return value.normalize('NFKC').toLocaleLowerCase('tr-TR');
}

function createMessagePreview(text) {
    const singleLineText = text.replace(/\s+/g, ' ').trim();

    if (singleLineText.length <= 120) {
        return singleLineText;
    }

    return `${singleLineText.slice(0, 120)}…`;
}

export default function GlobalMessageSearch({userId, rooms, onSelectResult}) {
    const [searchText, setSearchText] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    const inputRef = useRef(null);

    const {messages, isLoading, hasError, loadMessages} =
        useGlobalMessageSearch(userId, rooms);

    const normalizedSearchText = normalizeSearchText(searchText.trim());

    const results = useMemo(() => {
        if (normalizedSearchText.length < MINIMUM_QUERY_LENGTH) {
            return [];
        }

        return messages
            .filter((message) =>
                normalizeSearchText(message.text).includes(normalizedSearchText)
            )
            .slice(0, MAXIMUM_RESULT_COUNT);
    }, [messages, normalizedSearchText]);

    useEffect(() => {
        if (!isOpen) return undefined;

        const handlePointerDown = (event) => {
            if (!containerRef.current?.contains(event.target)) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                event.stopPropagation();
                setIsOpen(false);
                inputRef.current?.blur();
            }
        };

        document.addEventListener('pointerdown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    const handleFocus = () => {
        setIsOpen(true);
        void loadMessages();
    };

    const handleChange = (event) => {
        setSearchText(event.target.value);

        if (!isOpen) {
            setIsOpen(true);
            void loadMessages();
        }
    };

    const handleClear = () => {
        setSearchText('');
        inputRef.current?.focus();
    };

    const handleSelectResult = (message) => {
        onSelectResult({
            roomId: message.roomId,
            messageId: message.id,
        });

        setSearchText('');
        setIsOpen(false);
        inputRef.current?.blur();
    };

    const shouldShowResults =
        normalizedSearchText.length >= MINIMUM_QUERY_LENGTH;

    return (
        <div ref={containerRef} className="global-message-search">
            <div className="global-message-search__field">
                <span
                    className="global-message-search__icon"
                    aria-hidden="true"
                >
                    ⌕
                </span>

                <input
                    ref={inputRef}
                    className="global-message-search__input"
                    type="text"
                    value={searchText}
                    placeholder="Mesajlarda ara…"
                    aria-label="Tüm mesajlarda ara"
                    aria-expanded={isOpen}
                    aria-controls="global-message-search-results"
                    autoComplete="off"
                    disabled={rooms.length === 0}
                    onFocus={handleFocus}
                    onChange={handleChange}
                />

                {searchText && (
                    <button
                        className="global-message-search__clear"
                        type="button"
                        aria-label="Aramayı temizle"
                        onClick={handleClear}
                    >
                        <span aria-hidden="true">×</span>
                    </button>
                )}
            </div>

            {isOpen && (
                <div
                    className="global-message-search__panel"
                    id="global-message-search-results"
                >
                    {!shouldShowResults && (
                        <p className="global-message-search__status">
                            Aramak için en az 2 karakter yaz.
                        </p>
                    )}

                    {shouldShowResults && isLoading && (
                        <p
                            className="global-message-search__status"
                            role="status"
                        >
                            Mesajlar aranıyor…
                        </p>
                    )}

                    {shouldShowResults && hasError && (
                        <div className="global-message-search__error">
                            <p>Mesajlar aranamadı.</p>

                            <button
                                type="button"
                                onClick={() => void loadMessages()}
                            >
                                Tekrar dene
                            </button>
                        </div>
                    )}

                    {shouldShowResults &&
                        !isLoading &&
                        !hasError &&
                        results.length === 0 && (
                            <p className="global-message-search__status">
                                Eşleşen mesaj bulunamadı.
                            </p>
                        )}

                    {shouldShowResults &&
                        !isLoading &&
                        !hasError &&
                        results.length > 0 && (
                            <>
                                <div className="global-message-search__summary">
                                    {results.length} sonuç
                                </div>

                                <ul className="global-message-search__results">
                                    {results.map((message) => {
                                        const formattedDate = formatMessageDate(
                                            message.createdAt
                                        );

                                        return (
                                            <li key={message.id}>
                                                <button
                                                    className="global-message-search__result"
                                                    type="button"
                                                    onClick={() =>
                                                        handleSelectResult(
                                                            message
                                                        )
                                                    }
                                                >
                                                    <span className="global-message-search__result-header">
                                                        <span className="global-message-search__room">
                                                            #{message.roomName}
                                                        </span>

                                                        {formattedDate && (
                                                            <span className="global-message-search__date">
                                                                {formattedDate}
                                                            </span>
                                                        )}
                                                    </span>

                                                    <span className="global-message-search__preview">
                                                        {createMessagePreview(
                                                            message.text
                                                        )}
                                                    </span>
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </>
                        )}
                </div>
            )}
        </div>
    );
}
