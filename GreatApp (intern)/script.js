'use strict';
const list = document.querySelector('.carausel__img-container-list');
const imgs = Array.from(list.children);
const nextButton = document.querySelector('.carousel-btn-right');
const prevButton = document.querySelector('.carousel-btn-left');
const carouselNav = document.querySelector('.carousel__nav');
const dots = Array.from(carouselNav.children);

// Getting the width of our images
const imgWidth = imgs[0].getBoundingClientRect().width;

// Arranging the images next to one another
function setImgPosition(img, index) {
    img.style.left = (imgWidth + 300) * index + "px";   // Added +300px because images were overlaping
}
imgs.forEach(setImgPosition);

// moveToImg function
const moveToImg = (list, currentImg, targetImg) => {
    // Moving to the next IMAGE
    list.style.transform = 'translateX(-' + targetImg.style.left + ')';

    // Removing the current--img class
    currentImg.classList.remove('current--img')
    targetImg.classList.add('current--img')
}

// Updating the color of the dots on click
const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current--dot');
    targetDot.classList.add('current--dot');
}

// Event for click on the right button
nextButton.addEventListener('click', () => {
    const currentImg = list.querySelector('.current--img')
    const nextImg = currentImg.nextElementSibling;
    const currentDot = carouselNav.querySelector('.current--dot');
    const nextDot = currentDot.nextElementSibling;
    moveToImg(list, currentImg, nextImg)
    updateDots(currentDot, nextDot)
});

// Event for click on the left button
prevButton.addEventListener('click', () => {
    const currentImg = list.querySelector('.current--img')
    const prevImg = currentImg.previousElementSibling;
    const currentDot = carouselNav.querySelector('.current--dot');
    const prevDot = currentDot.previousElementSibling;
    moveToImg(list, currentImg, prevImg);
    updateDots(currentDot, prevDot)
});

// When click on the Carousel nav , switch the images
carouselNav.addEventListener('click', (e) => {
    const targetDot = e.target.closest('button');

    if (!targetDot) return;
    const currentImg = list.querySelector('.current--img')
    const currentDot = carouselNav.querySelector('.current--dot')
    const targetIndex = dots.findIndex((dot) => dot === targetDot)
    const targetImg = imgs[targetIndex]

    moveToImg(list, currentImg, targetImg);
    updateDots(currentDot, targetDot)

})

// Hamburger
const mainMenu = document.querySelector('.nav-bar__navmenu');
const closeMenu = document.querySelector('.close-menu');
const openMenu = document.querySelector('.open-menu');
const logo = document.querySelector('.logo');

function toggleMenu() {
    mainMenu.classList.toggle('javamainmenu')
    closeMenu.classList.toggle('javaclosemenu')
    logo.classList.toggle('javalogo')
};

openMenu.addEventListener('click', toggleMenu);
closeMenu.addEventListener('click', toggleMenu);

