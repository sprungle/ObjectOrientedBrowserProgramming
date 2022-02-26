class Character {
    constructor(name, weapon, strenghtPoints, attackPoints, rateOfSuccess){
        this.name = name;
        this.weapon = weapon;
        this.strenghtPoints = strenghtPoints;
        this.attackPoints = attackPoints;
        this.rateOfSuccess = rateOfSuccess;
    }

    getEnemyName(){
        return(this.name);
    }
    getWeapon(){
        return(this.weapon);
    }
    getStrenghtPoints(){
        return(this.strenghtPoints); 
    }
    getAttackPoints(){
        return(this.attackPoints);
    }
    getRateOfSuccess(){
        return(this.rateOfSuccess);
    }
}
let charactersArray =  [
    new Character (
        'Player','shiny sword', 10, 2, 0.75),
    new Character (
        'Small sewer rat', 'sharp teeth', 2, 1, 0.50),
    new Character (
        'Mighty Dragon', 'flaming breath and sharp spikes on its tail', 4, 8, 0.90)
    ]

function battleFunction (playerOne, opponent){
    let min = Math.ceil(1);
    let max = Math.floor(21);
    let totalChances = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]
    let itsAHit = [1,2,3,4,5,6,7,8,9,10];
    let itsAMiss = [11,12,13,14,15,16,17,,18,19,20,21]
    randomNumber = ((Math.floor(Math.random() * (max - min) + min)));
    //randomNumber = 1;

    console.log("You see a " + opponent.name + "\n");
    console.log(opponent.name + " attacks " + playerOne.name + " with its " + opponent.weapon);


    console.log("Random number is: " + randomNumber);
    for(let i = 0; i < totalChances.length; i++) {
        if  (  randomNumber === itsAHit[i]){
            console.log(opponent.name + " hits " + playerOne.name + ", you lose " + opponent.attackPoints + " points");
            console.log(playerOne.strenghtPoints -= opponent.attackPoints);
        }
        else if (randomNumber === itsAMiss[i])  {
            console.log(opponent.name + " attack did not succeed.");
        }
    }
}

console.log(charactersArray[0].name + " strenghtpoints are " + charactersArray[0].strenghtPoints);

battleFunction(charactersArray[0], charactersArray[1]);
console.log(charactersArray[0].name + " strenghtpoints are " + charactersArray[0].strenghtPoints);
