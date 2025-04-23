/**
 * Module pour initialiser et gérer les fonctionnalités EmailJS
 */

// Clé API EmailJS
const API_KEY = "bKA9jCSE_LDL8selt";

/**
 * Initialise EmailJS avec la clé API
 */
export function initEmailJS() {
    emailjs.init(API_KEY);
}

/**
 * Envoie un email via EmailJS
 * @param {string} serviceId - ID du service EmailJS
 * @param {string} templateId - ID du template EmailJS
 * @param {Object} params - Paramètres pour le template
 * @returns {Promise} - Promesse du résultat de l'envoi
 */
export function sendEmail(serviceId, templateId, params) {
    return emailjs.send(serviceId, templateId, params);
}

/**
 * Valide un format d'email
 * @param {string} email - Adresse email à valider
 * @returns {boolean} - True si l'email est valide
 */
export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}