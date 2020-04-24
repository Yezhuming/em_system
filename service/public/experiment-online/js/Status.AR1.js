function ar1()//AR1的构造函数
{
	var id;
	id = searchPortID("Status","LDAR1");
	if(id != -1)
		this.LDAR1 = Port[id];
	id = searchPortID("Status","AR1_INC")
	if(id != -1)
		this.AR1_INC = Port[id];
	this.value = "00000000";
}

function createAR1(){									//create AR1
	var _AR1 = new ar1();
	return _AR1;
}

ar1.prototype.reset = function()					   //重置AR1
{
	var _AR1 = new ar1();
	AR1.value = _AR1.value;
}

ar1.prototype.running = function()
{
	//if(this.AR1_INC.value == true)
	{
		var a = parseInt(com[21],16);
		com[21] = (a+1).toString(16);
		if(com[21].length == 1)
			com[21] = "0" + com[21];
	}
	/*var _nowValue , _originalValue;
	//LDAR1和AR1_INC不可同时为1
	if(this.LDAR1.value == true && T == 4)			  //T4时将数据总线中的数据写入LDAR1
	{
		if(DBUS.isON())								  //DBUS正在工作，DBUS上有值
		{
			_nowValue = DBUS.getValue();
			_originalValue = this.value;
			if(_nowValue != _originalValue)
			{
				this.value = _nowValue;
				RAM.running();
			}
		}
	}
	
	else if(this.AR1_INC.value == true && T == 4)   //AR1中数据自增
	{
		_originalValue = parseInt(this.value,2);
		_originalValue = _originalValue + 1;
		_nowValue = _originalValue.toString(2);
		if(_nowValue.length > 8)//计算值大于255，重新从0开始
			_nowValue = _nowValue.substring(_nowValue.length-8,_nowValue.length);
		else
		{
			for(var i = _nowValue.length; i < 8 ; i++)
				_nowValue = "0" + _nowValue;
		}
		RAM.running();
	}*/
}

ar1.prototype.getValue = function(){				//获取AR1的值
	return this.value;
}
ar1.prototype.showAR1 = function(){					//展示AR1数据
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	var t = expBox_y+expBox_Height*0.21;
	if(DBUS.isON())
	{
		if(com[8] == -1 && (t2 == 1 || t3 == 1))
		{
			com[21] = com[29];
				
		}
	}
	refreshLightg();
	context.fillText(com[21],expBox_x+perWidth*25.2,t+perHeight*4.3);	
}
