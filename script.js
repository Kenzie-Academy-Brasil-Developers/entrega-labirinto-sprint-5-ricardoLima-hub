//W representa parede, S representa linha de início, F representa linha de chegada
//Os espaços são os caminhos que o jogador pode se movimentar.

//Criar div onde será armazenado o labirinto
//Criar o mapa com o jogador e os espaços

const body = document.querySelector("body")
const containerMap = document.createElement("div")

body.appendChild(containerMap)



const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
];

const player = document.createElement("div")
player.classList = "player"


let forward, backward, upward, downward, position
let movement = 0;

for (let i = 0; i < map.length; i++) {
    let mapLines = document.createElement("div")
    mapLines.classList = "lines"
    containerMap.appendChild(mapLines)
    for (let j = 0; j < map[i].length; j++) {
        let mapCells = document.createElement("div")
        mapCells.id = "cells"
        mapLines.appendChild(mapCells)

        if (map[i][j] === "W") {
            mapCells.classList = "wall"
        }
        if (map[i][j] === " ") {
            mapCells.classList = "passage"
        }
        if (map[i][j] === "S") {
            mapCells.classList = "start"
            mapCells.appendChild(player)
        }
        if (map[i][j] === "F") {
            mapCells.classList = "finish"
        }
    }
}

const movePlayer = (evt) => {
    evt.preventDefault()
    const keyName = evt.key;
    forward = player.parentElement.nextSibling;
    backward = player.parentElement.previousSibling;
    upward = player.parentElement.parentElement.previousSibling;
    downward = player.parentElement.parentElement.nextSibling;
    if (keyName === "ArrowRight" && forward.classList.contains("passage") || forward.classList.contains("finish")) {
        forward.appendChild(player)
        position = forward.getAttribute("class")
        movement++
        winCondition()
    }
    if (keyName === "ArrowLeft" && backward.classList.contains("passage")) {
        backward.appendChild(player)
        position = backward.getAttribute("class")
        movement--
        winCondition()
    }
    if (keyName === "ArrowUp" && upward.childNodes[movement].classList.contains("passage")) {
        upward.childNodes[movement].appendChild(player)
        position = upward.getAttribute("class")
        winCondition()
    }
    if(keyName === "ArrowDown" && downward.childNodes[movement].classList.contains("passage")) {
        downward.childNodes[movement].appendChild(player)
        position = downward.getAttribute("class")
        winCondition()
    }
}

const winCondition = () => {
    if (position === "finish") {
        alert("You Win!")
    }
}

document.addEventListener("keydown", movePlayer)