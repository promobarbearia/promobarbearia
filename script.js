// 1. Controle da Navbar e Transparência
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    // Adiciona a classe 'scrolled' após 50px de rolagem
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

// 2. Menu Mobile (Toggle e Animação do Ícone)
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Faz o X animado no botão (se o CSS tiver a classe .open)
    menuToggle.classList.toggle('open');
});

// 3. Scroll Reveal (Animação de Entrada)
// Aumentei o threshold para 0.15 para a animação não disparar cedo demais
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px" // Começa a animar um pouco antes de entrar totalmente
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Opcional: parar de observar após animar uma vez
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 4. Navegação Suave e Fechamento de Menu
document.querySelectorAll('.nav-links a, .hero-btns button').forEach(element => {
    element.addEventListener('click', (e) => {
        // Se for um link interno (começa com #)
        const href = element.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            scrollToId(targetId);
        }
        
        // Fecha o menu mobile e reseta o ícone
        navLinks.classList.remove('active');
        menuToggle.classList.remove('open');
    });
});

// 5. Função de Scroll Global
function scrollToId(id) {
    const target = document.getElementById(id);
    if (target) {
        const headerOffset = 80; // Compensação da altura da navbar fixa
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// 6. Extra: Pausar vídeo quando não estiver na tela (Performance)
const video = document.querySelector('.video-container video');
if (video) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                video.pause();
            } else {
                video.play();
            }
        });
    }, { threshold: 0.5 });
    videoObserver.observe(video);
}