// execute on initial load
document.addEventListener('DOMContentLoaded', function() {
    addParticles(13);

    var moar_btn = document.getElementById('moar');
    moar_btn.addEventListener('click', function() {
        addParticles(7);
    });
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
    console.log("h: " + height + "px\nw: " + width + "px");
    return [height, width];
}

// add new particles
function addParticles(addCount) {
    var windowSize = getWindowSize();
    var height = windowSize[0];
    var left = 10;

    // vars for animations move and spin
    var moveDur, moveDelay, spinDur;
    // min/max duration in seconds for move, spin
    var minMD = 8;
    var maxMD = 14;
    var minSD = 2;
    var maxSD = minMD;

    var main = document.getElementsByClassName('maincontainer')[0];
    var div;

    for (var i=1; i<=addCount; i++) {
        moveDur = Math.random() * (maxMD-minMD) + minMD;
        moveDelay = i*Math.random();
        spinDur = Math.random() * (maxSD-minSD) + minSD;

        div = document.createElement("div");
        div.className = "particle";

        div.style.setProperty('top', Math.random()*height +'px', '');
        div.style.setProperty('left', -(i*left*Math.random())-left +'px', '');
        console.log(div.style.left);

        div.style.animation =
            'moveParticle ' + moveDur + 's linear ' + moveDelay +
            's infinite, rainbow ' + moveDur + 's linear ' + moveDelay +
            's infinite, ' + 'spin ' + spinDur + 's linear infinite';

        main.appendChild(div);
    }

    var countP = document.getElementsByClassName('particle').length;
    console.log("particle count: " + countP);
}
