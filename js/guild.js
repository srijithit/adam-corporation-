/* ============================================================
   ADAM CORPORATION — Guild Application Chat
   ============================================================ */

window.AK = window.AK || {};

AK.guildState = {
  step: 0,
  answers: {},
  completed: false,
};

/* ─── Init Guild Page ────────────────────────────────────── */
AK.initGuild = function() {
  AK.guildState = { step: 0, answers: {}, completed: false };
  const msgs = document.getElementById('guildMessages');
  if (msgs) msgs.innerHTML = '';

  const submitBtn = document.getElementById('guildSubmitBtn');
  if (submitBtn) submitBtn.style.display = 'none';

  // Welcome message
  setTimeout(() => {
    AK.guildBotMsg('👋 Welcome to **ADAM CORPORATION Guild** application! I\'m your AI recruitment assistant.\n\nI\'ll ask you a few questions. Please answer honestly.');
    setTimeout(() => AK.guildAskNext(), 1200);
  }, 400);
};

/* ─── Bot Message ────────────────────────────────────────── */
AK.guildBotMsg = function(text, withTyping = true) {
  const msgs = document.getElementById('guildMessages');
  if (!msgs) return;

  if (withTyping) {
    // Show typing indicator first
    const typing = document.createElement('div');
    typing.className = 'chat-msg bot typing-wrap';
    typing.innerHTML = `
      <div class="chat-msg-avatar">AI</div>
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>`;
    msgs.appendChild(typing);
    msgs.scrollTop = msgs.scrollHeight;

    setTimeout(() => {
      typing.remove();
      AK.guildAddMsg('bot', text);
    }, 900);
  } else {
    AK.guildAddMsg('bot', text);
  }
};

/* ─── Add Chat Message ───────────────────────────────────── */
AK.guildAddMsg = function(role, text) {
  const msgs = document.getElementById('guildMessages');
  if (!msgs) return;

  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;

  // Convert **bold** markdown
  const formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  div.innerHTML = role === 'bot'
    ? `<div class="chat-msg-avatar">AI</div><div class="chat-msg-bubble">${formatted}</div>`
    : `<div class="chat-msg-bubble">${formatted}</div><div class="chat-msg-avatar">YOU</div>`;

  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
};

/* ─── Ask Next Question ──────────────────────────────────── */
AK.guildAskNext = function() {
  const questions = AK.guildQuestions;
  const step = AK.guildState.step;

  if (step < questions.length) {
    AK.guildBotMsg(questions[step].q);
  } else {
    AK.guildComplete();
  }
};

/* ─── Send User Answer ───────────────────────────────────── */
AK.guildSend = function() {
  const input = document.getElementById('guildInput');
  if (!input) return;
  const val = input.value.trim();
  if (!val) return;
  input.value = '';

  if (AK.guildState.completed) return;

  AK.guildAddMsg('user', val);

  const questions = AK.guildQuestions;
  const step = AK.guildState.step;

  if (step < questions.length) {
    AK.guildState.answers[questions[step].key] = val;
    AK.guildState.step++;

    setTimeout(() => {
      if (AK.guildState.step < questions.length) {
        AK.guildBotMsg('✅ ' + AK.guildQuestions[AK.guildState.step].q);
      } else {
        AK.guildComplete();
      }
    }, 600);
  }
};

/* ─── Complete ───────────────────────────────────────────── */
AK.guildComplete = function() {
  AK.guildState.completed = true;

  const a = AK.guildState.answers;
  const summary = `📋 **Application Summary**\n\n` +
    `🎮 Name Change Card: ${a.nccard || '-'}\n` +
    `⭐ Level: ${a.level || '-'}\n` +
    `🏆 Rank: ${a.rank || '-'}\n` +
    `⏰ Daily Hours: ${a.hours || '-'}\n` +
    `🛡️ Team Role: ${a.role || '-'}\n` +
    `💬 Want to join: ${a.join || '-'}\n\n` +
    `Your application looks great! Click **Submit Application** below to send it to our team.`;

  AK.guildBotMsg(summary);

  setTimeout(() => {
    const submitBtn = document.getElementById('guildSubmitBtn');
    if (submitBtn) {
      submitBtn.style.display = 'flex';
      submitBtn.style.animation = 'slideUp 0.4s ease';
    }
  }, 1200);
};

/* ─── Submit to WhatsApp ─────────────────────────────────── */
AK.guildSubmit = function() {
  const a = AK.guildState.answers;
  const text = encodeURIComponent(
    `🎮 *ADAM CORPORATION Guild Application*\n\n` +
    `👤 NAMECHANGECARD: ${a.nccard || '-'}\n` +
    `⭐ Level: ${a.level || '-'}\n` +
    `🏆 Rank: ${a.rank || '-'}\n` +
    `⏰ Daily Hours: ${a.hours || '-'}\n` +
    `🛡️ Team Role: ${a.role || '-'}\n` +
    `💬 Want to join: ${a.join || '-'}\n\n` +
    `Sent from ADAM CORPORATION Website`
  );
  window.open(`https://wa.me/${AK.config.whatsappm}?text=${text}`, '_blank');
  AK.showToast('🚀 Application sent to WhatsApp!');
};

/* ─── Input Enter Key ────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {
  const guildInput = document.getElementById('guildInput');
  if (guildInput) {
    guildInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') AK.guildSend();
    });
  }
});
