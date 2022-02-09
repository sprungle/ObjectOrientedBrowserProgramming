/*
Template to start working with on the task
*/

const prompts = require('prompts');

class Car {
  constructor(brand, model, registration) {
      this.brand = brand;
      this.model = model;
      this.registration = registration;
      this.speed = 0;
  }

  increaseSpeed() {
      this.speed += 1;
  }

  decreaseSpeed() {
      this.speed -= 1;
  }

  makeNoise() {
      console.log('prum prum');        
  }

  displayInformation() {
      console.log('Car: ' + this.brand + ', ' + this.model + ', speed: ' + this.speed);
  }
}

class RaceCar extends Car {
  constructor(brand, model, speed) {
      super(brand, model, speed);
  }

  increaseSpeed() {
      this.speed += 20;
  }

  startRace() {
      console.log('Race car enters the race!');
  }
}

let audi = new Car('Audi', 'e-tron', 'ABC-123');
audi.displayInformation();
audi.increaseSpeed();
audi.displayInformation();

let f1 = new RaceCar('Mercedes', 'F1', '-');
f1.displayInformation();
f1.increaseSpeed();
f1.displayInformation();
f1.startRace();

/* Above the same code what was used for class inheritance demonstratino
   with Car and RaceCar classes and objects created from those two. 
   Your task is to implement the dungeon adventure. The above is just an example.*/

async function gameLoop() {
    let continueGame = true;

    // Example set of UI options for the user to select
    const initialActionChoices = [
        { title: 'Accelerate e-tron', value: 'accelerateEtron' },
        { title: 'Accelerate f1', value: 'accelerateF1' },
        { title: 'Display Info', value: 'info'},
        { title: 'Exit game', value: 'exit'}
    ];

    // Show the list of options for the user.
    // The execution does not proceed from here until the user selects an option.
    const response = await prompts({
      type: 'select',
      name: 'value',
      message: 'Choose your action',
      choices: initialActionChoices
    });

    // Deal with the selected value
    console.log('You selected ' + response.value);
    switch(response.value) {
      case 'accelerateEtron':
        audi.increaseSpeed();
        break;
      
      case 'accelerateF1':
        f1.increaseSpeed();
        break;
      
      case 'info':
        audi.displayInformation();
        f1.displayInformation();
        break;
      
      case 'exit':
        continueGame = false;
        break;
    }
    
    if(continueGame) {
      gameLoop();
    }    
}

process.stdout.write('\033c'); // clear screen on windows

console.log('WELCOME TO THE DUNGEONS OF LORD OBJECT ORIENTUS!')
console.log('================================================')
console.log('You walk down the stairs to the dungeons')
gameLoop();