function sw()
{
}

function createSW()
{
	var _SW = new sw();
	return _SW;
}

sw.prototype.showSW = function()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	var t = expBox_y + expBox_Height*0.21;	
	com[23] = com[23].toString(16);
	if(com[23].length == 1)
		com[23] = '0' + com[23];
	context.fillText(com[23], expBox_x + perWidth * 8.5, t + perHeight * 16.57);
}

sw.prototype.running = function()
{
	com[23] = parseInt(com[23],16);
	for(var n = 16; n <= 23; n++)
	{
		if(Switch[n].value == true)
		{
			if(n == 23){m = 1};
	        if(n == 22){m = 2};								
			if(n == 21){m = 4};
			if(n == 20){m = 8};
			if(n == 19){m = 16};
			if(n == 18){m = 32};
			if(n == 17){m = 64};
			if(n == 16){m = 128};
			com[23] += m;
		}							
	}
	com[23] = com[23].toString(16);
	if(com[23].length == 1)
		com[23] = '0' + com[23];
}
