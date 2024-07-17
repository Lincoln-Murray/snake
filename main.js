addEventListener('DOMContentLoaded', (evt) => {
    resize();
});


function resize() {
    if (window.innerHeight >= window.innerWidth) {
        document.getElementById('canvas').style.width = String(window.innerWidth) + 'px'
        document.getElementById('canvas').style.height = String(window.innerWidth) + 'px'
    }
    else {
        document.getElementById('canvas').style.width = String(window.innerHeight) + 'px'
        document.getElementById('canvas').style.height = String(window.innerHeight) + 'px'
    }
}