var startFireWorks = function() {

    var createRandom = function(min, max) {
        var randomArray = new Array();
        for (var a = 0; a < 20; a++)
            randomArray.push(Math.floor(Math.random() * (max - min)) + min);
        return randomArray;
    }
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight || e.clientHeight || g.clientHeight;


    var randomIntArray = createRandom(10, 200);
    var randomX = createRandom(5, x - 30);
    var randomY = createRandom(5, y - 40);
    var randomColorIndex = createRandom(0, 7);
    var randomFlare = createRandom(15, 25);
    var flareIndex = 0;
    var intIndex = 0;
    var randIndex = 0;
    var colorIndex = 0;

    var Firework = function(colors, pos, diam) {
        this.colors = colors;
        this.position = pos;
        this.diameter = diam;
    }


    var audio = document.getElementsByTagName("audio")[0];

    var animateWork = function(firework, diam, curDivPos, color) {

        function createFlare(diam, pos, num) {
            var flare = document.createElement("div");
            flare.id = "flare" + num;
            flare.style.position = "absolute";
            flare.style.width = "2px";
            flare.style.height = "2px";
            flare.style.top = pos.row + "px";
            flare.style.left = pos.column + "px";
            flare.style.border = "1px " + color + " solid";
            flare.style.backgroundColor = color;
            return flare;
        }

        for (var num = 0; num < randomFlare[0]; num++)
            document.body.appendChild(createFlare(diam, curDivPos, num));

        function forSetTimeout(i, time, flareGet, direction) {
            var func;
            switch (direction % 8) {
                case 0:
                    func = function() {
                        flareGet.style.top = parseInt(flareGet.style.top, 10) - 1 + "px";
                    }
                    break;
                case 1:
                    func = function() {
                        flareGet.style.top = parseInt(flareGet.style.top, 10) - 1 + "px";
                        flareGet.style.left = parseInt(flareGet.style.left, 10) + 1 + "px";
                    }
                    break;
                case 2:
                    func = function() {
                        flareGet.style.left = parseInt(flareGet.style.left, 10) + 1 + "px";
                    }
                    break;
                case 3:
                    func = function() {
                        flareGet.style.top = parseInt(flareGet.style.top, 10) + 1 + "px";
                        flareGet.style.left = parseInt(flareGet.style.left, 10) + 1 + "px";
                    }
                    break;
                case 4:
                    func = function() {
                        flareGet.style.top = parseInt(flareGet.style.top, 10) + 1 + "px";
                    }
                    break;
                case 5:
                    func = function() {
                        flareGet.style.top = parseInt(flareGet.style.top, 10) + 1 + "px";
                        flareGet.style.left = parseInt(flareGet.style.left, 10) - 1 + "px";
                    }
                    break;
                case 6:
                    func = function() {
                        flareGet.style.left = parseInt(flareGet.style.left, 10) - 1 + "px";
                    }
                    break;
                case 7:
                    func = function() {
                        flareGet.style.top = parseInt(flareGet.style.top, 10) - 1 + "px";
                        flareGet.style.left = parseInt(flareGet.style.left, 10) - 1 + "px";
                    }
                    break;
                default:
                    return "wat";
            }
            setTimeout(func, time);
            setTimeout(function() {
                document.getElementsByTagName("body")[0].removeChild(flareGet);
                document.getElementsByTagName("body")[0].removeChild(document.getElementById("boom"));
            }, 500);
        }
        for (var f = 0; f < randomFlare[0]; f++) {
            var flareGet = document.getElementById("flare" + f);

            intIndex++;
            if (intIndex == randomIntArray.length - 1)
                intIndex = 0;
            for (var i = 0; i < diam + randomIntArray[intIndex]; i++) {
                forSetTimeout(i, 300 + i + f * 5, flareGet, f);
            }
        }
    }

    var colorArray = ["white", "yellow", "purple", "blue", "orange", "red", "green", "pink"];
    window.refreshIntervalId = setInterval(function() {
        audio.play();
        var position = {
            row: randomY[randIndex],
            column: randomX[randIndex]
        };

        var testFireWork = new Firework(colorArray[randomColorIndex[colorIndex++]], position, randomIntArray[0]);

        var fireworkDiv = document.createElement("div");
        fireworkDiv.id = "boom";
        fireworkDiv.style.width = "10px";
        fireworkDiv.style.height = "10px";
        fireworkDiv.style.position = "absolute";
        fireworkDiv.style.backgroundColor = testFireWork.colors;
        fireworkDiv.style.top = testFireWork.position.row + "px";
        fireworkDiv.style.left = testFireWork.position.column + "px";
        fireworkDiv.style.border = "1px dark" + testFireWork.colors + " solid"
        document.getElementsByTagName("body")[0].appendChild(fireworkDiv);
        animateWork(testFireWork, testFireWork.diameter, testFireWork.position, testFireWork.colors);
        randIndex++;
    }, 1000);
}

startFireWorks();

function stopFireWorks() {
    clearInterval(window.refreshIntervalId);
}

function mute() {
    var aud = document.getElementsByTagName("audio")[0].muted;
    if (aud == false) {
        document.getElementsByTagName("audio")[0].muted = true;
        document.getElementById("butt2").innerHTML = "Unmute sound"
    } else {
        document.getElementsByTagName("audio")[0].muted = false;
        document.getElementById("butt2").innerHTML = "Mute Annoying sound"
    }
}