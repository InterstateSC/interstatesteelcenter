// Interstate Steel Center — shared site JS

// Reveal-on-scroll
function initReveal() {
  var reveals = document.querySelectorAll('.reveal:not(.visible)');
  if (!('IntersectionObserver' in window)) { reveals.forEach(function(el){el.classList.add('visible');}); return; }
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -24px 0px' });
  reveals.forEach(function (el, i) { el.style.transitionDelay = (i % 4) * 0.065 + 's'; obs.observe(el); });
}
document.addEventListener('DOMContentLoaded', initReveal);

// Mobile menu + dropdown
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  document.querySelectorAll('.dropdown-trigger').forEach(function (t) {
    t.addEventListener('click', function (e) {
      e.preventDefault();
      if (window.innerWidth <= 960) { t.closest('.has-dropdown').classList.toggle('open'); }
    });
  });
  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () { q.closest('.faq-item').classList.toggle('open'); });
  });
});

// Quote form (binds any .quote-form by field name; mailto to orders@ + brack@ cc)
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('form.quote-form').forEach(function (form) {
    var btn = form.querySelector('.qf-submit');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var errBox = form.querySelector('.qf-error');
      if (errBox) errBox.classList.remove('show');
      var honey = form.querySelector('[name="_gotcha"]');
      if (honey && honey.value) return;
      var val = function (n) { var el = form.querySelector('[name="' + n + '"]'); return el ? (el.value || '').trim() : ''; };
      var name = val('Name'), company = val('Company'), email = val('Email'), phone = val('Phone');
      var service = val('Service Needed'), material = val('Material Type'), scope = val('Scope of Work'), volume = val('Estimated Volume');
      if (!name || !company || !email || !phone || !scope) { if (errBox) errBox.classList.add('show'); return; }
      var lines = [
        'New quote request from interstatesteelcenter.com','----------------------------------------',
        'Name: ' + name,'Company: ' + company,'Email: ' + email,'Phone: ' + phone,
        'Service Needed: ' + (service || 'Not specified'),'Material Type: ' + (material || 'Not specified'),
        'Estimated Volume / Tonnage: ' + (volume || 'Not specified'),'','Scope of Work:',scope,''];
      var body = encodeURIComponent(lines.join('\n'));
      var subject = encodeURIComponent('Quote Request - ' + company);
      window.location.href = 'mailto:orders@levelisc.com?cc=brack@levelisc.com&subject=' + subject + '&body=' + body;
      setTimeout(function () {
        var wrap = form.closest('.quote-form-wrap');
        var success = wrap ? wrap.querySelector('.qf-success') : null;
        if (success) success.classList.add('show');
        form.style.display = 'none';
      }, 400);
    });
  });
});
