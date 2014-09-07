function save_options() {
  var rangePomodoro = document.getElementById("rangePomodoro").value;
  var rangeRest = document.getElementById("rangeRest").value;
  var rangeLongRest = document.getElementById("rangeLongRest").value;
  localStorage["rangePomodoro"] = rangePomodoro;
  localStorage["rangeRest"] = rangeRest;
  localStorage["rangeLongRest"] = rangeLongRest;
  // Update message div to let user know options were saved.
  var message = document.getElementById("message");
  message.innerHTML = "±£´æ³É¹¦.";
  setTimeout(function() {
	message.innerHTML = "";
  }, 750);
}
	
// Restores select box state to saved value from localStorage.
function restore_options() {
  var rangePomodoro = localStorage["rangePomodoro"];
  var rangeRest = localStorage["rangeRest"];
  var rangeLongRest = localStorage["rangeLongRest"];
 
  document.getElementById("rangePomodoro").value = rangePomodoro;
  document.getElementById("rangePomodoroValue").innerHTML = rangePomodoro;
  document.getElementById("rangeRest").value = rangeRest;
  document.getElementById("rangeRestValue").innerHTML = rangeRest;
  document.getElementById("rangeLongRest").value = rangeLongRest;
  document.getElementById("rangeLongRestValue").innerHTML = rangeLongRest;
}

function change(id) {
  var value = document.getElementById(id).value ;
  document.getElementById(id+'Value').innerHTML = value;
}



window.onload = function(){
    restore_options();
	document.getElementById("rangePomodoro").onchange = function(){change("rangePomodoro");};
	document.getElementById("rangeRest").onchange = function(){change("rangeRest");};
	document.getElementById("rangeLongRest").onchange = function(){change("rangeLongRest");};

	document.getElementById("saveButton").onclick = function(){save_options();};
}
