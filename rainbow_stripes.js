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
    // var windowSize = getWindowSize();
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

// concatenate time values for animations using seconds as unit
function combineTimeValues(...args) {
    var countVals = args.length;
    var combined = '';

    for (var x=0; x<countVals; x++) {
        combined += args[x] + 's';
        if (x<countVals-1) {
            combined += ', ';
        }
    }
    return combined;
}

function randomise(min, max) {
    return Math.random() * (max-min) + min;
}

// add new particles
function addParticles(addCount) {
    var windowSize = getWindowSize();
    var height = windowSize[0];
    var left = 10;

    // vars for animations move and spin
    var moveDur, moveDelay, spinDur;

    var main = document.getElementsByClassName('maincontainer')[0];
    var div;

    for (var i=1; i<=addCount; i++) {
        // randomise(min, max) for duration in seconds for move, spin
        moveDur = randomise(8, 14);
        spinDur = randomise(2, 8);
        moveDelay = i*Math.random();

        div = document.createElement("div");
        div.className = "particle";

        div.style.setProperty('top', Math.random()*height +'px', '');
        div.style.setProperty('left', -(i*left*Math.random())-left +'px', '');
        div.style.animationDuration = combineTimeValues(moveDur, moveDur, spinDur);
        div.style.animationDelay = combineTimeValues(moveDelay, moveDelay, 0);

        main.appendChild(div);
    }

    var countP = document.getElementsByClassName('particle').length;
    console.log("particle count: " + countP);
}
