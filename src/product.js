console.log('product.js is fully loaded and running');
// MOVE FILE TO src/product.js

// 제품 클릭 이벤트 핸들러
function handleProductClick(productId, productName, price) {
    gtag('event', 'select_item', {
        currency: 'KRW',
        value: price,
        items: [{
            item_id: productId,
            item_name: productName,
            price: price,
            currency: 'KRW'
        }]
    });
}

// 메인 페이지로 이동하는 함수
function goToMainPage() {
    const currentVersion = sessionStorage.getItem('currentVersion');
    if (currentVersion === 'a') {
        window.location.href = 'index1.html';
    } else {
        window.location.href = 'index2.html';
    }
}
window.goToMainPage = goToMainPage;

// 제품 상세 페이지로 이동하는 함수
function navigateToProduct(url) {
    // 현재 URL에서 제품 이름을 추출
    const currentUrl = window.location.pathname;
    const productName = url.split('-')[1];
    
    // 현재 URL에 따라 적절한 상세페이지 URL 생성
    if (currentUrl.includes('ac-product.html')) {
        // AC 라인 상품
        targetUrl = `ac-${productName}-detail.html`;
    } else if (currentUrl.includes('amino-product.html')) {
        // AMINO 라인 상품
        targetUrl = `amino-${productName}-detail.html`;
    } else {
        // 기본 로직: 현재 버전에 따라 URL 결정
        const currentVersion = sessionStorage.getItem('currentVersion');
        targetUrl = currentVersion === 'a' 
            ? `ac-${productName}-detail.html`
            : `amino-${productName}-detail.html`;
    }
    
    console.log('Navigating to:', targetUrl);
    window.location.href = targetUrl;
}

// 전역으로 함수 노출
window.navigateToProduct = navigateToProduct;

// 버전에 따라 컨텐츠 표시
function showVersionContent() {
    const hash = window.location.hash;
    const versionA = document.getElementById('version-a-content');
    const versionB = document.getElementById('version-b-content');
    
    // 요소가 존재하는지 확인 후 스타일 변경
    if (versionA && versionB) {
        if (hash === '#version-b') {
            versionA.style.display = 'none';
            versionB.style.display = 'block';
            sessionStorage.setItem('currentVersion', 'b');
            console.log('Debug (product.js): sessionStorage.currentVersion set to:', sessionStorage.getItem('currentVersion'));
        } else {
            versionA.style.display = 'block';
            versionB.style.display = 'none';
            sessionStorage.setItem('currentVersion', 'a');
            console.log('Debug (product.js): sessionStorage.currentVersion set to:', sessionStorage.getItem('currentVersion'));
        }
    } else {
        // versionA 또는 versionB 요소가 없는 페이지 (예: product2.html)의 경우
        // 특정 버전의 컨텐츠를 숨기거나 표시할 필요가 없으므로 sessionStorage만 설정합니다.
        if (hash === '#version-b') {
            sessionStorage.setItem('currentVersion', 'b');
        } else {
            sessionStorage.setItem('currentVersion', 'a'); // 기본값
        }
        console.log('Debug (product.js): No version-specific content elements found, sessionStorage.currentVersion set to:', sessionStorage.getItem('currentVersion'));
    }
}

// 페이지 로드 및 해시 변경 시 컨텐츠 업데이트
window.addEventListener('load', showVersionContent);
window.addEventListener('hashchange', showVersionContent);

// 모든 제품 링크에 이벤트 리스너 추가
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href*="detail.html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // navigateToProduct는 이미 버전을 처리하므로 hash는 필요 없음
            navigateToProduct(this.href.split('?')[0].split('#')[0]);
        });
    });
});

// 현재 버전 확인 (URL 또는 sessionStorage에서)
function getCurrentVersion() {
    const sessionVersion = sessionStorage.getItem('currentVersion');
    if (sessionVersion) {
        return sessionVersion === 'a' ? 'A' : 'B';
    }
    if (window.location.hash === '#version-b') return 'B';
    return 'A';
}

function goToCart() {
    // index1.html에서 진입했거나, sessionStorage가 'a'면 cart.html로 이동
    if (
        document.referrer.includes('index1.html') ||
        sessionStorage.getItem('currentVersion') === 'a'
    ) {
        window.location.href = 'cart.html';
    } else {
        window.location.href = 'cart2.html';
    }
}
window.goToCart = goToCart;

function goToBrandPage() {
    const currentVersion = sessionStorage.getItem('currentVersion');
    if (currentVersion === 'a') {
        window.location.href = 'brand.html';
    } else {
        window.location.href = 'brand2.html';
    }
}
window.goToBrandPage = goToBrandPage;

function goToProductListPage() {
    const currentVersion = sessionStorage.getItem('currentVersion');
    if (currentVersion === 'a') {
        window.location.href = 'product.html';
    } else {
        window.location.href = 'product2.html';
    }
}
window.goToProductListPage = goToProductListPage;

function goToBestPage() {
    const currentVersion = sessionStorage.getItem('currentVersion');
    if (currentVersion === 'a') {
        window.location.href = 'best.html';
    } else {
        window.location.href = 'best2.html';
    }
}
window.goToBestPage = goToBestPage;

// 제품 카드에 클릭 이벤트 리스너 추가
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            const productName = this.getAttribute('data-product-name');
            const price = parseInt(this.getAttribute('data-price'));
            handleProductClick(productId, productName, price);
        });
    });
});

// 제품 상세 페이지로 이동 함수
function goToProductDetail(url, versionType) {
    sessionStorage.setItem('currentVersion', versionType);
    const urlVersion = (versionType === 'a' ? '1' : '2');
    console.log('Debug (index1.html): Navigating to product detail with urlVersion:', urlVersion, 'for url:', url);
    window.location.href = url + '?v=' + urlVersion;
}

console.log('location.search:', location.search);
console.log('sessionStorage.getItem(\'currentVersion\')', sessionStorage.getItem('currentVersion'));

// 상세페이지 JS 최상단에 추가
(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const v = urlParams.get('v');
    if (v === '1') {
        sessionStorage.setItem('currentVersion', 'a');
    } else if (v === '2') {
        sessionStorage.setItem('currentVersion', 'b');
    }
})(); 