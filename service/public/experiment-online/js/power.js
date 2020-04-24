var Power = {"value" : false, "x" : 69, "y" : 29};
var powerList = new Array(17,51,68,87,105,108,111,116);

function powerOn()     //电源插口值为true
{
	for(var i = 0; i < powerList.length ; i++)
	{
		var id = powerList[i];
		Port[id].value = true;
	}
}//powerOn()

function powerOff()
{//电源插口值为false
	for(var i = 0; i < powerList.length ; i++)
	{
		var id = powerList[i];
		Port[id].value = false;
	}
}//powerOff()
