// Header scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

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

// Smooth scrolling for anchor links
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

// Form validation
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
    // Khởi tạo EmailJS với Public Key của bạn
    (function() {
        emailjs.init("bKA9jCSE_LDL8selt"); // Public key từ tài khoản của bạn
    })();
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple validation
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
            // Hiển thị loading
            showLoading();
            
            // Lấy giá trị từ form
            const templateParams = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                phone: document.getElementById('phone').value || 'Không cung cấp',
                serviceType: document.getElementById('serviceType').value || 'Không chọn',
                message: document.getElementById('message').value,
                to_email: "info@tamlinhviet.com" // Địa chỉ email cố định để nhận thông tin
            };
            
            // Gửi email qua EmailJS
            emailjs.send('service_fznh3hs', 'template_k8rk3k9', templateParams)
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

// Newsletter form
const newsletterForm = document.querySelector('.footer-newsletter form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        if (emailInput.value.trim() && validateEmail(emailInput.value)) {
            alert('Cảm ơn bạn đã đăng ký! Bạn sẽ nhận được các thông tin mới nhất từ chúng tôi.');
            newsletterForm.reset();
        } else {
            alert('Vui lòng nhập địa chỉ email hợp lệ!');
        }
    });
}

// Email validation function
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Simple animation for items when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.featured-item, .product-item, .testimonial, .about-image, .about-text, .contact-info, .contact-form');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.featured-item, .product-item, .testimonial, .about-image, .about-text, .contact-info, .contact-form');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger animation for elements in view on page load
    animateOnScroll();
});

// Trigger animation when scrolling
window.addEventListener('scroll', animateOnScroll);

// Product image hover effect
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

// Danh mục mâm cúng
const categoryMappings = {
    'thanthaitaithang': 'Thần Tài - Thổ Địa',
    'giodang': 'Giỗ - Đám',
    'tanggia': 'Tang Gia',
    'lehoi': 'Lễ Hội'
};

// Fake Data - mâm cúng
function getFakeProducts() {
    // Tạo danh sách sản phẩm cố định
    const products = [
        {
            id: 1,
            name: 'Mâm cúng Thần Tài',
            description: 'Mâm cúng Thần Tài đầy đủ, trang trọng với hoa quả, trầu cau, bánh kẹo, rượu và thịt.',
            price: '650.000đ',
            category: 'thanthaitaithang',
            categoryName: 'Thần Tài - Thổ Địa',
            image: 'images/chego.jpg',
            featured: true,
            badge: 'Phổ biến'
        },
        {
            id: 2,
            name: 'Mâm cúng Thổ Địa',
            description: 'Mâm cúng Thổ Địa chuẩn mực với đầy đủ lễ vật theo phong tục truyền thống.',
            price: '550.000đ',
            category: 'thanthaitaithang',
            categoryName: 'Thần Tài - Thổ Địa',
            image: 'images/chagio.jpg',
            featured: true,
            badge: null
        },
        {
            id: 3,
            name: 'Mâm cúng Khai Trương',
            description: 'Mâm cúng Khai Trương trang trọng với đầy đủ lễ vật cần thiết theo phong tục.',
            price: '850.000đ',
            category: 'thanthaitaithang',
            categoryName: 'Thần Tài - Thổ Địa',
            image: 'images/buncha.jpg',
            featured: true,
            badge: 'Đặc biệt'
        },
        {
            id: 4,
            name: 'Mâm cúng Nhập Trạch',
            description: 'Mâm cúng Nhập Trạch đầy đủ với các lễ vật truyền thống đón nhà mới.',
            price: '950.000đ',
            category: 'thanthaitaithang',
            categoryName: 'Thần Tài - Thổ Địa',
            image: 'images/comtam.jpg',
            featured: false,
            badge: null
        },
        {
            id: 5,
            name: 'Mâm cúng Giỗ',
            description: 'Mâm cúng Giỗ trang nghiêm, đầy đủ với các món ăn truyền thống, hoa quả, trầu cau.',
            price: '750.000đ',
            category: 'giodang',
            categoryName: 'Giỗ - Đám',
            image: 'images/goi.jpg',
            featured: true,
            badge: 'Mới'
        },
        {
            id: 6,
            name: 'Mâm cúng Đầy Tháng',
            description: 'Mâm cúng Đầy Tháng cho bé với đầy đủ lễ vật theo phong tục Việt Nam.',
            price: '550.000đ',
            category: 'giodang',
            categoryName: 'Giỗ - Đám',
            image: 'images/chexoi.jpg',
            featured: true,
            badge: null
        },
        {
            id: 7,
            name: 'Mâm cúng 100 Ngày',
            description: 'Mâm cúng 100 ngày trang trọng với đầy đủ lễ vật theo phong tục tang lễ.',
            price: '850.000đ',
            category: 'tanggia',
            categoryName: 'Tang Gia',
            image: 'images/banhflan.jpg',
            featured: true,
            badge: null
        },
        {
            id: 8,
            name: 'Mâm cúng Rằm Tháng Giêng',
            description: 'Mâm cúng Rằm Tháng Giêng đầy đủ với hoa quả, bánh trái, xôi chè theo phong tục.',
            price: '680.000đ',
            category: 'lehoi',
            categoryName: 'Lễ Hội',
            image: 'images/cafesua.jpg',
            featured: false,
            badge: 'Theo mùa'
        },
        {
            id: 9,
            name: 'Mâm cúng Tết Nguyên Đán',
            description: 'Mâm cúng Tết đầy đủ, trang trọng với bánh chưng, giò chả, mứt và hoa quả.',
            price: '1.500.000đ',
            category: 'lehoi',
            categoryName: 'Lễ Hội',
            image: 'images/trasua.jpg',
            featured: false,
            badge: 'Theo mùa'
        }
    ];
    
    // Tính toán danh mục dựa trên sản phẩm
    const categoryMap = {};
    
    // Duyệt qua tất cả sản phẩm để tạo danh mục
    products.forEach(product => {
        const categorySlug = product.category;
        const categoryName = product.categoryName;
        
        // Nếu danh mục chưa tồn tại, tạo mới
        if (!categoryMap[categorySlug]) {
            categoryMap[categorySlug] = {
                id: Object.keys(categoryMap).length + 1,
                slug: categorySlug,
                name: categoryName,
                count: 1
            };
        } else {
            // Nếu đã tồn tại, tăng số lượng sản phẩm lên
            categoryMap[categorySlug].count++;
        }
    });
    
    // Chuyển đổi từ object sang array
    const categories = Object.values(categoryMap);
    
    return { products, categories };
}

// Hàm fetch API để lấy tất cả sản phẩm
async function fetchAllProducts() {
    try {
        showLoading();
        
        // Chỉ sử dụng dữ liệu giả, không cần gọi API nữa
        console.log('Sử dụng dữ liệu giả...');
        return getFakeProducts();
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        return getFakeProducts();
    } finally {
        hideLoading();
    }
}

// Hàm lấy chi tiết một sản phẩm
async function fetchProductDetail(productId) {
    try {
        // Chỉ sử dụng dữ liệu giả, không gọi API nữa
        const { products } = getFakeProducts();
        const product = products.find(p => p.id == productId);
        
        if (product) {
            // Thêm mô tả chi tiết hơn cho chế độ xem chi tiết
            product.body = `${product.description} Đây là mâm cúng được chuẩn bị cẩn thận, chu đáo theo phong tục tâm linh truyền thống của người Việt Nam. Tất cả các lễ vật đều được lựa chọn kỹ lưỡng, đảm bảo sự trang nghiêm và ý nghĩa trong nghi lễ.`;
            return product;
        }
        
        return null;
    } catch (error) {
        console.error(`Lỗi khi lấy chi tiết sản phẩm ${productId}:`, error);
        return null;
    }
}

// Hàm render danh mục sản phẩm
function renderCategories(categories) {
    const categoryNav = document.querySelector('.category-nav');
    
    if (!categoryNav) return;
    
    // Xóa nội dung hiện tại
    categoryNav.innerHTML = '';
    
    // Thêm nút "Tất cả"
    categoryNav.innerHTML = `
        <button class="category-btn active" data-filter="all">
            Tất cả
            <span class="category-count">${allProducts.length}</span>
        </button>
    `;
    
    // Thêm các danh mục từ API
    categories.forEach(category => {
        const categoryHTML = `
            <button class="category-btn" data-filter="${category.slug}">
                ${category.name}
                <span class="category-count">${category.count}</span>
            </button>
        `;
        
        categoryNav.innerHTML += categoryHTML;
    });
    
    // Kích hoạt lại bộ lọc sản phẩm - đảm bảo gắn sự kiện sau khi đã thêm các nút vào DOM
    setTimeout(() => {
        initializeProductFilter();
    }, 0);
}

// Hàm render sản phẩm nổi bật
function renderFeaturedProducts(products) {
    const featuredContainer = document.querySelector('.featured-grid');
    if (!featuredContainer) return;
    
    // Lọc sản phẩm featured
    const featuredProducts = products.filter(product => product.featured);
    
    // Xóa nội dung hiện tại
    featuredContainer.innerHTML = '';
    
    // Thêm sản phẩm vào container
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
    
    // Thêm sự kiện cho nút xem chi tiết
    addProductEventListeners();
}

// Hàm render tất cả sản phẩm
function renderAllProducts(products) {
    const productsContainer = document.querySelector('.products-grid');
    if (!productsContainer) return;
    
    // Xóa nội dung hiện tại
    productsContainer.innerHTML = '';
    
    // Thêm sản phẩm vào container
    products.forEach(product => {
        // Đảm bảo thêm đúng class category để bộ lọc hoạt động
        const productHTML = `
            <div class="product-item ${product.category}" data-id="${product.id}" data-category="${product.category}">
                ${product.badge ? `<div class="badge">${product.badge}</div>` : ''}
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-actions">
                    <a href="#" class="btn-small view-detail btn-full-width" data-id="${product.id}">Chi tiết</a>
                </div>
            </div>
        `;
        
        productsContainer.innerHTML += productHTML;
    });
    
    // Thêm sự kiện cho nút xem chi tiết
    addProductEventListeners();
}

// Thêm các sự kiện cho sản phẩm
function addProductEventListeners() {
    document.querySelectorAll('.view-detail').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-id');
            showProductDetail(productId);
        });
    });
}

// Hiển thị chi tiết sản phẩm
async function showProductDetail(productId) {
    try {
        // Kiểm tra xem đã có modal nào đang hiển thị hay chưa, nếu có thì xóa đi
        const existingModal = document.querySelector('.modal-container');
        if (existingModal) {
            document.body.removeChild(existingModal);
        }
        
        showLoading();
        const product = allProducts.find(p => p.id == productId);
        
        if (!product) {
            throw new Error('Không tìm thấy thông tin sản phẩm');
        }
        
        // Cố gắng lấy thêm thông tin chi tiết nếu có API riêng
        let apiProductDetail = null;
        try {
            apiProductDetail = await fetchProductDetail(productId);
        } catch (detailError) {
            console.log('Không có API chi tiết riêng, sử dụng dữ liệu có sẵn');
        }
        
        hideLoading();
        
        // Thêm modal vào body
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
                        <div class="product-detail-image">
                            <img src="${product.image}" alt="${product.name}">
                            ${product.badge ? `<div class="badge">${product.badge}</div>` : ''}
                        </div>
                        <div class="product-detail-info">
                            <div class="category-tag-container">
                                <span class="category-tag">${product.categoryName || product.category}</span>
                            </div>
                            <div class="description">
                                <h3>Mô tả:</h3>
                                <p>${product.description || ''}</p>
                                ${apiProductDetail && apiProductDetail.body ? `<p>${apiProductDetail.body}</p>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modalElement);
        
        // Đảm bảo modal đã được thêm vào DOM trước khi thiết lập sự kiện
        setTimeout(() => {
            // Thêm sự kiện đóng modal - sử dụng ID để đảm bảo tìm đúng phần tử
            const closeBtn = document.getElementById('closeModalBtn');
            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    // Tìm modal-container gần nhất để xóa
                    const modalToRemove = document.getElementById('productDetailModal');
                    if (modalToRemove && document.body.contains(modalToRemove)) {
                        document.body.removeChild(modalToRemove);
                    }
                });
            }
            
            // Đóng modal khi click bên ngoài
            modalElement.addEventListener('click', function(e) {
                if (e.target === modalElement) {
                    if (document.body.contains(modalElement)) {
                        document.body.removeChild(modalElement);
                    }
                }
            });
        }, 100); // Trì hoãn 100ms để đảm bảo DOM đã được cập nhật
        
    } catch (error) {
        console.error('Lỗi khi hiển thị chi tiết sản phẩm:', error);
        hideLoading();
        showNotification('Không thể hiển thị chi tiết sản phẩm', 'error');
    }
}

// Hiển thị form đặt mâm cúng
function showBookingForm(product) {
    // Tạo một ngày mặc định (ngày hiện tại + 3 ngày)
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 3);
    const defaultDateStr = defaultDate.toISOString().split('T')[0]; // Format YYYY-MM-DD
    
    // Tạo modal form đặt hàng
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
                        </div>
                    </div>
                    <form id="bookingForm">
                        <div class="form-group">
                            <label for="fullName">Họ và tên *</label>
                            <input type="text" id="fullName" name="fullName" required>
                        </div>
                        <div class="form-group">
                            <label for="phone">Số điện thoại *</label>
                            <input type="tel" id="phone" name="phone" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" name="email">
                        </div>
                        <div class="form-group">
                            <label for="address">Địa chỉ *</label>
                            <input type="text" id="address" name="address" required>
                        </div>
                        <div class="form-group">
                            <label for="date">Ngày cúng *</label>
                            <input type="date" id="date" name="date" min="${defaultDateStr}" value="${defaultDateStr}" required>
                        </div>
                        <div class="form-group">
                            <label for="time">Giờ cúng *</label>
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
                            <label for="note">Ghi chú</label>
                            <textarea id="note" name="note" rows="3" placeholder="Yêu cầu đặc biệt hoặc thông tin thêm..."></textarea>
                        </div>
                        <button type="submit" class="btn-full-width">Xác nhận đặt mâm cúng</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modalElement);
    
    // Thiết lập sự kiện đóng modal
    const closeBtn = document.getElementById('closeBookingBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            document.body.removeChild(modalElement);
        });
    }
    
    // Thiết lập sự kiện submit form
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Kiểm tra form
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
                // Xử lý đặt hàng
                const formData = new FormData(bookingForm);
                const bookingData = {
                    product: {
                        id: product.id,
                        name: product.name,
                        price: product.price
                    },
                    customer: {
                        name: formData.get('fullName'),
                        phone: formData.get('phone'),
                        email: formData.get('email'),
                        address: formData.get('address')
                    },
                    schedule: {
                        date: formData.get('date'),
                        time: formData.get('time')
                    },
                    note: formData.get('note')
                };
                
                console.log('Dữ liệu đặt mâm cúng:', bookingData);
                
                // Hiển thị thông báo thành công
                document.body.removeChild(modalElement);
                showNotification('Đặt mâm cúng thành công! Chúng tôi sẽ liên hệ với bạn để xác nhận.', 'success');
            } else {
                showNotification('Vui lòng điền đầy đủ thông tin bắt buộc!', 'error');
            }
        });
    }
    
    // Đóng modal khi click bên ngoài
    modalElement.addEventListener('click', function(e) {
        if (e.target === modalElement) {
            document.body.removeChild(modalElement);
        }
    });
}

// Hiển thị thông báo
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.classList.add('notification', `notification-${type}`);
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Hiệu ứng hiện thông báo
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Tự động ẩn thông báo sau 3 giây
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Hàm khởi tạo bộ lọc sản phẩm
function initializeProductFilter() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productItems = document.querySelectorAll('.product-item');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
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

// Lưu trữ tất cả sản phẩm và danh mục
let allProducts = [];
let allCategories = [];

// Hàm khởi tạo ứng dụng
async function initApp() {
    try {
        // Hiển thị loading
        showLoading();
        
        // Fetch data từ API
        const { products, categories } = await fetchAllProducts();
        allProducts = products;
        allCategories = categories;
        
        // Render danh mục sản phẩm
        renderCategories(allCategories);
        
        // Render sản phẩm lên trang
        renderFeaturedProducts(allProducts);
        renderAllProducts(allProducts);
        
        // Ẩn loading
        hideLoading();
        
        // Hiển thị thông báo thành công
        showNotification('Dữ liệu sản phẩm đã được tải thành công!');
    } catch (error) {
        console.error('Lỗi khởi tạo ứng dụng:', error);
        hideLoading();
        showNotification('Đã xảy ra lỗi khi tải dữ liệu!', 'error');
    }
}

// Hiển thị loading
function showLoading() {
    const loadingEl = document.createElement('div');
    loadingEl.classList.add('loading-overlay');
    loadingEl.innerHTML = `
        <div class="spinner"></div>
        <p>Đang tải dữ liệu...</p>
    `;
    document.body.appendChild(loadingEl);
}

// Ẩn loading
function hideLoading() {
    const loadingEl = document.querySelector('.loading-overlay');
    if (loadingEl) {
        document.body.removeChild(loadingEl);
    }
}

// Khởi chạy ứng dụng khi trang đã load
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.featured-item, .product-item, .testimonial, .about-image, .about-text, .contact-info, .contact-form');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger animation for elements in view on page load
    animateOnScroll();
    
    // Khởi tạo ứng dụng
    initApp();
});

// Trigger animation when scrolling
window.addEventListener('scroll', animateOnScroll);