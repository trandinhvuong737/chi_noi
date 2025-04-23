// Main entry point for the application
import { initUI } from './js/modules/ui.js';
import { initProducts } from './js/modules/products.js';
import { initAnimation } from './js/modules/animations.js';
import { initForms } from './js/modules/forms.js';
import { initEmailJS } from './js/utils/emailjs.js';

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS
    initEmailJS();
    
    // Initialize UI components
    initUI();
    
    // Initialize product display and filters
    initProducts();
    
    // Initialize animations
    initAnimation();
    
    // Initialize forms
    initForms();
});