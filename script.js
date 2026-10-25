// Store 17 Shoe Products Array
const products = [
    { id: 1, name: "حذاء رياضي فاخر - Gold Edition 01", price: 149, img: "4.jpeg" },
    { id: 2, name: "حذاء أبيض أسود عصري - Classique 02", price: 149, img: "2.jpeg" },
    { id: 3, name: "حذاء أنيق للمشي - Urban Comfort 03", price: 149, img: "1.jpeg" },
    { id: 4, name: "حذاء ركض خفيف - Light Speed 12", price: 149, img: "14.jpeg" },
    { id: 5, name: "حذاء رياضي رمادي - Active Grey 05", price: 149, img: "3.jpeg" },
    { id: 6, name: "حذاء ركض خفيف - Light Speed 12", price: 149, img: "12.jpeg" },
    { id: 7, name: "حذاء ركض خفيف - Light Speed 12", price: 149, img: "13.jpeg" },
    { id: 8, name: "حذاء التميز والراحة - Royal AS 17", price: 149, img: "17.jpeg" },
    { id: 9, name: "حذاء التميز والراحة - Royal AS 17", price: 149, img: "15.jpeg" },
    { id: 10, name: "حذاء التميز والراحة - Royal AS 17", price: 149, img: "16.jpeg" },
    { id: 11, name: "حذاء رياضي عالي الجودة - Pro Sport 11", price: 149, img: "6.jpeg" },
    { id: 12, name: "حذاء رياضي عالي الجودة - Pro Sport 11", price: 149, img: "7.jpeg" },
    { id: 13, name: "حذاء رياضي عالي الجودة - Pro Sport 11", price: 149, img: "8.jpeg" },
    { id: 14, name: "حذاء الموضة الجديدة - AS Trend 08", price: 149, img: "9.jpeg" },
    { id: 15, name: "حذاء الموضة الجديدة - AS Trend 08", price: 149, img: "10.jpeg" },
    { id: 16, name: "حذاء الموضة الجديدة - AS Trend 08", price: 149, img: "11.jpeg" },
    { id: 17, name: "حذاء أنيق للمشي - Urban Comfort 03", price: 149, img: "5.jpeg" }
];

let selectedProduct = null;
let selectedSizeVal = '40';
let currentQty = 1;

// Render Products Grid
function renderProducts(items) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    grid.innerHTML = '';
    
    items.forEach(p => {
        grid.innerHTML += `
            <div class="product-card">
                <div class="product-img-wrapper">
                    <span class="product-badge">جديد</span>
                    <img src="${p.img}" alt="${p.name}">
                </div>
                <div class="product-info">
                    <div class="product-title">${p.name}</div>
                    <div class="product-price">${p.price} DH</div>
                    <button class="btn-order-item" onclick="openOrderModal(${p.id})">
                        <i class="fa-solid fa-cart-plus"></i>
                        طلب الآن
                    </button>
                </div>
            </div>
        `;
    });
}

// Search Filter
function filterProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    renderProducts(filtered);
}

// Tab Switching
function switchTab(tabId, el) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    const targetTab = document.getElementById('tab-' + tabId);
    if (targetTab) targetTab.classList.add('active');

    if (el) {
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        el.classList.add('active');
    } else {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(n => n.classList.remove('active'));
        if(tabId === 'home') navItems[0].classList.add('active');
        if(tabId === 'shop') navItems[1].classList.add('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Order Modal Functions
function openOrderModal(productId) {
    selectedProduct = products.find(p => p.id === productId);
    document.getElementById('modalProductTitle').innerText = selectedProduct.name;
    currentQty = 1;
    document.getElementById('qtyVal').innerText = currentQty;
    document.getElementById('orderModal').classList.add('active');
    calculateTotal();
}

function closeOrderModal() {
    document.getElementById('orderModal').classList.remove('active');
}

function selectSize(btn, size) {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedSizeVal = size;
}

function changeQty(delta) {
    currentQty = Math.max(1, currentQty + delta);
    document.getElementById('qtyVal').innerText = currentQty;
    calculateTotal();
}

function calculateTotal() {
    if (!selectedProduct) return;
    const citySelect = document.getElementById('custCity');
    const city = citySelect ? citySelect.value : 'oujda';
    const deliveryFee = (city === 'oujda') ? 0 : 30;
    const itemTotal = selectedProduct.price * currentQty;
    const grandTotal = itemTotal + deliveryFee;

    document.getElementById('itemPriceText').innerText = `${itemTotal} DH (${currentQty} قطعة)`;
    const delText = document.getElementById('deliveryPriceText');
    delText.innerText = deliveryFee === 0 ? '0 DH (مجاني)' : `${deliveryFee} DH`;
    delText.style.color = deliveryFee === 0 ? '#25D366' : '#fff';
    document.getElementById('totalPriceText').innerText = `${grandTotal} DH`;
}

// WhatsApp Order Submission
function submitWhatsAppOrder(e) {
    e.preventDefault();

    const name = document.getElementById('custName').value;
    const phone = document.getElementById('custPhone').value;
    const citySelect = document.getElementById('custCity');
    const cityName = citySelect.options[citySelect.selectedIndex].text;
    const address = document.getElementById('custAddress').value;

    const cityValue = citySelect.value;
    const deliveryFee = (cityValue === 'oujda') ? 0 : 30;
    const itemTotal = selectedProduct.price * currentQty;
    const grandTotal = itemTotal + deliveryFee;

    const message = `*طلب جديد من متجر as.store.48*%0A%0A` +
        `*الحذاء:* ${selectedProduct.name}%0A` +
        `*المقاس:* ${selectedSizeVal}%0A` +
        `*الكمية:* ${currentQty}%0A` +
        `*الثمن:* ${selectedProduct.price} DH%0A%0A` +
        `*معلومات الزبون:*%0A` +
        `• *الاسم:* ${name}%0A` +
        `• *الهاتف:* ${phone}%0A` +
        `• *المدينة:* ${cityName}%0A` +
        `• *العنوان:* ${address}%0A%0A` +
        `*المجموع الكلي:* ${grandTotal} DH`;

    const whatsappUrl = `https://wa.me/212718061113?text=${message}`;
    window.open(whatsappUrl, '_blank');
    closeOrderModal();
}

// Init App
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
});