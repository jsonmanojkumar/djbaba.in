
(function () {
    'use strict';

    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const mobile = document.getElementById('mobile').value.trim();
        const service = document.getElementById('service').value.trim();

        // Validation
        if (name == '' || mobile == '' || service == '') {
            alert("Please fill all fields correctly to book your event!");
            return;
        }

        if (name.length < 3) {
            alert("Name should be max 3 character");
            return;
        }

        if (!/^\d{10}$/.test(mobile)) {
            alert("Please enter a valid 10-digit mobile number!");
            return;
        }

        // ✅ MULTI-LINE WhatsApp message
        const waMessage =
            'Hello *DJ BABA* \n' +
            'My name is = ' + name + '\n' +
            'My mobile number is = ' + mobile + '\n\n' +
            'I would like to book your ' + service + ' service.\n' +
            'Please contact me.\n\n' +
            'Thank you.';

        window.open(
            'https://wa.me/919758646066?text=' + encodeURIComponent(waMessage),
            '_blank'
        );

        form.reset();
    });
})();




// HERO
const videos = document.querySelectorAll(".heroVideo");
const title = document.getElementById("heroTitle");
const sub = document.getElementById("heroSub");
let current = 0, interval;

function animateText() {
    title.classList.remove("animate-title");
    sub.classList.remove("animate-sub");
    void title.offsetWidth;
    title.classList.add("animate-title");
    sub.classList.add("animate-sub");
}

function showVideo(i) {
    videos.forEach(v => { v.classList.remove("active"); v.pause(); v.currentTime = 0; v.muted = true; });
    videos[i].classList.add("active");
    videos[i].play();
    animateText();
}

function nextVideo() { current = (current + 1) % videos.length; showVideo(current); reset(); }
function prevVideo() { current = (current - 1 + videos.length) % videos.length; showVideo(current); reset(); }

function toggleSound() {
    videos[current].muted = !videos[current].muted;
    const soundIcon = document.getElementById('soundBtn').querySelector('i');
    soundIcon.className = videos[current].muted ? 'fa fa-volume-xmark' : 'fa fa-volume-high';
}

function start() { interval = setInterval(nextVideo, 5000); }
function reset() { clearInterval(interval); start(); }

showVideo(current); start();

// GALLERY
let gIndex = 0;
const track = document.getElementById("galleryTrack");

function slidesToShow() {
    return window.innerWidth >= 768 ? 3 : 1;
}

function updateGallery() {
    const slideWidth = 100 / slidesToShow();
    track.style.transform = `translateX(-${gIndex * slideWidth}%)`;
}

function nextGallery() {
    const maxIndex = track.children.length - slidesToShow();
    gIndex = gIndex >= maxIndex ? 0 : gIndex + 1;
    updateGallery();
}

function prevGallery() {
    const maxIndex = track.children.length - slidesToShow();
    gIndex = gIndex <= 0 ? maxIndex : gIndex - 1;
    updateGallery();
}

setInterval(nextGallery, 4000);
window.addEventListener("resize", updateGallery);
