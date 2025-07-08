// Управление 3D кубиком мышкой
document.addEventListener('DOMContentLoaded', function() {
    const cube = document.querySelector('.cube');
    const faces = document.querySelectorAll('.face');
    let isMouseOver = false;
    let mouseX, mouseY;
    let rotateX = -15;
    let rotateY = 0;
    let isAutoRotating = true;
    let autoRotateTimer = null;
    
    // Останавливаем автоматическую анимацию при наведении мыши
    function stopAutoRotation() {
        if (isAutoRotating) {
            cube.style.animation = 'none';
            isAutoRotating = false;
        }
    }
    
    // Возобновляем автоматическое вращение
    function resumeAutoRotation() {
        if (!isAutoRotating) {
            cube.style.animation = 'cubeRotate 8s infinite linear';
            isAutoRotating = true;
            rotateX = -15;
            rotateY = 0;
        }
    }
    
    // Обработчик наведения мыши на кубик
    cube.addEventListener('mouseenter', function(e) {
        isMouseOver = true;
        stopAutoRotation();
        mouseX = e.clientX;
        mouseY = e.clientY;
        cube.style.cursor = 'grab';
        
        // Очищаем таймер если он есть
        if (autoRotateTimer) {
            clearTimeout(autoRotateTimer);
            autoRotateTimer = null;
        }
    });
    
    // Обработчик движения мыши
    document.addEventListener('mousemove', function(e) {
        if (!isMouseOver) return;
        
        const deltaX = e.clientX - mouseX;
        const deltaY = e.clientY - mouseY;
        
        // Плавное вращение
        rotateY += deltaX * 0.5;
        rotateX -= deltaY * 0.5;
        
        // Ограничиваем углы поворота
        rotateX = Math.max(-90, Math.min(90, rotateX));
        
        // Применяем трансформацию к кубику
        cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Обработчик ухода мыши с кубика
    cube.addEventListener('mouseleave', function() {
        isMouseOver = false;
        cube.style.cursor = 'default';
        
        // Возобновляем вращение через 1 секунду после ухода мыши
        autoRotateTimer = setTimeout(resumeAutoRotation, 1000);
    });
    
    // Обработчик клика по грани-ссылке
    faces.forEach(face => {
        face.addEventListener('click', function(e) {
            // Останавливаем автоматическое вращение при клике на ссылку
            stopAutoRotation();
            
            // Небольшая задержка перед переходом по ссылке
            setTimeout(() => {
                // Здесь можно добавить дополнительную логику
                console.log('Клик по грани:', this.textContent);
            }, 100);
        });
        
        // Предотвращаем конфликт с вращением при наведении на ссылку
        face.addEventListener('mouseenter', function() {
            if (!isMouseOver) {
                stopAutoRotation();
            }
        });
    });
    
    // Добавляем поддержку касаний для мобильных устройств
    cube.addEventListener('touchstart', function(e) {
        // Проверяем, что касание не на грани-ссылке
        if (e.target.classList.contains('face')) {
            return; // Позволяем ссылке работать
        }
        
        e.preventDefault();
        stopAutoRotation();
        isMouseOver = true;
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        
        // Очищаем таймер если он есть
        if (autoRotateTimer) {
            clearTimeout(autoRotateTimer);
            autoRotateTimer = null;
        }
    });
    
    document.addEventListener('touchmove', function(e) {
        if (!isMouseOver) return;
        e.preventDefault();
        
        const deltaX = e.touches[0].clientX - mouseX;
        const deltaY = e.touches[0].clientY - mouseY;
        
        rotateY += deltaX * 0.5;
        rotateX -= deltaY * 0.5;
        
        rotateX = Math.max(-90, Math.min(90, rotateX));
        
        cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function() {
        isMouseOver = false;
        
        // Возобновляем вращение через 1 секунду после окончания касания
        autoRotateTimer = setTimeout(resumeAutoRotation, 1000);
    });
    
    // Возврат к автоматическому вращению при двойном клике
    cube.addEventListener('dblclick', function(e) {
        // Проверяем, что двойной клик не на грани-ссылке
        if (e.target.classList.contains('face')) {
            return;
        }
        
        // Очищаем таймер
        if (autoRotateTimer) {
            clearTimeout(autoRotateTimer);
            autoRotateTimer = null;
        }
        resumeAutoRotation();
    });
}); 