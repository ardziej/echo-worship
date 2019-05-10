function startTime() {
    let now = new Date()
    let h = now.getHours()
    let m = now.getMinutes()
    let s = now.getSeconds()
    m = addLeadingZero(m)
    s = addLeadingZero(s)
    document.getElementById('clock').innerHTML = h + ":" + m + ":" + s
    let t = setTimeout(startTime, 100)
}

startTime()

function addLeadingZero(i) {
    // add zero in front of numbers < 10
    if (i < 10) {
        i = "0" + i
    }
    return i
}

function minutesToSeconds(minutes) {
    let seconds = minutes * 60
    console.log('seconds: ' + seconds)

    return seconds
}


function secondsToMinutes(seconds) {
    return {
        value: seconds,
        isNegative: seconds < 0,
        minutes: Math.floor(Math.abs(seconds) / 60),
        seconds: Math.abs(seconds % 60)
    }
}


function formatCountdown(time = {}) {
    return (time.isNegative ? '-' : '') + addLeadingZero(time.minutes) + ':' + addLeadingZero(time.seconds) + (time.isNegative ? '\u00A0' : '')
}

let timer

function c(seconds, id) {

    let tSecs = localStorage.getItem('leftTime-' + id)
    let countdownStyle = localStorage.getItem('prompter-style-' + id)
    let counter = document.getElementById('countdown')
    counter.classList.remove("top")
    counter.classList.remove("center")
    counter.classList.add(countdownStyle)

    if (tSecs) seconds = tSecs

    function tick() {
        let leftTime = secondsToMinutes(seconds)
        let formattedLeftTime = formatCountdown(leftTime)
        seconds--
        //console.log(formattedLeftTime)
        let counter = document.getElementById('countdown')
        counter.innerHTML = formattedLeftTime
        if (seconds >= 300) counter.style.color = "white"
        else if (seconds < 300 && seconds > 119) counter.style.color = "yellow"
        else if (seconds < 120 && seconds > 29) counter.style.color = "orange"
        else counter.style.color = "red"
        localStorage.setItem('leftTime-' + id, seconds)

        timer = setTimeout(tick, 1000)
    }

    tick()
}

function cs() {
    clearTimeout(timer)
}


const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

async function something() {
    console.log("this might take some time....")
    await delay(5000)
    console.log("done!")
}

something()

//c(25*60)