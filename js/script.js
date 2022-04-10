const hamburger = document.getElementById("hamburger");
const navbar = document.getElementById("navbar");

hamburger.addEventListener('click', () => {
    navbar.classList.toggle('show');
})

var preloader = document.getElementById("preloader");

window.addEventListener('load', function(){
    preloader.style.display = "none";
});

AOS.init({
    offset: 300,
    duration: 900
});