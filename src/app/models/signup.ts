import { promise } from 'protractor';

export interface Signup {
    personal: {
      fname: string,
      lname: string,
      phno: string,
      phno_2: string
    };
    account: {
      email: string,
      uname: string,
      pwd: string,
      cpwd: string
    };
    image: {
      pic: any,
      sigpic: any
    }
  }