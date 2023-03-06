import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VendingService {

  /**
   * Converts Coin/Drink name into a json String for sending to the front end.
   * @param name
   */
  convertToJson(name: string): string {
    name = name.split(": ")[1]
    return `{"name":"${name}"}`
  }

  constructor() {
  }
}
