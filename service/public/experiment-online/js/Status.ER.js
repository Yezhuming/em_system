function er()
{
	var id;
	id = searchPortID("Status","LDER");
	if(id != -1)
		this.LDER = Port[id];
	this.value = "00000000";
}

function createER()
{
	var _ER = new er();
	return _ER;
}

er.prototype.reset = function(){
	var _ER = new er();
	ER.value = _ER.value;
}

er.prototype.getValue = function(){
	return this.value;
}

er.prototype.running = function(){
	var _nowValue , _originalValue;
	if(this.LDER.value == true && T == 4)									//写入ER
	{
		if(DBUS.isON())
		{
			_nowValue = DBUS.getValue();
			_originalValue = this.value;
			if(_nowValue != _originalValue)
				this.value = _nowValue;
		}
	}
}

er.prototype.showER = function()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	var t = expBox_y+expBox_Height*0.21;
	if((com[5] == -1) && (t2 == 1 || t3 == 1))
	{
	   com[33] = com[29];
	}
	context.fillText(com[33],expBox_x+perWidth*8,t+perHeight*13.7);
}


