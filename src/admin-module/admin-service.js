export default class AdminService {

  constructor () {
    this.loggedIn = false; 
  }

  isLoggedIn() {
    return this.loggedIn; 
  }

  logIn() {
    this.loggedIn = true; 
  }

  logOut() {
    this.loggedIn = false; 
  }

}
