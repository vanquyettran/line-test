const images = [
    {
        "type": "PHOTO",
        "thumb": "/uploaded-images/car-red.jpg",
        "original": "/uploaded-images/car-red.jpg",
        "width": 1000,
        "height": 500
    },
    {
        "type": "PHOTO",
        "thumb": "/uploaded-images/car-white.jpg",
        "original": "/uploaded-images/car-white.jpg",
        "width": 1000,
        "height": 500
    },
    {
        "type": "PHOTO",
        "thumb": "/uploaded-images/car-black.jpg",
        "original": "/uploaded-images/car-black.jpg",
        "width": 1000,
        "height": 500
    },
    {
        "type": "PHOTO",
        "thumb": "/uploaded-images/ship-white.jpg",
        "original": "/uploaded-images/ship-white.jpg",
        "width": 1000,
        "height": 500
    },
    {
        "type": "PHOTO",
        "thumb": "/uploaded-images/hanoi-1.jpg",
        "original": "/uploaded-images/hanoi-1.jpg",
        "width": 1000,
        "height": 500
    },
    {
        "type": "PHOTO",
        "thumb": "/uploaded-images/hanoi-2.jpg",
        "original": "/uploaded-images/hanoi-2.jpg",
        "width": 1000,
        "height": 500
    },
    {
        "type": "PHOTO",
        "thumb": "/uploaded-images/hanoi-3.jpg",
        "original": "/uploaded-images/hanoi-3.jpg",
        "width": 1000,
        "height": 500
    },
    {
        "type": "PHOTO",
        "thumb": "/uploaded-images/hanoi-4.jpg",
        "original": "/uploaded-images/hanoi-4.jpg",
        "width": 1000,
        "height": 500
    },
    {
        "type": "PHOTO",
        "thumb": "/uploaded-images/mediterranean-1.jpg",
        "original": "/uploaded-images/mediterranean-1.jpg",
        "width": 1000,
        "height": 500
    },
    {
        "type": "PHOTO",
        "thumb": "/uploaded-images/mediterranean-2.jpg",
        "original": "/uploaded-images/mediterranean-2.jpg",
        "width": 1000,
        "height": 500
    },
    {
        "type": "PHOTO",
        "thumb": "/uploaded-images/mediterranean-3.jpg",
        "original": "/uploaded-images/mediterranean-3.jpg",
        "width": 1000,
        "height": 500
    },
    {
        "type": "PHOTO",
        "thumb": "/uploaded-images/mediterranean-4.jpg",
        "original": "/uploaded-images/mediterranean-4.jpg",
        "width": 1000,
        "height": 500
    },
    {
        "type": "PHOTO",
        "thumb": "/uploaded-images/mediterranean-5.jpg",
        "original": "/uploaded-images/mediterranean-5.jpg",
        "width": 1000,
        "height": 500
    },
    {
        "type": "PHOTO",
        "thumb": "/uploaded-images/mediterranean-6.jpg",
        "original": "/uploaded-images/mediterranean-6.jpg",
        "width": 1000,
        "height": 500
    },
    {
        "type": "PHOTO",
        "thumb": "/uploaded-images/mediterranean-7.jpg",
        "original": "/uploaded-images/mediterranean-7.jpg",
        "width": 1000,
        "height": 500
    }
];

function getRandomImages() {
    return shuffle(images).slice(0, 8);
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function getRandomImage() {
    return images[Math.floor(Math.random() * images.length)];
}

module.exports = {
    getRandomImage,
    getRandomImages
};
