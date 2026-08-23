'use client';

export default function Home() {
  return (
    <main className="home-shell">
      <nav className="topbar">
        <a className="brand" href="#">器·谱 <span>ARSENAL CODEX</span></a>
        <div className="nav-meta"><span>24 问</span><span>120 器</span><span>约 6 分钟</span></div>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">CHINESE ANCIENT WEAPON ARCHETYPE</p>
          <h1>你的本命<br/><em>古代兵器</em></h1>
          <p className="lead">二十四个选择，将你的距离感、行动节奏与处世之道，折射成一件兵器。</p>
          <button className="primary" type="button" onClick={() => { window.location.href='/quiz'; }}>入阵测试 <span>↗</span></button>
          <p className="fine">非知识竞答 · 无标准答案 · 选择你真实的反应</p>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="seal">兵<br/>器<br/>鉴</div>
          <figure className="arsenal-hero-figure"><img src="/arsenal-hero-v2.png" alt=""/></figure>
          <p className="vertical">近者制人 · 远者制势</p>
        </div>
      </section>

      <section className="method">
        <div><b>01</b><h2>看你如何选择</h2><p>情境、价值观、直觉与自我评估交错出题。</p></div>
        <div><b>02</b><h2>不让一题定结果</h2><p>八项特质累计加权，交叉验证选择的一致性。</p></div>
        <div><b>03</b><h2>从 120 器中寻你</h2><p>近程、长兵、远射与奇门，每一件都有机会出现。</p></div>
      </section>
    </main>
  );
}
