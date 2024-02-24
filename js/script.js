function scrollToElement(elementId) {
    var element = document.getElementById(elementId);
    if (!element) return;
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: element.offsetTop - 100
    });
}