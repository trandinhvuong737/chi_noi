/**
 * Module pour gérer les animations du site
 */

/**
 * Initialise toutes les animations du site
 */
export function initAnimation() {
    // Initialiser les animations de défilement
    initScrollAnimation();
    
    // Initialiser les effets de survol des images
    initImageHoverEffects();
}

/**
 * Initialise les animations déclenchées par le défilement
 */
function initScrollAnimation() {
    // Définir les éléments à animer
    const elements = document.querySelectorAll('.featured-item, .product-item, .testimonial, .about-image, .about-text, .contact-info, .contact-form');
    
    // Définir les styles initiaux
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Fonction pour animer les éléments lorsqu'ils entrent dans la vue
    const animateOnScroll = () => {
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Déclencher l'animation initiale
    animateOnScroll();
    
    // Ajouter l'événement de défilement
    window.addEventListener('scroll', animateOnScroll);
}

/**
 * Initialise les effets de survol des images de produits
 */
function initImageHoverEffects() {
    const productImages = document.querySelectorAll('.product-item img, .featured-item img');
    
    productImages.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.1)';
            img.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });
}