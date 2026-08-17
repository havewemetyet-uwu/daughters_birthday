(() => {
  const cards = [...document.querySelectorAll('.wishlist-card[data-asin]')];
  const note = document.getElementById('wishlist-sync-note');
  if (!cards.length) return;

  fetch(`wishlist-status.json?v=${Date.now()}`, { cache: 'no-store' })
    .then(response => {
      if (!response.ok) throw new Error(`Wishlist status request failed: ${response.status}`);
      return response.json();
    })
    .then(data => {
      const items = data.items || {};
      cards.forEach(card => {
        const asin = card.dataset.asin;
        const item = items[asin];
        const gifted = item && item.status === 'gifted';
        card.classList.toggle('is-gifted', Boolean(gifted));
        if (gifted) card.setAttribute('aria-label', `${card.querySelector('h4')?.textContent || 'Wishlist item'} — already gifted`);
      });

      if (note && data.lastSuccessfulCheck) {
        const checked = new Date(data.lastSuccessfulCheck);
        if (!Number.isNaN(checked.getTime())) {
          note.textContent = `🎁 Gift status checked automatically ${checked.toLocaleString()}.`;
        }
      }
    })
    .catch(() => {
      if (note) note.textContent = '🎁 Showing the latest saved gift status.';
    });
})();
