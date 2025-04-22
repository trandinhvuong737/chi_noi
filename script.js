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
    'daythangthoinoi': 'MÂM CÚNG ĐẦY THÁNG - THÔI NÔI CHO BÉ',
    'khaitruongnhaptrach': 'MÂM CÚNG KHAI TRƯƠNG - NHẬP TRẠCH-THẦN TÀI',
    'tatniendatdai': 'MÂM CÚNG TẤT NIÊN- CÚNG ĐẤT',
    'vankhan': 'VĂN KHẤN'
};

// Fake Data - mâm cúng
function getFakeProducts() {
    // Tạo danh sách sản phẩm cố định
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
            image: 'images/daythangthoinoi/c14a775ae7fc54a20ded18.jpg',
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
            category: 'tatniendatdai',
            categoryName: 'MÂM CÚNG TẤT NIÊN- CÚNG ĐẤT',
            image: 'images/khaitruongnhaptrach/2c409756f2f741a918e624.jpg',
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
            image: 'images/khaitruongnhaptrach/ca259500f2a141ff18b019.jpg',
            images: [
                'images/daythangthoinoi/0b125d86c9207a7e23316.jpg',
            ],
            featured: false,
            badge: null,
            packages: '',
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
    
    // Thêm class mới để chuyển sang dạng danh sách
    productsContainer.classList.remove('products-grid');
    productsContainer.classList.add('products-list');
    
    // Thêm sản phẩm vào container dưới dạng danh sách
    products.forEach(product => {
        // Đảm bảo thêm đúng class category để bộ lọc hoạt động
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
        
        // Chuẩn bị HTML cho slideshow ảnh
        let imagesGalleryHTML = '';
        if (product.images && product.images.length > 0) {
            // Tạo HTML cho slideshow
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
            // Nếu không có nhiều ảnh, chỉ hiển thị ảnh chính
            imagesGalleryHTML = `
                <div class="product-detail-image">
                    <img src="${product.image}" alt="${product.name}">
                    ${product.badge ? `<div class="badge">${product.badge}</div>` : ''}
                </div>
            `;
        }
        
        // Tạo HTML cho phần gói dịch vụ nếu có
        let packageOptionsHTML = '';
        if (product.packages && product.packages.length > 0) {
            // Mặc định hiển thị thông tin của gói cơ bản trước
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
            // Nếu không có packages, hiển thị mô tả và giá thông thường
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
            
            // Xử lý sự kiện đặt mâm cúng
            const addToCartBtn = modalElement.querySelector('.add-to-cart-detail');
            if (addToCartBtn) {
                addToCartBtn.addEventListener('click', function() {
                    // Tìm gói đang được chọn
                    const selectedPackageBtn = modalElement.querySelector('.package-btn.active');
                    let selectedPackage = null;
                    
                    if (selectedPackageBtn) {
                        const packageId = selectedPackageBtn.getAttribute('data-package-id');
                        selectedPackage = product.packages.find(pkg => pkg.id === packageId);
                    }
                    
                    // Nếu có gói được chọn, truyền thông tin gói đã chọn
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
            
            // Sự kiện chọn gói dịch vụ
            const packageBtns = modalElement.querySelectorAll('.package-btn');
            const priceElement = document.getElementById('package-price');
            const descriptionElement = document.getElementById('package-description');
            
            if (packageBtns.length > 0) {
                packageBtns.forEach(btn => {
                    btn.addEventListener('click', function() {
                        // Xóa active khỏi tất cả nút
                        packageBtns.forEach(b => b.classList.remove('active'));
                        // Thêm active vào nút được chọn
                        this.classList.add('active');
                        
                        // Cập nhật giá và mô tả
                        if (priceElement) {
                            priceElement.textContent = this.getAttribute('data-price');
                        }
                        
                        if (descriptionElement) {
                            // Sử dụng innerHTML thay vì textContent để hỗ trợ các thẻ HTML
                            descriptionElement.innerHTML = this.getAttribute('data-description');
                        }
                    });
                });
            }
            
            // Khởi tạo slideshow nếu có nhiều ảnh
            if (product.images && product.images.length > 0) {
                // Lấy các phần tử điều khiển slideshow
                const slides = document.querySelectorAll('.slide');
                const dots = document.querySelectorAll('.dot');
                const prevBtn = document.querySelector('.prev');
                const nextBtn = document.querySelector('.next');
                let currentSlideIndex = 0;
                
                // Hàm để thay đổi slide
                function showSlide(n) {
                    // Reset index nếu vượt quá giới hạn
                    if (n >= slides.length) currentSlideIndex = 0;
                    if (n < 0) currentSlideIndex = slides.length - 1;
                    
                    // Ẩn tất cả slides
                    slides.forEach(slide => {
                        slide.classList.remove('active');
                    });
                    
                    // Bỏ active tất cả dots
                    dots.forEach(dot => {
                        dot.classList.remove('active');
                    });
                    
                    // Hiển thị slide hiện tại
                    slides[currentSlideIndex].classList.add('active');
                    dots[currentSlideIndex].classList.add('active');
                }
                
                // Chuyển đến slide tiếp theo
                function nextSlide() {
                    currentSlideIndex++;
                    showSlide(currentSlideIndex);
                }
                
                // Chuyển đến slide trước
                function prevSlide() {
                    currentSlideIndex--;
                    showSlide(currentSlideIndex);
                }
                
                // Thiết lập sự kiện click cho nút prev
                if (prevBtn) {
                    prevBtn.addEventListener('click', function() {
                        prevSlide();
                    });
                }
                
                // Thiết lập sự kiện click cho nút next
                if (nextBtn) {
                    nextBtn.addEventListener('click', function() {
                        nextSlide();
                    });
                }
                
                // Thiết lập sự kiện click cho dots
                dots.forEach((dot, index) => {
                    dot.addEventListener('click', function() {
                        currentSlideIndex = index;
                        showSlide(currentSlideIndex);
                    });
                });
                
                // Tự động chuyển slide sau 5 giây
                let slideInterval = setInterval(nextSlide, 5000);
                
                // Dừng auto slide khi hover vào slideshow
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