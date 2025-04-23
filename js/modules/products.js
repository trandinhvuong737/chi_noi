/**
 * Module pour gérer les produits et leur affichage
 */

import { showLoading, hideLoading } from './ui.js';
import { showNotification } from '../utils/notifications.js';
import { showBookingForm } from './forms.js';

// Variable pour stocker les produits et catégories
let allProducts = [];
let allCategories = [];

// Mappages des catégories
const categoryMappings = {
    'daythangthoinoi': 'MÂM CÚNG ĐẦY THÁNG - THÔI NÔI CHO BÉ',
    'khaitruongnhaptrach': 'MÂM CÚNG KHAI TRƯƠNG - NHẬP TRẠCH-THẦN TÀI',
    'tatnien': 'MÂM CÚNG TẤT NIÊN- CÚNG ĐẤT',
    'vankhan': 'VĂN KHẤN'
};

/**
 * Initialise la section produits
 */
export function initProducts() {
    loadProductData();
}

/**
 * Charge les données des produits depuis l'API ou les données factices
 */
async function loadProductData() {
    try {
        showLoading();
        
        // Récupère les données des produits
        const { products, categories } = await fetchAllProducts();
        allProducts = products;
        allCategories = categories;
        
        // Affiche les produits sur la page
        renderCategories(allCategories);
        renderFeaturedProducts(allProducts);
        renderAllProducts(allProducts);
        
        hideLoading();
        
        // Affiche une notification de succès
        showNotification('Dữ liệu sản phẩm đã được tải thành công!');
    } catch (error) {
        console.error('Lỗi khởi tạo dữ liệu sản phẩm:', error);
        hideLoading();
        showNotification('Đã xảy ra lỗi khi tải dữ liệu!', 'error');
    }
}

/**
 * Récupère les données de tous les produits
 * @returns {Promise<Object>} - Promesse avec les produits et catégories
 */
async function fetchAllProducts() {
    try {
        showLoading();
        
        // Utilise des données fictives au lieu d'appeler une API
        console.log('Sử dụng dữ liệu giả...');
        return getFakeProducts();
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        return getFakeProducts();
    } finally {
        hideLoading();
    }
}

/**
 * Récupère les détails d'un produit spécifique
 * @param {number|string} productId - ID du produit
 * @returns {Promise<Object|null>} - Promesse avec les détails du produit
 */
async function fetchProductDetail(productId) {
    try {
        const { products } = getFakeProducts();
        const product = products.find(p => p.id == productId);
        
        if (product) {
            // Ajoute une description plus détaillée pour la vue détaillée
            product.body = `${product.description} Đây là mâm cúng được chuẩn bị cẩn thận, chu đáo theo phong tục tâm linh truyền thống của người Việt Nam. Tất cả các lễ vật đều được lựa chọn kỹ lưỡng, đảm bảo sự trang nghiêm và ý nghĩa trong nghi lễ.`;
            return product;
        }
        
        return null;
    } catch (error) {
        console.error(`Lỗi khi lấy chi tiết sản phẩm ${productId}:`, error);
        return null;
    }
}

/**
 * Affiche les catégories de produits
 * @param {Array} categories - Tableau de catégories à afficher
 */
function renderCategories(categories) {
    const categoryNav = document.querySelector('.category-nav');
    
    if (!categoryNav) return;
    
    // Efface le contenu actuel
    categoryNav.innerHTML = '';
    
    // Ajoute le bouton "Tous"
    categoryNav.innerHTML = `
        <button class="category-btn active" data-filter="all">
            Tất cả
            <span class="category-count">${allProducts.length}</span>
        </button>
    `;
    
    // Ajoute les catégories de l'API
    categories.forEach(category => {
        const categoryHTML = `
            <button class="category-btn" data-filter="${category.slug}">
                ${category.name}
                <span class="category-count">${category.count}</span>
            </button>
        `;
        
        categoryNav.innerHTML += categoryHTML;
    });
    
    // Active à nouveau le filtre de produits
    setTimeout(() => {
        initializeProductFilter();
    }, 0);
}

/**
 * Affiche les produits mis en avant
 * @param {Array} products - Tableau de produits à afficher
 */
function renderFeaturedProducts(products) {
    const featuredContainer = document.querySelector('.featured-grid');
    if (!featuredContainer) return;
    
    // Filtre les produits mis en avant
    const featuredProducts = products.filter(product => product.featured);
    
    // Efface le contenu actuel
    featuredContainer.innerHTML = '';
    
    // Ajoute les produits au conteneur
    featuredProducts.slice(0, 3).forEach(product => {
        const productHTML = `
            <div class="featured-item" data-id="${product.id}">
                ${product.badge ? `<div class="badge">${product.badge}</div>` : ''}
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-actions">
                    <a href="#" class="btn-small view-detail btn-full-width" data-id="${product.id}">Chi tiết</a>
                </div>
            </div>
        `;
        
        featuredContainer.innerHTML += productHTML;
    });
    
    // Ajoute des événements pour les boutons de détail
    addProductEventListeners();
}

/**
 * Affiche tous les produits
 * @param {Array} products - Tableau de produits à afficher
 */
function renderAllProducts(products) {
    const productsContainer = document.querySelector('.products-grid');
    if (!productsContainer) return;
    
    // Efface le contenu actuel
    productsContainer.innerHTML = '';
    
    // Ajoute une nouvelle classe pour passer en mode liste
    productsContainer.classList.remove('products-grid');
    productsContainer.classList.add('products-list');
    
    // Ajoute les produits au conteneur en mode liste
    products.forEach(product => {
        // S'assure d'ajouter la bonne classe de catégorie pour que le filtre fonctionne
        const productHTML = `
            <div class="product-item ${product.category}" data-id="${product.id}" data-category="${product.category}">
                <div class="product-list-item">
                    <div class="product-list-image">
                        ${product.badge ? `<div class="badge">${product.badge}</div>` : ''}
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-list-content">
                        <h3>${product.name}</h3>
                        <div class="product-category">${product.categoryName}</div>
                        <p>${product.description}</p>
                        <div class="product-actions">
                            <a href="#" class="btn-small view-detail" data-id="${product.id}">Chi tiết</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        productsContainer.innerHTML += productHTML;
    });
    
    // Ajoute des événements pour les boutons de détail
    addProductEventListeners();
}

/**
 * Ajoute des écouteurs d'événements aux boutons des produits
 */
function addProductEventListeners() {
    document.querySelectorAll('.view-detail').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-id');
            showProductDetail(productId);
        });
    });
}

/**
 * Affiche les détails d'un produit
 * @param {number|string} productId - ID du produit à afficher
 */
async function showProductDetail(productId) {
    try {
        // Vérifie si un modal est déjà affiché et le supprime
        const existingModal = document.querySelector('.modal-container');
        if (existingModal) {
            document.body.removeChild(existingModal);
        }
        
        showLoading();
        const product = allProducts.find(p => p.id == productId);
        
        if (!product) {
            throw new Error('Không tìm thấy thông tin sản phẩm');
        }
        
        // Tente de récupérer plus de détails s'il y a une API dédiée
        let apiProductDetail = null;
        try {
            apiProductDetail = await fetchProductDetail(productId);
        } catch (detailError) {
            console.log('Không có API chi tiết riêng, sử dụng dữ liệu có sẵn');
        }
        
        hideLoading();
        
        // Prépare le HTML pour le diaporama d'images
        let imagesGalleryHTML = '';
        if (product.images && product.images.length > 0) {
            // Crée le HTML pour le diaporama
            imagesGalleryHTML = `
                <div class="product-slideshow">
                    <div class="slideshow-container">
                        ${product.images.map((img, index) => `
                            <div class="slide fade${index === 0 ? ' active' : ''}">
                                <div class="slide-number">${index + 1} / ${product.images.length}</div>
                                <img src="${img}" alt="${product.name} - Ảnh ${index + 1}">
                                ${product.badge && index === 0 ? `<div class="badge">${product.badge}</div>` : ''}
                            </div>
                        `).join('')}
                        
                        <a class="prev">&#10094;</a>
                        <a class="next">&#10095;</a>
                    </div>
                    
                    <div class="dots-container">
                        ${product.images.map((_, index) => `
                            <span class="dot${index === 0 ? ' active' : ''}" data-index="${index}"></span>
                        `).join('')}
                    </div>
                </div>
            `;
        } else {
            // S'il n'y a pas plusieurs images, affiche uniquement l'image principale
            imagesGalleryHTML = `
                <div class="product-detail-image">
                    <img src="${product.image}" alt="${product.name}">
                    ${product.badge ? `<div class="badge">${product.badge}</div>` : ''}
                </div>
            `;
        }
        
        // Crée le HTML pour les options de forfait s'il y en a
        let packageOptionsHTML = '';
        if (product.packages && product.packages.length > 0) {
            // Par défaut, affiche les informations du forfait de base
            const defaultPackage = product.packages[0];
            
            packageOptionsHTML = `
                <div class="package-options">
                    <h3>Lựa chọn gói dịch vụ:</h3>
                    <div class="package-buttons">
                        ${product.packages.map(pkg => `
                            <button class="package-btn ${pkg.id === 'basic' ? 'active' : ''}" 
                                    data-package-id="${pkg.id}"
                                    data-price="${pkg.price}"
                                    data-description="${pkg.description}">
                                ${pkg.name}
                            </button>
                        `).join('')}
                    </div>
                </div>
                <div class="price-container">
                    <span class="price" id="package-price">${defaultPackage.price}</span>
                </div>
                <div class="description">
                    <h3>Mô tả:</h3>
                    <p id="package-description">${defaultPackage.description}</p>
                    ${apiProductDetail && apiProductDetail.body ? `<p>${apiProductDetail.body}</p>` : ''}
                </div>
            `;
        } else {
            // S'il n'y a pas de forfaits, affiche la description et le prix habituels
            packageOptionsHTML = `
                <div class="price-container">
                    <span class="price">${product.price}</span>
                </div>
                <div class="description">
                    <h3>Mô tả:</h3>
                    <p>${product.description || ''}</p>
                    ${apiProductDetail && apiProductDetail.body ? `<p>${apiProductDetail.body}</p>` : ''}
                </div>
            `;
        }
        
        // Ajoute le modal au body
        const modalElement = document.createElement('div');
        modalElement.classList.add('modal-container');
        modalElement.setAttribute('id', 'productDetailModal');
        modalElement.innerHTML = `
            <div class="product-modal">
                <div class="product-detail">
                    <div class="product-detail-header">
                        <h2>${product.name}</h2>
                        <button class="close-modal" id="closeModalBtn">&times;</button>
                    </div>
                    <div class="product-detail-content">
                        ${imagesGalleryHTML}
                        <div class="product-detail-info">
                            <div class="category-tag-container">
                                <span class="category-tag">${product.categoryName || product.category}</span>
                            </div>
                            ${packageOptionsHTML}
                            <div class="detail-actions">
                                <button class="btn add-to-cart-detail">Đặt mâm cúng ngay</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modalElement);
        
        // S'assure que le modal a été ajouté au DOM avant de configurer les événements
        setTimeout(() => {
            // Ajoute un événement pour fermer le modal
            const closeBtn = document.getElementById('closeModalBtn');
            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    // Trouve le modal-container le plus proche pour le supprimer
                    const modalToRemove = document.getElementById('productDetailModal');
                    if (modalToRemove && document.body.contains(modalToRemove)) {
                        document.body.removeChild(modalToRemove);
                    }
                });
            }
            
            // Ferme le modal en cliquant à l'extérieur
            modalElement.addEventListener('click', function(e) {
                if (e.target === modalElement) {
                    if (document.body.contains(modalElement)) {
                        document.body.removeChild(modalElement);
                    }
                }
            });
            
            // Gère l'événement de commande de mâm
            const addToCartBtn = modalElement.querySelector('.add-to-cart-detail');
            if (addToCartBtn) {
                addToCartBtn.addEventListener('click', function() {
                    // Trouve le forfait sélectionné
                    const selectedPackageBtn = modalElement.querySelector('.package-btn.active');
                    let selectedPackage = null;
                    
                    if (selectedPackageBtn) {
                        const packageId = selectedPackageBtn.getAttribute('data-package-id');
                        selectedPackage = product.packages.find(pkg => pkg.id === packageId);
                    }
                    
                    // S'il y a un forfait sélectionné, transmets les informations du forfait
                    if (selectedPackage) {
                        const customProduct = {
                            ...product,
                            price: selectedPackage.price,
                            description: selectedPackage.description,
                            selectedPackage: selectedPackage
                        };
                        showBookingForm(customProduct);
                    } else {
                        showBookingForm(product);
                    }
                });
            }
            
            // Événement de sélection de forfait
            const packageBtns = modalElement.querySelectorAll('.package-btn');
            const priceElement = document.getElementById('package-price');
            const descriptionElement = document.getElementById('package-description');
            
            if (packageBtns.length > 0) {
                packageBtns.forEach(btn => {
                    btn.addEventListener('click', function() {
                        // Supprime active de tous les boutons
                        packageBtns.forEach(b => b.classList.remove('active'));
                        // Ajoute active au bouton sélectionné
                        this.classList.add('active');
                        
                        // Met à jour le prix et la description
                        if (priceElement) {
                            priceElement.textContent = this.getAttribute('data-price');
                        }
                        
                        if (descriptionElement) {
                            // Utilise innerHTML au lieu de textContent pour prendre en charge les balises HTML
                            descriptionElement.innerHTML = this.getAttribute('data-description');
                        }
                    });
                });
            }
            
            // Initialise le diaporama s'il y a plusieurs images
            if (product.images && product.images.length > 0) {
                // Récupère les éléments de contrôle du diaporama
                const slides = document.querySelectorAll('.slide');
                const dots = document.querySelectorAll('.dot');
                const prevBtn = document.querySelector('.prev');
                const nextBtn = document.querySelector('.next');
                let currentSlideIndex = 0;
                
                // Fonction pour changer de diapositive
                function showSlide(n) {
                    // Réinitialise l'index s'il dépasse les limites
                    if (n >= slides.length) currentSlideIndex = 0;
                    if (n < 0) currentSlideIndex = slides.length - 1;
                    
                    // Masque toutes les diapositives
                    slides.forEach(slide => {
                        slide.classList.remove('active');
                    });
                    
                    // Supprime active de tous les points
                    dots.forEach(dot => {
                        dot.classList.remove('active');
                    });
                    
                    // Affiche la diapositive actuelle
                    slides[currentSlideIndex].classList.add('active');
                    dots[currentSlideIndex].classList.add('active');
                }
                
                // Passe à la diapositive suivante
                function nextSlide() {
                    currentSlideIndex++;
                    showSlide(currentSlideIndex);
                }
                
                // Passe à la diapositive précédente
                function prevSlide() {
                    currentSlideIndex--;
                    showSlide(currentSlideIndex);
                }
                
                // Configure l'événement de clic pour le bouton précédent
                if (prevBtn) {
                    prevBtn.addEventListener('click', function() {
                        prevSlide();
                    });
                }
                
                // Configure l'événement de clic pour le bouton suivant
                if (nextBtn) {
                    nextBtn.addEventListener('click', function() {
                        nextSlide();
                    });
                }
                
                // Configure l'événement de clic pour les points
                dots.forEach((dot, index) => {
                    dot.addEventListener('click', function() {
                        currentSlideIndex = index;
                        showSlide(currentSlideIndex);
                    });
                });
                
                // Change automatiquement de diapositive toutes les 5 secondes
                let slideInterval = setInterval(nextSlide, 5000);
                
                // Arrête le défilement automatique au survol du diaporama
                const slideshowContainer = document.querySelector('.slideshow-container');
                if (slideshowContainer) {
                    slideshowContainer.addEventListener('mouseenter', function() {
                        clearInterval(slideInterval);
                    });
                    
                    slideshowContainer.addEventListener('mouseleave', function() {
                        slideInterval = setInterval(nextSlide, 5000);
                    });
                }
            }
        }, 100); // Délai de 100 ms pour s'assurer que le DOM a été mis à jour
        
    } catch (error) {
        console.error('Lỗi khi hiển thị chi tiết sản phẩm:', error);
        hideLoading();
        showNotification('Không thể hiển thị chi tiết sản phẩm', 'error');
    }
}

/**
 * Initialise le filtre de produits
 */
function initializeProductFilter() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productItems = document.querySelectorAll('.product-item');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Supprime la classe active de tous les boutons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Ajoute la classe active au bouton cliqué
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            productItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Génère des données produit fictives
 * @returns {Object} Données produit et catégories
 */
function getFakeProducts() {
    // Crée une liste de forfaits fixe
    var packages = [
        {
            id: 'basic',
            name: 'Cơ bản',
            price: '1.380,000đ - 1.750.000đ',
            description: `
                1- Trái Cây<br>
                2- Hoa Tươi<br>
                3- Trầu câu<br>
                4- Trà, nhang cúng<br>
                5- Rượu<br>
                6- Nước (theo tông màu và theo yêu cầu)<br>
                7- Bánh tráng<br>
                8- Xôi lớn, Chè lớn<br>
                9- Xôi nhỏ, chè nhỏ (12 cái)<br>
                10- Bánh Đông sương lớn 4D<br>
                11- Gà trống tréo cánh<br>
                12- Bộ giấy cúng đầy tháng- thôi nôi<br>
                13- Văn khấn<br>
                14- Hashtag Cầm tay thôi nôi- đầy tháng<br>
            `
        },
        {
            id: 'premium',
            name: 'Cao cấp',
            price: '1.850.000đ - 2.150.000đ',
            description: `
                1- Trái Cây<br>
                2- Hoa Tươi<br>
                3- Trầu câu<br>
                4- Trà, nhang cúng<br>
                5- Rượu<br>
                6- Nước (theo tông màu và theo yêu cầu)<br>
                7- Bánh tráng<br>
                8- Xôi lớn, Chè lớn<br>
                9- Xôi nhỏ, chè nhỏ (12 cái)<br>
                10- Bánh Đông sương lớn 4D<br>
                11- Bánh đông sương nhỏ 2D<br>
                12- Gà trống tréo cánh<br>
                13- Bộ giấy cúng đầy tháng- thôi nôi<br>
                14- Văn khấn<br>
                15- Hashtag Cầm tay thôi nôi- đầy tháng<br>
            `
        },
        {
            id: 'vip',
            name: 'VIP',
            price: '2.250.000đ - 2.257.000đ',
            description: `
                1- Trái Cây<br>
                2- Hoa Tươi<br>
                3- Trầu câu<br>
                4- Trà, nhang cúng<br>
                5- Rượu<br>
                6- Nước (theo tông màu và theo yêu cầu)<br>
                7- Bánh tráng<br>
                8- Xôi lớn, Chè lớn<br>
                9- Xôi nhỏ, chè nhỏ (12 cái)<br>
                10- Bánh Đông sương 4D lớn<br>
                11- Bánh đông sương nhỏ 4D/2D (12 cái)<br>
                12- Bánh bao tạo hình lớn<br>
                13- Bánh bao tạo hình nhỏ (12 cái)<br>
                14- Gà trống tréo cánh<br>
                16- Bộ giấy cúng đầy tháng- thôi nôi<br>
                17- Văn khấn<br>
                18- Bảng Tên<br>
                19- Hashtag Cầm tay thôi nôi- đầy tháng<br>
            `
        },
        {
            id: 'vip-pro',
            name: 'VIP Pro',
            price: '2.750.000đ - 3.570.000đ',
            description: `
                1- Trái Cây LÃNG<br>
                2- Hoa Tươi LÃNG<br>
                3- Trầu câu<br>
                4- Trà, nhang cúng<br>
                5- Rượu<br>
                6- Nước (theo tông màu và theo yêu cầu)<br>
                7- Bánh tráng<br>
                8- Xôi lớn, Chè lớn<br>
                9- Xôi nhỏ, chè nhỏ (12 cái)<br>
                10- Bánh Đông sương 4D lớn<br>
                11- Bánh đông sương nhỏ 4D (12 cái)<br>
                12- Bánh bao tạo hình lớn<br>
                13- Bánh bao tạo hình nhỏ (12 cái)<br>
                14- Gà trống tréo cánh<br>
                16- Bộ giấy cúng đầy tháng- thôi nôi<br>
                17- Văn khấn<br>
                18- Bảng Tên<br>
                19- Hashtag Cầm tay thôi nôi- đầy tháng<br>
            `
        }
    ];
    const products = [
        {
            id: 1,
            name: 'MÂM CÚNG ĐẦY THÁNG - THÔI NÔI CHO BÉ',
            description: 'Mâm cúng đầy tháng - thôi nôi cho bé đầy đủ, trang trọng với đồ cúng theo phong tục truyền thống Việt Nam.',
            price: '650.000đ',
            category: 'daythangthoinoi',
            categoryName: 'MÂM CÚNG ĐẦY THÁNG - THÔI NÔI CHO BÉ',
            image: 'images/daythangthoinoi/0b125d86c9207a7e23316.jpg',
            images: [
                'images/daythangthoinoi/0b125d86c9207a7e23316.jpg',
                'images/daythangthoinoi/1fd1c8625ec4ed9ab4d51.jpg',
                'images/daythangthoinoi/02eb3b15aeb31ded44a211.jpg',
                'images/daythangthoinoi/5f2c438ad72c64723d3d7.jpg',
                'images/daythangthoinoi/06df6dfdff5b4c05154a12.jpg',
                'images/daythangthoinoi/29d6acf138578b09d2464.jpg',
                'images/daythangthoinoi/060be3af7409c7579e182.jpg',
                'images/daythangthoinoi/76de2b45bee30dbd54f210.jpg',
                'images/daythangthoinoi/392a12ed814b32156b5a17.jpg',
                'images/daythangthoinoi/516a429cd03a63643a2b14.jpg',
                'images/daythangthoinoi/5004ce6f5ac9e997b0d85.jpg',
                'images/daythangthoinoi/29708d6f18c9ab97f2d89.jpg',
                'images/daythangthoinoi/853411e38645351b6c543.jpg',
                'images/daythangthoinoi/b87f2e19bdbf0ee157ae16.jpg',
                'images/daythangthoinoi/c4bd4693d535666b3f2415.jpg',
                'images/daythangthoinoi/c14a775ae7fc54a20ded18.jpg',
                'images/daythangthoinoi/dac1aac33f658c3bd5748.jpg',
                'images/daythangthoinoi/fec6c54057e6e4b8bdf713.jpg',
            ],
            featured: true,
            badge: 'Phổ biến',
            packages: packages,
        },
        {
            id: 2,
            name: 'MÂM CÚNG KHAI TRƯƠNG - NHẬP TRẠCH-THẦN TÀI',
            description: 'Mâm cúng Khai Trương - Nhập Trạch - Thần Tài đầy đủ, trang trọng với đồ cúng theo phong tục truyền thống Việt Nam.',
            price: '850.000đ',
            category: 'khaitruongnhaptrach',
            categoryName: 'MÂM CÚNG KHAI TRƯƠNG - NHẬP TRẠCH-THẦN TÀI',
            image: 'images/khaitruongnhaptrach/2c409756f2f741a918e624.jpg',
            images: [
                'images/khaitruongnhaptrach/2c409756f2f741a918e624.jpg',
                'images/khaitruongnhaptrach/48290f7c68dddb8382cc20.jpg',
                'images/khaitruongnhaptrach/a3c369870b26b878e13727.jpg',
                'images/khaitruongnhaptrach/b6e9525135f086aedfe121.jpg',
                'images/khaitruongnhaptrach/ca259500f2a141ff18b019.jpg',
                'images/khaitruongnhaptrach/ceb7ed828f233c7d653226.jpg',
                'images/khaitruongnhaptrach/d55849572df69ea8c7e722.jpg',
                'images/khaitruongnhaptrach/eb6ed6d7b3760028596725.jpg',
                'images/khaitruongnhaptrach/f7b9c416a0b713e94aa623.jpg',
            ],
            featured: true,
            badge: null,
            packages: packages,
        },
        {
            id: 3,
            name: 'MÂM CÚNG TẤT NIÊN- CÚNG ĐẤT',
            description: 'Mâm cúng Tất Niên đầy đủ, trang trọng với đồ cúng theo phong tục truyền thống Việt Nam.',
            price: '950.000đ',
            category: 'tatnien',
            categoryName: 'MÂM CÚNG TẤT NIÊN- CÚNG ĐẤT',
            image: 'images/tatnien/53fdc1c1ac601f3e467130.jpg',
            images: [
                'images/tatnien/9ed312c77f66cc38957729.jpg',
                'images/tatnien/53fdc1c1ac601f3e467130.jpg',
                'images/tatnien/97c941852c249f7ac63531.jpg',
                'images/tatnien/8338384257e3e4bdbdf228.jpg',
            ],
            featured: true,
            badge: 'Đặc biệt',
            packages: packages,
        },
        {
            id: 4,
            name: 'VĂN KHẤN',
            description: 'Văn khấn đầy đủ cho các nghi thức cúng lễ, giúp bạn thực hiện nghi lễ một cách trang trọng và đúng cách.',
            price: '0đ',
            category: 'vankhan',
            categoryName: 'VĂN KHẤN',
            image: 'images/vancung/2a4983c2276f9431cd7e4.jpg',
            images: [
                'images/vancung/2a4983c2276f9431cd7e4.jpg',
                'images/vancung/8d638233269e95c0cc8f1.jpg',
                'images/vancung/9b907780d22d6173383c6.jpg',
                'images/vancung/39ff7282d62f65713c3e3.jpg',
                'images/vancung/46c9b8e01d4dae13f75c7.jpg',
                'images/vancung/204693d1377c8422dd6d5.jpg',
                'images/vancung/bdb596d93274812ad8652.jpg',
            ],
            featured: false,
            badge: null,
            packages: '',
        }
    ];
    
    // Calcule les catégories en fonction des produits
    const categoryMap = {};
    
    // Parcourt tous les produits pour créer des catégories
    products.forEach(product => {
        const categorySlug = product.category;
        const categoryName = product.categoryName;
        
        // Si la catégorie n'existe pas encore, crée-la
        if (!categoryMap[categorySlug]) {
            categoryMap[categorySlug] = {
                id: Object.keys(categoryMap).length + 1,
                slug: categorySlug,
                name: categoryName,
                count: 1
            };
        } else {
            // Si elle existe déjà, augmente le nombre de produits
            categoryMap[categorySlug].count++;
        }
    });
    
    // Convertit de l'objet en tableau
    const categories = Object.values(categoryMap);
    
    return { products, categories };
}