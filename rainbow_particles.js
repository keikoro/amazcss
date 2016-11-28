// execute on initial load
document.addEventListener('DOMContentLoaded', function() {
    var windowSize = getWindowSize();
    var height = windowSize[0], width = windowSize[1];
    console.log("h: " + height + "px\nw: " + width + "px");

    addParticles(13);

    var moar_btn = document.getElementById('moar');
    moar_btn.addEventListener('click', function() {
        addParticles(7);
    });

    var less_btn = document.getElementById('less');
    less_btn.addEventListener('click', function() {
        removeParticles(10);
    });
});

// execute on browser resize
window.addEventListener('resize', function() {
    // var windowSize = getWindowSize();
    // var height = windowSize[0], width = windowSize[1];
    // console.log("h: " + height + "px\nw: " + width + "px");

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

// translate current viewport min to pixels
function getVminInPx() {
    var windowSize = getWindowSize();
    var height = windowSize[0];
    var width = windowSize[0];
    var vu;
    if (width > height) {
        vu = Math.floor(height/100);
    } else {
        vu = Math.floor(width/100);
    }
    return vu;
}

// add new particles
function addParticles(addCount) {
    var windowSize = getWindowSize();
    var height = windowSize[0];
    var vu = getVminInPx();
    var left = vu*2.5;

    // vars for animations move and spin
    var moveDur, moveDelay, spinDur;

    var main = document.getElementsByClassName('maincontainer')[0];
    var div, calcLeft;

    for (var i=1; i<=addCount; i++) {
        // randomise(min, max) for duration in seconds for move, spin
        moveDur = randomise(8, 14);
        spinDur = randomise(2, 8);
        moveDelay = i*Math.random();
        calcLeft = -i*Math.random()*left-left;

        div = document.createElement('div');
        div.className = 'particle';

        div.style.setProperty('top', Math.random()*height +'px', '');
        div.style.setProperty('left', calcLeft +'px', '');
        div.style.animationDuration = combineTimeValues(moveDelay+.5, moveDur, moveDur, spinDur);
        div.style.animationDelay = combineTimeValues(0, moveDelay, moveDelay, 0);

        main.appendChild(div);
        // change opacity to make fade in effect set in
        // window.getComputedStyle(div).opacity;
        // div.style.opacity = 1;
    }

    var countP = document.querySelectorAll('.particle:not([data-remove])').length;
    console.log("particle count: " + countP);
}

function removeParticles(removeCount) {
    var allParticles = [], toRemove = [];
    var randomPick, elem;
    // save particle node list as array
    var particlesNL = document.querySelectorAll('.particle:not(.fadeOut)');
    allParticles.push.apply(allParticles, particlesNL);

    // pick random particles to delete from all existing ones
    // & let them fadeout gradually
    for (var y=0; y<removeCount; y++) {
        randomPick = Math.floor(Math.random()*allParticles.length);
        if (particlesNL.length > 0) {
            elem = allParticles[randomPick];
            elem.setAttribute('data-remove', '1');
            elem.className += ' fadeOut';
        }
    }
    particlesNL = [];

    // delete elements after they have faded
    (function(rc) {
        setTimeout(function () {
            toRemove.push.apply(toRemove, document.querySelectorAll('.fadeOut[data-remove]'));
            var elem;
            // check if there are still elements to delete!
            for (var z = 0; (z < rc && document.querySelectorAll('.fadeOut[data-remove]').length > 0); z++) {
                elem = toRemove[z];
                elem.parentNode.removeChild(elem);
            }
            var countAgain = document.querySelectorAll('.particle:not([data-remove])');
            console.log('remaining particles: ' + countAgain.length);
        }, 5000);
    })(removeCount);
}
