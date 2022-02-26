class Character {
    constructor(name, weapon, strenghtPoints, attackPoints, rateOfSuccess, rateOfFail){
        this.name = name;
        this.weapon = weapon;
        this.strenghtPoints = strenghtPoints;
        this.attackPoints = attackPoints;
        this.rateOfSuccess = rateOfSuccess;
        this.rateOfFail = rateOfFail;
    }
}
let charactersArray =  [
    new Character (
        'Player','shiny sword', 10, 2, 0.75),
    new Character (
        'Small sewer rat', 'sharp teeth', 2, 1, [1,2,3,4,5,6,7,8,9,10], [11,12,13,14,15,16,17,18,19,20,21]),
    new Character (
        'Mighty Dragon', 'flaming breath and sharp spikes on its tail', 4, 8, 0.90)
    ]

function battleFunction (playerOne, opponent){
    let min = Math.ceil(1);
    let max = Math.floor(21);
    let totalChances = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]

    randomNumber = ((Math.floor(Math.random() * (max - min) + min)));

    console.log("You see a " + opponent.name + "\n");
    console.log(opponent.name + " attacks " + playerOne.name + " with its " + opponent.weapon);

   //test: console.log("Random number is: " + randomNumber);
    for(let i = 0; i < totalChances.length; i++) {
        if  (  randomNumber === opponent.rateOfSuccess[i]){
            console.log(opponent.name + " hits " + playerOne.name + ", you lose " + opponent.attackPoints + " points");
            (playerOne.strenghtPoints -= opponent.attackPoints);
        }
        else if (randomNumber === opponent.rateOfFail[i])  {
            console.log(opponent.name + " attack did not succeed.");
        }
    }
}


battleFunction(charactersArray[0], charactersArray[1]);
console.log(charactersArray[0].name + " strenghtpoints are " + charactersArray[0].strenghtPoints);
