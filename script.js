// =========================================================================
// CONFIGURACIÓN ESTÁTICA Y LÓGICA DE LA APLICACIÓN
// =========================================================================

// ** 1. CONFIGURACIÓN DE ENLACES Y DATOS **
const SALES_PASSWORD = "Rm82839";
const SALES_URL = "https://ventas-mmm-1.onrender.com";
// ID del video principal. QGGU1f0SV9c corresponde a: https://www.youtube.com/live/QGGU1f0SV9c
const MAIN_VIDEO_ID = "QGGU1f0SV9c"; 
const MAIN_VIDEO_TITLE = "Mensaje Principal del Culto"; // Título inicial del video principal

// --- ENLACES DE FOTOS LOCALES ---
// 
// IMPORTANTE: Asegúrate de que los archivos con estos nombres
// están en la misma carpeta que tu archivo index.html.
// 

// LOGO
const LOGO_URL = "logo.png"; // ✅ Confirma que está en el archivo local

// FOTOS DE EVENTOS
const PHOTO_SERVICIO_URL = "jesus_salva.jpg";
const PHOTO_CONFERENCIA_URL = "evento_conferencia.jpg";
const PHOTO_RETIRO_URL = "evento_retiro.jpg";

// --- FOTOS DE LIDERAZGO (Carrusel) ---
const LEADERS_PHOTOS = [
    "lider_pastor_raul.jpg", 
    "lider_hermano_juan.jpg", 
    "tesorero.jpg", // <--- Esta es la foto del Tesorero
    "lider_hermano_david.jpg", 
    "lider_hermano_alberto.jpg",
];

// Mapeo de IDs de sección a IDs de enlaces en la navegación
const SECTION_LINK_MAP = {
    'liderazgo': 'link-liderazgo',
    'miembros': 'link-miembros',
    'eventos': 'link-eventos',
    'videos': 'link-videos'
};

const leadersData = LEADERS_PHOTOS.length;
let currentSlide = 0;
let slideInterval;

// =========================================================================
// LÓGICA DE VENTAS Y MODAL 
// =========================================================================

/**
 * Abre el modal de la contraseña.
 */
function openPasswordModal() {
    const modal = document.getElementById('password-modal');
    const input = document.getElementById('password-input');
    
    if (modal) {
        modal.classList.remove('hidden');
        input.focus(); 
    }
    if (input) {
        input.value = ''; 
        const existingError = modal.querySelector('.text-red-500');
        if (existingError) { existingError.remove(); }
    }
}

/**
 * Verifica la contraseña e intenta redirigir.
 */
function checkPassword() {
    const input = document.getElementById('password-input');
    const modal = document.getElementById('password-modal');
    
    if (!input || !modal) return;

    const enteredPassword = input.value;

    if (enteredPassword === SALES_PASSWORD) {
        modal.classList.add('hidden');
        window.open(SALES_URL, '_blank');
    } else {
        const modalContent = modal.querySelector('.bg-white');
        let errorMessage = modal.querySelector('.text-red-500');
        
        if (!errorMessage) {
            errorMessage = document.createElement('p');
            errorMessage.className = 'text-red-500 text-sm mt-2 font-medium opacity-0 transition-opacity duration-300';
            modalContent.appendChild(errorMessage);
        }
        
        errorMessage.textContent = 'Clave incorrecta. Inténtalo de nuevo.';
        
        setTimeout(() => {
            errorMessage.classList.remove('opacity-0');
        }, 10); 
        
        setTimeout(() => {
            errorMessage.classList.add('opacity-0');
        }, 3000);

        input.value = '';
        input.focus();
    }
}

// Hacer la función accesible globalmente
window.openPasswordModal = openPasswordModal;
window.checkPassword = checkPassword;


// =========================================================================
// LÓGICA DEL CARRUSEL
// =========================================================================

/**
 * Mueve el carrusel en la dirección especificada (+1 siguiente, -1 anterior).
 */
window.moveCarousel = function(direction) {
    const carouselTrack = document.getElementById('carousel-track');
    if (leadersData === 0 || !carouselTrack) return;

    currentSlide = (currentSlide + direction + leadersData) % leadersData;
    updateCarousel();
    resetAutoSlide();
};

/**
 * Aplica la transformación CSS al carrusel.
 */
function updateCarousel() {
    const carouselTrack = document.getElementById('carousel-track');
    if (!carouselTrack) return; 
    const offset = -currentSlide * 100;
    carouselTrack.style.transform = `translateX(${offset}%)`;
}

/**
 * Inicia el deslizamiento automático.
 */
function startAutoSlide() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        window.moveCarousel(1);
    }, 5000); // Cambia de slide cada 5 segundos
}

/**
 * Reinicia el temporizador de deslizamiento automático.
 */
function resetAutoSlide() {
    startAutoSlide();
}

// =========================================================================
// LÓGICA DE NAVEGACIÓN ACTIVA
// =========================================================================

/**
 * Observador para determinar qué sección está visible y actualizar el enlace activo.
 */
function setupIntersectionObserver() {
    const observerOptions = {
        root: null, 
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        let currentActiveSectionId = null;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                currentActiveSectionId = entry.target.id;
            }
        });
        
        if (currentActiveSectionId) {
            highlightNavLink(currentActiveSectionId);
        }
    }, observerOptions);

    document.querySelectorAll('main section').forEach(section => {
        if (section.id !== 'inicio') {
            observer.observe(section);
        }
    });
}

/**
 * Resalta el enlace de navegación correspondiente.
 */
function highlightNavLink(sectionId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    const linkId = SECTION_LINK_MAP[sectionId];
    if (linkId) {
        const activeLink = document.getElementById(linkId);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}


// =========================================================================
// FUNCIÓN DE CARGA DE IMÁGENES AL INICIO
// =========================================================================

/**
 * Carga todas las imágenes estáticas usando las constantes de URL.
 */
function loadStaticImages() {
    // Logo
    const logoImage = document.getElementById('logo-image');
    if (logoImage) logoImage.src = LOGO_URL;

    // Eventos
    const photoServicio = document.getElementById('photo-servicio');
    if (photoServicio) photoServicio.src = PHOTO_SERVICIO_URL;
    const photoConferencia = document.getElementById('photo-conferencia');
    if (photoConferencia) photoConferencia.src = PHOTO_CONFERENCIA_URL;
    const photoRetiro = document.getElementById('photo-retiro');
    if (photoRetiro) photoRetiro.src = PHOTO_RETIRO_URL;

    // Liderazgo Carrusel
    for (let i = 0; i < LEADERS_PHOTOS.length; i++) {
        const leaderImg = document.getElementById(`leader-photo-${i + 1}`);
        if (leaderImg) leaderImg.src = LEADERS_PHOTOS[i];
    }
}

// =========================================================================
// LÓGICA DE VIDEOS (SIN AUTOREPRODUCCIÓN)
// =========================================================================

/**
 * Carga un video específico en el iframe principal y actualiza el título.
 * Se elimina el parámetro 'autoplay=1' para que el video no se inicie automáticamente.
 */
window.loadVideoFromList = function(videoId, title) {
    const iframe = document.getElementById('video-iframe');
    const titleDisplay = document.getElementById('current-video-title');
    
    if (iframe && videoId) {
        // La URL ya NO incluye 'autoplay=1'
        iframe.src = `https://www.youtube.com/embed/${videoId}?rel=0`;
    }
    
    if (titleDisplay) {
        titleDisplay.textContent = `Video Actual: ${title}`;
    }
};

// =========================================================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// =========================================================================

window.onload = function() {
    // 1. Cargar todas las imágenes
    loadStaticImages();

    // 2. Inicializar el iFrame del video principal (sin autoplay)
    window.loadVideoFromList(MAIN_VIDEO_ID, MAIN_VIDEO_TITLE);
   
    // 3. Inicializar el carrusel
    updateCarousel();
    startAutoSlide();
    
    // 4. Inicializar el observador para el menú activo
    setupIntersectionObserver();


    // 5. Permite cerrar modal con la tecla ESC y enviar con ENTER
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('password-modal');
        if (modal && !modal.classList.contains('hidden')) {
            if (e.key === 'Escape') {
                modal.classList.add('hidden');
            }
            if (e.key === 'Enter') {
                checkPassword();
            }
        }
    });
};