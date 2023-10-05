class Key {
  private signature: number = Math.random();

  getSignature(): number {
    return this.signature;
  }
}

interface IPerson {
  getKey(): Key;
}

class Person implements IPerson {
  private key: Key;

  constructor(key: Key) {
    this.key = key;
  }

  getKey(): Key {
    console.log(this.key);
    return this.key;
  }
}

interface IHouse {
  door: boolean;
  key: Key;
  tenants: Person[];

  comeIn(person: Person): void;
  openDoor(key: Key): void;
}

abstract class House implements IHouse {
  door: boolean = false;
  key: Key;
  tenants: Person[] = [];

  constructor(key: Key) {
    this.key = key;
  }

  comeIn(person: Person): void {
    if (this.door === true) {
      this.tenants.push(person);
      console.log("Person has come in the House");
    }
  }

  abstract openDoor(key: Key): void;
}

class MyHouse extends House {
  openDoor(key: Key): void {
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
      console.log("Door is open.");
    } else {
      console.log("Door cannot be opened. Invalid key.");
    }
  }
}

const key = new Key();
const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());
house.comeIn(person);

export {};
