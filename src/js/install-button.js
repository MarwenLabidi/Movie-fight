const body = document.querySelector('body');
const btnInstall = document.createElement('button');
btnInstall.classList.add('install');
btnInstall.innerHTML = 'install';


let installPromptEvent;

window.addEventListener('beforeinstallprompt', (event) => {
	installPromptEvent = event;
	body.insertBefore(btnInstall, body.firstChild);
});


btnInstall.addEventListener('click', () => {
	installPromptEvent.prompt();
	btnInstall.style.display = 'none';
});

window.addEventListener('appinstalled', () => {
	btnInstall.remove();
	deferredPrompt = null;
});