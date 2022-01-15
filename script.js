let input = ''


//Declare Playership Class
class PlayerShip {
    constructor(hull = 200, firepower = 5, acc = .7, shieldChance = .7) {
        this.hull = hull
        this.firepower = firepower
        this.acc = acc
        this.defeated = false
        this.kills = 0
        this.victories = 0
        this.missiles = 3
        this.missilePower = 15
        this.useMissle = false
        this.shieldChance = shieldChance
        this.shields = true
        this.shieldValue = Math.floor(Math.random() * 6) + 1
    }
    attack(target) {
        let index = Math.random()
        if (index <= this.acc) {
            console.log('You have hit!');
            if (player.useMissle) {
                target.hull -= this.missilePower
            } else {
                target.hull -= this.firepower
            }
        } else {
            console.log("You Missed")
            // console.log(index, this.acc)
        }
    }
    powerPUp() {
        this.firepower += 1
    }
}

//Code created by Jeanette C
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
function randomNum(min, max) {
    return Math.round(Math.random() * (max - min) + min) / 10
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

        if (index > PlayerShip.shieldChance) {
            if (PlayerShip.shields) {
                if (index <= this.acc) {
                    PlayerShip.shieldValue -= this.firepower
                    shieldsDisplay.textContent = "Shields: " + player.shieldValue
                    if (PlayerShip.shieldValue <= 0) {
                        alert('Your shields are down!');
                        PlayerShip.shields = false
                    }
                }
            }
        } else {
            if (index <= this.acc) {
                console.log('Alien has hit!');
                PlayerShip.hull -= this.firepower
            } else {
                console.log("They Missed")
                // console.log(index, this.acc)
            }
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
let missile = document.createElement('p')
missile.textContent = "Missiles: " + player.missiles
pDiv.appendChild(missile)
let shieldsDisplay = document.createElement("p")
shieldsDisplay.textContent = "Shields: " + player.shieldValue
pDiv.appendChild(shieldsDisplay)


//send first alien ship stats to screen
let aDiv = document.getElementById("aStat")
let aHull = document.getElementById("a1")
let aFire = document.getElementById("a2")
let aAcc = document.getElementById("a3")
aHull.textContent = alienShips[0].hull
aFire.textContent = alienShips[0].firepower
aAcc.textContent = alienShips[0].acc

//this method makes the player and the first alien ship do battle
const fight = (input) => {

    if (player.hull > 0) {
        pHull.textContent = player.hull
        console.log("Player is firing...")
        player.attack(input)
        console.log("AlienShip Integrity is at ", input.hull)
        aHull.textContent = input.hull
        aFire.textContent = input.firepower
        aAcc.textContent = input.acc
    } else {
        console.log("Player Destroyed!")
        pHull.textContent = player.hull
        player.defeated = true
        endGame()
    }
    if (input.hull > 0) {
        console.log("Alien is firing...")
        input.attack(player)
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
        player.victories += 1
    }
}
//declaring variables for buttons

let enterButton = document.getElementById("decide")

enterButton.addEventListener("click", (evt) => {
    collectInput()
    action()
})

function collectInput() {
    input = document.getElementById("input").value.toLowerCase();
}



/*possible actions user can take:
r === Retreat
m === Missle
1 === Array 0
2 === Array 1
3 === Array 2
4 === Array 3
5 === Array 4
6 === Array 5
p1 === pod 1
p2 === pod 2
p3 === pod 3
main === mothership 
n === new wave
*/

const action = () => {
    switch (input) {
        case "r":
            player.defeated = true
            endGame()
            break
        case "m":
            player.useMissle = true
            alert("Your Missle is loaded! Now attack a target!")
            break
        case "1":
            fight(alienShips[0])
            break
        case "2":
            fight(alienShips[1])
            break
        case "3":
            fight(alienShips[2])
            break
        case "4":
            fight(alienShips[3])
            break
        case "5":
            fight(alienShips[4])
            break
        case "6":
            fight(alienShips[5])
            break
        case "p1":
            //attack pod one
            alert("p1")
            break
        case "p2":
            //attack pod 2
            alert("p2")
            break
        case "p3":
            //attack pod 3
            alert("p3")
            break
        case "main":
            //attack main hull
            alert("main")
            break
        case "n":
            makeShips()
            break
        default:
            alert("Not a valid input! Try again.")
    }
}

