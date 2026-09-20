import {useState} from 'react';
import './RoomForm.css';

import {ROOM_NAME_MAX_LENGTH} from '@/constants/limits';

export default function RoomForm({
    initialName = '',
    submitLabel,
    isSubmitting,
    onSubmit,
    onCancel,
}) {
    const [name, setName] = useState(initialName);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const trimmedName = name.trim();

        if (!trimmedName) {
            setError('Oda adı boş olamaz.');
            return;
        }

        await onSubmit(trimmedName);
    };

    const handleChange = (event) => {
        setName(event.target.value);

        if (error) {
            setError('');
        }
    };

    return (
        <form className="room-form" onSubmit={handleSubmit}>
            <div className="room-form__field">
                <label className="room-form__label" htmlFor="room-name">
                    Oda adı
                </label>

                <input
                    className={[
                        'room-form__input',
                        error ? 'room-form__input--error' : '',
                    ]
                        .filter(Boolean)
                        .join(' ')}
                    id="room-name"
                    name="roomName"
                    type="text"
                    value={name}
                    maxLength={ROOM_NAME_MAX_LENGTH}
                    disabled={isSubmitting}
                    autoComplete="off"
                    autoFocus
                    onChange={handleChange}
                />

                {error && (
                    <p className="room-form__error" role="alert">
                        {error}
                    </p>
                )}
            </div>

            <div className="room-form__actions">
                <button
                    className="room-form__button room-form__button--secondary"
                    type="button"
                    disabled={isSubmitting}
                    onClick={onCancel}
                >
                    İptal
                </button>

                <button
                    className="room-form__button room-form__button--primary"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Kaydediliyor…' : submitLabel}
                </button>
            </div>
        </form>
    );
}
