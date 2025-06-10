const CART_KEY = 'cartItemsA';

// 메인 페이지로 이동하는 함수 - 항상 index1.html로 이동
function goToHome() {
    window.location.href = 'index1.html';
}

function checkout() {
    const cartItems = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    if (cartItems.length === 0) {
        alert('장바구니가 비어있습니다.');
        return;
    }
    
    const orderData = encodeURIComponent(JSON.stringify(cartItems));
    window.location.href = `order.html?orderData=${orderData}`;
}

// 장바구니 아이템 렌더링 함수
function renderCartItems() {
    const cartItems = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartEmpty = document.querySelector('.cart-empty');
    const cartSummary = document.querySelector('.cart-summary');

    if (cartItems.length === 0) {
        cartItemsContainer.style.display = 'none';
        cartSummary.style.display = 'none';
        cartEmpty.style.display = 'block';
        return;
    }

    cartItemsContainer.style.display = 'block';
    cartSummary.style.display = 'block';
    cartEmpty.style.display = 'none';

    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    cartItems.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price.toLocaleString()}원</div>
            </div>
            <div class="cart-item-quantity">
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    <input type="text" value="${item.quantity}" readonly>
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </div>
            </div>
            <div class="cart-item-remove" onclick="removeItem(${index})">✕</div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    // 금액 업데이트
    const shipping = subtotal >= 19800 ? 0 : 3000;
    document.getElementById('subtotal').textContent = subtotal.toLocaleString() + '원';
    document.getElementById('shipping').textContent = shipping.toLocaleString() + '원';
    document.getElementById('total').textContent = (subtotal + shipping).toLocaleString() + '원';
}

// 수량 업데이트
function updateQuantity(index, change) {
    const cartItems = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    if (cartItems[index]) {
        cartItems[index].quantity = Math.max(1, cartItems[index].quantity + change);
        localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
        renderCartItems();
    }
}

// 아이템 제거
function removeItem(index) {
    const cartItems = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    cartItems.splice(index, 1);
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    renderCartItems();
}

// 장바구니에 아이템 추가 (중복 체크)
function addToCart(item) {
    const cartItems = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.name === item.name);

    if (existingItemIndex !== -1) {
        // 이미 존재하는 상품이면 수량만 증가
        cartItems[existingItemIndex].quantity += item.quantity;
    } else {
        // 새로운 상품이면 배열에 추가
        cartItems.push(item);
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
}

// 페이지 로드 시 장바구니 렌더링
window.addEventListener('load', renderCartItems); 