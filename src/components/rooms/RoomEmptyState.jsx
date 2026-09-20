import './RoomEmptyState.css';

export default function RoomEmptyState({onCreateRoom}) {
    return (
        <section className="room-empty-state">
            <div className="room-empty-state__icon" aria-hidden="true">
                #
            </div>

            <div className="room-empty-state__content">
                <h2 className="room-empty-state__title">Henüz bir oda yok</h2>

                <p className="room-empty-state__description">
                    Notlarını saklamaya başlamak için ilk odanı oluştur.
                </p>
            </div>

            <button
                className="room-empty-state__button"
                type="button"
                onClick={onCreateRoom}
            >
                Oda oluştur
            </button>
        </section>
    );
}
