"use strict";

function say(message) {
  return `${message} ${this.fullName}!`;
}
const person = {
  fullName: "Ashizawa Hiroaki"
};

console.log(say.call(person, "こんにちは"));
console.log(say.apply(person, ["こんにちは"]));

const sayPerson = say.bind(person, "こんにちは");
console.log(sayPerson());
