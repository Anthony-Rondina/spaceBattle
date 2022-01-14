//Declare Playership Class
class PlayerShip {
    constructor(hull = 200, firepower = 5, acc = .7) {
        this.hull = hull
        this.firepower = firepower
        this.acc = acc
        this.defeated = false
        this.kills = 0
        this.victories = 0
    }
    attack(alienShip) {
        let index = Math.random()
        if (index <= this.acc) {
            console.log('You have hit!');
            alienShip.hull -= this.firepower
        } else {
            console.log("You Missed")
            // console.log(index, this.acc)
        }
    }
    powerPUp() {
        this.firepower += 1
    }
}

// Declare AlienShip Class
class AlienShip {
    constructor() {
        this.hull = Math.floor(Math.random() * (6 - 3 + 1) + 3)
        this.firepower = Math.floor(Math.random() * (4 - 2 + 1) + 2)
        this.acc = Math.round(Math.random() * (8 - 6) + 6) / 10// Range .6 - .8
    }
    attack(PlayerShip) {
        let index = Math.random()
        if (index <= this.acc) {
            console.log('Alien has hit!');
            PlayerShip.hull -= this.firepower
        } else {
            console.log("They Missed")
            // console.log(index, this.acc)
        }
    }
    powerAUp() {
        this.firepower += 1
    }
}
const alienShips = []
const makeShips = () => {
    let index = Math.floor(Math.random() * 6) + 1

    //creating 6 alien ship objects
    for (let i = 0; i < index; i++) {
        alien = new AlienShip
        alienShips.push(alien)
        document.getElementById("alienShip" + i).classList.remove("hidden")
    }
}
makeShips()
//Creating player instance
player = new PlayerShip()

// send player ship's info to screen
let pDiv = document.getElementById('pStat')
let pHull = document.createElement('span')
pHull.textContent = player.hull
pDiv.appendChild(pHull)

//send first alien ship stats to screen
let aDiv = document.getElementById("aStat")
let aHull = document.getElementById("a1")
let aFire = document.getElementById("a2")
let aAcc = document.getElementById("a3")
aHull.textContent = alienShips[0].hull
aFire.textContent = alienShips[0].firepower
aAcc.textContent = alienShips[0].acc
//this method makes the player and the first alien ship do battle
const fight = () => {
    retreat.disabled = true
    if (player.hull > 0) {
        pHull.textContent = player.hull
        console.log("Player is firing...")
        player.attack(alienShips[0])
        console.log("AlienShip Integrity is at ", alienShips[0].hull)
        aHull.textContent = alienShips[0].hull
        aFire.textContent = alienShips[0].firepower
        aAcc.textContent = alienShips[0].acc
    } else {
        console.log("Player Destroyed!")
        pHull.textContent = player.hull
        player.defeated = true
        endGame()
    }
    if (alienShips[0].hull > 0) {
        console.log("Alien is firing...")
        alienShips[0].attack(player)
        console.log("PlayerShip Integrity is at ", player.hull)
        pHull.textContent = player.hull
    } else {
        alert("Alien ship destroyed!")
        alienShips.shift()
        player.kills += 1
        document.getElementById("alienShip" + alienShips.length).classList.add("hidden")
        //write code to change last alien ship in graphic list to be display none
        if (!alienShips.length) {
            endGame()
        } else if (alienShips.length >= 0) {
            alert("Another ship is moving into position, prepare to retreat or open fire.")
            retreat.disabled = false
        }
    }
    pHull.textContent = player.hull
    aHull.textContent = alienShips[0].hull
    aFire.textContent = alienShips[0].firepower
    aAcc.textContent = alienShips[0].acc
    console.log("the array contains ", alienShips)
}

const endGame = () => {
    if (player.defeated) {
        alert("You have made a hasty retreat. Humanity loses this day!")
    } else if (!alienShips.length) {
        alert("Well done Captain! You have saved us all!")
        attack.disabled = true
        retreat.disabled = true
        restart.disabled = false
        player.victories += 1
    }
}
//declaring variables for buttons
let attack = document.getElementById("shoot")
let retreat = document.getElementById('retreat')
let restart = document.getElementById("restart")

//dissabling restart and retreat buttons on load
restart.disabled = true
retreat.disabled = true

//setting event listeners for buttons
attack.addEventListener('click', (evt) => {
    fight()
})

//retreate causes buttons to dim except for restart
retreat.addEventListener('click', (evt) => {
    player.defeated = true
    attack.disabled = true
    retreat.disabled = true
    restart.disabled = false
    endGame()

})

//creates new aliens and pushes them into array for a new game, also resets player stats
restart.addEventListener("click", (evt) => {
    makeShips()
    //increase player power for each time they win
    for (let i = 0; i >= player.victories; i++) {
        player.powerPUp
    }
    player.hull = 200

    //setting buttons so player can only attack or run
    attack.disabled = false
    retreat.disabled = false
    restart.disabled = true
})