'use client';

import { useState } from 'react';
import { questions } from '../data';

export default function QuizPage() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const question = questions[index];
  const progress = ((index + 1) / questions.length) * 100;

  function choose(option: number) {
    setSelected(option);
    window.setTimeout(() => {
      const next = [...answers];
      next[index] = option;
      if (index === questions.length - 1) {
        localStorage.setItem('arsenal-answers', JSON.stringify(next));
        window.location.href = '/result';
        return;
      }
      setAnswers(next);
      setIndex(index + 1);
      setSelected(null);
      window.scrollTo({ top:0, behavior:'smooth' });
    }, 220);
  }

  function previous() {
    if (index === 0) { window.location.href='/'; return; }
    const prev = index - 1;
    setIndex(prev);
    setSelected(answers[prev] ?? null);
  }

  return (
    <main className="quiz-shell">
      <nav className="quiz-nav">
        <a className="brand inverse" href="/">器·谱 <span>ARSENAL CODEX</span></a>
        <div className="question-count"><b>{String(index + 1).padStart(2,'0')}</b><span>/ {questions.length}</span></div>
        <button onClick={() => { window.location.href='/'; }} aria-label="退出测试">×</button>
      </nav>
      <div className="progress-track"><span style={{ width:`${progress}%` }}/></div>

      <section className="question-stage">
        <aside className="question-aside">
          <span className="type-mark">{question.type}</span>
          <p>{question.note}</p>
          <i>{String(index + 1).padStart(2,'0')}</i>
        </aside>
        <div className="question-main" key={index}>
          <p className="mini-label">QUESTION / {question.type}</p>
          <h1>{question.text}</h1>
          <div className="options">
            {question.options.map((option, oi) => (
              <button key={option.text} className={selected === oi ? 'selected' : ''} onClick={() => choose(oi)}>
                <span>{String.fromCharCode(65 + oi)}</span><b>{option.text}</b><i>→</i>
              </button>
            ))}
          </div>
        </div>
      </section>
      <footer className="quiz-footer">
        <button onClick={previous}>← {index === 0 ? '返回首页' : '上一题'}</button>
        <p>请选择真实反应，而不是你认为“应该”的反应。</p>
      </footer>
    </main>
  );
}
