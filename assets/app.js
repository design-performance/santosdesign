/* joandersantos.com.br · interações do portfólio (sem framework) */
(function () {
  'use strict';
  const TRABALHOS = [["Unimed Uberlândia", "https://www.unimed.coop.br/site/web/uberlandia", "Site institucional", "Novo site da Unimed Uberlândia: navegação por perfil, serviços e atendimento em poucos cliques.", "unimed"], ["PopVita", "https://popvitainformacoes.framer.website/", "Plataforma", "Plataforma de informações da PopVita, com conteúdo organizado e acessível para o time.", ""], ["Criacamis", "https://criacamis.github.io/criacamis/", "Portfólio + CMS", "Portfólio com CMS: projetos fáceis de atualizar sem mexer no layout.", ""], ["Raquel Frias", "https://raquelfrias.com.br/", "Portfólio + CMS", "Portfólio profissional com CMS, focado em posicionamento.", ""], ["Gestor de Eventos", "https://design-performance.github.io/gestordeeventos/", "Sistema", "Agenda, inscrições e informações centralizadas num só lugar.", ""], ["Relatório Unimed", "https://design-performance.github.io/plataforma-unimed/", "Relatório digital", "Relatório interativo da Unimed: dados e resultados em navegação fluida.", ""], ["Dashboard Unimed", "https://extraordinary-semolina-5bce6a.netlify.app/", "Dashboard", "Painel administrativo com indicadores numa visão única.", ""], ["Serviços Próprios", "https://servicospropriosunimeduberlandia.framer.website/", "Plataforma", "Plataforma dos serviços próprios da Unimed Uberlândia.", ""]];
const CASOS = {0: "unimed/"};
const SERVICOS = [{"cat": "Sites", "itens": [["lp", "Landing Page", "Página focada em conversão: estrutura, UX, interface e responsividade.", 1800, 3500], ["one", "Site One Page", "Site completo numa página, com implementação.", 2500, 4500], ["inst", "Site Institucional", "Até 8 páginas, com UX, interface, implementação e publicação.", 4500, 8500], ["port", "Portfólio Profissional", "Site para profissionais e criadores, com foco em posicionamento.", 3500, 7000], ["func", "Site com Funcionalidades", "Áreas restritas, integrações e recursos sob medida.", 6000, 12000]]}, {"cat": "UX/UI", "itens": [["tela", "Interface (por tela)", "Dashboard, login, cadastro ou área de usuário.", 350, 750], ["fluxo", "Fluxo UX/UI completo", "Arquitetura, fluxos, wireframes, interface e protótipo.", 2000, 6000], ["ds", "Design System", "Componentes, padrões, estados e variantes.", 2000, 5000]]}, {"cat": "Implementação", "itens": [["impl", "Implementação Web", "Do layout ao site funcional, responsivo e publicado.", 1500, 5000], ["cms", "CMS / Estrutura de conteúdo", "Atualize páginas e projetos sem mexer no layout.", 1500, 4000], ["integ", "Integrações e automações", "Formulários, APIs, pagamentos, ferramentas externas.", 1000, 5000]]}, {"cat": "Evolução", "itens": [["audit", "Auditoria UX/UI", "Problemas de usabilidade e recomendações priorizadas.", 800, 2000], ["consult", "Consultoria (por hora)", "Estrutura, UX/UI, ferramentas e produto.", 250, 400], ["evol", "Evolução contínua (mês)", "Melhorias, novas páginas e manutenção.", 300, 800]]}];
  var ZAP = '5534999078347';
  var INK = '#0e0d0c', PAPER = '#f7f6f3', ORANGE = '#ff5a1f';
  var root = document.documentElement;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var cl = function (v) { return Math.max(0, Math.min(1, v)); };
  var moeda = function (n) { return 'R$ ' + n.toLocaleString('pt-BR'); };
  var faixa = function (a, b) { return moeda(a) + ' – ' + moeda(b); };
  var esc = function (t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  /* ---------- cenas de scroll ---------- */
  var mq = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');
  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var wide = mq.matches;
  var cenas = $$('[data-cena]');
  var ks = $$('[data-k]').map(function (el) {
    var c = el.parentElement && el.parentElement.closest('[data-cena]');
    var ad = String(el.dataset.k).split(',').map(Number);
    return { el: el, c: c, a: ad[0] || 0, d: ad[1] || 1 };
  });
  var passoEl = $('#passo'), passo = '01', raf = 0;

  function tick() {
    raf = 0;
    var vh = window.innerHeight, ps = new Map(), fim = window.scrollY >= root.scrollHeight - vh - 4;
    cenas.forEach(function (el) {
      var p = 1, q = 0;
      if (wide) {
        var r = el.getBoundingClientRect();
        if (el.dataset.cena === 'pin') p = cl(-r.top / Math.max(1, r.height - vh));
        else p = fim ? 1 : cl((vh - r.top) / (vh * 0.6));
        if (el.dataset.cena === 'hero') q = cl((vh * 0.45 - r.bottom) / (vh * 0.4));
      }
      ps.set(el, p);
      el.style.setProperty('--p', p.toFixed(4));
      el.style.setProperty('--q', q.toFixed(4));
      if (el.id === 'processo' && passoEl) {
        var n = '0' + Math.min(6, Math.max(1, Math.floor((p - 0.08) / 0.13) + 1));
        if (n !== passo) { passo = n; passoEl.textContent = n; }
      }
    });
    ks.forEach(function (k) {
      var p = k.c ? (ps.has(k.c) ? ps.get(k.c) : 1) : 1;
      k.el.style.setProperty('--k', cl((p - k.a) / Math.max(.05, Math.min(k.d, 1 - k.a))).toFixed(4));
    });
    var max = root.scrollHeight - vh;
    root.style.setProperty('--prog', (max > 0 ? cl(window.scrollY / max) : 0).toFixed(4));
  }
  var agenda = function () { if (!raf) raf = requestAnimationFrame(tick); };
  window.addEventListener('scroll', agenda, { passive: true });
  var lw = window.innerWidth;
  window.addEventListener('resize', function () { if (window.innerWidth === lw) return; lw = window.innerWidth; wide = mq.matches; agenda(); });
  if (mq.addEventListener) mq.addEventListener('change', function () { wide = mq.matches; agenda(); });
  if (!reduz) window.addEventListener('mousemove', function (e) {
    root.style.setProperty('--mx', ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3));
    root.style.setProperty('--my', ((e.clientY / window.innerHeight) * 2 - 1).toFixed(3));
  }, { passive: true });
  tick();

  /* ---------- WhatsApp ---------- */
  function zap(msg) { window.open('https://wa.me/' + ZAP + '?text=' + encodeURIComponent(msg), '_blank', 'noopener'); }
  var hz = $('#h-zap');
  if (hz) hz.addEventListener('click', function () {
    var nome = ($('#h-nome').value || '').trim(), desc = ($('#h-desc').value || '').trim();
    zap('Olá, Joander! Vim pelo site.' + (nome ? '\n\n*Nome:* ' + nome : '') + (desc ? '\n\n*Projeto:*\n' + desc : '') + '\n\nQuero conversar sobre um projeto.');
  });

  /* ---------- trabalhos ---------- */
  var trab = 0, veuT = 0, frameT = 0;
  var bts = $$('[data-trab]'), frame = $('#t-frame'), capa = $('#t-capa'), img = $('#t-img'), veu = $('#t-veu'), veuTxt = $('#t-veutxt');
  var shot = function (u, n) { return 'https://s.wordpress.com/mshots/v1/' + encodeURIComponent(u) + '?w=1440&h=810' + (n ? '&r=' + n : ''); };
  function veuSet(o, txt) { veu.style.opacity = o; if (txt) veuTxt.textContent = txt; }
  function carregar(i) {
    clearTimeout(veuT);
    var t = TRABALHOS[i], n = 0;
    if (t[4]) { veuSet(0); return; }
    (function tenta() {
      var url = shot(t[1], n), im = new Image();
      im.onload = function () {
        if (trab !== i) return;
        if (im.naturalWidth > 400) { img.style.backgroundImage = 'url("' + url + '")'; veuSet(0); }
        else if (++n > 14) veuSet(1, 'PRÉVIA INDISPONÍVEL · TOQUE PARA ABRIR ↗');
        else veuT = setTimeout(tenta, 2500);
      };
      im.onerror = function () { if (trab === i) veuSet(1, 'PRÉVIA INDISPONÍVEL · TOQUE PARA ABRIR ↗'); };
      im.src = url;
    })();
  }
  if (frame) frame.addEventListener('load', function () {
    if (!frame.getAttribute('src')) return;
    clearTimeout(frameT); frameT = setTimeout(function () { veuSet(0); }, 900);
  });
  bts.forEach(function (b) {
    b.addEventListener('click', function () {
      var i = +b.dataset.trab; if (i === trab) return;
      trab = i; var t = TRABALHOS[i];
      bts.forEach(function (x, j) {
        var on = j === i;
        x.style.background = on ? INK : 'transparent'; x.style.color = on ? PAPER : INK;
        x.style.borderColor = on ? INK : '#cac7bf'; x.firstElementChild.style.color = on ? ORANGE : '#86837b';
        x.setAttribute('aria-pressed', on);
      });
      $('#t-cont').textContent = String(i + 1).padStart(2, '0') + ' / ' + String(TRABALHOS.length).padStart(2, '0');
      $('#t-urltxt').textContent = t[1].replace(/^https?:\/\//, '').replace(/\/$/, '');
      $('#t-tag').textContent = t[2];
      $('#t-desc').textContent = t[3];
      $$('[data-turl]').forEach(function (a) { a.href = t[1]; });
      var caso = $('#t-caso'); if (caso) { caso.style.display = CASOS[i] ? '' : 'none'; if (CASOS[i]) caso.href = CASOS[i]; }
      img.style.backgroundImage = 'none';
      if (capa) capa.style.display = t[4] === 'unimed' ? 'block' : 'none';
      if (t[4]) { frame.style.display = 'none'; frame.removeAttribute('src'); }
      else { frame.removeAttribute('hidden'); frame.style.display = 'block'; frame.src = t[1]; }
      veuSet(t[4] ? 0 : 1, 'CARREGANDO ' + t[0].toUpperCase());
      carregar(i);
    });
  });
  bts.forEach(function (x, j) { x.setAttribute('aria-pressed', j === 0); });

  /* ---------- monte seu projeto ---------- */
  var sel = {};
  var cats = $$('[data-cat]'), grupos = $$('[data-grupo]');
  cats.forEach(function (b) {
    b.addEventListener('click', function () {
      var i = +b.dataset.cat;
      cats.forEach(function (x, j) {
        var on = j === i;
        x.style.background = on ? INK : 'transparent'; x.style.color = on ? PAPER : '#4a4844'; x.style.borderColor = on ? INK : '#cac7bf';
        x.setAttribute('aria-pressed', on);
      });
      grupos.forEach(function (g) { g.hidden = +g.dataset.grupo !== i; });
    });
  });
  cats.forEach(function (x, j) { x.setAttribute('aria-pressed', j === 0); });
  var todos = SERVICOS.reduce(function (a, c) { return a.concat(c.itens); }, []);
  var pz = $('#p-zap');
  function escolhidos() { return todos.filter(function (i) { return sel[i[0]]; }); }
  function resumo() {
    var e = escolhidos();
    var min = e.reduce(function (a, i) { return a + i[3]; }, 0), max = e.reduce(function (a, i) { return a + i[4]; }, 0);
    $('#p-vazio').hidden = e.length > 0;
    $('#p-resumo').innerHTML = e.map(function (i) {
      return '<div style="display: flex; justify-content: space-between; gap: 12px; font: 400 14px \'IBM Plex Sans\', sans-serif; color: rgba(247,246,243,0.85); animation: jsSobe 0.45s cubic-bezier(.16,1,.3,1) both;"><span>' +
        esc(i[1]) + '</span><span style="font: 500 12px \'IBM Plex Mono\', monospace; color: rgba(247,246,243,0.6); white-space: nowrap;">' + esc(faixa(i[3], i[4])) + '</span></div>';
    }).join('');
    $('#p-total').textContent = e.length ? faixa(min, max) : 'R$ 0';
    pz.style.background = e.length ? ORANGE : 'rgba(255,255,255,0.14)';
    pz.style.color = e.length ? INK : 'rgba(247,246,243,0.5)';
    return { e: e, min: min, max: max };
  }
  $$('[data-svc]').forEach(function (b) {
    b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', function () {
      var id = b.dataset.svc, on = !sel[id];
      sel[id] = on;
      var m = $('[data-marca]', b);
      m.textContent = on ? '✓' : '+'; m.style.transform = 'scale(' + (on ? 1.12 : 1) + ')';
      m.style.background = on ? ORANGE : 'transparent'; m.style.borderColor = on ? ORANGE : '#cac7bf'; m.style.color = on ? INK : '#66635c';
      b.setAttribute('aria-pressed', on);
      resumo();
    });
  });
  if (pz) pz.addEventListener('click', function () {
    var r = resumo(); if (!r.e.length) return;
    var nome = ($('#p-nome').value || '').trim();
    zap('*Projeto — vim pelo site*\n\n' + (nome ? '*Nome:* ' + nome + '\n\n' : '') +
      '*Módulos:*\n' + r.e.map(function (i) { return '• ' + i[1] + ' — ' + faixa(i[3], i[4]); }).join('\n') +
      '\n\n*Estimativa:* ' + faixa(r.min, r.max) + '\n\nQuero conversar sobre esse escopo.');
  });
})();
