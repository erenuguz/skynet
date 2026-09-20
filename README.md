# Skynet

Skynet, React ve Firebase kullanılarak geliştirilmiş oda ve mesaj tabanlı bir web uygulamasıdır. Yapısı farklı kullanım senaryolarına uyarlanabilir.

## Özellikler

- Firebase Email/Password ile kullanıcı girişi
- Oda oluşturma, düzenleme ve silme
- Mesaj oluşturma, düzenleme ve silme
- Düzenlenen mesajlarda `(düzenlendi)` bilgisi
- Tüm odalardaki mesajlarda arama
- Arama sonucundan ilgili oda ve mesaja doğrudan geçiş
- Açılıp kapanabilen, mobil uyumlu kenar çubuğu
- Yalnızca koyu tema
- Yüklenme, hata, boş durum ve bildirim arayüzleri
- Firebase Hosting desteği

## Kullanılan Teknolojiler

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Cloud Firestore](https://firebase.google.com/docs/firestore)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)
- ESLint
- JavaScript ve CSS

## Kurulum

Projeyi klonlayın:

```bash
git clone https://github.com/erenuguz/skynet.git
cd skynet
npm install
```

Kök dizinde `.env` dosyası oluşturun ve Firebase web uygulamanızın bilgilerini ekleyin:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

## Komutlar

| Komut | Açıklama |
| --- | --- |
| `npm run dev` | Geliştirme sunucusunu başlatır |
| `npm run build` | Üretim derlemesini oluşturur |
| `npm run lint` | ESLint kontrolünü çalıştırır |
| `npm run preview` | Üretim derlemesini yerelde önizler |

## Firestore Veri Yapısı

```text
users/{uid}
└── rooms/{roomId}
    └── messages/{messageId}
```

### Oda alanları

| Alan | Tür |
| --- | --- |
| `name` | string |
| `order` | number |
| `createdAt` | timestamp |

### Mesaj alanları

| Alan | Tür |
| --- | --- |
| `text` | string |
| `createdAt` | timestamp |
| `editedAt` | timestamp veya null |

Tüm oda ve mesaj işlemleri oturum açan kullanıcının `users/{uid}` yolu altında gerçekleştirilir.

## Proje Yapısı

```text
src/
├── components/   # Tekrar kullanılabilir arayüz parçaları
├── constants/    # Uygulama sabitleri
├── contexts/     # React context tanımları
├── hooks/        # Firebase ve arayüz mantığı
├── pages/        # Sayfa bileşenleri
├── providers/    # Context sağlayıcıları
├── styles/       # Global stil ve tema değişkenleri
└── utils/        # Yardımcı fonksiyonlar
```

## Güvenlik

- Firebase yapılandırması ortam değişkenleri üzerinden okunur.
- Gerçek `.env` dosyası Git deposuna dahil edilmez.
- Verilere erişim Firebase Authentication ve Firestore Security Rules ile sınırlandırılır.
- Uygulama uçtan uca şifreleme sağlamaz; güvenlik için Firebase hesabı ve kuralların doğru yapılandırılması gerekir.
