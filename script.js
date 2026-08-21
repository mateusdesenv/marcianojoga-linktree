const shareButton = document.querySelector('#shareButton');
const toast = document.querySelector('#toast');
const currentYear = document.querySelector('#currentYear');

currentYear.textContent = new Date().getFullYear();

let toastTimer;

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('visible');
  toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 2600);
}

async function sharePage() {
  const shareData = {
    title: 'MARCIANOJOGA — Links',
    text: 'Acompanhe o MARCIANOJOGA em todas as plataformas.',
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
    showToast('Link copiado para a área de transferência.');
  } catch (error) {
    if (error.name !== 'AbortError') showToast('Não foi possível compartilhar agora.');
  }
}

shareButton.addEventListener('click', sharePage);
