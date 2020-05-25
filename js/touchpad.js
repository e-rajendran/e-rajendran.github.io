
var pully = "்"; 
var akh = "ஃ";
var vows = ["அ","ஆ","இ","ஈ","உ","ஊ","எ","ஏ","ஐ","ஒ","ஓ","ஔ"]; 
var extn = ["","ா","ி","ீ", "ு","ூ","ெ","ே","ை", "ொ","ோ","ௌ"];
var cons = ["க","ங","ச","ஞ","ட","ண","த","ந","ப","ம","ய","ர","ல","வ","ழ","ள","ற","ன","ஸ","ஷ","ஜ","ஹ"]; 


var keysAlphaT = 
[
	["அ","ஆ","இ","ஈ","உ","ஊ","எ","ஏ","ஐ","ஒ","ஓ"],
	["க","ங","ச","ஞ","ட","ண","த","ந","ப","ம"],
	["ய","ர","ல","வ","ழ","ள","ற","ன","ஔ","Backspace"],
	["Shift","Spacebar","்","Enter"]
];

var keysShiftT = 
[
	["௧","௨","௩","௪","௫","௬","௭","௮","௯","௦","௰",],
	["ஃ","ஸ","ஷ","ஜ","ஹ","க்ஷ","ஶ்ரீ","ஶ","ௐ","௱"],
	["௲","௳","௴","௵","௶","௷","௸","௹","௺","Backspace"],
	["Shift","Spacebar","Enter"]
];

var currentMode;
var prevKey = "";
var keyRepeats = false;
var cursorOffset = 0;

//----------------------------------------------
function resetKB() {
	prevKey = "";
	keyRepeats = false;
	cursorOffset = 0;
}

//----------------------------------------------
function drawKeyboard(textarea) {
	// alert('drawkeyboard');

	// Show Alpha Tamil
	document.write("<div id='alphaKB'>");
	drawKeys(keysAlphaT, "Tamil")
	document.write("</div>");
	
	// Show Shift-> Alpha for Tamil
	document.write("<div id='shiftKB'>");
	drawKeys(keysShiftT, "Tamil")	;
	document.write("</div>");
	
	changeMode();
}

//----------------------------------------------
function drawKeys(keys, lang) {
	// alert('drawKeys')
	for (r=0; r < keys.length; r++) {
		len = keys[r].length;
		document.write("<div>");
		for (i=0; i < keys[r].length; i++) {
			// console.log(keys[r][i]);
			drawKey(keys[r][i], lang);
		}
		document.write("</div>");
	}
}

//----------------------------------------------
function drawKey(key,lang) {

	switch (key) {
		
	  case 'Backspace':
		altStr = "பின்வெளி Backspace";
		document.write ("<img src='./images/backspace.png' alt='" + altStr +"' title='" + altStr + "' onClick=keyClick(this,'BS')>");
		break;
		
	  case 'Enter':
		altStr = "திரும்பு Return";
		document.write ("<img src='./images/enter.png' alt='" + altStr +"' title='" + altStr + "' onClick=keyClick(this,'CR')>");
		break;
		
	  case 'Shift':
		altStr = " மாற்று Shift";
	    document.write ("<img src='./images/shift.png' alt='" + altStr + "' title='" + altStr + "' onClick='changeMode()'>");
		break;
	
	  case 'Spacebar':
		keySub = "&nbsp;&nbsp;&nbsp;&nbsp;இடைவெளி&nbsp;&nbsp;&nbsp;&nbsp;";
	  	document.write ("<button class='btn btn-default' onClick=keyClick(this,'&nbsp;');><strong>" +  keySub + "</strong></button>");
		break;

	  default:
	  	 document.write ("<button class='btn btn-default' onClick=keyClick(this,\"" + key + "\"); onmousedown=mouseDown(this); onmouseup=mouseUp(this);><strong>" + key + "</strong></button>" );
	}
}

//----------------------------------------------
function changeMode() {
	
	if (currentMode != 'Alpha') {
		alphaKB.style.display = "";
		shiftKB.style.display = "none";
		currentMode = "Alpha";
	}
	else {
		alphaKB.style.display = "none";
		shiftKB.style.display = "";
		currentMode = "Shift";
	}
}

//----------------------------------------------
function mouseUp(key) {
	key.style.background = "white";
    key.style.color = "black";
	
}

//----------------------------------------------
function mouseDown(key) {
 	key.style.background = "#666";
    key.style.color = "#FFF";
}

//----------------------------------------------
function keyClick(id,key) {
   
 var textarea = textID;
 var currPosn = textID.selectionEnd;
 
 	if (key == "BS") { 
	   backSpace(textarea,currPosn);
	   return true;
	}
	if (key == "CR") 
		newChar = newLine();
    else
	   newChar = tamilChar(key);
	   
	textarea.value = textarea.value.substring(0, currPosn + cursorOffset) + 
						newChar + textarea.value.substring(currPosn - cursorOffset);
	textarea.focus();
	newPosn = currPosn + newChar.length;
	setPosition(textarea,newPosn);
	mouseDown(id);

}

//----------------------------------------------
function getPosition(textarea) {
   return textID.selectionEnd;
}

//----------------------------------------------
function getPrevChar(txt,posn){
	return txt.substring(posn-1,posn);
}

//----------------------------------------------
function setPosition(textarea,newPosn) {
	if( textarea.setSelectionRange ) {
		textarea.setSelectionRange(newPosn,newPosn);
	} 
	else if( textarea.createTextRange ) {
		var obj = textarea.createTextRange();
		obj.collapse(true);
		obj.moveEnd('character',newPosn);
		obj.moveStart('character',newPosn);
		obj.select();
	}
}

//----------------------------------------------
function newLine() {
	prevKey = "";
	keyRepeats = false;
	cursorOffset = 0;
	return String.fromCharCode(13);
}

//----------------------------------------------
function backSpace(textarea, currPosn) {
 
	textarea.value = textarea.value.substring(0, currPosn-1) +
			textarea.value.substring(currPosn+1);
	textarea.focus();
	newPosn = currPosn - 1;
	setPosition(textarea,newPosn);
}

//----------------------------------------------
function tamilChar(key) {

var newChar = key;
cursorOffset = 0;

	if (prevKey == "") {
		// If key is Vowel and NOT a consonant no need to join
		if (vows.indexOf(key) >= 0 || cons.indexOf(key) < 0) {	
			prevKey = "";
		}
		else {
			prevKey = key;    // save consonant for joining
		}
		keyRepeats = false;
		if (key == "்") 
			return "";
		return key;
	}	
	// come here if previous key was a consonant
	if (key == "ஃ") {
		newKey = prevKey + pully;
		prevKey = "";
		keyRepeats = false;
		cursorOffset = -1;
		return newKey;
	}

	var vNdx = vows.indexOf(key);
	if ( vNdx >= 1)	{ 	   
		// new key is Vowel - Join with appropriate vowel extension 
		newKey = prevKey + extn[vNdx];
		prevKey = "";
		keyRepeats = false;
		cursorOffset = -1;
		return newKey;
	}

	if (prevKey == key) {
		// consonants repeats
		if (keyRepeats) {
			// same consonants more than twice ககக  retuned earlier க ் க ;  so now return க
			prevKey = key;
			keyRepeats = false;
			return key;
		}	
		// கக   return க ் க
		newKey = prevKey + pully + key;
		keyRepeats = true;
		prevKey = key;
		cursorOffset = -1; 
		return newKey;
	}
	// consonants combo rule
	if ( (prevKey=="ங" && key=="க") || 
		(prevKey=="ஞ" && key=="ச") || 
		(prevKey=="ந" && key=="த") || 
		(prevKey=="ண" && key=="ட") || 
		(prevKey=="ம" && key=="ப") || 
		(prevKey=="ன" && key=="ற") ) {
		newKey = prevKey + pully + key;
		prevKey = key;
		keyRepeats = false;
		cursorOffset = -1; 
		return newKey;
	}

	// different consonant
	if (cons.indexOf(key) >= 0) {
		prevKey = key;
	}
	else {
		prevKey = "";
		keyRepeats = false;
	}	
	return key;

}
