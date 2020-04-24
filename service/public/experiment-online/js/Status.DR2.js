function dr2(){									//DR2的构造函数
	var id;
	id = searchPortID("Status","LDDR2");
	if(id != -1)
		this.LDDR2 = Port[id];
	id = searchPortID("Status","M2");
	if(id != -1)
		this.M2 = Port[id];
	this.value = "00000000";
}


function createDR2(){							//创建DR1
	var _DR2 = new dr2();
	return _DR2;
}

dr2.prototype.reset = function(){			   //重置DR2
	var _DR2 = new dr2();
	this.value = _DR2.value;
}

dr2.prototype.getValue = function(){
	return this.value;
}

dr2.prototype.running = function(){
	var _nowValue , _originalValue , _iAddr;
	if(this.LDDR2.value == true && T == 3)       	//在T3时钟下DR2写入操作
	{
		if(this.M2.value == true)					//将DBUS中的值写入DR1
		{
			if(DBUS.isON() == true)					//DBUS正在运作
			{
				_originalValue = this.value;		//保存当前DR2的值
				_nowValue = DBUS.getValue();		//获取DBUS的值
				if(_originalValue != _nowValue)		//DR1的值有更新
				{
					this.value = _nowValue;
					ALU.running();
					return;
				}
			}
		}
		else										//将RF中的值写入DR2
		{										
			var _iAddr = getAddr(RF.RD1.value, RF.RD0.value);
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

dr2.prototype.showDR2 = function()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	var t = expBox_y + expBox_Height*0.21;
	if(com[0] == -1 && (t2 == 1 || t3 == 1))
	{
		RF.running();
		var a = new Array(4)
		a = RF.getRS();
		if(com[2] == 1)
		{
			if(a[2] == 0 && a[3] == 0)
			{
				com[25] = com[34];
			}
			if(a[2] == 0 && a[3] == 1)
			{
				com[25] = com[35];
			}
			if(a[2] == 1 && a[3] == 0)
			{
				com[25] = com[36];
			}
			if(a[2] == 1 && a[3] == 1)
			{
				com[25] = com[37];
			}
		}
		else
		{
			com[25] = com[29];
		}
	}
	if(com[25].length == 1)
		com[25] = '0' + com[25];
	context.fillText(com[25], expBox_x + perWidth * 5.3,t + perHeight * 4.3);
}