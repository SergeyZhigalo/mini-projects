function polygon(c, n, x, y, r, angle=0, counterclockwise=0) {
    c.moveTo(x + r*Math.sin(angle), y-r*Math.cos(angle))
    let delta = 2*Math.PI/n
    for (let i = 1; i < n; i++){
        angle += counterclockwise?-delta:delta
        c.lineTo(x + r*Math.sin(angle), y-r*Math.cos(angle))
    }
    c.closePath()
}

function rads(x) {
    return Math.PI * x / 180
}

let deg = Math.PI / 180

function snowflake(c, n, x, y, len) {
    c.save()
    c.translate(x, y)
    c.moveTo(0, 0)
    leg(n)
    c.rotate(-120*deg)
    leg(n)
    c.rotate(-120*deg)
    leg(n)
    c.closePath()
    c.restore()

    function leg(n) {
        c.save()
        if (n === 0){
            c.lineTo(len, 0)
        }else{
            c.scale(1/3, 1/3)
            leg(n-1)
            c.rotate(60*deg)
            leg(n-1)
            c.rotate(-120*deg)
            leg(n-1)
            c.rotate(60*deg)
            leg(n-1)
        }
        c.restore()
        c.translate(len, 0)
    }
}

let c1 = document.getElementById("my_canvas1").getContext("2d")
let c2 = document.getElementById("my_canvas2").getContext("2d")
let c3 = document.getElementById("my_canvas3").getContext("2d")
let c4 = document.getElementById("my_canvas4").getContext("2d")

c1.fillStyle = c2.fillStyle = c3.fillStyle = c4.fillStyle = "#AAA"
c1.strokeStyle = c2.strokeStyle = c3.strokeStyle = c4.strokeStyle = "#000"
c1.lineWidth = c2.lineWidth = c3.lineWidth = c4.lineWidth = 2
c1.font = c2.font = c3.font = c4.font = "bold 60pt sans-serif"

// Простые фигуры
// ромб
polygon(c1, 4, 100, 60, 50)
// пятиугольник
polygon(c1, 5, 205, 55, 50)
// шестиугольник
polygon(c1, 6, 315, 53, 50, Math.PI/6)
// квадрат в шестиугольнике
polygon(c1, 4, 315, 53, 20, Math.PI/4, true)
c1.stroke()

// Фракталы
// n = 0
snowflake(c2, 0, 25, 125, 125)
// n = 1
snowflake(c2, 1, 175, 125, 125)
// n = 2
snowflake(c2, 2, 325, 125, 125)
// n = 3
snowflake(c2, 3, 475, 125, 125)
// n = 4
snowflake(c2, 4, 625, 125, 125)
c2.stroke()

// Графика
// круг
c3.beginPath()
c3.arc(75, 100, 50, 0, rads(360), false)
c3.fill()
c3.stroke()
// овал
c3.beginPath()
c3.ellipse(200, 100, 50, 35, rads(15), 0, rads(360), false)
// диаграмма
c3.moveTo(325, 100)
c3.arc(325, 100, 50, rads(-60), rads(0), true)
c3.closePath()
c3.moveTo(340, 92)
c3.arc(340, 92, 42, rads(-60), rads(0), false)
c3.closePath()
// квадрат со скошенными углами
c3.moveTo(450, 50)
c3.arcTo(500, 50, 500, 150, 30)
c3.arcTo(500, 150, 400, 150, 20)
c3.arcTo(400, 150, 400, 50, 10)
c3.arcTo(400, 50, 500, 50, 0)
c3.closePath()
// кривые Безье
c3.moveTo(525, 125)
c3.quadraticCurveTo(550, 75, 625, 125)
c3.fillRect(550-3, 75-3, 6, 6)
c3.moveTo(625, 100)
c3.bezierCurveTo(645, 70, 705, 130, 725, 100)
c3.fillRect(645-3, 70-3, 6, 6)
c3.fillRect(705-3, 130-3, 6, 6)
c3.fill()
c3.stroke()

// Наложение
c4.strokeRect(175, 25, 50, 310)
c4.strokeText("<canvas>", 15, 330)
polygon(c4, 3, 200, 225, 200)
polygon(c4, 3, 200, 225, 100, 0, true)
c4.clip()
c4.lineWidth = 10
c4.stroke()
c4.fillStyle="#aaa";
c4.fillRect(175,25,50,325)
c4.fillStyle="#888";
c4.fillText("<canvas>", 15, 330)