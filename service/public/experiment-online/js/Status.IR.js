function ir()
{
	var id;
	id = searchPortID("Status","LDIR");
	if(id != -1){
		this.LDIR = Port[id];
	}
	this.value = "00000000";
}

function createIR()
{
	var _IR = new ir();
	return _IR;
}

ir.prototype.reset = function (){
	var _IR = new ir();
	IR.value = _IR.value;
}

ir.prototype.getValue = function(){
	return this.value;
}

ir.prototype.setValue = function(_value){
	this.value = _value;
}

ir.prototype.running = function(){
	if(Port[7].value == false && Port[8].value == false && Port[9].value == false && Port[10].value == false)IR1 = 0;
	if(Port[7].value == false && Port[8].value == false && Port[9].value == false && Port[10].value == true)IR1 = 1;
	if(Port[7].value == false && Port[8].value == false && Port[9].value == true && Port[10].value == false)IR1 = 2;
	if(Port[7].value == false && Port[8].value == false && Port[9].value == true && Port[10].value == true)IR1 = 3;
	if(Port[7].value == false && Port[8].value == true && Port[9].value == false && Port[10].value == false)IR1 = 4;
	if(Port[7].value == false && Port[8].value == true && Port[9].value == false && Port[10].value == true)IR1 = 5;
	if(Port[7].value == false && Port[8].value == true  && Port[9].value == true && Port[10].value == false)IR1 = 6;
	if(Port[7].value == true && Port[8].value == false && Port[9].value == false && Port[10].value == false)IR1 = 8;
	if(Port[7].value == true && Port[8].value == false && Port[9].value == false && Port[10].value == true)IR1 = 9;
	if(Port[7].value == true && Port[8].value == false && Port[9].value == true && Port[10].value == false)IR1 = 10;
	if(Port[7].value == true && Port[8].value == false && Port[9].value == true && Port[10].value == true)IR1 = 11;
	if(Port[7].value == true && Port[8].value == true && Port[9].value == false && Port[10].value == false)IR1 = 12;
	if(judge(Port[85] , Port[89]))       //IR1,WR1
	{
		var c=new Array(2);
		c = com[31].split('');
    	var a,b;
    	a = parseInt(c[0],16);
    	b = parseInt(c[1],16);
    	IR1 = a;
    	IR2 = b; 
	}
}

ir.prototype.showIR = function()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");var t = expBox_y+expBox_Height*0.21;
	if(com[13] == -1)
	{
		com[31] = com[30];
	}
	refreshLightr();
	context.fillText(com[31],expBox_x+perWidth*30.4,t+perHeight*16.65);
	
}


