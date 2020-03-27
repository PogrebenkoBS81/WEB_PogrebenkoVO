/** Class representing a person. 
 * I could make gender a bulean value, 
 * or store the date not as a string, 
 * but in the labN5 there were exactly strings.
*/
class Person {
  /**
   * Creates a person.
   * @param {string} newName      - Name of the person.
   * @param {string} newSurname   - Surname of the person.
   * @param {string} newGender    - Gender of the person.
   * @param {string} newBirthdate - Birthdate of the person.
   */
  constructor(newName, newSurname, newGender, newBirthdate) {
    this.name = newName;
    this.surname = newSurname;
    this.gender = newGender;
    this.birthdate = newBirthdate;
  }

  /**
   * Validates and sets the gender of the person. 
   * @param {string} newGender - Gender to set.
   */
  set gender(newGender) {
    if (this._isGenderValid(newGender)) {
      // using "_" to avoid setter recursive calls.
      this._gender = newGender;
    }
    else {
      console.log("Error gender. Using default: M");
      this._gender = 'M';
    }
  }

  /**
   * Validates and sets the birthdate of the person. 
   * @param {string} newBirthdate - Birthdate to set.
   */
  set birthdate(newBirthdate) {
    if (this._isDateValid(newBirthdate)) {
      this._birthdate = newBirthdate;
    }
    else {
      console.log("Error date format. Check your delimeters and date range.\
        Using default date: 1/1/1970 ");
      this._birthdate = "1/1/1970";
    }
  }

  /**
  * Returns an identification code based on the parameters of a person.  
  * @return {string} Identification code.
  */
  getCode() {
    return (this._codeFromSurname() + this._codeFromName()
      + this._codeFromBirthDate()).toUpperCase();
  }

  /**
  * Returns the part of the identification code that is based on the person’s name. 
  * @return {string} Part of the identification code.
  */
  _codeFromName() {
    let letters = this._separeteLetters(this.name);
    let vowels = letters.get("vowels"), consonants = letters.get("Consonants");

    // If there is more than 3 consonants in name, 
    // then the first, third, and fourth consonants are used to generate the code.
    if (consonants.length > 3) {
      consonants[2] = consonants[3];
    }

    return this._codeFromNames(vowels, consonants);
  }

  /**
  * Returns the part of the identification code that is based on the person’s surname. 
  * @return {string} Part of the identification code.
  */
  _codeFromSurname() {
    let letters = this._separeteLetters(this.surname);

    return this._codeFromNames(letters.get("vowels"),
      letters.get("Consonants"));
  }

  /**
  * Returns the part of the identification code that is based on the person’s birthdate. 
  * @return {string} Part of the identification code.
  */
  _codeFromBirthDate() {
    const months = {
      1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "H",
      7: "L", 8: "M", 9: "P", 10: "R", 11: "S", 12: "T"
    };
    let date = this._parseDate(this._birthdate);

    // adding '0' to yearCode/dayCode if there is only 1 number.block
    let yearCode = date[2] % 100;
    yearCode = yearCode < 10 ? '0' + yearCode : yearCode;
    let dayCode = this._gender === "F" ? date[0] + 40 : date[0];
    dayCode = dayCode < 10 ? '0' + dayCode : dayCode;

    return yearCode + months[date[1]] + dayCode;
  }

  /**
  * Creates and returns the part of the identification code that based on name or surname. 
  * @param {string} vowels     - Array of vowels extracted from name/surname.
  * @param {string} consonants - Array of consonants extracted from name/surname.
  * @return {string} Part of the identification code.
  */
  _codeFromNames(vowels, consonants) {
    let code = '';

    // iterating over arrays. 
    // If values run out and the is < 3 letters in code - 'X' is used.
    for (let i = 0, j = 0; code.length < 3;) {
      if (typeof consonants[i] !== 'undefined') {
        code += consonants[i++];
      }
      else if (typeof vowels[j] !== 'undefined') {
        code += vowels[j++];
      }
      else {
        code += "X";
      }
    }
    return code;
  }

  /**
  * Separets vowels from consonants in given word. 
  * Returns map with 2 arrays ("vowels" and "Consonants").
  * @param {string} to_separate - String to process.
  * @return {Map}  Map with 2 arrays (vowels and consonants).
  */
  _separeteLetters(to_separate) {
    let vowels = [];
    let consonants = [];

    for (let i = 0; i < to_separate.length; i++) {
      let char = to_separate.charAt(i);
      if (this._isVowel(char)) {
        vowels.push(char);
      } else {
        consonants.push(char);
      }
    }

    // In order to return two arrays at the same time Map() is used.
    let letters = new Map();
    letters.set("vowels", vowels);
    letters.set("Consonants", consonants);

    return letters;
  }

  /**
  * Returns true if given character is vowel. Otherwise returns false.
  * @param {string} char - Char to check.
  * @return {Map}  Map with 2 arrays (vowels and consonants).
  */
  _isVowel(char) {
    return ['a', 'e', 'i', 'o', 'u'].indexOf(char.toLowerCase()) !== -1;
  }

  /**
  * Parses data from string to int array.
  * @param {string} strDate - String to parse.
  * @return {Number[]}  Array with parsed data 
  * (arr[0] - day; arr[1] - month; arr[2] - year;).
  */
  _parseDate(strDate) {
    const parsedDate = strDate.split("/").map(function (value) {
      return parseInt(value, 10);
    })
    return parsedDate;
  }

  /**
  * Checks date string for validity.
  * @param {string} dateToCheck - Date string to check.
  * @return {Boolean}  True is date string is valid, false otherwise. 
  */
  _isDateValid(dateToCheck) {
    const parsedDate = this._parseDate(dateToCheck);
    if (parsedDate.length !== 3 ||
      !this._checkDate(parsedDate[0], parsedDate[1], parsedDate[2])) {
      return false;
    }
    return true;
  }

  /**
  * Checks date for validity.
  * @param {Number} day   - Day to check.
  * @param {Number} month - Month to check.
  * @param {Number} year  - Year to check.
  * @return {Boolean}  True is date is valid, false otherwise. 
  */
  _checkDate(day, month, year) {
    if (year < 0) {
      return false;
    }
    else if ((month < 1) || (month > 12)) {
      return false;
    }
    else if ((month == 1 || month == 3 || month == 5 || month == 7 ||
      month == 8 || month == 10 || month == 12) && (day > 31 || day < 1)) {
      return false;
    }
    else if ((month == 4 || month == 6 || month == 9 || month == 11)
      && (day > 30 || day < 1)) {
      return false;
    }
    // check for leap year.
    // Yes, I know it's unredable, but it was left over from my old C ++ lab 
    // where my teacher told me to combine checks for a leap year in one condition.
    // And because of my laziness, I left it as it is.
    else if ((month == 2) && (day > ((year % 4 != 0
      || (year % 100 == 0 && year % 400 != 0) ? 28 : 29) || day < 1))) {
      return false;
    }
    return true;
  }

  /**
  * Checks date string for validity.
  * @param {gender} dateToCheck - Gender to check.
  * @return {Boolean}  True if gender is valid, false otherwise. 
  */
  _isGenderValid(gender) {
    if (gender === "F" || gender === "M") {
      return true;
    }
    return false;
  }
}

/**
 * Sends result to the html file.
 */
function sendCode() {
  let p = new Person(document.getElementById('nameField').value, 
                      document.getElementById('surnameField').value, 
                      document.getElementById('genderField').value, 
                      document.getElementById('birthdateField').value);

  document.getElementById('fiscal-code').innerHTML = p.getCode();
}
