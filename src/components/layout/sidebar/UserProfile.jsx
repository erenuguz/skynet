import './UserProfile.css';

export default function UserProfile({user}) {
    const fallbackName = user.email?.split('@')[0] || 'Kullanıcı';
    const userName = user.displayName?.trim() || fallbackName;
    const initial = userName.charAt(0).toLocaleUpperCase('tr-TR');

    return (
        <div className="user-profile">
            <span className="user-profile__avatar" aria-hidden="true">
                {initial}
            </span>

            <div className="user-profile__information">
                <strong className="user-profile__name">{userName}</strong>

                {user.email && (
                    <span className="user-profile__email" title={user.email}>
                        {user.email}
                    </span>
                )}
            </div>
        </div>
    );
}
