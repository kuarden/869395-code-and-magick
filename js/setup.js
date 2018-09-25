'use strict';

var USER_COUNT = 4;

var usersData = {
  names: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  secondNames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  coatColor: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColor: ['black', 'red', 'blue', 'yellow', 'green']
};

var userSetup = document.querySelector('.setup');
var userList = document.querySelector('.setup-similar-list');
var userTemplate = document.querySelector('#similar-wizard-template').content;
var userCloneSetup = document.querySelector('.setup-similar');

listUsers();
userSetup.classList.remove('hidden');
userCloneSetup.classList.remove('hidden');

function getUsers() {
  var names = mixArray(usersData.names);
  var secondNames = mixArray(usersData.secondNames);
  var users = [];
  for (var i = 0; i < USER_COUNT; i++) {
    users.push({
      names: names[i],
      surnames: secondNames[i],
      coatColor: getRandomElement(usersData.coatColor),
      eyesColor: getRandomElement(usersData.eyesColor)
    });
  }
  return users;
}

function generateUser(setup) {
  var userTmp = userTemplate.cloneNode(true);
  userTmp.querySelector('.setup-similar-label').textContent = setup.names + ' ' + setup.surnames;
  userTmp.querySelector('.wizard-coat').style.fill = setup.coatColor;
  userTmp.querySelector('.wizard-eyes').style.fill = setup.eyesColor;
  return userTmp;
}

function listUsers() {
  var cloneUsers = getUsers();
  var fragment = new DocumentFragment();
  for (var i = 0; i < cloneUsers.length; i++) {
    var g = generateUser(cloneUsers[i]);
    fragment.appendChild(g);
  }
  userList.appendChild(fragment);
}

function mixArray(array) {
  var mixedArray = array.slice();
  for (var i = mixedArray.length - 1; i > 0; i--) {
    var k = Math.floor(Math.random() * (i + 1));
    var tempValue = mixedArray[i];
    mixedArray[i] = array[k];
    mixedArray[k] = tempValue;
  }
  return mixedArray;
}

function getRandomElement(array) {
  for (var i = 0; i < array.length; i++) {
    var randomIndex = Math.floor(Math.random() * array.length);
    var randomElement = array[randomIndex];
  }
  return randomElement;
}

