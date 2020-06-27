/*jslint this:true,
        devel: true,
        eval: true,
        browser: true,
        es6,
        for
*/
/*global window*/
/*Start initalization*/
var infoName = document.querySelector('.main-container .info-container .info-name span'),
    infoTime = document.querySelector('.main-container .info-container .info-time span'),
    infoTries = document.querySelector('.main-container .info-container .info-tries span'),
    blocks = Array.from(document.querySelectorAll('.main-container .blocks-container .block-container')),
    blocksCount = blocks.length,
    duration = 1000,
    duration2,
    correctBlocks = [],
    seconds,
    terminate,
    toStop,
    flag = false,
    previous_seconds,
    start = false;
/*End initalization*/
/*Start game history sorts */
function gameHistorySorts() {
    "use strict";
    var secondNOTsorted = [],
        secondSorted = [],
        currentSeconds,
        currentKey,
        currentValue,
        currentIndex,
        j,
        cnt,
        next = 0;
    for (j = 0; j < localStorage.length; j += 1) {
        currentKey = localStorage.key(j);
        currentValue = localStorage.getItem(currentKey);
        currentSeconds = Number(currentValue.substring(0, 2)) * 60 + Number(currentValue.substring(3));
        secondNOTsorted.push(currentSeconds);
        secondSorted.push(currentSeconds);
    }
    secondSorted.sort(function (a, b) {
        if (a === b) {
            return 0;
        }
        return a < b ? -1 : 1;
    });
    secondSorted = [...new Set(secondSorted)];
    document.querySelector('.main-container .game-history .best-score').innerHTML = '';
    for (j = 0; j < secondSorted.length; j += 1) {
        next = secondNOTsorted.indexOf(secondSorted[j]);
        for (cnt = next; cnt < secondNOTsorted.length; cnt += 1) {
            currentIndex = secondNOTsorted.indexOf(secondSorted[j], next);
            if (currentIndex !== -1) {
                currentKey = localStorage.key(currentIndex);
                currentValue = localStorage.getItem(currentKey);
                document.querySelector('.main-container .game-history .best-score').innerHTML += 'Name : ' + currentKey + ' - Time : ' + currentValue + '<br>';
                next = currentIndex + 1;
            } else {
                break;
            }
        }
    }
}
/*End game history sorts */
/*Start game history*/
function gameHistory() {
    "use strict";
    localStorage.setItem(infoName.textContent, infoTime.textContent);
    gameHistorySorts();
}
/*End game history*/
/*Start count up function*/
function countUp() {
    "use strict";
    seconds = 0;
    var leftSeconds = 0,
        minutes = 0;
    if (flag === true) {
        seconds = previous_seconds;
        flag = false;
        duration2 = 0;
    }
    document.querySelectorAll(".main-container .game-setting .setting-buttons")[0].classList.add('no-click');
    setTimeout(function () {
        document.querySelectorAll(".main-container .game-setting .setting-buttons")[1].classList.remove('no-click');
        toStop = setInterval(function () {
            seconds += 1;
            minutes = Math.floor(seconds / 60);
            leftSeconds = seconds % 60;
            if (minutes < 10 && leftSeconds < 10) {
                infoTime.textContent = '0' + minutes + ':0' + leftSeconds;
            } else if (minutes < 10) {
                infoTime.textContent = '0' + minutes + ":" + leftSeconds;
            } else if (leftSeconds < 10) {
                infoTime.textContent = minutes + ':0' + leftSeconds;
            } else {
                infoTime.textContent = minutes + ":" + leftSeconds;
            }
            correctBlocks = blocks.filter((block) => block.classList.contains('displayMatched'));
            if (seconds === terminate && Number(correctBlocks.length) - Number(blocksCount) === 0) {
                clearInterval(toStop);
                gameHistory();
                document.querySelector('#messages').setAttribute('class', 'messages');
                document.querySelector('#messages #msg-success').setAttribute('class', 'msg-success');
                document.getElementById('success').play();
                setTimeout(function () {
                    document.querySelector('#messages').classList.remove('messages');
                    document.querySelector('#messages #msg-success').classList.remove('msg-success');
                }, 3000);
                document.querySelector(".main-container .blocks-container").classList.add('no-click');
                document.querySelectorAll(".main-container .game-setting .setting-buttons")[0].classList.add('no-click');
                document.querySelectorAll(".main-container .game-setting .setting-buttons")[1].classList.add('no-click');
                document.querySelectorAll(".main-container .game-setting .setting-buttons")[2].classList.add('no-click');
            } else if (seconds === terminate) {
                clearInterval(toStop);
                document.querySelector('#messages').setAttribute('class', 'messages');
                document.querySelector('#messages #msg-game-over').setAttribute('class', 'msg-game-over');
                document.getElementById('game-over').play();
                setTimeout(function () {
                    document.querySelector('#messages').classList.remove('messages');
                    document.querySelector('#messages #msg-game-over').classList.remove('msg-game-over');
                }, 3000);
                document.querySelector(".main-container .blocks-container").classList.add('no-click');
                document.querySelectorAll(".main-container .game-setting .setting-buttons")[0].classList.add('no-click');
                document.querySelectorAll(".main-container .game-setting .setting-buttons")[1].classList.add('no-click');
                document.querySelectorAll(".main-container .game-setting .setting-buttons")[2].classList.add('no-click');
            } else if (Number(correctBlocks.length) - Number(blocksCount) === 0) {
                clearInterval(toStop);
                gameHistory();
                document.querySelector('#messages').setAttribute('class', 'messages');
                document.querySelector('#messages #msg-success').setAttribute('class', 'msg-success');
                document.getElementById('success').play();
                setTimeout(function () {
                    document.querySelector('#messages').classList.remove('messages');
                    document.querySelector('#messages #msg-success').classList.remove('msg-success');
                }, 3000);
                document.querySelector(".main-container .blocks-container").classList.add('no-click');
                document.querySelectorAll(".main-container .game-setting .setting-buttons")[0].classList.add('no-click');
                document.querySelectorAll(".main-container .game-setting .setting-buttons")[1].classList.add('no-click');
                document.querySelectorAll(".main-container .game-setting .setting-buttons")[2].classList.add('no-click');
            }
        }, duration);
    }, duration2);
}
/*End count up function*/
/*Start waiting 2 secons for player*/
function waiting() {
    "use strict";
    blocks.forEach(function (block) {
        block.classList.add('displayFlip');
        document.querySelector(".main-container .blocks-container").classList.add('no-click');
    });
    setTimeout(function () {
        blocks.forEach(function (block) {
            block.classList.remove('displayFlip');
            document.querySelector(".main-container .blocks-container").classList.remove('no-click');
        });
    }, duration2);
    countUp();
    document.querySelector(".main-container .blocks-container").classList.remove('no-click');
}
/*End waiting 2 secons for player*/
/*Start stop clicking function*/
function stopClicking() {
    "usr strcit";
    document.querySelector(".main-container .blocks-container").classList.add('no-click');
    setTimeout(function () {
        document.querySelector(".main-container .blocks-container").classList.remove('no-click');
    }, duration);
}
/*End stop clicking function*/
/*Start is matched function*/
function isMatched(firstBlock, secondBlock) {
    "use strict";
    if (firstBlock.getAttribute('data-language') === secondBlock.getAttribute('data-language')) {
        firstBlock.classList.remove('displayFlip');
        secondBlock.classList.remove('displayFlip');
        firstBlock.classList.add('displayMatched');
        secondBlock.classList.add('displayMatched');
        document.getElementById('win').play();
    } else {
        infoTries.textContent = Number(infoTries.textContent) + 1;
        setTimeout(function () {
            firstBlock.classList.remove('displayFlip');
            secondBlock.classList.remove('displayFlip');
        }, duration);
        document.getElementById('fail').play();
    }
}
/*End is matched function*/
/*Start random function for images*/
(function setRandomNumbers() {
    "use strict";
    var current = blocksCount,
        randomIndex,
        temp,
        i = 0,
        range = [];
    /*get number of blocks in array*/
    while (i < blocksCount) {
        range[i] = i;
        i += 1;
    }
    /*make random number for index of blocks*/
    while (current > 0) {
        randomIndex = Math.floor(Math.random() * current);
        temp = range[current - 1];
        range[current - 1] = range[randomIndex];
        range[randomIndex] = temp;
        current -= 1;
    }
    /*set order to blocks according to its index in random array*/
    blocks.forEach(function (block, index) {
        block.style.order = range[index];
    });
}());
/*End random function for images*/
/*Start pause function*/
function pause() {
    "use strict";
    if (start === true) {
        clearInterval(toStop);
        document.querySelector(".main-container .blocks-container").classList.add('no-click');
        document.querySelectorAll(".main-container .game-setting .setting-buttons")[1].classList.add('no-click');
        document.querySelectorAll(".main-container .game-setting .setting-buttons")[2].classList.remove('no-click');
    }
}
document.querySelectorAll(".main-container .game-setting .setting-buttons")[1].addEventListener('click', pause);
/*End pause function*/
/*Start continue function*/
function Continue() {
    "use strict";
    if (start === true) {
        flag = true;
        previous_seconds = seconds;
        countUp();
        document.querySelector(".main-container .blocks-container").classList.remove('no-click');
        document.querySelectorAll(".main-container .game-setting .setting-buttons")[1].classList.remove('no-click');
        document.querySelectorAll(".main-container .game-setting .setting-buttons")[2].classList.add('no-click');
    }
}
document.querySelectorAll(".main-container .game-setting .setting-buttons")[2].addEventListener('click', Continue);
/*End continue function*/
/*Start reset function*/
function reset() {
    "use strict";
    location.reload();
}
document.querySelectorAll(".main-container .game-setting .setting-buttons")[3].addEventListener('click', reset);
/*End reset function*/
/*Start info controller*/
document.querySelectorAll('.main-container .game-setting .setting-buttons')[0].addEventListener('click', function () {
    "use strict";
    var name = document.getElementById('player-name').value,
        timeInputs = document.querySelectorAll('.main-container .game-setting input[type = "radio"]');
    timeInputs.forEach(function (timeInput) {
        if (timeInput.checked) {
            start = true;
            duration2 = 5000;
            document.querySelectorAll('.main-container .game-setting .setting-buttons')[0].classList.add('no-click');
            document.querySelectorAll(".main-container .game-setting .setting-buttons")[2].classList.add('no-click');
            if (name === null || name === "") {
                infoName.textContent = "Unknown";
            } else {
                infoName.textContent = name;
            }
            document.getElementById('openDoor').play();
            infoTime.textContent = '00:00';
            if (Number(timeInput.value) !== 6) {
                terminate = Number(timeInput.value) * 60;
            } else if (Number(timeInput.value) === 6) {
                terminate = -1;
            }
            waiting();
        }
    });
});
/*End info controller*/
/* start click on cards */
blocks.forEach(function (block) {
    "use strict";
    block.addEventListener('click', function () {
        block.classList.add('displayFlip');
        var filteredBlocks = blocks.filter((block) => block.classList.contains('displayFlip'));
        if (filteredBlocks.length === 2) {
            stopClicking();
            isMatched(filteredBlocks[0], filteredBlocks[1]);
        }
    });
});
/* End click on cards */
document.querySelector(".main-container .blocks-container").classList.add('no-click');
infoTime.textContent = '00:00';
gameHistorySorts();
