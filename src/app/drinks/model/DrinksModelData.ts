export class Drink {

  name: string


  constructor(name: string) {
    this.name = name;
  }

  formatToJson():string {
    return `{"name":"${this.name}"}`
  }
}

