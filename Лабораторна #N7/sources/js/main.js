function scaleHandler(cardID) {
	let card1 = document.getElementById("card1");
	let card2 = document.getElementById("card2");

	if (cardID == "card1") {
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

window.onbeforeunload = function () {
	localStorage.setItem("field1", document.getElementById('field1').value);
	localStorage.setItem("field2", document.getElementById('field2').value);
	localStorage.setItem("field3", document.getElementById('field3').value);
	localStorage.setItem("field4", document.getElementById('field4').value);
	localStorage.setItem("field5", document.getElementById('field5').value);
	localStorage.setItem("field6", document.getElementById('field6').value);
	localStorage.setItem("email-form", document.getElementById('email-form').value);
}

window.onload = function () {
	let field1 = localStorage.getItem("field1");
	let field2 = localStorage.getItem("field2");
	let field3 = localStorage.getItem("field3");
	let field4 = localStorage.getItem("field4");
	let field5 = localStorage.getItem("field5");
	let field6 = localStorage.getItem("field6");
	let emailForm = localStorage.getItem("email-form");


	if (field1 !== null) document.getElementById('field1').value = field1;
	if (field2 !== null) document.getElementById('field2').value = field2;
	if (field3 !== null) document.getElementById('field3').value = field3;
	if (field4 !== null) document.getElementById('field4').value = field4;
	if (field5 !== null) document.getElementById('field5').value = field5;
	if (field6 !== null) document.getElementById('field6').value = field6;
	if (emailForm !== null) document.getElementById('email-form').value = emailForm;

}