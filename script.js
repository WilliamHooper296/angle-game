const canvas = document.getElementById("myCanvas");
const input = document.getElementById("input")
const answers = document.getElementById("answers")
const submit = document.getElementById("submit")
const reroll = document.getElementById("reroll")
const output = document.getElementById("correctOutput")

const ctx = canvas.getContext("2d");

const length = 200
const width = canvas.width
const height = canvas.height

let angle = 0

let guesses = 0
let correct = false

function generateAngle(){

    const value = Math.floor(Math.random() * 360)
    const radians = value * (Math.PI / 180)

    const x = length * Math.cos(radians)
    const y = length * Math.sin(radians)

    ctx.clearRect(0, 0, width, height)

    ctx.beginPath();
    ctx.moveTo(canvas.width/2, canvas.height/2);
    ctx.lineTo(canvas.width/2 + length, canvas.height/2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(canvas.width/2, canvas.height/2);
    ctx.lineTo(canvas.width/2 + x, canvas.height/2 - y);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, length/5, 0, -radians, true);
    ctx.stroke();

    angle = value;
}

function verifyGuess(){
    value = input.value

    if(value < 0 || guesses >= 4 || correct){
        return
    }

    difference = Math.abs(angle - value)

    direction = (angle > value) ? "Higher" : "Lower"

    newItemText = ""

    if(difference == 0){
        correct = true
        newItemText = "Correct!"
    }else if(difference < 4){
        newItemText = "Very Hot!"
    }else if(difference < 10){
        newItemText = "Hot"
    }else if(difference < 20){
        newItemText = "Warm"
    }else{
        newItemText = "Cold"
    }

    const newLi = document.createElement("li")
    newLi.textContent = value + "° -- " + newItemText

    if(!correct){
        newLi.textContent = newLi.textContent + " -- " + direction
    }

    answers.append(newLi)

    guesses++
    if(guesses == 4 && !correct){
        correctOutput.textContent = "All Guesses Used! Correct Angle was " + angle + "°"
    }

}

submit.addEventListener("click", verifyGuess)
reroll.addEventListener("click", () => {
    correct = false
    guesses = 0
    answers.replaceChildren()
    correctOutput.textContent = ""
    generateAngle()
})

generateAngle()