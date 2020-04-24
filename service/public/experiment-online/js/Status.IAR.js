function iar()
{
	
}
function createIAR()
{
	var _IAR = new iar();
	return _IAR;
}

iar.prototype.showIAR = function()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	var t = expBox_y+expBox_Height*0.21;
	context.fillText(com[39],expBox_x+perWidth * 25.3,t+perHeight * 8.1);
}
