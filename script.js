// Active dot nav + navbar links on scroll
(function () {
  const sections = document.querySelectorAll('section[id]');
  const dots = document.querySelectorAll('.dotnav a');
  const navLinks = document.querySelectorAll('.navlinks a[data-nav]');
  if (!sections.length) return;

  const dotMap = {};
  dots.forEach(d => { dotMap[d.getAttribute('href').replace('#', '')] = d; });

  const navMap = {};
  navLinks.forEach(l => { navMap[l.dataset.nav] = l; });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        dots.forEach(d => d.classList.remove('active'));
        navLinks.forEach(l => l.classList.remove('active'));
        const dot = dotMap[entry.target.id];
        const link = navMap[entry.target.id];
        if (dot) dot.classList.add('active');
        if (link) link.classList.add('active');
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(s => observer.observe(s));
})();