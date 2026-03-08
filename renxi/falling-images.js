// Falling Images Effect
(function() {
    // Danh sách các ảnh sẽ rơi (có thể thêm nhiều ảnh vào thư mục image/)
    var images = [
        'image/tym.png',
        'image/tym.png' // Có thể thêm nhiều ảnh khác ở đây
    ];
    
    // Hàm tạo một ảnh rơi ngẫu nhiên
    function createFallingImage() {
        var img = document.createElement('img');
        var randomImage = images[Math.floor(Math.random() * images.length)];
        
        img.src = randomImage;
        img.className = 'falling-image';
        
        // Vị trí ngang ngẫu nhiên
        img.style.left = Math.random() * 100 + '%';
        
        // Kích thước ngẫu nhiên (20px đến 60px)
        var size = Math.random() * 40 + 20;
        img.style.width = size + 'px';
        img.style.height = size + 'px';
        
        // Thời gian rơi ngẫu nhiên (5s đến 15s)
        var duration = Math.random() * 10 + 5;
        img.style.animationDuration = duration + 's';
        
        // Delay ngẫu nhiên
        img.style.animationDelay = Math.random() * 2 + 's';
        
        document.body.appendChild(img);
        
        // Xóa ảnh sau khi animation kết thúc
        setTimeout(function() {
            if (img.parentNode) {
                img.parentNode.removeChild(img);
            }
        }, (duration + 2) * 1000);
    }
    
    // Tạo ảnh rơi liên tục
    function startFalling() {
        // Tạo ảnh đầu tiên
        createFallingImage();
        
        // Tạo ảnh mới mỗi 800ms đến 2000ms
        setInterval(function() {
            createFallingImage();
        }, Math.random() * 1200 + 800);
    }
    
    // Bắt đầu hiệu ứng khi trang đã load xong
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startFalling);
    } else {
        startFalling();
    }
})();
