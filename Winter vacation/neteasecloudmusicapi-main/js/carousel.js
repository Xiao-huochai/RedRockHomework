const sliderWrapper = document.querySelector('.slider-wrapper');
const dotsContainer = document.querySelector('.dots');
let currentImage = 0;
const imageUrls = []; // 用于存储图片 URL
fetch(`http://localhost:3000/banner`).then((data) => data.json()).then(data => {
    //console.log(data.banners[0].imageUrl);

    for (let index = 0; index < data.banners.length; index++) {
        imageUrls[index] = data.banners[index].imageUrl;
    }
    initSlider();
}
)
function initSlider() {
    imageUrls.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = `图片`;
        sliderWrapper.appendChild(img);

        const dot = document.createElement('span');
        dot.classList.add('dot');
        dotsContainer.appendChild(dot);
    });

    showImage(currentImage);
    startAutoPlay();

    dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
        dot.addEventListener('mouseover', () => {
            stopAutoPlay();
            showImage(i);
        });

        dot.addEventListener('mouseout', () => {
            startAutoPlay();
        });
    });
}


function showImage(n) {
    const imageWidth = sliderWrapper.offsetWidth;
    const translateX = -n * imageWidth;
    sliderWrapper.style.transform = `translateX(${translateX}px)`;

    dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList[i === n ? 'add' : 'remove']('active');
    });

    currentImage = n;
}

let autoPlayInterval;

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        nextImage();
    }, 3000);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

function nextImage() {
    showImage((currentImage + 1) % imageUrls.length);
}
