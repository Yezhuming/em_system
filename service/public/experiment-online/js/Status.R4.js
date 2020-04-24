function r4()
{
	
}

function createR4()
{
	var _R4 = new r4();
	return _R4;
}

r4.prototype.showR4 = function()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");var t = expBox_y+expBox_Height*0.21;
	if(com[14] == -1 && com[15] == -1 && (t2 == 1 || t3 == 1))
	{
		com[40] = com[29];
	}
	context.fillText(com[40],expBox_x+perWidth * 30.2,t + perHeight * 13.65);
}
