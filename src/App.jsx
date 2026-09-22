import { useState, useEffect } from 'react'
import './App.css'

const greetings = [
  "Welcome", "Bienvenue", "Bienvenido", "Willkommen", "Benvenuto",
  "Bem-vindo", "Welkom", "Välkommen", "Velkommen", "Tervetuloa",
  "Witamy", "Vítejte", "Üdvözöljük", "Bine ați venit", "Добро пожаловать",
  "Ласкаво просимо", "Καλώς ορίσατε", "Hoş geldiniz", "مرحبا", "ברוך הבא",
  "स्वागत है", "欢迎", "ようこそ", "환영합니다", "Chào mừng",
  "ยินดีต้อนรับ", "Selamat datang", "Karibu",
];

const DELAY = 300;

function GreetingAnimation({ onFinish }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= greetings.length) {
      onFinish();
      return;
    }
    const id = setTimeout(() => setIndex((i) => i + 1), DELAY);
    return () => clearTimeout(id);
  }, [index, onFinish]);

  if (index >= greetings.length) return null;

  return (
    <div className="loader">
      {}
      <span key={index} className="greeting" dir="auto">
        {greetings[index]}
      </span>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <GreetingAnimation onFinish={() => setLoading(false)} />;
  }

  return (
    <main>
      <h1>Contenu de la page</h1>
    </main>
  );
}

export default App