/**
 * Checks if number is Harashad number. 
 * @param {Number} number - Number to check.
 */
function distanceToNearestVowel(string) {
  distances = new Array(string.length).fill(Infinity);
  let iCounter = NaN, jCounter = NaN;

  for (let i = 0, j = string.length - 1; string.length > i || j > 0; i++ , j--) {
    _isVowel(string.charAt(i)) ? iCounter = 0 : iCounter++;
    _isVowel(string.charAt(j)) ? jCounter = 0 : jCounter++;
    if (iCounter != NaN && distances[i] > iCounter) {
      distances[i] = iCounter;
    }
    if (jCounter != NaN && distances[j] > jCounter) {
      distances[j] = jCounter;
    }
  }

  return distances;
}

/**
 * Returns true if given character is vowel. Otherwise returns false.
 * @param {string} char - Char to check.
 * @return {Map}  Map with 2 arrays (vowels and consonants).
 */
function _isVowel(char) {
  return ['a', 'e', 'i', 'o', 'u'].indexOf(char.toLowerCase()) !== -1;
}

/**
 * Sends result to the html file.
 */
function sendResult() {
  let toProcess = document.getElementById('stringField').value;
  document.getElementById('distanses-field').innerHTML = distanceToNearestVowel(toProcess);
}