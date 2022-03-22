

const prompts = require('prompts');
//__________________________________________________________________

class Character {
    constructor(name, weapon, strenghtPoints, attackPoints, rateOfSuccess){
        this.name = name;
        this.weapon = weapon;
        this.strenghtPoints = strenghtPoints;
        this.attackPoints = attackPoints;
        this.rateOfSuccess = rateOfSuccess;
    }
}
//__________________________________________________________________
let charactersArray =  [
    new Character ( 
        'Player','shiny sword', 10, 2, 0.75),
    new Character (
        'Small sewer rat', 'sharp teeth', 2, 1, 0.50),
    new Character (
        'Mighty Dragon', 'flaming breath and sharp spikes on its tail', 4, 8, 0.90)
]
//__________________________________________________________________
class nonFunctionalRoom {
    constructor(name){
    this.name = name;
    }
}
//__________________________________________________________________
class Room  extends nonFunctionalRoom {
    constructor(name, roomView, doorwaysTo, enemyArray, actionChoices, doorChoises, enemyChoices){
        super(name, roomView, doorwaysTo, enemyArray, actionChoices, doorChoises, enemyChoices)
        this.roomView = roomView;
        this.doorwaysTo = []; 
        this.enemyArray = [];
        this.actionChoices = [];
        this.doorChoises = [];
        this.enemyChoices = [];
    }
    setEnemiesToRooms(characterInput){
        this.enemyArray.push(characterInput);
    }
    setDoorwaysToRooms(roomInput){
        this.doorwaysTo.push(roomInput);
    }
    setActionChoices(actionInput){
        this.actionChoices.push(actionInput);
    }
    setDoorChoises(doorInput){
        this.doorChoises.push(doorInput);
    }
    setEnemyChoices(enemyInput){
        this.enemyChoices.push(enemyInput);
    }
    //__________________________________________________________________

    lookAround(){
        console.log('----------------');
        console.log('You are in the ' + this.name + this.roomView);
        console.log('\nThere are doorways leading to:');
            for(let i=0; i < this.doorwaysTo.length; i++){
            console.log(this.doorwaysTo[i].name);

        };
       //chech if there is an enemy in this room
         if(this.enemyArray.length > 0){
             for(let i=0; i<this.enemyArray.length; i++){            
             this.battleFunction(charactersArray[0], this.enemyArray[i]); 
             } 
         }   
        console.log(' ----------------');
    }
    //__________________________________________________________________

    battleFunction (playerOne, opponent){
        let min = Math.ceil(1);
        let max = Math.floor(21);
        let successMultiplier = 20;    
        let randomNumber = ((Math.floor(Math.random() * (max - min) + min)));
    
        console.log("\nYou see a " + opponent.name);
        console.log(opponent.name + " attacks " + playerOne.name + " with its " + opponent.weapon);
    
        if(randomNumber <= (opponent.rateOfSuccess*successMultiplier)){
            console.log(opponent.name + " hits " + playerOne.name + ", you lose " + opponent.attackPoints + " points");
            playerOne.strenghtPoints -= opponent.attackPoints;
            if(playerOne.strenghtPoints < 1){
                console.log("You lost, game is over");
                process.exit();
            //missing feature: how to exit program
            }
        }
        else {
            console.log(opponent.name + " attack misses.");
        }
    }
    //__________________________________________________________________

    attackFunction(enemy){
        let min = Math.ceil(1);
        let max = Math.floor(21);
        let successMultiplier = 20;    
        let randomNumber = ((Math.floor(Math.random() * (max - min) + min)));

        console.log("You bravely attack " + enemy.name + " with your " + charactersArray[0].weapon);
        
        if (randomNumber <= (charactersArray[0].rateOfSuccess*successMultiplier)){
            console.log(charactersArray[0].name + " hits " + enemy.name + " with " + charactersArray[0].attackPoints + " points");
            enemy.strenghtPoints -= charactersArray[0].attackPoints;
            if(enemy.strenghtPoints < 1){
                console.log(enemy.name + " is hit and destoryed!");
                this.enemyArray -= enemy;
            }
        }
        else {
            console.log(charactersArray[0].name + " attack misses.");
        }
    }
}
//__________________________________________________________________
let nonFunctionalRoomsArray = [
    new nonFunctionalRoom(
        'Glowing Portal'),
];
//__________________________________________________________________
let roomsArray = [
    new Room(
        'Entrance of Dungeons',
        ' and it is a big and damp room with broken statues all around.',
        ),
    new Room(
        'Hallway',
        ' and it is a long and dark hallway, dark pools of water on the floor and fungus on the walls',
        ),
    new Room(
        'Chamber',
        ' and it is a small chamber, illuminated by glowing portal.',
        ),
];    
//__________________________________________________________________
async function gameLoop(currentRoom) {
    let continueGame = true;
    const initialActionChoices = currentRoom.actionChoices;

    // Show list of options
    const response = await prompts({
      type: 'select',
      name: 'value',
      message: 'Choose your action',
      choices: initialActionChoices
    });

    // handle the selected value
    console.log('You selected ' + response.value);
    switch(response.value) {
      case 'lookaround':
      currentRoom.lookAround();
        break;
      
      case 'gotoroom':
        roomLoop(currentRoom);
        continueGame = false; // stops gameloop running
        break;
      
      case 'attack':
        attackLoop(currentRoom, currentRoom.enemyArray);
        continueGame = false;
        break;
      
      case 'exit':
        continueGame = false;
        break;
    }
    
    if(continueGame) {
      gameLoop(currentRoom);
    }    
}
//__________________________________________________________________
async function roomLoop(currentRoom) {
    continueGame = true;    
    const roomChoices = currentRoom.doorChoises;
    
    const roomresponse = await prompts({
        type: 'select',
        name: 'value',
        message: 'Which room you want to go to?',
        choices: roomChoices
    });

    console.log('You move to ' + roomresponse.value);
    switch(roomresponse.value) { 
        case 'Entrance':
        currentRoom = roomsArray[0];
        break;

        case 'Hallway':
        currentRoom = roomsArray[1];
        break;

        case 'Chamber':
        currentRoom = roomsArray[2];
        break;  

        case 'Glowing Portal':
        console.log("   Congratulations! You made it through the dungeons!\n********************************************************");
        continueGame= false;
        break;
        }

        if(continueGame) {
            gameLoop(currentRoom);
        }           
}
//__________________________________________________________________
async function attackLoop(currentRoom) {
    let continueGame = true;
    const enemyChoices = currentRoom.enemyChoices;

    const response = await prompts({
      type: 'select',
      name: 'value',
      message: 'Which enemy you want to attack?',
      choices: enemyChoices
    });

    console.log('You selected ' + response.value);
    switch(response.value) {
      case 'smallsewerrat':
        enemyToAttack = charactersArray[1];
        currentRoom.attackFunction(enemyToAttack);
        break;
      
      case 'mightydragon':
        enemyToAttack = charactersArray[2];
        currentRoom.attackFunction(enemyToAttack);       
        break;
    }
    
    if(continueGame) {
      gameLoop(currentRoom);
    }    
}
//__________________________________________________________________
process.stdout.write('\033c'); // clear screen on windows
currentRoom = roomsArray[0]; 

// enemies are set to rooms as the game starts:
roomsArray[1].setEnemiesToRooms(charactersArray[1]);
roomsArray[2].setEnemiesToRooms(charactersArray[2]);

roomsArray[1].setEnemyChoices({ title: 'Small sewer rat', value: 'smallsewerrat' }); 
roomsArray[2].setEnemyChoices({title: 'Mighty dragon', value: 'mightydragon'});

//doorways leading to other rooms are defined as game starts:
roomsArray[0].setDoorwaysToRooms(roomsArray[1]);
roomsArray[1].setDoorwaysToRooms(roomsArray[0]);
roomsArray[1].setDoorwaysToRooms(roomsArray[2]);
roomsArray[2].setDoorwaysToRooms(roomsArray[1]);
roomsArray[2].setDoorwaysToRooms(nonFunctionalRoomsArray[0]);

roomsArray[0].setDoorChoises({ title: 'Hallway', value: 'Hallway' });
roomsArray[1].setDoorChoises({ title: 'Entrance', value: 'Entrance' });
roomsArray[1].setDoorChoises({ title: 'Chamber', value: 'Chamber' });
roomsArray[2].setDoorChoises({ title: 'Hallway', value: 'Hallway' });
roomsArray[2].setDoorChoises({ title: 'Glowing Portal', value: 'Glowing Portal' });

// action choises for each room are defined as the game starts: 
roomsArray[0].setActionChoices({ title: 'Look around', value: 'lookaround' });
roomsArray[1].setActionChoices({ title: 'Look around', value: 'lookaround' });
roomsArray[2].setActionChoices({ title: 'Look around', value: 'lookaround' });

roomsArray[0].setActionChoices({ title: 'Go to room', value: 'gotoroom' });
roomsArray[1].setActionChoices({ title: 'Go to room', value: 'gotoroom' });
roomsArray[2].setActionChoices({ title: 'Go to room', value: 'gotoroom' });

roomsArray[1].setActionChoices({ title: 'Attack', value: 'attack' });
roomsArray[2].setActionChoices({ title: 'Attack', value: 'attack' });

roomsArray[0].setActionChoices({ title: 'Exit game', value: 'exit' });
roomsArray[1].setActionChoices({ title: 'Exit game', value: 'exit' });
roomsArray[2].setActionChoices({ title: 'Exit game', value: 'exit' });

console.log('WELCOME TO THE DUNGEONS OF LORD OBJECT ORIENTUS!')
console.log('================================================')
console.log('You walk down the stairs to the dungeons')
gameLoop(currentRoom);