function pc()
{
	
}

function createPC()
{
	var _R4 = new pc();
	return _R4;
}

pc.prototype.showPC = function()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	var t = expBox_y+expBox_Height*0.21;
	if(com[12] == -1 && (t2 == 1 || t3 == 1))
		com[38] = com[40];
	if(com[38].length == 1)
		com[38] = '0' + com[38];
	context.fillText(com[38],expBox_x+perWidth*30.2,t+perHeight*9.5);
}

pc.prototype.running = function()
{
	com[38] = parseInt(com[38],16);
	com[38] = com[38] + 1;
	com[38] = com[38].toString(16);
}
