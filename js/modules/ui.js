/**
 * Module de gestion de l'interface utilisateur
 */

import { showNotification } from '../utils/notifications.js';

/**
 * Initialise les composants de l'interface utilisateur
 */
export function initUI() {
    // Initialiser le header scroll effect
    initHeaderScroll();
    
    // Initialiser le menu mobile
    initMobileMenu();
    
    // Initialiser le smooth scrolling pour les liens d'ancrage
    initSmoothScrolling();
}

/**
 * Gère l'effet de défilement de l'en-tête
 */
function initHeaderScroll() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Initialise le menu mobile
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    
    if (!hamburger || !nav) return;
    
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        });
    });
}

/**
 * Initialise le défilement fluide pour les liens d'ancrage
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Affiche une superposition de chargement
 */
export function showLoading() {
    const loadingEl = document.createElement('div');
    loadingEl.classList.add('loading-overlay');
    loadingEl.innerHTML = `
        <div class="spinner"></div>
        <p>Đang tải dữ liệu...</p>
    `;
    document.body.appendChild(loadingEl);
}

/**
 * Masque la superposition de chargement
 */
export function hideLoading() {
    const loadingEl = document.querySelector('.loading-overlay');
    if (loadingEl) {
        document.body.removeChild(loadingEl);
    }
}