import './ContentState.css';

export default function ContentState({
    title,
    description,
    variant = 'default',
    isLoading = false,
    actionLabel,
    onAction,
}) {
    const role = variant === 'error' ? 'alert' : 'status';

    return (
        <section
            className={`content-state content-state--${variant}`}
            role={role}
        >
            {isLoading && (
                <span className="content-state__spinner" aria-hidden="true" />
            )}

            <div className="content-state__content">
                <h2 className="content-state__title">{title}</h2>

                {description && (
                    <p className="content-state__description">{description}</p>
                )}
            </div>

            {actionLabel && onAction && (
                <button
                    className="content-state__button"
                    type="button"
                    onClick={onAction}
                >
                    {actionLabel}
                </button>
            )}
        </section>
    );
}
