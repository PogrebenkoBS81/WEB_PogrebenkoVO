document.body.onload = function () {
	setTimeout(function () {
		document.getElementById("loader").style.visibility = "hidden";
		document.getElementById("blank").style.visibility = "hidden";
	}, 1000)
}