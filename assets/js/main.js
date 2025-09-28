
document.addEventListener('DOMContentLoaded', () => {
  const quizForm = document.querySelector('#quiz-form');
  if (quizForm) {
    quizForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const key = { q1: 'b', q2: 'c', q3: 'a', q4: 'b', q5: 'c' };
      let score = 0, total = 0;
      Object.keys(key).forEach(id => {
        total += 1;
        const checked = quizForm.querySelector(`input[name="${id}"]:checked`);
        const correct = key[id];
        const block = quizForm.querySelector(`[data-q="${id}"]`);
        block.querySelectorAll('.feedback').forEach(el => el.remove());
        const fb = document.createElement('div');
        fb.className = 'feedback';
        if (checked && checked.value === correct) {
          score += 1;
          fb.textContent = '✓ Correct';
          fb.style.color = 'var(--ok)';
        } else {
          fb.textContent = `✗ Incorrect (answer: ${correct.toUpperCase()})`;
          fb.style.color = 'var(--err)';
        }
        block.appendChild(fb);
      });
      const out = document.querySelector('#quiz-result');
      if (out) out.innerHTML = `<strong>Score:</strong> ${score} / ${total}`;
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });
  }

  const audios = document.querySelectorAll('audio');
  audios.forEach(a => {
    a.addEventListener('error', () => {
      const n = document.createElement('div');
      n.className = 'notice';
      n.innerHTML = 'Audio missing — record a short voice-over for this page and replace <code>assets/audio/sample.wav</code>.';
      a.parentElement.appendChild(n);
    });
  });
});
