/*
TO-DO LIST: 
  
 
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
//__________________________________________________________________
let charactersArray =  [
    new Character (
        'Player','shiny sword', 10, 2, 0.75),
    new Character (
        'Small sewer rat', 'sharp teeth', 2, 1, 0.50),
    new Character (
        'Mighty Dragon', 'flaming breath and sharp spikes on its tail', 4, 8, 0.90)
    ]
//___________________________________________________________________
class Room {
    constructor(name, roomView, doorwaysTo, enemy){
        this.name = name;
        this.roomView = roomView;
        this.doorwaysTo = []; // array of rooms, into which there is access from this room 
        this.enemyArray = [];
    }
    setEnemiesToRooms(characterInput){
        this.enemyArray.push(characterInput);
    }
    setDoorwaysToRooms(roomInput){
        this.doorwaysTo.push(roomInput);
    }
    getRoomName(){
        return this.roomName;
    }
    getDoorwaysTo(){
        return this.doorwaysTo;
    }
    
    lookAround(){
        console.log('----------------');
        console.log('You are in the ' + this.name + this.roomView);
        console.log('\nThere are doorways leading to:\n' + this.doorwaysTo + "\n")
       
       //chech if there is an enemy in this room
        //if yes, print string about the attack: 
        if(this.enemyArray.length > 0){     
            battleFunction(charactersArray[0], this.enemyArray[0]);
            //console.log(charactersArray[0], );

        }
       
       
        console.log(' ----------------');
    }
}
//__________________________________________________________________
let roomsArray = [
    new Room(
        'Entrance of Dungeons', 
        ' and it is a big and damp room with broken statues all around.',
        '',
        ''
        ),
    new Room(
        'Hallway', 
        ' and it is a long and dark hallway, dark pools of water on the floor and fungus on the walls',
        '',
        ''
        ),
    new Room(
        'Chamber', 
        'and it is a small chamber, illuminated by glowing portal.',
        '',
        ''
        ),
    new Room(
        'Glowing Portal', 
        ' ',
        '',
        ''
        )
    ];    

    currentRoom = roomsArray[0]; 
//___________________________________________________________________


async function gameLoop(currentRoom) {
    let continueGame = true;
    
    // Example set of UI options for the user to select
    const initialActionChoices = [
        { title: 'Look around', value: 'lookaround' },
        { title: 'Go to room', value: 'gotoroom' },
        { title: 'Attack', value: 'attack'},
        { title: 'Exit game', value: 'exit'}
    ];

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
    
    //these below need to be modidied to that they are flexible for different rooms!
    // if-sentence to show only options that are suitable for this current room?
    // loop through as many times as this current room HAS items in the doorways-array?  
    
     let roomChoices = [
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
        currentRoom = roomsArray[3];
        break;
        }

        if(continueGame) {
            gameLoop(currentRoom);
        }           
}

//___________________________________________________________________
process.stdout.write('\033c'); // clear screen on windows

// enemies are set to rooms as the game starts:
roomsArray[1].setEnemiesToRooms(charactersArray[1]); 
roomsArray[2].setEnemiesToRooms(charactersArray[2]);

//doorways to other rooms are defined as game starts:
roomsArray[0].setDoorwaysToRooms(roomsArray[1].name);
roomsArray[1].setDoorwaysToRooms(roomsArray[0].name);
roomsArray[1].setDoorwaysToRooms(roomsArray[2].name);
roomsArray[2].setDoorwaysToRooms(roomsArray[1].name);
roomsArray[2].setDoorwaysToRooms(roomsArray[3].name);


console.log('WELCOME TO THE DUNGEONS OF LORD OBJECT ORIENTUS!')
//testing
console.log(charactersArray[0].name + ' strenght: ' + charactersArray[0].strenghtPoints + ', rate of success in battle: ' + charactersArray[0].rateOfSuccess);
console.log('================================================')
console.log('You walk down the stairs to the dungeons')
// testing:
//console.log(currentRoom.name);
//currentRoom.lookAround(); //toimii täällä, muttei gameloopissa..

gameLoop(currentRoom);