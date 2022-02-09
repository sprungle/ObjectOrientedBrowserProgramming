/*

\n

first version

TO-DO LIST: 
    - define all properties for all rooms.
    - continueGame-value?


    (- LOW priority: method to push new doorways into array, so that it is possible to expand the game)
    + FIXED! (- why error if I choose same option two times in a row? like look around, and again look around) 

*/

const prompts = require('prompts');

class Room {
    constructor(name, roomView, doorwaysTo){
        this.name = name;
        this.roomView = roomView;
        this.doorwaysTo = doorwaysTo; // array of rooms, into which there is access from this room 

    }
    lookAround(){
        console.log('----------------');
        console.log('You are in the ' + this.name + this.roomView);
        console.log('There are doorways leading to:\n' + this.doorwaysTo)
        console.log('\n ----------------');
    }
    goToRoom(){
            }
}
//__________________________________________________________________
let roomsArray = [
    new Room(
        'Entrance Room of Dungeons', 
        ' and it is a big and ramp room with broken status all around. \n',
        'Hallway'
        ),
    new Room(
        'Hallway', 
        'description player gets when looking around in Hallway',
        ['Entrance Room of Dungeons', 'Chamber']
        ),
    new Room(
        'Chamber', 
        'description player gets when looking around in Chamber'
        ['Hallway', 'Portal']
        ),
    
    new Room('Portal', 'roomView portal'), // portal shouldn't be a room! it doesn't have same functionalities!
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

    // Deal with the selected value
    console.log('You selected ' + response.value);
    switch(response.value) {
      case 'lookaround':
      currentRoom.lookAround();
        break;
      
      case 'gotoroom':
        currentRoom.increaseSpeed();
        break;
      
      case 'attack':
        currentRoom.displayInformation();
        break;
      
      case 'exit':
        continueGame = false;
        break;
    }
    
    if(continueGame) {
      gameLoop(currentRoom);
    }    
}



//___________________________________________________________________
process.stdout.write('\033c'); // clear screen on windows

console.log('WELCOME TO THE DUNGEONS OF LORD OBJECT ORIENTUS!')
console.log('================================================')
console.log('You walk down the stairs to the dungeons')
// testing:
//console.log(currentRoom.name);
//currentRoom.lookAround(); //toimii täällä, muttei gameloopissa..

gameLoop(currentRoom);