/**
 * Module pour gérer les formulaires du site
 */

import { validateEmail, sendEmail } from '../utils/emailjs.js';
import { showNotification } from '../utils/notifications.js';
import { showLoading, hideLoading } from './ui.js';

/**
 * Initialise tous les formulaires du site
 */
export function initForms() {
    // Initialise le formulaire de contact
    initContactForm();
    
    // Initialise le formulaire d'inscription à la newsletter
    initNewsletterForm();
}

/**
 * Initialise le formulaire de contact
 */
function initContactForm() {
    const contactForm = document.querySelector('#contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validation simple
        let valid = true;
        const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                valid = false;
                input.style.borderColor = 'red';
            } else {
                input.style.borderColor = '#ddd';
            }
        });
        
        if (valid) {
            // Afficher le chargement
            showLoading();
            
            // Récupérer les valeurs du formulaire
            const templateParams = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                phone: document.getElementById('phone').value || 'Không cung cấp',
                serviceType: document.getElementById('serviceType').value || 'Không chọn',
                message: document.getElementById('message').value,
                to_email: "info@tamlinhviet.com" // Adresse email fixe pour recevoir les informations
            };
            
            // Envoyer l'email via EmailJS (utiliser template_k8rk3k9 pour le formulaire de contact)
            sendEmail('service_fznh3hs', 'template_k8rk3k9', templateParams)
                .then(function(response) {
                    hideLoading();
                    console.log('SUCCESS!', response.status, response.text);
                    showNotification('Cảm ơn bạn đã gửi tin nhắn! Chúng tôi sẽ liên hệ lại sớm nhất có thể.', 'success');
                    contactForm.reset();
                }, function(error) {
                    hideLoading();
                    console.log('FAILED...', error);
                    showNotification('Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau!', 'error');
                });
        } else {
            showNotification('Vui lòng điền đầy đủ thông tin bắt buộc!', 'error');
        }
    });
}

/**
 * Initialise le formulaire d'inscription à la newsletter
 */
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.footer-newsletter form');
    
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        if (emailInput.value.trim() && validateEmail(emailInput.value)) {
            showNotification('Cảm ơn bạn đã đăng ký! Bạn sẽ nhận được các thông tin mới nhất từ chúng tôi.', 'success');
            newsletterForm.reset();
        } else {
            showNotification('Vui lòng nhập địa chỉ email hợp lệ!', 'error');
        }
    });
}

/**
 * Initialise le formulaire de réservation
 * @param {Object} product - Le produit à réserver
 */
export function showBookingForm(product) {
    // Crée une date par défaut
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate());
    const defaultDateStr = defaultDate.toISOString().split('T')[0]; // Format YYYY-MM-DD
    
    // Crée le modal du formulaire de réservation
    const modalElement = document.createElement('div');
    modalElement.classList.add('modal-container');
    modalElement.setAttribute('id', 'bookingFormModal');
    modalElement.innerHTML = `
        <div class="booking-modal">
            <div class="booking-content">
                <div class="booking-header">
                    <h2>Đặt Mâm Cúng</h2>
                    <button class="close-modal" id="closeBookingBtn">&times;</button>
                </div>
                <div class="booking-body">
                    <div class="booking-product-info">
                        <img src="${product.image}" alt="${product.name}">
                        <div>
                            <h3>${product.name}</h3>
                            <p class="price">${product.price}</p>
                            ${product.selectedPackage ? `<p class="package-name">Gói: ${product.selectedPackage.name}</p>` : ''}
                        </div>
                    </div>
                    
                    <div class="direct-contact-info">
                        <h3>Liên hệ trực tiếp:</h3>
                        <div class="contact-options">
                            <a href="tel:0905368727" class="contact-option phone">
                                <i class="fas fa-phone-alt"></i>
                                <span>0905368727</span>
                            </a>
                            <a href="https://www.facebook.com/people/Ch%E1%BB%8B-N%E1%BB%93i-D%E1%BB%8Bch-V%E1%BB%A5-M%C3%A2m-C%C3%BAng-Th%C3%B4i-N%C3%B4i-%C4%90%E1%BA%A7y-Th%C3%A1ng-T%E1%BA%A1i-%C4%90%C3%A0-N%E1%BA%B5ng/61556432147583/" target="_blank" class="contact-option facebook">
                                <i class="fab fa-facebook-f"></i>
                                <span>Facebook Chị Nồi</span>
                            </a>
                            <a href="https://zalo.me/0905368727" target="_blank" class="contact-option zalo">
                                <i class="fas fa-comment-dots"></i>
                                <span>Zalo 0905368727</span>
                            </a>
                        </div>
                    </div>
                    
                    <div class="form-divider">
                        <span>Hoặc đặt mâm qua form</span>
                    </div>
                    
                    <form id="bookingForm" class="contact-form">
                        <div class="form-group">
                            <input type="text" id="fullName" name="fullName" placeholder="Họ và tên" required>
                        </div>
                        <div class="form-group">
                            <input type="tel" id="phone" name="phone" placeholder="Số điện thoại" required>
                        </div>
                        <div class="form-group">
                            <input type="email" id="email" name="email" placeholder="Email">
                        </div>
                        <div class="form-group">
                            <input type="text" id="address" name="address" placeholder="Địa chỉ" required>
                        </div>
                        <div class="form-group">
                            <label for="date">Ngày cúng</label>
                            <input type="date" id="date" name="date" min="${defaultDateStr}" value="${defaultDateStr}" required>
                        </div>
                        <div class="form-group">
                            <select id="time" name="time" required>
                                <option value="" disabled selected>Chọn giờ cúng</option>
                                <option value="07:00">7:00</option>
                                <option value="09:00">9:00</option>
                                <option value="11:00">11:00</option>
                                <option value="13:00">13:00</option>
                                <option value="15:00">15:00</option>
                                <option value="17:00">17:00</option>
                                <option value="19:00">19:00</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <textarea id="note" name="note" rows="4" placeholder="Yêu cầu đặc biệt hoặc thông tin thêm..."></textarea>
                        </div>
                        <button type="submit" class="btn">Xác nhận đặt mâm cúng</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modalElement);
    
    // Configure l'événement de fermeture du modal
    const closeBtn = document.getElementById('closeBookingBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            document.body.removeChild(modalElement);
        });
    }
    
    // Configure l'événement de soumission du formulaire
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        setupBookingFormValidation(bookingForm, product);
    }
    
    // Ferme le modal quand on clique en dehors
    modalElement.addEventListener('click', function(e) {
        if (e.target === modalElement) {
            document.body.removeChild(modalElement);
        }
    });
}

/**
 * Configure la validation du formulaire de réservation
 * @param {HTMLFormElement} bookingForm - Formulaire à valider
 * @param {Object} product - Produit concerné par la réservation
 */
function setupBookingFormValidation(bookingForm, product) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Vérifie le formulaire
        let valid = true;
        const requiredInputs = bookingForm.querySelectorAll('[required]');
        
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                valid = false;
                input.style.borderColor = 'red';
            } else {
                input.style.borderColor = '#ddd';
            }
        });
        
        if (valid) {
            // Affiche le chargement
            showLoading();
            
            // Récupère les valeurs du formulaire
            const formData = new FormData(bookingForm);
            
            // Prépare les données pour l'envoi de l'email
            const templateParams = {
                from_name: formData.get('fullName'),
                from_email: formData.get('email') || 'không cung cấp',
                phone: formData.get('phone'),
                address: formData.get('address'),
                message: formData.get('note') || 'Không có ghi chú',
                order_date: formData.get('date'),
                order_time: formData.get('time'),
                product_info: product.name,
                product_price: product.price,
                to_email: "info@tamlinhviet.com"
            };
            
            // Envoie l'email via EmailJS avec le template de commande de mâm
            sendEmail('service_fznh3hs', 'template_b0holsd', templateParams)
                .then(function(response) {
                    hideLoading();
                    console.log('ĐẶT MÂM CÚNG THÀNH CÔNG!', response.status, response.text);
                    
                    // Ferme tous les modals sur la page
                    const allModals = document.querySelectorAll('.modal-container');
                    allModals.forEach(modal => {
                        if (document.body.contains(modal)) {
                            document.body.removeChild(modal);
                        }
                    });
                    
                    // Affiche la notification de succès
                    showNotification('Đặt mâm cúng thành công! Chúng tôi sẽ liên hệ với bạn để xác nhận trong thời gian sớm nhất.', 'success');
                }, function(error) {
                    hideLoading();
                    console.log('LỖI KHI ĐẶT MÂM CÚNG', error);
                    showNotification('Có lỗi xảy ra khi đặt mâm cúng. Vui lòng thử lại sau hoặc liên hệ trực tiếp qua số điện thoại.', 'error');
                });
        } else {
            showNotification('Vui lòng điền đầy đủ thông tin bắt buộc!', 'error');
        }
    });
}