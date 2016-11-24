// execute on initial load
document.addEventListener('DOMContentLoaded', function() {
    addParticles(10);
});

// execute on browser resize
window.addEventListener('resize', function() {
    var windowSize = getWindowSize();
    var height = windowSize[0];
    var width = windowSize[1];
});

// get current browser window size
// return its height + width
function getWindowSize() {
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        width = w.innerWidth || e.clientWidth || g.clientWidth,
        height = w.innerHeight || e.clientHeight || g.clientHeight;

    // debug
    // console.log("h: " + height + "px\nw: " + width + "px");
    return [height, width];
}

function addParticles(particleCount) {

    var windowSize = getWindowSize();
    var height = windowSize[0];
    var width = windowSize[1];
    var top = height/particleCount;
    var left = width/particleCount;

    var dur = 4 + Math.random();

    var main = document.getElementsByClassName('maincontainer')[0];
    var div;

    for (var i=1; i<=particleCount; i++) {
        div = document.createElement("div");
        div.className = "particle";
        div.style.setProperty('top', i*top+'px');
        div.style.setProperty('left', i*(-left)+'px');
        div.style.setProperty('animation-delay', i*Math.random() + 's');
        div.style.setProperty('animation-duration', dur + 's')

        main.appendChild(div);
    }

    var count_p = document.getElementsByClassName('particle').length;
    console.log("particle count: " + count_p);
}
