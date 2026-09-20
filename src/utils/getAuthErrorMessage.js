export default function getAuthErrorMessage(code) {
    switch (code) {
        case 'auth/invalid-credential':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-email':
            return 'E-posta veya şifre hatalı.';

        case 'auth/too-many-requests':
            return 'Çok fazla deneme yapıldı. Bir süre sonra tekrar dene.';

        case 'auth/network-request-failed':
            return 'Bağlantı kurulamadı. İnternet bağlantını kontrol et.';

        case 'auth/user-disabled':
            return 'Bu hesap devre dışı bırakılmış.';

        default:
            return 'Giriş yapılamadı. Lütfen tekrar dene.';
    }
}
