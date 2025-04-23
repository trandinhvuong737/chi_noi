/**
 * Module pour gérer les notifications et messages utilisateur
 */

/**
 * Affiche une notification à l'utilisateur
 * @param {string} message - Message à afficher
 * @param {string} type - Type de notification ('info', 'success', 'error')
 */
export function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.classList.add('notification', `notification-${type}`);
    
    // Créer le contenu de la notification
    notification.innerHTML = `
        <div class="notification-content">
            <p>${message}</p>
            ${type === 'success' && message.includes('thành công') ? 
              '<p class="notification-note">Nhân viên sẽ liên hệ lại với bạn trong thời gian sớm nhất.</p>' : ''}
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    document.body.appendChild(notification);
    
    // Ajouter l'effet d'apparition
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Gérer la fermeture de la notification
    const closeBtn = notification.querySelector('.notification-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        });
    }
    
    // Auto-masquer pour les notifications de type info
    if (type === 'info') {
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentNode) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, 8000);
    }
}