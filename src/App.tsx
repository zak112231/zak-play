import { useState } from "react";
import {
  Home, Gift, Trophy, User, CircleHelp,
  Flame, Star, ChevronRight, Zap
} from "lucide-react";

const games = [
  { name: "Колесо удачи", icon: "🎡", desc: "Испытай удачу в демо-режиме", tag: "ИГРА" },
  { name: "Открытие кейсов", icon: "🎁", desc: "Собирай виртуальные предметы", tag: "КЕЙСЫ" },
  { name: "Ежедневный бонус", icon: "🎯", desc: "Забирай ежедневные очки", tag: "БОНУС" },
];

export default function App() {
  const [page, setPage] = useState("Главная");
  const [points, setPoints] = useState(1000);
  const [toast, setToast] = useState("");

  function notify(message: string) {
    setToast(message);
    setTimeout(() => setToast(""), 2200);
  }

  function bonus() {
    setPoints(p => p + 100);
    notify("+100 виртуальных очков!");
  }

  return (
    <div className="app">
      <header className="header">
        <div className="brand"><span>Z</span>AK PLAY</div>
        <div className="demo">DEMO MODE</div>
      </header>

      <main>
        <section className="hero">
          <div className="eyebrow"><Flame size={15}/> ИГРОВАЯ ПЛАТФОРМА</div>
          <h1>ТВОЯ ИГРА.<br/><span>ТВОИ ПРАВИЛА.</span></h1>
          <p>Добро пожаловать в ZAK PLAY — пространство игр, заданий и достижений.</p>
          <button className="gold-button" onClick={() => setPage("Игры")}>
            Начать играть <ChevronRight size={18}/>
          </button>
        </section>

        <section className="balance">
          <div>
            <div className="muted">ТВОЙ БАЛАНС</div>
            <div className="amount">{points.toLocaleString("ru-RU")} <span>очков</span></div>
            <div className="virtual">Виртуальные очки · Без денежной ценности</div>
          </div>
          <div className="coin"><Star size={30}/></div>
        </section>

        <div className="section-title">
          <div><span className="gold-dot"/> ДОСТУПНЫЕ РАЗДЕЛЫ</div>
          <span className="muted">03</span>
        </div>

        <div className="games">
          {games.map((game, i) => (
            <button className="game-card" key={game.name}
              onClick={() => {
                setPage(game.name);
                if (i === 2) bonus();
              }}>
              <div className="game-icon">{game.icon}</div>
              <div className="game-info">
                <div className="tag">{game.tag}</div>
                <h3>{game.name}</h3>
                <p>{game.desc}</p>
              </div>
              <ChevronRight className="arrow"/>
            </button>
          ))}
        </div>

        <section className="notice">
          <Zap size={18}/>
          <div><b>Играй безопасно</b><p>Все очки и предметы существуют только внутри демо-приложения.</p></div>
        </section>

        {page !== "Главная" && (
          <section className="subpage">
            <div className="muted">ТЕКУЩИЙ РАЗДЕЛ</div>
            <h2>{page}</h2>
            <p>Этот раздел ZAK PLAY будет развиваться дальше.</p>
            <button className="gold-button" onClick={() => setPage("Главная")}>На главную</button>
          </section>
        )}
      </main>

      <nav className="bottom-nav">
        {[
          { name: "Главная", icon: Home },
          { name: "Игры", icon: Gift },
          { name: "Рейтинг", icon: Trophy },
          { name: "Профиль", icon: User },
        ].map(item => {
          const Icon = item.icon;
          return (
            <button key={item.name}
              className={page === item.name ? "nav-item active" : "nav-item"}
              onClick={() => setPage(item.name)}>
              <Icon size={20}/><span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      {toast && <div className="toast">{toast}</div>}
      <footer>ZAK PLAY © 2026 · DEMO VERSION</footer>
    </div>
  );
}
