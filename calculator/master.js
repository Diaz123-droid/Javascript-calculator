//Global variables declaration
var expression = document.getElementById('display');
var primaryChars = "01234567.89+-÷×";
var operators = "+-÷×";
var equalPressed = false;
var btnsInverted = false;
// End of global variables declaration


// Get trigured object from html tags
document.querySelectorAll("td").forEach(col => {
	col.addEventListener("click", evt => {
		n = event.target.innerHTML;
		if(primaryChars.indexOf(n) != -1){
			add(n);
		}
		if(n == "CLR"){
			expression.innerHTML = "0";
		}
	});
});

// Backspace delete button functionality
document.getElementById("del").addEventListener("click", rvt => {
	if(expression.innerHTML.length == 1){
		expression.innerHTML = "0";
	}
	else{
		if(equalPressed){
			expression.innerHTML = "0";
		}
		else{
			expression.innerHTML = expression.innerHTML.slice(0, -1);
		}
	}
});

document.querySelector("td[id=sqrt]").addEventListener("click", event =>{
	expression.innerHTML = "√";
	expression.style.fontSize = "1.87em";
});

// Appending value from click to screen
add = (i) => {
	var lastChar = expression.innerHTML[expression.innerHTML.length - 1];
	var thirdLast = expression.innerHTML[expression.innerHTML.length - 3];
	/* if previous expression computed, replace with new content */
	if(expression.innerHTML == "0" || equalPressed){
		if(operators.indexOf(i) != -1){
			return;
		}
		else{
			expression.innerHTML = i;
			equalPressed = false;
		}
	}
	/* User shouldn't append more than two operators at once except minus */
	else if ((operators.indexOf(lastChar) != -1) && (operators.indexOf(i) != -1)) {
		return;
	}
	else{
		expression.innerHTML += i;
	}
}

// Calculates the expression on screen
function compute(){
    var cleanExpression = "";

	// replace multiply and divide symbols => *,/
	for(var n = 0; n < expression.innerHTML.length; n++){
		if(expression.innerHTML[n] == "×"){
			cleanExpression += "*";
		}
		else if(expression.innerHTML[n] == "÷"){
			cleanExpression += "/";
		}
		else{
			cleanExpression += expression.innerHTML[n];
		}
	}

	// Reduce decimal places to fit screen
	var ans = eval(cleanExpression);
	if((ans + "").indexOf(".") != -1){
		var num = ans.toFixed(); // to whole number
		num = ans.toFixed(15 - (num + "").length);
		expression.innerHTML = eval(num);
	}
	else{
		// no decimal places in answer, proceed
		expression.innerHTML = ans;
	}

	equalPressed = true; // equal button pressed
}

/* Invert functionality for cos, sqrt, sin, tan, In, and log */
document.getElementById("inverter").addEventListener("click", event => {
	var array = document.getElementsByClassName("inverted");

	var otherFuncs = [
		"<p>x<sup>2</sup></p>",
		"<p>sin<sup>-1</sup></p>",
		"<p>cos<sup>-1</sup></p>",
		"<p>tan<sup>-1</sup></p>",
		"<p>e<sup>x</sup></p>",
		"<p>10<sup>x</sup></p>"
	];
	var firstFuncs = [
		"<p style='font-size: 1em'>√</p>",
		"<p>sin</p>",
		"<p>cos</p>",
		"<p>tan</p>",
		"<p>In</p>",
		"<p>log</p>"
	];

	// Change content of array
	if(!btnsInverted){
		for(let arrEach = 0; arrEach < array.length; arrEach++){
			array[arrEach].innerHTML = otherFuncs[arrEach];
			document.getElementsByTagName("sup")[arrEach].style.fontSize = "0.6em";
		}

		btnsInverted = true; // Buttons have been inverted
	}
	// Revert innerHTML to original
	else{
		for(let arrEach = 0; arrEach < array.length; arrEach++){
			array[arrEach].innerHTML = firstFuncs[arrEach];
		}

		btnsInverted = false; // Buttons set to original
	}
});
