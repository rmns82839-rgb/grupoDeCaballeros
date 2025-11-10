// =========================================================================
// CONFIGURACIÓN ESTÁTICA Y DATOS
// =========================================================================

// ** 1. CONFIGURACIÓN DE ENLACES Y DATOS **
const SALES_PASSWORD = "Rm82839";
const SALES_URL = "https://ventas-mmm-1.onrender.com";
// ID del video principal.
const MAIN_VIDEO_ID = "a0GK42_Foso"; // ID del primer video de tu lista
const MAIN_VIDEO_TITLE = "Predicación: El Poder de la Oración"; 

// --- ENLACES SOCIALES Y FORMALES ---
const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/J321K321F5"; 
const FACEBOOK_PAGE_URL = "https://www.facebook.com/caballerossubarincon"; 
const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@TU_CANAL"; 
const INSTAGRAM_PAGE_URL = "https://www.instagram.com/TU_INSTAGRAM"; 
const TIKTOK_PAGE_URL = "https://www.tiktok.com/@TU_TIKTOK"; 
const PETICIONES_FORM_URL = "https://forms.gle/s53rJag1vfQ6rL2A6"; 

// --- ENLACES DE FOTOS LOCALES ---
const PHOTO_SERVICIO_URL = "jesus_salva.jpg";
const PHOTO_CONFERENCIA_URL = "generaciones.jpg"; // Usando imagen existente
const PHOTO_RETIRO_URL = "fortaleza.jpeg"; // Usando imagen existente

// --- FOTOS DE LIDERAZGO (Carrusel) ---
const LEADERS_PHOTOS = [
    "tesorero.jpg", 
    "generaciones.jpg", 
    "fortaleza.jpeg" 
]; 

const LEADERS_DATA = [
    { name: "Hno. [Nombre Tesorero]", role: "Tesorero del Grupo", text: "Sirviendo con fidelidad y transparencia para que la obra avance. El servicio a Dios es nuestra mayor recompensa.", photoUrl: LEADERS_PHOTOS[0] },
    { name: "Pastor [Raúl]", role: "Pastor y Guía Espiritual", text: "Guiando a los hombres a ser pilares de fe en sus hogares y en la iglesia, edificando una generación fuerte.", photoUrl: LEADERS_PHOTOS[1] },
    { name: "Hno. [Nombre Juan]", role: "Coordinador de Evangelismo", text: "Llevando la palabra de salvación a cada rincón de Suba. Somos llamados a ser pescadores de hombres.", photoUrl: LEADERS_PHOTOS[2] }
];

// --- DATOS DE VIDEOS (Miniaturas y Scroll Vertical) ---
const VIDEOS_DATA = [
    { id: "a0GK42_Foso", title: "Predicación: El Poder de la Oración" }, // https://youtu.be/a0GK42_Foso
    { id: "gYFWx89HmdE", title: "Enseñanza: Edificando en la Roca" }, // https://youtu.be/gYFWx89HmdE
    { id: "Cxs2PKlEclA", title: "Mensaje: Viviendo en Santidad" }, // https://youtu.be/Cxs2PKlEclA
    { id: "m0b9c9NEUKg", title: "Testimonio: Mi Encuentro con Jesús" }, // https://youtu.be/m0b9c9NEUKg
    // DEJA ESPACIO PARA MÁS VIDEOS QUE PUEDAS AÑADIR DESPUÉS
    { id: "QGGU1f0SV9c", title: "Video Anterior: Mensaje Principal del Culto" }, // Video de ejemplo original
    { id: "QGGU1f0SV9c", title: "Culto de Alabanza: Domingo 27 Octubre" }, 
    { id: "QGGU1f0SV9c", title: "Estudio Bíblico: Hechos de los Apóstoles" }, 
    { id: "QGGU1f0SV9c", title: "Testimonios que Edifican la Fe" } 
];

// --- DATOS DE EVENTOS ---
const EVENTS_DATA = [
    { title: "Jornada de Servicio Comunitario", date: "Sábado, 28 de Septiembre", time: "9:00 AM", location: "Barrio El Rincón", description: "Llevaremos ayuda y la Palabra de Dios a la comunidad.", photoUrl: PHOTO_SERVICIO_URL },
    { title: "Conferencia de Liderazgo Masculino", date: "Viernes, 11 de Octubre", time: "7:00 PM", location: "Templo Central", description: "Enseñanza sobre la Armadura de Dios y el rol del hombre cristiano.", photoUrl: PHOTO_CONFERENCIA_URL },
    { title: "Retiro Espiritual de Caballeros", date: "22 al 24 de Noviembre", time: "Todo el día", location: "Finca Villa Esperanza", description: "Tres días de comunión, oración y avivamiento.", photoUrl: PHOTO_RETIRO_URL }
];


// =========================================================================
// 2. LÓGICA DEL CARRUSEL DE LIDERAZGO (OPERATIVA)
// =========================================================================
let currentSlide = 0;
const SLIDE_INTERVAL = 5000;
let autoSlideTimer;

function loadCarouselContent() {
    const slider = document.getElementById('carousel-slider');
    if (!slider) return;

    // Crea el HTML de cada slide
    slider.innerHTML = LEADERS_DATA.map(leader => `
        <div class="carousel-slide flex-shrink-0 w-full p-8 bg-white rounded-xl shadow-inner-xl text-center">
            <img src="${leader.photoUrl}" alt="${leader.name}" class="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-accent-yellow shadow-lg">
            <h3 class="text-2xl font-serif font-bold text-gray-900">${leader.name}</h3>
            <p class="text-accent-blue font-semibold mb-4">${leader.role}</p>
            <p class="text-gray-700 max-w-lg mx-auto italic">"${leader.text}"</p>
        </div>
    `).join('');
}

function updateCarousel() {
    const slider = document.getElementById('carousel-slider');
    const dotsContainer = document.getElementById('carousel-dots');
    
    if (!slider || slider.children.length === 0) return;
    
    // Calcula el ancho del desplazamiento
    const slideWidth = slider.querySelector('.carousel-slide')?.clientWidth || 0; 
    
    currentSlide = currentSlide % LEADERS_DATA.length; 
    
    slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

    generateDots(dotsContainer);
}

function generateDots(container) {
    if (!container) return;
    container.innerHTML = '';
    LEADERS_DATA.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('carousel-dot', 'w-3', 'h-3', 'rounded-full', 'bg-gray-400', 'cursor-pointer', 'transition-colors', 'duration-300');
        if (index === currentSlide) {
            dot.classList.add('bg-accent-blue');
        }
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
            stopAutoSlide();
            startAutoSlide();
        });
        container.appendChild(dot);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % LEADERS_DATA.length;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + LEADERS_DATA.length) % LEADERS_DATA.length;
    updateCarousel();
}

function startAutoSlide() {
    stopAutoSlide(); 
    autoSlideTimer = setInterval(nextSlide, SLIDE_INTERVAL);
}

function stopAutoSlide() {
    clearInterval(autoSlideTimer);
}

function setupCarouselEventListeners() {
    document.getElementById('carousel-prev')?.addEventListener('click', () => {
        prevSlide(); 
        stopAutoSlide(); 
        startAutoSlide();
    });
    document.getElementById('carousel-next')?.addEventListener('click', () => {
        nextSlide(); 
        stopAutoSlide(); 
        startAutoSlide();
    });

    const carouselContainer = document.getElementById('carousel-container');
    carouselContainer?.addEventListener('mouseover', stopAutoSlide);
    carouselContainer?.addEventListener('mouseout', startAutoSlide);

    // Ajustar el carrusel en caso de redimensionamiento
    window.addEventListener('resize', () => {
        // Un pequeño retraso para asegurar que los elementos se han adaptado
        setTimeout(updateCarousel, 100); 
    });
}


// =========================================================================
// 3. LÓGICA DEL MODAL DE VENTAS (CONTRASEÑA)
// =========================================================================

function setupModalLogic() {
    const modal = document.getElementById('password-modal');
    const openButtons = [
        document.getElementById('open-modal-button-desktop'), 
        document.getElementById('open-modal-button-mobile'),
        document.getElementById('open-modal-button-mobile-alt'),
        document.getElementById('open-modal-button-main')
    ];
    const closeButton = document.getElementById('close-modal-button');
    const accessButton = document.getElementById('access-button');
    const passwordInput = document.getElementById('password-input');

    openButtons.forEach(button => {
        button?.addEventListener('click', () => {
            modal?.classList.remove('hidden');
            passwordInput.value = ''; 
            passwordInput.focus();
        });
    });

    closeButton?.addEventListener('click', () => {
        modal?.classList.add('hidden');
    });

    function attemptAccess() {
        const password = passwordInput.value.trim();
        if (password === SALES_PASSWORD) {
            window.location.href = SALES_URL; 
        } else {
            passwordInput.value = '';
            passwordInput.classList.add('border-red-500', 'animate-shake'); 
            setTimeout(() => {
                passwordInput.classList.remove('border-red-500', 'animate-shake');
            }, 500);
            alert("Clave incorrecta. Por favor, inténtalo de nuevo.");
            passwordInput.focus();
        }
    }

    accessButton?.addEventListener('click', attemptAccess);
    
    passwordInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            attemptAccess();
        }
    });

    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
}


// =========================================================================
// 4. LÓGICA DE SECCIONES DINÁMICAS (EVENTOS)
// =========================================================================

function loadEvents() {
    const container = document.getElementById('events-container');
    if (!container) return;

    container.innerHTML = EVENTS_DATA.map(event => `
        <div class="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden glow-effect">
            <img src="${event.photoUrl}" alt="Imagen del evento: ${event.title}" 
                 class="w-full md:w-64 h-48 md:h-auto object-cover flex-shrink-0">
            <div class="p-6 flex-grow">
                <p class="text-sm font-semibold uppercase tracking-wider text-accent-blue mb-1">${event.date}</p>
                <h3 class="text-2xl font-bold text-gray-900 mb-3">${event.title}</h3>
                <p class="text-gray-700 mb-4">${event.description}</p>
                <div class="flex items-center text-gray-600 space-x-4">
                    <span class="flex items-center text-sm">
                        <svg class="w-4 h-4 mr-1 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        ${event.time}
                    </span>
                    <span class="flex items-center text-sm">
                        <svg class="w-4 h-4 mr-1 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/24/24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        ${event.location}
                    </span>
                </div>
            </div>
        </div>
    `).join('');
}


// =========================================================================
// 5. LÓGICA DE VIDEO Y ENLACES EXTERNOS (Miniaturas con Scroll)
// =========================================================================

// Genera el contenido de la lista de videos (Miniaturas con Scroll)
function loadVideoList() {
    const listContainer = document.getElementById('video-list');
    if (!listContainer) return;

    listContainer.innerHTML = VIDEOS_DATA.map(video => `
        <div class="video-list-item cursor-pointer"
             data-video-id="${video.id}" data-video-title="${video.title}">
            <img src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg" alt="Miniatura de ${video.title}">
            <div class="video-info">
                <p class="video-title">${video.title}</p>
            </div>
        </div>
    `).join('');
}

// Función para cambiar el video principal
window.loadVideoFromList = function(videoId, title) {
    const iframe = document.getElementById('video-iframe');
    const titleDisplay = document.getElementById('current-video-title');
    
    if (iframe && videoId) {
        // *** CAMBIO CLAVE: Se elimina &autoplay=1 para evitar la reproducción automática. ***
        iframe.src = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`; 
    }
    
    if (titleDisplay) {
        titleDisplay.innerHTML = `<i class="fas fa-video mr-2 text-red-600"></i> Video Actual: ${title}`;
    }
    
    // Resalta el video activo en la lista
    document.querySelectorAll('.video-list-item').forEach(item => {
        item.classList.remove('bg-gray-200', 'border-accent-blue', 'border-2');
        if (item.getAttribute('data-video-id') === videoId) {
            item.classList.add('bg-gray-200', 'border-accent-blue', 'border-2');
        }
    });
};

function setupVideoListEventListeners() {
    // Es necesario recargar los listeners después de cargar la lista con loadVideoList()
    document.querySelectorAll('.video-list-item').forEach(item => {
        item.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video-id');
            const videoTitle = this.getAttribute('data-video-title');
            if (videoId && videoTitle) {
                window.loadVideoFromList(videoId, videoTitle);
            }
        });
    });
    
    // Al finalizar la carga, carga el primer video (sin autoplay) y lo resalta
    window.loadVideoFromList(VIDEOS_DATA[0].id, VIDEOS_DATA[0].title);
}

// Configura los enlaces sociales y el formulario de peticiones
function setupExternalLinks() {
    // 1. Enlaces de Peticiones
    const peticionesNavLinks = [
        document.getElementById('peticiones-nav-link'),
        document.getElementById('peticiones-nav-link-mobile'),
        document.getElementById('peticiones-link-main')
    ];
    peticionesNavLinks.forEach(link => {
        if (link) link.href = PETICIONES_FORM_URL;
    });

    // 2. Enlaces del Footer
    const whatsappLink = document.getElementById('whatsapp-link');
    const facebookLink = document.getElementById('facebook-link');
    const youtubeLink = document.getElementById('youtube-link');
    const instagramLink = document.getElementById('instagram-link');
    const tiktokLink = document.getElementById('tiktok-link');
    
    if (whatsappLink) whatsappLink.href = WHATSAPP_GROUP_URL;
    if (facebookLink) facebookLink.href = FACEBOOK_PAGE_URL;
    if (youtubeLink) youtubeLink.href = YOUTUBE_CHANNEL_URL;
    if (instagramLink) instagramLink.href = INSTAGRAM_PAGE_URL;
    if (tiktokLink) tiktokLink.href = TIKTOK_PAGE_URL;
}


// =========================================================================
// 6. LÓGICA DEL MENÚ DE NAVEGACIÓN ACTIVO
// =========================================================================

function setupIntersectionObserver() {
    // Se asegura de que todas las secciones relevantes sean observadas
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('#navbar a.active-link');

    const options = {
        root: null,
        rootMargin: '0px 0px -50% 0px', // Activa el enlace cuando la mitad de la sección es visible
        threshold: 0 
    };

    const observer = new IntersectionObserver((entries) => {
        let activeId = null;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // El elemento que esté más arriba en la ventana gana la activación
                if (activeId === null || entry.boundingClientRect.top < document.getElementById(activeId).getBoundingClientRect().top) {
                    activeId = entry.target.id;
                }
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-accent-blue', 'font-bold');
            if (link.getAttribute('data-section') === activeId) {
                link.classList.add('text-accent-blue', 'font-bold');
            }
        });

    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
}


// =========================================================================
// 7. LÓGICA DEL MENÚ MÓVIL (OFF-CANVAS) Y DESPLEGABLES
// =========================================================================

function setupMobileMenuLogic() {
    const openMenuButton = document.getElementById('open-mobile-menu');
    const closeMenuButton = document.getElementById('close-mobile-menu');
    const modal = document.getElementById('mobile-menu-modal');
    const drawer = document.getElementById('mobile-menu-drawer');
    const navLinks = document.querySelectorAll('.mobile-nav-link');

    openMenuButton?.addEventListener('click', () => {
        modal.classList.remove('hidden');
        setTimeout(() => drawer.classList.remove('translate-x-full'), 10); // Abrir el drawer con un pequeño retraso
    });

    const closeMenu = () => {
        drawer.classList.add('translate-x-full');
        setTimeout(() => modal.classList.add('hidden'), 300); // Ocultar el modal después de la animación
    };

    closeMenuButton?.addEventListener('click', closeMenu);

    // Cerrar el menú al hacer clic en un enlace de navegación o fuera del drawer
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeMenu();
        }
    });

    // Lógica del Dropdown de 'Más' para Desktop
    const dropdownButton = document.getElementById('mas-dropdown-button'); // ID CAMBIADO
    const dropdownMenu = document.getElementById('mas-dropdown-menu'); // ID CAMBIADO
    
    dropdownButton?.addEventListener('click', () => {
        dropdownMenu.classList.toggle('hidden');
    });
    document.addEventListener('click', (e) => {
        // Cierra el menú si se hace clic fuera de él o del botón
        if (dropdownButton && dropdownMenu && !dropdownButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.add('hidden');
        }
    });
}


// =========================================================================
// 8. INICIALIZACIÓN AL CARGAR LA PÁGINA
// =========================================================================

window.onload = function() {
    // 1. Cargar las secciones dinámicas estáticas (Eventos)
    loadEvents();
    
    // 2. Inicializar el iFrame del video principal, la lista de videos y sus listeners
    loadVideoList(); 
    setupVideoListEventListeners(); // Esta función ahora carga el primer video y establece listeners
   
    // 3. Inicializar el carrusel (OPERATIVO)
    loadCarouselContent(); 
    setupCarouselEventListeners();
    updateCarousel(); 
    startAutoSlide();
    
    // 4. Configurar la lógica del modal de ventas
    setupModalLogic();
    
    // 5. Configurar los enlaces sociales y de peticiones
    setupExternalLinks(); 
    
    // 6. Inicializar el observador para el menú activo
    setupIntersectionObserver();
    
    // 7. Configurar la lógica del menú móvil
    setupMobileMenuLogic();
    
    // 8. Permite cerrar modal con la tecla ESC
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('password-modal');
        if (modal && !modal.classList.contains('hidden')) {
            if (e.key === 'Escape') {
                modal.classList.add('hidden');
            } 
        }
    });
};
