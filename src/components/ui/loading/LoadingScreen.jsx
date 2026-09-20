import './LoadingScreen.css';

export default function LoadingScreen() {
    return (
        <main className="loading-screen">
            <div
                className="loading-screen__spinner"
                role="status"
                aria-label="Oturum kontrol ediliyor"
            />

            <p className="loading-screen__text">Oturum kontrol ediliyor…</p>
        </main>
    );
}
