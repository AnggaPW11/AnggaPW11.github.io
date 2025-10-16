document.addEventListener('DOMContentLoaded', () => {
  const data = window.siteData || {};

  const navToggle = document.querySelector('[data-nav-toggle]');
  const navMenu = document.querySelector('[data-nav-menu]');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('hidden');
      navToggle.setAttribute('aria-expanded', navMenu.classList.contains('hidden') ? 'false' : 'true');
    });
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

  const ticker = document.querySelector('[data-ticker] [data-ticker-track]');
  if (ticker) {
    const items = Array.from(ticker.children);
    items.forEach(item => ticker.appendChild(item.cloneNode(true)));
  }

  renderList('[data-metrics]', data.metrics, metric => {
    const wrapper = document.createElement('div');
    wrapper.className = 'flex flex-col items-start gap-1';
    wrapper.innerHTML = `
      <span class="text-3xl font-semibold text-white sm:text-4xl">${metric.value}</span>
      <span class="text-sm text-white/80">${metric.label}</span>
    `;
    return wrapper;
  });

  renderList('[data-products]', data.products, product => {
    const card = document.createElement('a');
    card.href = product.href;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.className = 'group flex flex-col gap-4 rounded-2xl border border-slate-800/50 bg-slate-900/40 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-cyan-400/60 hover:bg-slate-900/70';
    card.innerHTML = `
      <div class="flex items-center justify-between gap-4">
        <h3 class="text-lg font-semibold text-white">${product.title}</h3>
        <span class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cyan-500/50 text-cyan-300">→</span>
      </div>
      <p class="text-sm text-slate-300">${product.description}</p>
    `;
    return card;
  });

  renderList('[data-audits]', data.audits, audit => {
    const badge = document.createElement('span');
    badge.className = 'rounded-full border border-slate-800/60 bg-slate-900/60 px-4 py-2 text-sm text-slate-200';
    badge.textContent = audit;
    return badge;
  });

  renderList('[data-ecosystem]', data.ecosystems, chain => {
    const item = document.createElement('div');
    item.className = 'rounded-xl border border-slate-800/60 bg-slate-900/60 px-4 py-3 text-sm text-slate-200 shadow-sm shadow-slate-900/40';
    item.textContent = chain;
    return item;
  });

  renderList('[data-testimonials]', data.testimonials, testimonial => {
    const card = document.createElement('div');
    card.className = 'flex flex-col gap-4 rounded-2xl border border-slate-800/60 bg-slate-900/60 p-6 text-slate-200';
    card.innerHTML = `
      <p class="text-base leading-7 text-slate-100">“${testimonial.quote}”</p>
      <div class="flex items-center gap-3 text-sm text-slate-400">
        ${testimonial.photo ? `<img src="${testimonial.photo}" alt="${testimonial.author}" class="h-10 w-10 rounded-full border border-white/10 object-cover" />` : ''}
        <div>
          <p class="font-medium text-slate-200">${testimonial.author}</p>
          <p>${testimonial.role}</p>
        </div>
      </div>
    `;
    return card;
  });

  renderList('[data-news]', data.news, item => {
    const article = document.createElement('a');
    article.href = item.href;
    article.target = '_blank';
    article.rel = 'noopener noreferrer';
    article.className = 'flex flex-col gap-3 rounded-2xl border border-slate-800/60 bg-slate-900/60 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/60 hover:bg-slate-900/80';
    article.innerHTML = `
      <span class="text-xs uppercase tracking-wide text-cyan-300/80">${item.date}</span>
      <h4 class="text-lg font-semibold text-slate-50">${item.title}</h4>
      <span class="flex items-center gap-2 text-sm text-cyan-300/80">Baca selengkapnya <span class="text-base">→</span></span>
    `;
    return article;
  });

  renderList('[data-models]', data.feedModels, model => {
    const card = document.createElement('div');
    card.className = 'flex flex-col gap-4 rounded-2xl border border-slate-800/60 bg-slate-900/60 p-6';
    card.innerHTML = `
      <div class="flex items-center justify-between">
        <h3 class="text-xl font-semibold text-slate-50">${model.name}</h3>
        <span class="text-sm text-cyan-300/80">${model.summary}</span>
      </div>
      <ul class="flex flex-col gap-2 text-sm text-slate-300">
        ${model.highlights.map(point => `<li class="flex gap-2"><span class="text-cyan-400">•</span><span>${point}</span></li>`).join('')}
      </ul>
    `;
    return card;
  });

  renderList('[data-integration-steps]', data.integrationSteps, (step, index) => {
    const item = document.createElement('div');
    item.className = 'rounded-2xl border border-slate-800/60 bg-slate-900/60 p-6';
    item.innerHTML = `
      <div class="flex items-center gap-3 text-cyan-300/80">
        <span class="text-lg font-semibold">${String(index + 1).padStart(2, '0')}</span>
        <h3 class="text-xl font-semibold text-slate-50">${step.title}</h3>
      </div>
      <p class="mt-4 text-sm text-slate-300">${step.detail}</p>
    `;
    return item;
  });

  renderList('[data-faq]', data.faq, faq => {
    const item = document.createElement('div');
    item.className = 'rounded-2xl border border-slate-800/60 bg-slate-900/50';
    item.innerHTML = `
      <button class="flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-slate-100" data-accordion-trigger>
        <span class="text-base font-medium">${faq.question}</span>
        <span class="text-cyan-300/80 transition-transform">+</span>
      </button>
      <div class="hidden px-6 pb-6 text-sm text-slate-300" data-accordion-panel>${faq.answer}</div>
    `;
    return item;
  });

  renderList('[data-docs]', data.docs, doc => {
    const link = document.createElement('a');
    link.href = doc.href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'flex flex-col gap-3 rounded-2xl border border-slate-800/60 bg-slate-900/60 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/60 hover:bg-slate-900/80';
    link.innerHTML = `
      <h3 class="text-lg font-semibold text-slate-50">${doc.title}</h3>
      <p class="text-sm text-slate-300">${doc.summary}</p>
      <span class="flex items-center gap-2 text-sm text-cyan-300/80">Open doc <span class="text-base">→</span></span>
    `;
    return link;
  });

  renderList('[data-community]', data.community, item => {
    const link = document.createElement('a');
    link.href = item.href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'rounded-xl border border-slate-800/60 bg-slate-900/60 px-4 py-3 text-sm text-slate-200 transition duration-300 hover:border-cyan-400/60 hover:text-cyan-200';
    link.textContent = item.label;
    return link;
  });

  const accordionTriggers = document.querySelectorAll('[data-accordion-trigger]');
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const panel = trigger.nextElementSibling;
      if (!panel) return;
      const expanded = panel.classList.contains('hidden');
      accordionTriggers.forEach(btn => {
        const nextPanel = btn.nextElementSibling;
        btn.lastElementChild && btn.lastElementChild.classList.remove('rotate-45');
        if (nextPanel) nextPanel.classList.add('hidden');
      });
      if (expanded) {
        panel.classList.remove('hidden');
        trigger.lastElementChild && trigger.lastElementChild.classList.add('rotate-45');
      }
    });
  });

  const contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    const status = contactForm.querySelector('[data-form-status]');
    contactForm.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      if (!formData.get('email') || !formData.get('message')) {
        if (status) {
          status.textContent = 'Please complete the required fields.';
          status.classList.remove('text-emerald-400');
          status.classList.add('text-red-400');
        }
        return;
      }
      contactForm.reset();
      if (status) {
        status.textContent = 'Terima kasih — kami akan menghubungi Anda secepatnya';
        status.classList.remove('text-red-400');
        status.classList.add('text-emerald-400');
      }
    });
  }

  const newsletterForm = document.querySelector('[data-newsletter-form]');
  if (newsletterForm) {
    const status = newsletterForm.querySelector('[data-form-status]');
    newsletterForm.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(newsletterForm);
      if (!formData.get('email')) {
        if (status) {
          status.textContent = 'Email is required.';
          status.classList.remove('text-emerald-400');
          status.classList.add('text-red-400');
        }
        return;
      }
      newsletterForm.reset();
      if (status) {
        status.textContent = 'Subscribed. Check your inbox for confirmation.';
        status.classList.remove('text-red-400');
        status.classList.add('text-emerald-400');
      }
    });
  }

  const yearTarget = document.querySelector('[data-current-year]');
  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear();
  }

  function renderList(selector, items = [], factory) {
    const container = document.querySelector(selector);
    if (!container || !items.length) return;
    items.forEach(item => container.appendChild(factory(item)));
  }
});
