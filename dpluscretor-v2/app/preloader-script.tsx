// app/preloader-script.tsx
import Script from 'next/script';

export function PreloaderInitScript() {
  const code = `
    (function() {
      try {
        var today = new Date().toISOString().slice(0, 10);
        var lastVisit = localStorage.getItem('lastVisitDate');
        var type = lastVisit === today ? 'secondary' : 'primary';
        document.documentElement.setAttribute('data-preloader', type);
        localStorage.setItem('lastVisitDate', today);
      } catch (e) {
        document.documentElement.setAttribute('data-preloader', 'secondary');
      }
    })();
  `;

  return (
    <Script
      id="preloader-init"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: code }}
    />
  );
}