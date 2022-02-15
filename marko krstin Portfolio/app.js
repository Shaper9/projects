const accounts = [
    {
        owner: "Marko Krstin",
        username: "marko",
        password: 133
    },
    {
        owner: "Pera Markovic",
        username: "test",
        password: 123
    },
    {
        owner: "Djura Djuric",
        username: "test2",
        password: 123
    }
];
// Login
const loginForm = document.querySelector('.login-form')
const usernameInput = document.querySelector('.login-form_user');
const passwordInput = document.querySelector('.login-form_pass');
const loginBtn = document.querySelector('.login-form_btn');
const loginSuccessDiv = document.querySelector('.login-success');
const loginSuccessDivContent = document.querySelector('.login-success-content')
const closeLoginSuccessDiv = document.querySelector('.close-success-btn');


const body = document.getElementById('css-zen-gardena')

let currentAccount;
loginBtn.addEventListener('click', function (e) {
    e.preventDefault();


    currentAccount = accounts.find(acc => acc.username === usernameInput.value)  // check username
    if (currentAccount?.password === Number(passwordInput.value)) {  //check password
        loginSuccessDiv.classList.toggle('active')
        loginSuccessDivContent.textContent = `Welcome back ${currentAccount.owner}`
        body.classList.toggle('active')

    } else {
        window.alert("Password or Username invalid. Please try again.");
        usernameInput.value = "";
        passwordInput.value = "";
    }

    let innerLoginHtml = loginForm.innerHTML
    closeLoginSuccessDiv.addEventListener('click', function (e) {
        loginSuccessDiv.classList.toggle('active');
        usernameInput.value = "";
        passwordInput.value = "";
        loginForm.innerHTML = `<p class="js-logout">Logged in as ${currentAccount.owner} <br> Click HERE to logout</p>`
        const jsLogout = document.querySelector('.js-logout')
        jsLogout.addEventListener('click', function (e) {
            loginForm.innerHTML = innerLoginHtml
        })
    })


})






// -----------------------------------------------------------------------
const primaryNav = document.querySelector('.primary-navigation');
const navToggle = document.querySelector('.mobile-nav-toggle');


navToggle.addEventListener('click', () => {
    const visibility = primaryNav.getAttribute("data-visible")
    if (visibility === "false") {
        primaryNav.setAttribute("data-visible", true);
        navToggle.setAttribute("aria-expanded", true);
    }
    else if (visibility === "true") {
        primaryNav.setAttribute('data-visible', false);
        navToggle.setAttribute("aria-expanded", false);
    }
});


const toggleBtn = document.querySelector('.toggle-btn');
const toggleContainer = document.querySelector('.toggle-container');

// light
const footer = document.querySelector('.sidebar');
const divider = document.querySelector('.custom-shape-divider-bottom-1637175384');


function toggle() {
    toggleContainer.classList.toggle('toggled');
    toggleBtn.classList.toggle('toggled');

    // light
    footer.classList.toggle('light');
    divider.classList.toggle('light');
    wholeNav.classList.toggle('light')

}

toggleBtn.addEventListener('click', toggle);


const jumpBTN = document.querySelector('.jumpto');
jumpBTN.addEventListener('click', () => {
    footer.scrollIntoView({ behavior: "smooth" });
})



// TABS
const tabsBtn1 = document.querySelector('.tabs-btn1');
const tabsBtn2 = document.querySelector('.tabs-btn2');
const tabsBtn3 = document.querySelector('.tabs-btn3');

const para1 = document.querySelector('.para1');
const para2 = document.querySelector('.para2');
const para3 = document.querySelector('.para3');

function removeActive() {
    para1.classList.remove('active');
    para2.classList.remove('active');
    para3.classList.remove('active');
}

function removeBottom() {
    tabsBtn1.style.bottom = "0px";
    tabsBtn1.style.borderBottom = "0.2em solid black"
    tabsBtn2.style.bottom = "0px";
    tabsBtn2.style.borderBottom = "0.2em solid black"
    tabsBtn3.style.bottom = "0px";
    tabsBtn3.style.borderBottom = "0.2em solid black"
}

tabsBtn1.addEventListener('click', () => {
    removeActive();
    removeBottom();
    para1.classList.add('active');
    tabsBtn1.style.position = "relative";
    tabsBtn1.style.bottom = "20px";
    tabsBtn1.style.borderBottom = "1em solid black"
})

tabsBtn2.addEventListener('click', () => {
    removeActive();
    removeBottom();
    para2.classList.add('active');
    tabsBtn2.style.position = "relative";
    tabsBtn2.style.bottom = "20px";
    tabsBtn2.style.borderBottom = "1em solid black"
})

tabsBtn3.addEventListener('click', () => {
    removeActive();
    removeBottom();
    para3.classList.add('active');
    tabsBtn3.style.position = "relative";
    tabsBtn3.style.bottom = "20px";
    tabsBtn3.style.borderBottom = "1em solid black"
})

// Fading Tabs
const buttons = document.querySelector('.tabs-buttons');

function fadeOut() {
    tabsBtn1.style.opacity = "0.3";
    tabsBtn2.style.opacity = "0.3";
    tabsBtn3.style.opacity = "0.3";
}

function fadeIn() {
    tabsBtn1.style.opacity = "1";
    tabsBtn2.style.opacity = "1";
    tabsBtn3.style.opacity = "1";
}

buttons.addEventListener('mouseover', function (e) {
    if (e.target.classList.contains('tabs-btn')) {
        const clicked = e.target;
        fadeOut();
        clicked.style.opacity = "1";
    }
})

buttons.addEventListener('mouseout', function () {
    fadeIn();
})

// Sticky nav
const wholeNav = document.querySelector('.primary-header');
const section1 = document.querySelector('.intro');
// const initialCoords = section1.getBoundingClientRect();

const stickyNav = function (entries) {  //funckija koju zelimo da izvrsitmo
    const [entry] = entries; // array deconstructuring, isto kao kad bismo napisali entries[0]
    if (!entry.isIntersecting) {
        wholeNav.classList.add('sticky')
    } else {
        wholeNav.classList.remove('sticky')
    }
}
const sectionObserver = new IntersectionObserver(stickyNav, { //pravimo observer u kom prvi argument je funckija koju zelimo da se izvrsi dok je drugi argument namesatanje treshhold-a
    root: null,
    threshold: 0,
    rootMargin: '-90px'
});
sectionObserver.observe(section1)



// Slider

var swiper = new Swiper(".mySwiper", {
    effect: "cards",
    grabCursor: true,
});

const wholeSlider = document.querySelector('.slider')
const slide1 = document.querySelector('.slide1');
const slide2 = document.querySelector('.slide2');
const slide3 = document.querySelector('.slide3');
const slide4 = document.querySelector('.slide4');
const slide5 = document.querySelector('.slide5');
const slide6 = document.querySelector('.slide6');
const slide7 = document.querySelector('.slide7')
const slide1Text = document.querySelector('.slide1-text');
const slide2Text = document.querySelector('.slide2-text');
const slide3Text = document.querySelector('.slide3-text');
const slide4Text = document.querySelector('.slide4-text');
const slide5Text = document.querySelector('.slide5-text');
const slide6Text = document.querySelector('.slide6-text');
const slide7Text = document.querySelector('.slide7-text')

wholeSlider.addEventListener("mouseover", function () {
    const slide1IsActive = slide1.classList.contains('swiper-slide-visible');
    const slide2IsActive = slide2.classList.contains('swiper-slide-visible');
    const slide3IsActive = slide3.classList.contains('swiper-slide-visible');
    const slide4IsActive = slide4.classList.contains('swiper-slide-visible');
    const slide5IsActive = slide5.classList.contains('swiper-slide-visible');
    const slide6IsActive = slide6.classList.contains('swiper-slide-visible');
    const slide7IsActive = slide7.classList.contains('swiper-slide-visible');


    const reset = () => {
        slide1Text.classList.remove('active')
        slide2Text.classList.remove('active')
        slide3Text.classList.remove('active')
        slide4Text.classList.remove('active')
        slide5Text.classList.remove('active')
        slide6Text.classList.remove('active')
        slide7Text.classList.remove('active')
    }

    if (slide1IsActive) {
        reset();
        slide1Text.classList.add('active');
    }
    if (slide2IsActive) {
        reset();
        slide2Text.classList.add('active');
    }
    if (slide3IsActive) {
        reset()
        slide3Text.classList.add('active')
    }
    if (slide4IsActive) {
        reset()
        slide4Text.classList.add('active')
    }
    if (slide5IsActive) {
        reset()
        slide5Text.classList.add('active')
    }
    if (slide6IsActive) {
        reset()
        slide6Text.classList.add('active')
    }
    if (slide7IsActive) {
        reset()
        slide7Text.classList.add('active')
    }

});
// Swiper Mobile
wholeSlider.addEventListener("touchend", function (e) {
    const slide1IsActive = slide1.classList.contains('swiper-slide-visible');
    const slide2IsActive = slide2.classList.contains('swiper-slide-visible');
    const slide3IsActive = slide3.classList.contains('swiper-slide-visible');
    const slide4IsActive = slide4.classList.contains('swiper-slide-visible');
    const slide5IsActive = slide5.classList.contains('swiper-slide-visible');
    const slide6IsActive = slide6.classList.contains('swiper-slide-visible');
    const slide7IsActive = slide7.classList.contains('swiper-slide-visible');

    // console.log("-------------------------------");
    // console.log(`Slide1 je ${slide1IsActive}`);
    // console.log(`Slide2 je ${slide2IsActive}`);
    // console.log(`Slide3 je ${slide3IsActive}`);
    // console.log(`Slide4 je ${slide4IsActive}`);
    // console.log(`Slide5 je ${slide5IsActive}`);

    const reset = () => {
        slide1Text.classList.remove('active')
        slide2Text.classList.remove('active')
        slide3Text.classList.remove('active')
        slide4Text.classList.remove('active')
        slide5Text.classList.remove('active')
        slide6Text.classList.remove('active')
        slide7Text.classList.remove('active')
    }

    if (slide1IsActive) {
        reset();
        slide1Text.classList.add('active');
    }
    if (slide2IsActive) {
        reset();
        slide2Text.classList.add('active');
    }
    if (slide3IsActive) {
        reset()
        slide3Text.classList.add('active')
    }
    if (slide4IsActive) {
        reset()
        slide4Text.classList.add('active')
    }
    if (slide5IsActive) {
        reset()
        slide5Text.classList.add('active')
    }
    if (slide6IsActive) {
        reset()
        slide6Text.classList.add('active')
    }
    if (slide7IsActive) {
        reset()
        slide7Text.classList.add('active')
    }
});


// Cookie

gsap.fromTo('.cookie-wrapper', { opacity: 0 }, { opacity: 0 })

const btn = document.querySelector('.btn');
const cookieWrapper = document.querySelector('.cookie-wrapper')
const timeline = gsap.timeline({ defaults: { duration: 0.75 } });

setTimeout(() => {
    cookieWrapper.classList.add('.active')
    timeline.fromTo(".cookie-wrapper", { opacity: 0 }, { opacity: 1, duration: 0.1 })

    timeline.fromTo(".cookie-container", { scale: 0 }, { scale: 1, ease: Elastic.easeOut.config(1, 0.2), duration: 1.5 })

    timeline.fromTo('.cookie-container__text', { y: -100, opacity: 0 }, { y: 0, opacity: 1 }, "<30%")


    timeline.fromTo(".cookie-img", { x: -50, opacity: 0, rotation: "-50deg" }, { x: 0, opacity: 1, rotation: "0deg" }, "<20%")

    timeline.fromTo('.btn', { opacity: 0, y: 50 }, { opacity: 1, y: 0 }, "<70%")

    timeline.fromTo('.cookie-img', { y: 0 }, { y: -20, yoyo: true, repeat: -1 })

    btn.addEventListener("click", () => {
        gsap.to('.cookie-container', { opacity: 0, scale: 0, duration: 0.5 })
        gsap.to('.btn', { opacity: 0 })
        gsap.to('.cookie-wrapper', { opacity: 0, duration: 0.5 })

        setTimeout(() => {
            cookieWrapper.classList.add('deactive')
        }, 500)
    })
}, 3000)





