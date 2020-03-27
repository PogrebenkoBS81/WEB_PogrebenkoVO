/**
 * Checks if the given rug is perfect, horizontally symmetric,
 * vertically symetric, or imperfect. 
 * @param {(Number[][]|Boolean[][]|
 * 			String[][]|Symbol[][])} rug - rug to check.
 * @return {Number} 0 if rug is invalid, 1 if rug is perfect,
 * 2 if rug is horizontally symmetric,
 * 3 if rug is vertically symetric,
 * and 4 if rug is imperfect.
 */
function classifyRug(rug) {
  horizontal = _isHorizontal(rug);
  vertical = _isVertical(rug);

  if (!_isValid(rug)) {
    return 0;
  }

  if (horizontal && vertical) {
    return 1;
  }
  else if (horizontal) {
    return 2;
  }
  else if (vertical) {
    return 3;
  }
  else {
    return 4;
  }
}

/**
 * Checks the given rug for horizontal symmetry. 
 * @param {(Number[][]|Boolean[][]|
  * 			String[][]|Symbol[][])} rug - rug to check.
 * @return {Boolean} true if rug has horizontal symmetry, false otherwise.
 */
function _isHorizontal(rug) {
  // transpose the rug, which allows 
  // us to use the already written function "_isVertical".
  console.log(rug, typeof rug)
  transposed = rug[0].map((col, i) =>
    rug.map(row => row[i]));

  return _isVertical(transposed);
}

/**
 * Checks the given rug for vertical symmetry. 
 * @param {(Number[][]|Boolean[][]|
  * 			String[][]|Symbol[][])} rug - rug to check.
 * @return {Boolean} true if rug has vertical symmetry, false otherwise.
 */
function _isVertical(rug) {
  for (let i = 0; i < rug.length; i++) {
    subLen = rug[0].length;
    for (let j = 0; j < subLen / 2; j++) {
      if (rug[i][j] !== rug[i][subLen - j - 1]) {
        return false
      }
    }
  }
  return true;
}

/**
 * Checks the given rug for validity. 
 * @param {(Number[][]|Boolean[][]|
  * 			String[][]|Symbol[][])} rug - rug to check.
 * @return {Boolean} true if rug is valid, false otherwise.
 */
function _isValid(rug) {

  if(!Array.isArray(rug)){
    return false;
  }

  rugLen = rug[0].length;
  for (let i = 1; i < rug.length; i++) {
    if (rugLen !== rug[i].length) {
      return false;
    }
  }
  return true;
}

/**
 * Sends result to the html file.
 */
function sendResult() {
  const status = ["Invalid rug", "Perfect.", "Horizontally symmetric.", 
      "Vertically symetric.", "Imperfect."]
  try{
    let rawRug = JSON.parse(document.getElementById('rugField').value)
    document.getElementById('rug-field').innerHTML = status[classifyRug(rawRug)];
  }
  catch (error){
    console.error(error);
    alert("Invalid JSON")
  }
}