function scrollToElement(elementId) {
    var element = document.getElementById(elementId);
    if (!element) return;
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: element.offsetTop - 100
    });
}

function switchElements(elementId1, elementId2) {
    var element1 = document.getElementById(elementId1);
    var element2 = document.getElementById(elementId2);
    if (!element1 || !element2) return;

    var parent = element1.parentElement;
    if (!parent) return;

    parent.removeChild(element2);
    parent.insertBefore(element2, element1);
}

document.addEventListener('DOMContentLoaded', function () {
    if(window.innerWidth > 768) return;
    switchElements('s0_1', 's0_2');
});