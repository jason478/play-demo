exports.Util = class Util {

  getRandomNumber() {
    return Math.floor((Math.random() * 9999) + 1000).toString()
  }
}
