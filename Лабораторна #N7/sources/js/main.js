function scaleHandler(cardID) {
    let card1 = document.getElementById("card1");
    let card2 = document.getElementById("card2");

    if(cardID == "card1") {
        card1.id = "card1";
        card2.id = "card2";
    }
    else {
        card1.id = "card2";
        card2.id = "card1";
    }
  }

// Я сам вижу что это очень дикое решение и костыль, 
// но времени в обрез, все приходится делать хардкодом.
initDot = "dot1"
function dotHandler(dotID) {
    if (dotID == "circled-dot") {
        return
    }

    let oldDot = document.getElementById("circled-dot");
    oldDot.innerHTML = "◯";
    oldDot.id = initDot;

    let newDot = document.getElementById(dotID);
    initDot = newDot.id;
    newDot.innerHTML = "⦿";
    newDot.id = "circled-dot";
  }