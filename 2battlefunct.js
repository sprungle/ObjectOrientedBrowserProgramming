class Character {
    constructor(name, weapon, strenghtPoints, attackPoints, rateOfSuccess){
        this.name = name;
        this.weapon = weapon;
        this.strenghtPoints = strenghtPoints;
        this.attackPoints = attackPoints;
        this.rateOfSuccess = rateOfSuccess;
    
    }
}
let charactersArray =  [
    new Character (
        'Player','shiny sword', 10, 2, 0.75),
    new Character (
        'Small sewer rat', 'sharp teeth', 2, 1, 0.5),
    new Character (
        'Mighty Dragon', 'flaming breath and sharp spikes on its tail', 4, 8, 0.90)
    ]

function battleFunction (playerOne, opponent){
    let min = Math.ceil(1);
    let max = Math.floor(21);
    let successMultiplier = 20;

    randomNumber = ((Math.floor(Math.random() * (max - min) + min)));

    console.log("You see a " + opponent.name + "\n");
    console.log(opponent.name + " attacks " + playerOne.name + " with its " + opponent.weapon);

       console.log(opponent.rateOfSuccess);
       console.log(opponent.rateOfSuccess*successMultiplier);
       console.log("Random number is:" + randomNumber);

        if  (  randomNumber <= (opponent.rateOfSuccess*successMultiplier)){
            console.log(opponent.name + " hits " + playerOne.name + ", you lose " + opponent.attackPoints + " points");
            (playerOne.strenghtPoints -= opponent.attackPoints);
        }
        else {
            console.log(opponent.name + " attack did not succeed.");
        }
    }


battleFunction(charactersArray[0], charactersArray[2]);
console.log(charactersArray[0].name + " strenghtpoints are " + charactersArray[0].strenghtPoints);
