console.log("Hello from main.js");

const numberOfVisibleCells = 5;

const zIndexForPosition = function (position) {
    return (
        (position === 0 || position === 4) ? 1 :
            (position === 1 || position === 3) ? 2 :
                3
    );
};

const opacityForPosition = function (position) {
    return (
        (position === 0 || position === 4) ? 0.4 :
            (position === 1 || position === 3) ? 0.7 :
                1
    );
};

const transformForPosition = function (position) {
    return ({
        0: 'translateX(160px) translateY(31px) scale(.8)',
        1: 'translateX(300px) translateY(31px) scale(1)',
        2: 'translateX(500px) translateY(31px) scale(1.3)',
        3: 'translateX(700px) translateY(31px) scale(1)',
        4: 'translateX(860px) translateY(31px) scale(.8)',
    })[position];
};

const isBefore = function (index, visibleCells, cellsLength) {
    let beforeFirstIndex = visibleCells[0] - 1;
    if (beforeFirstIndex < 0) beforeFirstIndex += cellsLength;
    return index === beforeFirstIndex;
};

const isAfter = function (index, visibleCells, cellsLength) {
    let afterLastIndex = visibleCells[visibleCells.length - 1] + 1;
    if (afterLastIndex >= cellsLength) afterLastIndex -= cellsLength;
    return index === afterLastIndex;
}

const positionGalleryFilmstrip = function (offset, animate = true) {
    const filmstrip = $('.gallery-filmstrip');
    const cells = filmstrip.children();
    if (offset < 0) offset += cells.length;
    const visibleCells = visibleIndicies(cells.length, numberOfVisibleCells, offset);

    if (animate) {
        filmstrip.addClass('gallery-filmstrip-animated');
    } else {
        filmstrip.removeClass('gallery-filmstrip-animated');
    }

    cells.each(function (index) {
        const cell = $(this);
        let position = visibleCells.indexOf(index);

        if (isBefore(index, visibleCells, cells.length)) {
            cell.css({
                display: 'block',
                zIndex: '0',
                opacity: '0',
                transform: 'translateX(100px) translateY(31px) scale(.6)',
            });
        } else if (isAfter(index, visibleCells, cells.length)) {
            cell.css({
                display: 'block',
                zIndex: '0',
                opacity: '0',
                transform: 'translateX(890px) translateY(31px) scale(.6)',
            });
        } else if (position === -1) {
            cell.css({
                display: 'none',
                zIndex: '0',
                opacity: '1',
                transform: '',
            });
        } else {
            cell.css({
                display: 'block',
                zIndex: zIndexForPosition(position),
                opacity: opacityForPosition(position),
                transform: transformForPosition(position),
            });
        }

        if (position === 2) {
            const src = cell.find('> img').attr('src');
            const image = $('<img>').attr('src', src);
            const gallery = filmstrip.closest('.gallery');
            const galleryMain = gallery.find('> .gallery-main');
            const currentImageWrapper = galleryMain.find('.gallery-main-image:first');
            const nextImageWrapper = currentImageWrapper.clone();
            const nextImage = nextImageWrapper.find('> img');

            if (nextImage.attr('src') === src) return;

            nextImage.attr('src', src);
            galleryMain.prepend(nextImageWrapper);
            currentImageWrapper.fadeOut(function () {
                currentImageWrapper.remove();
            });
        }
    });
}

const initializeGallery = function () {
    positionGalleryFilmstrip(0, false);
    $('.gallery-filmstrip > *').on('click', function (event) {
        event.preventDefault();
        const cell = $(this);
        const index = cell.index();
        console.log('CLICKED', index);
        positionGalleryFilmstrip(index - 2);
    });
};

initializeGallery();