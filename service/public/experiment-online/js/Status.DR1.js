function dr1()									//DR1的构造函数
{
	var id;
	id = searchPortID("Status","LDDR1");
	if(id != -1)
		this.LDDR1 = Port[id];
	id = searchPortID("Status","M1");
	if(id != -1)
		this.M1 = Port[id];
	this.value = "00000000";
}

function createDR1(){										//创建DR1
	var _DR1 = new dr1();
	return _DR1;
}

dr1.prototype.reset = function(){							//重置DR1
	var _DR1 = new dr1();
	this.value = _DR1.value;
}

dr1.prototype.getValue = function(){
	return this.value;
}

dr1.prototype.running = function(){
	var _nowValue , _originalValue , _iAddr;
	if(this.LDDR1.value == true && T == 3)					//DR1写入操作，且在T3时钟下
	{
		if(this.M1.value == true)							//将DBUS中的值写入DR1
		{
			if(DBUS.isON() == true)							//DBUS正在运作
			{
				_originalValue = this.value;				//保存当前DR1的值
				_nowValue = DBUS.getValue();				//获取DBUS的值
				if(_originalValue != _nowValue)				//DR1的值有更新
				{
					this.value = _nowValue;
					ALU.running();
					return;
				}
			}
		}	
		else												//将RF中的值写入DR1
		{
			var _iAddr = getAddr(RF.RS1.value , RF.RS0.value);
			_nowValue = RF.getValue(_iAddr);
			_originalValue = this.value;
			if(_nowValue != _originalValue)
			{
				this.value = _nowValue;
				ALU.running();
			}
		}
	}
	return;
}

dr1.prototype.showDR1 = function()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");var t = expBox_y+expBox_Height*0.21;
	if((com[16] == -1) && (com[1] == -1) && (com[3] == -1) && (t2 == 1 || t3 == 1))
	{	
		com[24] = com[23];
	}	
	if(com[1] == -1 && com[18] == 1 && com[3] == 1 && (t2 == 1 || t3 == 1))
	{
		RF.running();
		var a = new Array(4)
		a = RF.getRS();
		if(a[0] == 0 && a[1] == 0)
			com[24] = com[34];
		if(a[0] == 0 && a[1] == 1)
			com[24] = com[35];
		if(a[0] == 1 && a[1] == 0)
			com[24] = com[36];
		if(a[0] == 1 && a[1] == 1)
			com[24] = com[37];
	}
	context.fillText(com[24],expBox_x+perWidth*10.2,t+perHeight*4.3);
}