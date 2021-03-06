function onLoad(){
	checkCookie();
	createStylesList();
	var date1 = document.getElementById('date1');
	var time1 = document.getElementById('time1');
	if (date1 !== null){
		printDate1();	
	}
	if (time1 != null){
		printTime1();
	}
}

function printDate1(){ 
	var d = new Date();	
    	var mm = d.getMonth()+1;
	if (mm<10){
    		mm='0'+mm;
	}
	var dd = d.getDate();
    	if (dd<10){
    		dd='0'+dd; 
	}
	document.getElementById('date1').value=d.getFullYear()+"-"+mm+"-"+dd;
}

function printTime1(){
   	var d = new Date(); 
	var hh = d.getHours();
	if (hh < 10) { hh = "0" + hh;}
	var mm = d.getMinutes();
	if (mm < 10) {mm = "0" + mm;}
	document.getElementById('time1').value=hh+":"+mm;
}

function correctDate(){
	var date = document.getElementById('date1').value;
	var regexDate = /^\d{4}\-(0[1-9]|1[0-2])\-(0[1-9]|[12][0-9]|3[01])$/gi;
	if (!regexDate.test(date)){
		printDate1();
	}
	else{
		var yyyy = date.slice(0, 4);
		var mm = date.slice(5, 7);
		var dd = date.slice(8, 10);
		var d = new Date;
		if (yyyy > d.getFullYear()){
			printDate1();
		}
		if (yyyy == d.getFullYear() && mm > (d.getMonth()+1)){
			printDate1();
		}
		if (yyyy == d.getFullYear() && mm == (d.getMonth()+1) && dd > d.getDate()){
			printDate1();
		} 
	}
}

function correctTime(){
	var time = document.getElementById('time1').value;
	var regexTime = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/gi;
	if (!regexTime.test(time)){
		printTime1();
	}
}

numAttachments = 1;
function newAttachField() {
	   if (numAttachments < 10){
	      numAttachments++;
	      var newIn = document.createElement('input');
	      newIn.setAttribute("type", "file");
	      newIn.setAttribute("name", "Attachment" + numAttachments);
	      newIn.setAttribute("onclick", "newAttachField()");
	      var br = document.createElement('br');
	      var Attachments = document.getElementById("attachments");
	      Attachments.appendChild(newIn);
	      Attachments.appendChild(br);
	   }
}

function createStylesList() {
   var style = document.getElementsByTagName("link");
   var numStyles = style.length;
   console.log(numStyles);

   var stylesList = document.getElementById("styles");

   for (i = 0 ; i < numStyles ; i++) {
      var current = document.createElement('a');
      var nameStyle = style[i].title;

      current.innerHTML = nameStyle;
      current.setAttribute('onclick', "chooseStyle(\"" + nameStyle + "\")");
      stylesList.appendChild(current);
      stylesList.appendChild(document.createElement('br'));
   }
}

function chooseStyle(nameStyle) {
   var stylesList = document.getElementsByTagName("link");
   var numStyles = stylesList.length;
   var ind = 0;
   for (var i = 0 ; i < numStyles ; i++) {
      var style = stylesList[i];
      if (style.getAttribute("title") == nameStyle) {
		ind = i;
      }
      style.disabled = true;
   }
   stylesList[ind].disabled = false;
   setCookie("style", nameStyle, 365);
  
}

function setCookie(cname, cvalue, period) {
   var d = new Date();
   d.setTime(d.getTime() + (period * 24 * 60 * 60 * 1000));
   var expires = "expires=" + d.toGMTString();
   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=./cookies.txt";
}

function getCookie(cname) {
   var name = cname + "=";
   var decodedCookie = decodeURIComponent(document.cookie);
   var cookieArray = decodedCookie.split(';');
   for (var i = 0 ; i < cookieArray.length ; i++) {
      var part = cookieArray[i];
      while (part.charAt(0) == ' ') {
         part = part.substring(1);
      }
      if (part.indexOf(name) == 0) {
         return part.substring(name.length, part.length);
      }
   }
   return "";
}

function checkCookie() {
	var style=getCookie("style");
	console.log(style);
	if (style != "NaN") {
		chooseStyle(style);
	}
	else{
		chooseStyle("Light mode");
	}
}
