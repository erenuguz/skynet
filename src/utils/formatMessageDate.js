const messageDateFormatter = new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
});

export default function formatMessageDate(timestamp) {
    const date = timestamp?.toDate?.();

    if (!date) {
        return '';
    }

    return messageDateFormatter.format(date);
}
