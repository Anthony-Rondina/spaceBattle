let input = ''


//Declare Playership Class
class PlayerShip {
    constructor(hull = 20, firepower = 5, acc = .7, shieldChance = .7) {
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
                this.missiles -= 1
                this.useMissle = false
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
        this.motherShipPart = false
    }
    attack(PlayerShip) {
        let index = Math.random()

        if (PlayerShip.shields) {
            if (index <= this.acc) {
                if (index >= PlayerShip.shieldChance) {
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

let motherShip = []
let alienShips = []

//send first alien ship stats to screen
let aDiv = document.getElementById("aStat")
let aHull = document.getElementById("a1")
let aFire = document.getElementById("a2")
let aAcc = document.getElementById("a3")

const makeShips = () => {
    let coinFlip = Math.floor(Math.random() * 2)

    //first flip makes regular ships
    if (coinFlip === 1) {
        let index = Math.floor(Math.random() * 6) + 1

        //creating 6 alien ship objects
        for (let i = 0; i < index; i++) {
            alien = new AlienShip
            alienShips.push(alien)
            document.getElementById("alienShip" + i).classList.remove("hidden")
        }
        aHull.textContent = alienShips[0].hull
        aFire.textContent = alienShips[0].firepower
        aAcc.textContent = alienShips[0].acc
    } else {// else make a mother ship
        document.getElementById("alienShip0").classList.remove("hidden")
        document.getElementById("alienShip0").src = "https://i.imgur.com/4MwD5Ne.png"
        for (let i = 0; i < 4; i++) {
            part = new AlienShip
            part.motherShipPart = true
            motherShip.push(part)
        }
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
let killCount = document.createElement('p')
killCount.textContent = "Kills: " + player.kills
pDiv.appendChild(killCount)
let medals = document.createElement('p')
medals.textContent = "Medals: "
pDiv.appendChild(medals)


//this method makes the player and the first alien ship do battle
const fight = (input) => {
    pHull.textContent = player.hull
    aHull.textContent = input.hull
    aFire.textContent = input.firepower
    aAcc.textContent = input.acc
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
        console.log("Target is firing...")
        input.attack(player)
        console.log("PlayerShip Integrity is at ", player.hull)
        pHull.textContent = player.hull
    } else {
        alert("Target destroyed!")
        alienShips.shift()
        player.kills += 1
        medalsAndPowerUps()
        killCount.textContent = "Kills: " + player.kills
        missile.textContent = "Missiles: " + player.missiles
        document.getElementById("alienShip" + alienShips.length).classList.add("hidden")
        //write code to change last alien ship in graphic list to be display none
        if (!alienShips.length) {
            endGame()
        } else if (alienShips.length >= 0) {
            alert("Another ship is moving into position, prepare to retreat or open fire.")

        }
    }
    pHull.textContent = player.hull
    aHull.textContent = input.hull
    aFire.textContent = input.firepower
    aAcc.textContent = input.acc
}

// setting count variable to assign damage pictures instead of checking each pod
let damageCount = 0
const fightMotherShip = (input) => {
    pHull.textContent = player.hull
    aHull.textContent = input.hull
    aFire.textContent = input.firepower
    aAcc.textContent = input.acc
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
        console.log("Target is firing...")
        input.attack(player)
        console.log("PlayerShip Integrity is at ", player.hull)
        pHull.textContent = player.hull
    } else {
        alert("Target destroyed!")
        player.kills += 1
        killCount.textContent = "Kills: " + player.kills
        missile.textContent = "Missiles: " + player.missiles
        damageCount++
        switch (damageCount) {
            case 1:
                document.getElementById("alienShip0").src = "https://i.imgur.com/NCx5Yj1.png"
                break
            case 2:
                document.getElementById("alienShip0").src = "https://i.imgur.com/pucstYq.png"
                break
            case 3:
                document.getElementById("alienShip0").src = "https://i.imgur.com/XcttMP7.png"
                break
            case 4:
                document.getElementById("alienShip0").classList.add("hidden")
                damageCount = 0
                break
            default:
                break
        }

        //write code to change last alien ship in graphic list to be display none
        if (motherShip[0].hull <= 0 && motherShip[1].hull <= 0 && motherShip[2].hull <= 0 && motherShip[3].hull <= 0) {
            endGame()
        } else {
            alert("Keep attacking all weapon pods to clear a way to the main hull!")

        }
    }
    pHull.textContent = player.hull
    aHull.textContent = input.hull
    aFire.textContent = input.firepower
    aAcc.textContent = input.acc
}

const endGame = () => {
    if (player.defeated) {
        alert("You have made a hasty retreat. Humanity loses this day!")
    } else if (!alienShips.length) {
        alert("Well done Captain! You have saved us all!")
        player.victories += 1
        alert("The battle is over, enter code to recharge your shields.")

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


const medalsAndPowerUps = () => {
    switch (player.kills) {
        case 5:
            alert("🥉 Awarded for 5 kills!")
            player.hull += 5
            medals.textContent = "Medals: 🥉"
            break
        case 10:
            alert("🥈 Awarded for 10 kills!")
            player.hull += 5
            player.missiles += 1
            missile.textContent = "Missiles: " + player.missiles
            medals.textContent = "Medals: 🥉🥈"
            break
        case 15:
            alert("🥇 Awarded for 15 kills!")
            player.hull = 20
            player.missiles += 2
            missile.textContent = "Missiles: " + player.missiles
            medals.textContent = "Medals: 🥉🥈🥇"
            break
        case 20:
            alert("🏅 Awarded for 20 kills!")
            player.hull = 20
            player.missiles += 3
            missile.textContent = "Missiles: " + player.missiles
            medals.textContent = "Medals: 🥉🥈🥇🏅"
            break
        case 25:
            alert("🎖 Awarded for 25 kills!")
            player.hull = 20
            player.missiles += 10
            missile.textContent = "Missiles: " + player.missiles
            medals.textContent = "Medals: 🥉🥈🥇🏅🎖"
            break
        default:
            break
    }
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
recharge === recharge shields and keep playing
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
            if (!alienShips.length) {
                alert("Invalid input! Attack the Mothership!")
            } else {
                fight(alienShips[0])
            }
            break
        case "2":
            if (!alienShips.length) {
                alert("Invalid input! Attack the Mothership!")
            } else {
                fight(alienShips[1])
            }
            break
        case "3":
            if (!alienShips.length) {
                alert("Invalid input! Attack the Mothership!")
            } else {
                fight(alienShips[2])
            }
            break
        case "4":
            if (!alienShips.length) {
                alert("Invalid input! Attack the Mothership!")
            } else {
                fight(alienShips[3])
            }
            break
        case "5":
            if (!alienShips.length) {
                alert("Invalid input! Attack the Mothership!")
            } else {
                fight(alienShips[4])
            }
            break
        case "6":
            if (!alienShips.length) {
                alert("Invalid input! Attack the Mothership!")
            } else {
                fight(alienShips[5])
            }
            break
        case "p1":
            if (motherShip[0].hull > 0) {
                fightMotherShip(motherShip[0])
            } else {
                alert("Weapon Pod 1 is already destroyed!")
            }
            break
        case "p2":
            if (motherShip[1].hull > 0) {
                fightMotherShip(motherShip[1])
            } else {
                alert("Weapon Pod 2 is already destroyed!")
            }
            break
        case "p3":
            if (motherShip[2].hull > 0) {
                fightMotherShip(motherShip[2])
            } else {
                alert("Weapon Pod 3 is already destroyed!")
            }
            break
        case "main":
            if (motherShip[0].hull > 0 && motherShip[1].hull > 0 && motherShip[2].hull > 0) {
                alert("Cannot attack the Mothership until all weapon pods are destroyed!")
            } else {
                fightMotherShip(motherShip[3])
            }
            break
        case "n":
            makeShips()
            break
        case "re":
            if (!alienShips.length && !motherShip.length) {
                player.shields = true
                alert("Shields Recharged! Now choose your target.")
            } else {
                alert("Can't recharge shields now! You must wait for the battle to end!")
            }
            break
        default:
            alert("Not a valid input! Try again.")
    }
}

