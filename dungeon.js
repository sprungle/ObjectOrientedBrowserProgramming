/*
Improvements/TO-DO LIST: 
  - how to exit program , also when player strenght is zero?
  - loop enemy array in case there are more than one enemy in the room
  - doorwaysTo-array and roomChoises-array could be the one and same

 
*/

const prompts = require('prompts');

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
//test: 'Small sewer rat', 'sharp teeth', 2, 10, 1),
    new Character (
        'Mighty Dragon', 'flaming breath and sharp spikes on its tail', 4, 8, 0.90)
    ]
//___________________________________________________________________
class Room {
    constructor(name, roomView, doorwaysTo, enemyArray, actionChoices){
        this.name = name;
        this.roomView = roomView;
        this.doorwaysTo = []; 
        this.enemyArray = [];
        this.actionChoices = [];
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
    lookAround(){
        console.log('----------------');
        console.log('You are in the ' + this.name + this.roomView);
        console.log('\nThere are doorways leading to:\n' + this.doorwaysTo + "\n")
       
       //chech if there is an enemy in this room
        if(this.enemyArray.length > 0){
            this.battleFunction(charactersArray[0], this.enemyArray[0]);  
        }    
        // (missing feature: loop enemy array in case there are more than one enemy in the room)
        console.log(' ----------------');
    }

    battleFunction (playerOne, opponent){
        let min = Math.ceil(1);
        let max = Math.floor(21);
        let successMultiplier = 20;    
        let randomNumber = ((Math.floor(Math.random() * (max - min) + min)));
    
        console.log("You see a " + opponent.name);
        console.log(opponent.name + " attacks " + playerOne.name + " with its " + opponent.weapon);
    
// test:   console.log(opponent.rateOfSuccess*successMultiplier);
// test:   console.log("Random number is:" + randomNumber);
    
        if(randomNumber <= (opponent.rateOfSuccess*successMultiplier)){
            console.log(opponent.name + " hits " + playerOne.name + ", you lose " + opponent.attackPoints + " points");
            playerOne.strenghtPoints -= opponent.attackPoints;
            if(playerOne.strenghtPoints < 1){
                console.log("You lost, game is over");
            //how to exit program?
            }
        }
        else {
            console.log(opponent.name + " attack did not succeed.");
        }
    }
}
//__________________________________________________________________
let roomsArray = [
    new Room(
        'Entrance of Dungeons', 
        ' and it is a big and damp room with broken statues all around.',
        '',
        '',
        ''),
    new Room(
        'Hallway', 
        ' and it is a long and dark hallway, dark pools of water on the floor and fungus on the walls',
        '',
        '',
        ''),
    new Room(
        'Chamber', 
        ' and it is a small chamber, illuminated by glowing portal.',
        '',
        '',
        ''),
    new Room(
        'Glowing Portal', 
        ' ',
        '',
        '',
        ''),
    ];    

//___________________________________________________________________
async function gameLoop(currentRoom) {
    let continueGame = true;
       
    const initialActionChoices = currentRoom.actionChoices;

    // Show the list of options for user.
    // The execution does not proceed until user selects an option.
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
        attackLoop(currentRoom);
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
    
     const roomChoices = [
             { title: 'Hallway', value: 'Hallway' }, //this is hard coding, have it replaced with soft
             { title: 'Chamber', value: 'Chamber' },
             { title: 'Glowing Portal', value: 'Glowing Portal' },
             { title: 'Entrance', value: 'Entrance' }
         ];
    
    const roomresponse = await prompts({
        type: 'select',
        name: 'value',
        message: 'Which room you want to go to?',
        choices: roomChoices
    });

    // Deal with the selected value
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
        console.log("Congratulations! You made it through the dungeons!");
        continueGame= false;
        break;
        }

        if(continueGame) {
            gameLoop(currentRoom);
        }           
}

//___________________________________________________________________
process.stdout.write('\033c'); // clear screen on windows

currentRoom = roomsArray[0]; 

// enemies are set to rooms as the game starts:
roomsArray[1].setEnemiesToRooms(charactersArray[1]); 
roomsArray[2].setEnemiesToRooms(charactersArray[2]);

//doorways to other rooms are defined as game starts:
roomsArray[0].setDoorwaysToRooms(roomsArray[1].name);
roomsArray[1].setDoorwaysToRooms(roomsArray[0].name);
roomsArray[1].setDoorwaysToRooms(roomsArray[2].name);
roomsArray[2].setDoorwaysToRooms(roomsArray[1].name);
roomsArray[2].setDoorwaysToRooms(roomsArray[3].name);

// action choises for each room are defined as the game starts: 

roomsArray[0].setActionChoices({ title: 'Look around', value: 'lookaround' });
roomsArray[1].setActionChoices({ title: 'Look around', value: 'lookaround' });
roomsArray[2].setActionChoices({ title: 'Look around', value: 'lookaround' });

roomsArray[0].setActionChoices({ title: 'Go to room', value: 'gotoroom' });
roomsArray[1].setActionChoices({ title: 'Go to room', value: 'gotoroom' });
roomsArray[2].setActionChoices({ title: 'Go to room', value: 'gotoroom' });

roomsArray[1].setActionChoices({ title: 'Attack', value: 'attack' });
roomsArray[2].setActionChoices({ title: 'Attack', value: 'attack' });

roomsArray[0].setActionChoices({ title: 'Exit game', value: 'exitgame' });
roomsArray[1].setActionChoices({ title: 'Exit game', value: 'exitgame' });
roomsArray[2].setActionChoices({ title: 'Exit game', value: 'exitgame' });



//testing
console.log(charactersArray[0].name + ' strenght: ' + charactersArray[0].strenghtPoints + ', rate of success in battle: ' + charactersArray[0].rateOfSuccess);
//console.log(roomsArray[0].actionChoices[0].value);
console.log(roomsArray[0].doorwaysTo[0]);




console.log('WELCOME TO THE DUNGEONS OF LORD OBJECT ORIENTUS!')
console.log('================================================')
console.log('You walk down the stairs to the dungeons')
// testing:
//console.log(currentRoom.name);
//currentRoom.lookAround(); //toimii täällä, muttei gameloopissa..

gameLoop(currentRoom);