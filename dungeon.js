/*
TO-DO LIST: 
        - define all properties for all rooms.
        - create attack loop
        - redefine to print correctly current room when mentioned on string, e.g. lookaround-function

    (- LOW priority: method to push new doorways into array, so that it is possible to expand the game)
    (LOW priority:  lookAround-function: loop through different doorway for each row (instead of printing all on one line)
)
    + FIXED! (- why error if I choose same option two times in a row? like look around, and again look around) 
    + SOLVED! functionw WHICH ROOM YOU WANT TO GO, why it prints also gameloop?
    ( LOW priority- roomLoop could have option to go back to previous menu)
*/

const prompts = require('prompts');

class Room {
    constructor(name, roomView, doorwaysTo, enemy){
        this.name = name;
        this.roomView = roomView;
        this.doorwaysTo = doorwaysTo; // array of rooms, into which there is access from this room 
        this.enemy = enemy;

    }
    lookAround(){

        console.log('----------------');
        console.log('You are in the ' + this.name + this.roomView);
        console.log('\nThere are doorways leading to:\n' + this.doorwaysTo) //could clean this by adding a loop to print each doorway

//if current room is room with existing enemy, also print string about the attack:
    //    console.log('You see ' + this.enemy + ', which attacks player with its' + ) 
// run attac function with current enemy

        console.log('\n ----------------');
    }
}

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
let roomsArray = [
    new Room(
        'Entrance of Dungeons', 
        ' and it is a big and damp room with broken status all around. \n',
        ['Hallway'],
        ' no enemies lurking in this room, you are safe.'
        ),
    new Room(
        'Hallway', 
        ' and it is a long and dark hallway, dark pools of water on the floor and fungus on the walls',
        ['Entrance of Dungeons', 'Chamber'],
        'small sewer rat'
        ),
    new Room(
        'Chamber', 
        'description player gets when looking around in Chamber'
        ['Hallway', 'Portal'],
        'Mighty Dragon'
        ),
    
    new Room('Portal',
     '',
     '',
     '',
     ''
     ), // can portal be a room?doesn't have same functionalities..
    ];

    currentRoom = roomsArray[0]; 
//___________________________________________________________________
let charactersArray =  [
    new Character (
        'Player',
        'shiny sword',
        10,
        2,
        0.75
    ),
    new Character (
        'small sewer rat',
        'sharp teeth',
        2,
        1,
        0.50
    ),
    new Character (
        'Mighty Dragon',
        'flaming breath and thorns in its tail',
        4,
        8,
        0.90
    )
]
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
        continueGame = false; // stops gameloop running!
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
    // if-sentence to show only options that are suitable for this current room!
    // loop through as many times as this current room HAS items in the doorways-array :)
    const roomChoices = [
          //  { title: currentRoom.doorwaysTo[0], value: currentRoom.doorwaysTo[0]},
            { title: 'Hallway', value: 'hallway' } //this is hard coding, have it replaced with soft
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
        case currentRoom.doorwaysTo[0]: //hallway
            currentRoom = roomsArray[1];
            continueGame = true;
            break;
                
            case 'hallway':
            currentRoom = roomsArray[1];
            break;  
        }
        if(continueGame) {
            gameLoop(currentRoom);
        }           
}

//create attack loop -function



//___________________________________________________________________
process.stdout.write('\033c'); // clear screen on windows

console.log('WELCOME TO THE DUNGEONS OF LORD OBJECT ORIENTUS!')
//testing
console.log(charactersArray[0].name + ' has ' + charactersArray[0].strenghtPoints + ' strenght and ' + charactersArray[0].rateOfSuccess + ' rate of success in battle.')
console.log('================================================')
console.log('You walk down the stairs to the dungeons')
// testing:
//console.log(currentRoom.name);
//currentRoom.lookAround(); //toimii täällä, muttei gameloopissa..

gameLoop(currentRoom);