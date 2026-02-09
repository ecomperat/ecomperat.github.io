// analytics.js - Custom event tracking for GA4
(function() {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}

  // Track PDF downloads
  document.addEventListener('click', function(e) {
    const target = e.target.closest('a');
    if (!target) return;

    const href = target.getAttribute('href');
    if (href && href.endsWith('.pdf')) {
      gtag('event', 'file_download', {
        file_name: href.split('/').pop(),
        link_text: target.textContent.trim()
      });
    }
  });

  // Track external link clicks
  document.addEventListener('click', function(e) {
    const target = e.target.closest('a');
    if (!target) return;

    const href = target.getAttribute('href');
    if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
      const isExternal = !href.includes(window.location.hostname);
      if (isExternal) {
        gtag('event', 'click', {
          event_category: 'outbound',
          event_label: href,
          link_domain: new URL(href).hostname
        });
      }
    }
  });

  // Track course expansion
  const courseToggles = document.querySelectorAll('.course-toggle');
  courseToggles.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const courseItem = btn.closest('.course-item');
      const courseTitle = courseItem ? courseItem.querySelector('.course-title, h3, h4') : null;
      const isExpanding = !courseItem.classList.contains('open');

      gtag('event', isExpanding ? 'course_expand' : 'course_collapse', {
        event_category: 'engagement',
        event_label: courseTitle ? courseTitle.textContent.trim() : 'Unknown Course'
      });
    });
  });

  // Track coursework filters
  const filterButtons = document.querySelectorAll('.cat-filter, .program-filter');
  filterButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const filterType = btn.classList.contains('cat-filter') ? 'category' : 'program';
      const filterValue = btn.dataset.cat || btn.dataset.program;

      gtag('event', 'filter_apply', {
        event_category: 'coursework_filters',
        filter_type: filterType,
        filter_value: filterValue
      });
    });
  });

  // Track scroll depth
  let scrollMarks = { 25: false, 50: false, 75: false, 100: false };
  window.addEventListener('scroll', function() {
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight - winHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    [25, 50, 75, 100].forEach(function(mark) {
      if (scrollPercent >= mark && !scrollMarks[mark]) {
        scrollMarks[mark] = true;
        gtag('event', 'scroll', {
          percent_scrolled: mark
        });
      }
    });
  });
})();
