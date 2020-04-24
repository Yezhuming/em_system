function c()//进位寄存器C的构造函数
{
	this.value = "0";
}

function createC()//创建C
{
	var _C = new c();
	return _C;
}

c.prototype.reset = function()
{
	var _C = new c();
	this.value = _C.value;
	var id = searchPortID("Status","C");
	if(id != -1)
		Port[id].value = _C.value;
}

c.prototype.setValue = function(_value)//设置C的值
{
	this.value = _value;
}

c.prototype.getValue = function()//获取C的值
{
	return this.value;
}

c.prototype.running = function()//将C的值输出到名为C输出的插口
{
	if((ALU.C_A != this.value) && T == 4)
	{
		this.value = ALU.C_A;
		var id = searchPortID("Status","C");
	    if(id != -1)
	    {
		    Port[id].value = this.value;
	    }
	}
}

c.prototype.showC = function()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	var t = expBox_y+expBox_Height*0.21;
	context.fillText(com[41],expBox_x+perWidth*7,t+perHeight*2);
}

