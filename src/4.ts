interface IKey {
    getSignature(): number;
}

interface IPerson {
    getKey(): IKey;
}

interface IHouse {
    openDoor(key: IKey): void;
    comeIn(person: IPerson): void;
    isDoorOpen(): boolean;
}

class Key implements IKey {
    private signature: number;

    constructor() {
        this.signature = Math.random();
    }

    getSignature(): number {
        return this.signature;
    }
}

class Person implements IPerson {
    private key: IKey;

    constructor(key: IKey) {
        this.key = key;
    }

    getKey(): IKey {
        return this.key;
    }
}

class MyHouse implements IHouse {
    private door: boolean = false;
    private key: IKey;
    private tenants: IPerson[] = [];

    constructor(key: IKey) {
        this.key = key;
    }

    openDoor(key: IKey): void {
        this.door = key.getSignature() === this.key.getSignature();
        console.log(this.door ? "Access Allowed!" : "Access Denied!");
    }

    comeIn(person: IPerson): void {
        const message = this.isDoorOpen()
            ? `Welcome, ${person.getKey().getSignature()}!`
            : "You're not living here! I'm calling 911...";
        console.log(message);
        if (this.isDoorOpen()) {
            this.tenants.push(person);
        }
    }

    isDoorOpen(): boolean {
        return this.door;
    }
}

const key = new Key();
const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());
house.comeIn(person);

export {};
