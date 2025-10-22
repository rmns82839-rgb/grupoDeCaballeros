// =========================================================================
// CONFIGURACIÓN ESTÁTICA Y DATOS
// =========================================================================

// ** 1. CONFIGURACIÓN DE ENLACES Y DATOS **
const SALES_PASSWORD = "Rm82839";
const SALES_URL = "https://ventas-mmm-1.onrender.com";
// ID del video principal. QGGU1f0SV9c corresponde a: https://www.youtube.com/live/QGGU1f0SV9c
const MAIN_VIDEO_ID = "QGGU1f0SV9c"; 
const MAIN_VIDEO_TITLE = "Mensaje Principal del Culto"; 

// --- ENLACES SOCIALES Y FORMALES ---
const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/J321K321F5"; 
const FACEBOOK_PAGE_URL = "https://www.facebook.com/caballerossubarincon"; 
const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@TU_CANAL"; 
const INSTAGRAM_PAGE_URL = "https://www.instagram.com/TU_INSTAGRAM"; 
const TIKTOK_PAGE_URL = "https://www.tiktok.com/@TU_TIKTOK"; 

// URL CORREGIDA: Este es el enlace público del Google Form
const PETICIONES_FORM_URL = "https://forms.gle/s53rJag1vfQ6rL2A6"; // <<== ✅ ENLACE CORRECTO AHORA

// --- ENLACES DE FOTOS LOCALES ---
const LOGO_URL = "logo.png"; 
const PHOTO_SERVICIO_URL = "jesus_salva.jpg";
const PHOTO_CONFERENCIA_URL = "evento_conferencia.jpg";
const PHOTO_RETIRO_URL = "evento_retiro.jpg";

// ... (resto de constantes y datos)

// FUNCIÓN DE CONFIGURACIÓN DE ENLACES ACTUALIZADA:
function setupExternalLinks() {
    // 1. Enlace de Navegación "Peticiones"
    // El 'href' se asigna correctamente aquí con la URL del Google Form
    const peticionesNavLink = document.getElementById('peticiones-nav-link');
    if (peticionesNavLink) {
        peticionesNavLink.href = PETICIONES_FORM_URL; 
    }

    // 2. Enlaces del Footer (Redes Sociales)
    const whatsappLink = document.getElementById('whatsapp-link');
    const facebookLink = document.getElementById('facebook-link');
    const youtubeLink = document.getElementById('youtube-link');
    const instagramLink = document.getElementById('instagram-link');
    const tiktokLink = document.getElementById('tiktok-link');
    
    if (whatsappLink) {
        whatsappLink.href = WHATSAPP_GROUP_URL;
    }
    
    if (facebookLink) {
        facebookLink.href = FACEBOOK_PAGE_URL;
    }

    if (youtubeLink) {
        youtubeLink.href = YOUTUBE_CHANNEL_URL;
    }

    if (instagramLink) {
        instagramLink.href = INSTAGRAM_PAGE_URL;
    }

    if (tiktokLink) {
        tiktokLink.href = TIKTOK_PAGE_URL;
    }
}

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

// --- DATOS DE MIEMBROS Y EVENTOS (Simulación) ---
const ALL_MEMBERS = Array.from({ length: 30 }, (_, i) => ({ 
    photo: `miembro_${i + 1}.jpg`, 
    name: `Caballero ${i + 1}`,
    placeholder: 'logo.png' 
}));
const INITIAL_MEMBERS_DISPLAY = 12; 
const MEMBERS_INCREMENT = 6; 

let membersCurrentlyDisplayed = INITIAL_MEMBERS_DISPLAY;

const EVENTS_DATA = [
    { title: "Jornada de Servicio Comunitario", date: "Sábado, 28 de Septiembre", time: "9:00 AM", location: "Barrio El Rincón", description: "Llevaremos ayuda y la Palabra de Dios a la comunidad.", photoUrl: PHOTO_SERVICIO_URL },
    { title: "Conferencia de Liderazgo Masculino", date: "Viernes, 11 de Octubre", time: "7:00 PM", location: "Templo Central", description: "Enseñanza sobre la Armadura de Dios y el rol del hombre cristiano.", photoUrl: PHOTO_CONFERENCIA_URL },
    { title: "Retiro Espiritual de Caballeros", date: "22 al 24 de Noviembre", time: "Todo el día", location: "Finca Villa Esperanza", description: "Tres días de comunión, oración y avivamiento.", photoUrl: PHOTO_RETIRO_URL }
];


// =========================================================================
// 2. LÓGICA DEL CARRUSEL DE LIDERAZGO
// =========================================================================
let currentSlide = 0;
const SLIDE_INTERVAL = 5000;
let autoSlideTimer;

function updateCarousel() {
    const slider = document.getElementById('carousel-slider');
    const dotsContainer = document.getElementById('carousel-dots');
    
    if (!slider || slider.children.length === 0) return;
    
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
        dot.classList.add('carousel-dot');
        if (index === currentSlide) {
            dot.classList.add('active');
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

    window.addEventListener('resize', updateCarousel);
}


// =========================================================================
// 3. LÓGICA DEL MODAL DE VENTAS (CONTRASEÑA)
// =========================================================================

function setupModalLogic() {
    const modal = document.getElementById('password-modal');
    const openButtons = [
        document.getElementById('open-modal-button'), 
        document.getElementById('open-modal-button-mobile') 
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
// 4. LÓGICA DE SECCIONES DINÁMICAS (MIEMBROS Y EVENTOS)
// =========================================================================

// --- MIEMBROS ---

function loadMembers() {
    const grid = document.getElementById('members-grid');
    const showMoreButton = document.getElementById('show-more-members');
    const showLessButton = document.getElementById('show-less-members'); 

    if (!grid || !showMoreButton || !showLessButton) return;

    grid.innerHTML = ''; 

    ALL_MEMBERS.slice(0, membersCurrentlyDisplayed).forEach(member => {
        const memberCard = document.createElement('div');
        
        memberCard.className = 'member-card bg-white rounded-xl shadow-md p-4 text-center hover:shadow-xl transition duration-300';
        memberCard.innerHTML = `
            <img src="${member.placeholder}" alt="${member.name}" 
                 onerror="this.onerror=null; this.src='${member.placeholder}';"
                 class="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full mx-auto mb-3 border-4 border-accent-blue/50">
            <p class="font-bold text-gray-900 truncate">${member.name}</p>
            <p class="text-xs text-gray-500">Caballero</p>
        `;
        grid.appendChild(memberCard);
    });

    if (membersCurrentlyDisplayed < ALL_MEMBERS.length) {
        showMoreButton.classList.remove('hidden');
    } else {
        showMoreButton.classList.add('hidden');
    }

    if (membersCurrentlyDisplayed > INITIAL_MEMBERS_DISPLAY) {
        showLessButton.classList.remove('hidden');
    } else {
        showLessButton.classList.add('hidden');
    }
}

function showMoreMembers() {
    membersCurrentlyDisplayed = Math.min(ALL_MEMBERS.length, membersCurrentlyDisplayed + MEMBERS_INCREMENT);
    loadMembers();
}

function showLessMembers() {
    membersCurrentlyDisplayed = INITIAL_MEMBERS_DISPLAY;
    loadMembers();
    
    const miembrosSection = document.getElementById('miembros');
    miembrosSection.scrollIntoView({ behavior: 'smooth' });
}

// --- EVENTOS ---

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
// 5. LÓGICA DE VIDEO Y ENLACES EXTERNOS
// =========================================================================

// Función para cambiar el video principal
window.loadVideoFromList = function(videoId, title) {
    const iframe = document.getElementById('video-iframe');
    const titleDisplay = document.getElementById('current-video-title');
    
    if (iframe && videoId) {
        // MEJORA: rel=0 (no mostrar videos relacionados) y modestbranding=1 (ocultar logo YT)
        iframe.src = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
    }
    
    if (titleDisplay) {
        titleDisplay.textContent = `Video Actual: ${title}`;
    }
};

function setupVideoListEventListeners() {
    document.querySelectorAll('.video-list-item').forEach(item => {
        item.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video-id');
            const videoTitle = this.getAttribute('data-video-title');
            if (videoId && videoTitle) {
                window.loadVideoFromList(videoId, videoTitle);
            }
        });
    });
}

// NUEVA FUNCIÓN: Configura los enlaces sociales y el formulario de peticiones
function setupExternalLinks() {
    // 1. Enlace de Navegación "Únete / Peticiones"
    const peticionesNavLink = document.getElementById('peticiones-nav-link');
    if (peticionesNavLink) {
        peticionesNavLink.href = PETICIONES_FORM_URL;
    }

    // 2. Enlaces del Footer (AÑADIDOS Y ACTUALIZADOS)
    const whatsappLink = document.getElementById('whatsapp-link');
    const facebookLink = document.getElementById('facebook-link');
    const youtubeLink = document.getElementById('youtube-link');
    const instagramLink = document.getElementById('instagram-link');
    const tiktokLink = document.getElementById('tiktok-link');
    
    if (whatsappLink) {
        whatsappLink.href = WHATSAPP_GROUP_URL;
    }
    
    if (facebookLink) {
        facebookLink.href = FACEBOOK_PAGE_URL;
    }

    if (youtubeLink) {
        youtubeLink.href = YOUTUBE_CHANNEL_URL;
    }

    if (instagramLink) {
        instagramLink.href = INSTAGRAM_PAGE_URL;
    }

    if (tiktokLink) {
        tiktokLink.href = TIKTOK_PAGE_URL;
    }
}


// =========================================================================
// 6. LÓGICA DEL MENÚ DE NAVEGACIÓN ACTIVO
// =========================================================================

function setupIntersectionObserver() {
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('#navbar a.active-link');

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            
            navLinks.forEach(link => {
                link.classList.remove('text-accent-blue', 'font-bold');
            });

            if (entry.isIntersecting) {
                const navLink = document.querySelector(`a[data-section="${entry.target.id}"]`);
                
                if (navLink) {
                    navLink.classList.add('text-accent-blue', 'font-bold');
                }
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
}


// =========================================================================
// 7. LISTENERS GLOBALES Y SETUP
// =========================================================================

function setupDynamicSectionEventListeners() {
    document.getElementById('show-more-members')?.addEventListener('click', showMoreMembers);
    document.getElementById('show-less-members')?.addEventListener('click', showLessMembers);
}

// =========================================================================
// 8. INICIALIZACIÓN AL CARGAR LA PÁGINA
// =========================================================================

window.onload = function() {
    // 1. Cargar las secciones dinámicas
    loadMembers();
    loadEvents();
    
    // 2. Inicializar el iFrame del video principal 
    window.loadVideoFromList(MAIN_VIDEO_ID, MAIN_VIDEO_TITLE);
   
    // 3. Inicializar el carrusel
    setupCarouselEventListeners();
    updateCarousel();
    startAutoSlide();
    
    // 4. Configurar la lógica del modal de ventas
    setupModalLogic();
    
    // 5. Configurar los enlaces sociales y de peticiones
    setupExternalLinks(); 
    
    // 6. Inicializar el observador para el menú activo
    setupIntersectionObserver();
    
    // 7. Configurar el cambio de video al hacer clic en la lista
    setupVideoListEventListeners();

    // 8. Configurar listeners de botones dinámicos (Miembros)
    setupDynamicSectionEventListeners();

    // 9. Permite cerrar modal con la tecla ESC y enviar con ENTER
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('password-modal');
        if (modal && !modal.classList.contains('hidden')) {
            if (e.key === 'Escape') {
                modal.classList.add('hidden');
            } else if (e.key === 'Enter') {
                document.getElementById('access-button').click();
            }
        }
    });
};
