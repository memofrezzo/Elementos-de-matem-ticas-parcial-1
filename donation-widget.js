(function () {
  if (document.getElementById('btnDonation')) return;

  const style = document.createElement('style');
  style.textContent = `
    body.donation-open { overflow: hidden; }
    .btn-donation {
      position: fixed;
      right: 18px;
      bottom: 18px;
      z-index: 250;
      border: 1px solid rgba(200, 144, 62, 0.35);
      border-radius: 999px;
      background: #162038;
      color: #f5ddb0;
      cursor: pointer;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.68rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      padding: 0.7rem 1rem;
      text-transform: uppercase;
      box-shadow: 0 10px 24px rgba(13, 21, 38, 0.22);
      transition: transform 0.16s ease, background 0.16s ease, color 0.16s ease;
    }
    .btn-donation:hover { background: #c8903e; color: #162038; transform: translateY(-1px); }
    .btn-donation:active { transform: translateY(1px); }
    .donation-modal {
      position: fixed;
      inset: 0;
      z-index: 900;
      display: grid;
      place-items: center;
      padding: 1.25rem;
      background: rgba(13, 21, 38, 0.72);
      backdrop-filter: blur(6px);
    }
    .donation-modal[hidden] { display: none; }
    .donation-panel {
      position: relative;
      width: min(100%, 560px);
      overflow: hidden;
      border: 1px solid rgba(232, 180, 112, 0.52);
      border-radius: 22px;
      background: #fdf8f0;
      box-shadow: 0 16px 56px rgba(13, 21, 38, 0.2);
    }
    .donation-panel::before {
      content: '';
      display: block;
      height: 8px;
      background: linear-gradient(90deg, #c8903e, #e8b470, #c8903e);
    }
    .donation-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 36px;
      height: 36px;
      border: 1px solid rgba(200, 144, 62, 0.35);
      border-radius: 50%;
      background: #fff;
      color: #0d1526;
      cursor: pointer;
      font-size: 1.4rem;
      line-height: 1;
    }
    .donation-content { padding: 2.2rem; }
    .donation-kicker {
      display: inline-flex;
      margin-bottom: 0.85rem;
      padding: 0.25rem 0.65rem;
      border: 1px solid rgba(200, 144, 62, 0.45);
      border-radius: 4px;
      color: #c8903e;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.62rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }
    .donation-content h2 {
      max-width: 430px;
      color: #0d1526;
      font-family: 'Playfair Display', serif;
      font-size: clamp(1.65rem, 4vw, 2.2rem);
      line-height: 1.14;
      margin-bottom: 0.8rem;
    }
    .donation-content p {
      color: #4a4768;
      font-size: 1.02rem;
      line-height: 1.62;
    }
    .donation-aliases {
      display: grid;
      gap: 0.75rem;
      margin-top: 1.4rem;
    }
    .donation-alias {
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: center;
      gap: 0.8rem;
      padding: 0.95rem 1rem;
      border: 1px solid rgba(200, 144, 62, 0.22);
      border-radius: 14px;
      background: #fff;
    }
    .donation-method {
      display: block;
      color: #8888aa;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.62rem;
      letter-spacing: 0.12em;
      line-height: 1.2;
      margin-bottom: 0.28rem;
      text-transform: uppercase;
    }
    .donation-value {
      display: block;
      color: #0d1526;
      font-family: 'JetBrains Mono', monospace;
      font-size: 1rem;
      font-weight: 600;
      overflow-wrap: anywhere;
    }
    .donation-copy {
      border: 1px solid #c8903e;
      border-radius: 8px;
      background: rgba(200, 144, 62, 0.1);
      color: #0d1526;
      cursor: pointer;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.66rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      padding: 0.55rem 0.7rem;
      text-transform: uppercase;
    }
    .donation-status {
      min-height: 1.2rem;
      color: #2a7a5a;
      font-size: 0.9rem;
      line-height: 1.3;
      margin-top: 0.8rem;
    }
    .donation-note {
      margin-top: 1.2rem;
      padding-top: 1rem;
      border-top: 1px solid rgba(200, 144, 62, 0.22);
      color: #4a4768;
      font-style: italic;
    }
    @media (max-width: 560px) {
      .btn-donation {
        right: 14px;
        bottom: 14px;
        font-size: 0.6rem;
        padding: 0.65rem 0.8rem;
      }
      .donation-modal { padding: 0.8rem; }
      .donation-panel { max-height: calc(100vh - 1.6rem); overflow-y: auto; }
      .donation-content { padding: 1.55rem; }
      .donation-close { top: 0.75rem; right: 0.75rem; }
      .donation-alias { grid-template-columns: 1fr; align-items: stretch; }
      .donation-copy { width: 100%; }
    }
  `;
  document.head.appendChild(style);

  document.body.insertAdjacentHTML('beforeend', `
    <button class="btn-donation" id="btnDonation" type="button" aria-haspopup="dialog" aria-expanded="false">Donaciones</button>
    <div class="donation-modal" id="donationModal" role="dialog" aria-modal="true" aria-labelledby="donationTitle" hidden>
      <div class="donation-panel">
        <button class="donation-close" id="donationClose" type="button" aria-label="Cerrar donaciones">&times;</button>
        <div class="donation-content">
          <span class="donation-kicker">Gracias por estudiar ac&aacute;</span>
          <h2 id="donationTitle">Si esta gu&iacute;a te sirvi&oacute;, un aporte ayuda much&iacute;simo.</h2>
          <p>No es obligatorio: la gu&iacute;a sigue disponible igual. Es simplemente una forma linda de apoyar este trabajo si te nace hacerlo.</p>
          <div class="donation-aliases" aria-label="Alias para donaciones">
            <div class="donation-alias">
              <div>
                <span class="donation-method">Mercado Pago</span>
                <span class="donation-value">alainal3n</span>
              </div>
              <button class="donation-copy" type="button" data-copy="alainal3n">Copiar</button>
            </div>
            <div class="donation-alias">
              <div>
                <span class="donation-method">BNA+</span>
                <span class="donation-value">estudio.juegos.piano</span>
              </div>
              <button class="donation-copy" type="button" data-copy="estudio.juegos.piano">Copiar</button>
            </div>
          </div>
          <div class="donation-status" id="donationStatus" aria-live="polite"></div>
          <p class="donation-note">No es obligatorio: la gu&iacute;a sigue disponible igual. Es simplemente una forma linda de apoyar este trabajo si te nace hacerlo.</p>
        </div>
      </div>
    </div>
  `);

  const btnDonation = document.getElementById('btnDonation');
  const donationModal = document.getElementById('donationModal');
  const donationClose = document.getElementById('donationClose');
  const donationStatus = document.getElementById('donationStatus');
  const DONATION_DELAY_MS = 30000;
  const SUPABASE_URL = 'https://jqwrrreeftehieuxblyy.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_mH7jK53aMSNKg0f5OPesHg_xnyJwEr8';
  const SUPABASE_DONATION_TABLE = 'donation_prompt_visitors';
  const DONATION_VISITOR_ID_KEY = 'matematica_donation_visitor_id';
  const DONATION_VIEW_RECORDED_KEY = 'matematica_donation_prompt_view_recorded';
  let donationTimer = null;
  let donationPromptUsed = false;

  const donationSupabaseClient = (window.supabase && SUPABASE_URL && SUPABASE_ANON_KEY && !SUPABASE_ANON_KEY.includes('PEGAR_'))
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } })
    : null;

  function clearDonationTimer() {
    if (donationTimer) {
      window.clearTimeout(donationTimer);
      donationTimer = null;
    }
  }

  function getStoredDonationValue(key) {
    try { return window.localStorage.getItem(key); } catch { return null; }
  }

  function setStoredDonationValue(key, value) {
    try { window.localStorage.setItem(key, value); } catch {}
  }

  function createDonationVisitorId() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') return window.crypto.randomUUID();
    if (window.crypto && typeof window.crypto.getRandomValues === 'function') {
      const bytes = new Uint8Array(16);
      window.crypto.getRandomValues(bytes);
      return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
    }
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function getDonationVisitorId() {
    const storedId = getStoredDonationValue(DONATION_VISITOR_ID_KEY);
    if (storedId) return storedId;
    const visitorId = createDonationVisitorId();
    setStoredDonationValue(DONATION_VISITOR_ID_KEY, visitorId);
    return visitorId;
  }

  async function recordDonationPromptView() {
    if (!donationSupabaseClient) return;
    if (getStoredDonationValue(DONATION_VIEW_RECORDED_KEY) === '1') return;
    const payload = {
      visitor_id: getDonationVisitorId(),
      page_path: window.location.pathname || '/',
      prompted_after_seconds: Math.round(DONATION_DELAY_MS / 1000),
      source: 'donation_modal_auto'
    };
    const { error } = await donationSupabaseClient.from(SUPABASE_DONATION_TABLE).insert(payload);
    if (!error || error.code === '23505') setStoredDonationValue(DONATION_VIEW_RECORDED_KEY, '1');
  }

  function openDonationModal(options = {}) {
    clearDonationTimer();
    donationPromptUsed = true;
    donationStatus.textContent = '';
    donationModal.hidden = false;
    document.body.classList.add('donation-open');
    btnDonation.setAttribute('aria-expanded', 'true');
    window.setTimeout(() => donationClose.focus(), 60);
    if (options.trackPrompt) recordDonationPromptView();
  }

  function closeDonationModal() {
    donationModal.hidden = true;
    document.body.classList.remove('donation-open');
    btnDonation.setAttribute('aria-expanded', 'false');
  }

  function scheduleDonationPrompt() {
    if (donationPromptUsed || donationTimer) return;
    donationTimer = window.setTimeout(() => {
      donationTimer = null;
      openDonationModal({ trackPrompt: true });
    }, DONATION_DELAY_MS);
  }

  function copyDonationAlias(value) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(value);
    const field = document.createElement('textarea');
    field.value = value;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.left = '-9999px';
    document.body.appendChild(field);
    field.select();
    document.execCommand('copy');
    field.remove();
    return Promise.resolve();
  }

  btnDonation.addEventListener('click', () => openDonationModal());
  donationClose.addEventListener('click', closeDonationModal);
  donationModal.addEventListener('click', (event) => {
    if (event.target === donationModal) closeDonationModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !donationModal.hidden) closeDonationModal();
  });
  document.querySelectorAll('.donation-copy').forEach(button => {
    button.addEventListener('click', () => {
      const alias = button.dataset.copy;
      copyDonationAlias(alias).then(() => {
        donationStatus.textContent = `Alias copiado: ${alias}`;
      }).catch(() => {
        donationStatus.textContent = `No pude copiarlo automaticamente. Alias: ${alias}`;
      });
    });
  });

  scheduleDonationPrompt();
})();
