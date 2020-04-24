function rf()			//RF的构造函数
{
	var id;
	id = searchPortID("Status","RS1");
	if(id != -1)
		this.RS1 = Port[id];
	id = searchPortID("Status","RS0");
	if(id != -1)
		this.RS0 = Port[id];
	id = searchPortID("Status","WR1");
	if(id != -1)
		this.WR1 = Port[id];
	id = searchPortID("Status","WR0");
	if(id != -1)
		this.WR0 = Port[id];
	id = searchPortID("Status","RD1");
	if(id != -1)
		this.RD1 = Port[id];	
	id = searchPortID("Status","RD0");
	if(id != -1)
		this.RD0 = Port[id];
	id = searchPortID("Status","WRD");
	if(id != -1)
		this.WRD = Port[id];
	this.value = new Array();
	for(var i = 0; i < 4; i++)
		this.value[i] = "00000000";
}

function createRF(){												//创建RF
	var _RF = new rf();
	return _RF;
}

rf.prototype.getValue = function(addr)
{
	return this.value[addr];
}

rf.prototype.reset = function(){									//重置RF
	var _RF = new rf();
	RF.value = _RF.value;
}

rf.prototype.getRS = function(){
	var a = new Array(4);
	a[0] = this.RS1; a[1] = this.RS0;
	a[2] = this.RD1; a[3] = this.RD0;
	return a;
}

rf.prototype.running = function(){									//RF的运行函数
	if(Port[94].value == false && Port[95].value == false)
	{
		this.RS1 = 0; this.RS0 = 0;
	}
	if(Port[94].value == false && Port[95].value == true)
	{
		this.RS1 = 0; this.RS0 = 1;
	}
	if(Port[94].value == true && Port[95].value == false)
	{
		this.RS1 = 1; this.RS0 = 0;
	}
	if(Port[94].value == true && Port[95].value == true)
	{
		this.RS1 = 1; this.RS0 = 1;
	}	
	if(Port[92].value == false && Port[93].value == false)
	{
		this.RD1 = 0; this.RD0 = 0;
	}
	if(Port[92].value == false && Port[93].value == true)
	{
		this.RD1 = 0; this.RD0 = 1;
	}
	if(Port[92].value == true && Port[93].value == false)
	{
		this.RD1 = 1; this.RD0 = 0;
	}
	if(Port[92].value == true && Port[93].value == true)
	{
		this.RD1 = 1; this.RD0 = 1;
	}
	if(judge(Port[86],Port[90]))
	{
		switch(IR2)                         //IR0,WR0
		{
		case 0:
			this.RS1 = 0; this.RS0 = 0; this.RD1 = 0; this.RD0 = 0;
			break;
		case 1:
			this.RS1 = 0; this.RS0 = 0; this.RD1 = 0; this.RD0 = 1;
			break;
		case 2:
			this.RS1 = 0; this.RS0 = 0; this.RD1 = 1; this.RD0 = 0;
			break;
		case 3:
			this.RS1 = 0; this.RS0 = 0; this.RD1 = 1; this.RD0 = 1;
			break;
		case 4:
			this.RS1 = 0; this.RS0 = 1; this.RD1 = 0; this.RD0 = 0;
			break;
		case 5:
			this.RS1 = 0; this.RS0 = 1; this.RD1 = 0; this.RD0 = 1;
			break;
		case 6:
			this.RS1 = 0; this.RS0 = 1; this.RD1 = 1; this.RD0 = 0;
			break
		case 7:
			this.RS1 = 0; this.RS0 = 1; this.RD1 = 1; this.RD0 = 1;
			break;
		case 8:
			this.RS1 = 1; this.RS0 = 0; this.RD1 = 0; this.RD0 = 0;
			break;
		case 9:
			this.RS1 = 1; this.RS0 = 0; this.RD1 = 0; this.RD0 = 1;
			break;
		case 10:
			this.RS1 = 1; this.RS0 = 0; this.RD1 = 1; this.RD0 = 0;
			break;
		case 11:
			this.RS1 = 1; this.RS0 = 0; this.RD1 = 1; this.RD0 = 1;
			break;
		case 12:
			this.RS1 = 1; this.RS0 = 1; this.RD1 = 0; this.RD0 = 0;
			break;
		case 13:
			this.RS1 = 1; this.RS0 = 1; this.RD1 = 0; this.RD0 = 1;
			break;
		case 14:
			this.RS1 = 1; this.RS0 = 1; this.RD1 = 1; this.RD0 = 0;
			break;
		case 15:
			this.RS1 = 1; this.RS0 = 1; this.RD1 = 1; this.RD0 = 1;
			break;
		}
	}

	
	
	/*var _nowValue , _originalValue;
	if(this.WRD.value == true && T == 2)							//T2时刻，ER写RF，同时可读出
	{
		var _iAddr = getAddr(this.WR1.value , this.WR0.value);		//获取RF中的写入地址
		_originalValue = this.value[_iAddr];
		_nowValue = ER.getValue();
		if(_originalValue != _nowValue)								//更新RF中的值
			this.value[_iAddr] = _nowValue;	
	}
	else if(this.WRD.value == false)								//禁止写，读RF到DBUS
	{
		
		if(DBUS.RS_BUS$.value == false)								//读入到DBUS
		{
			var _iAddr = getAddr(this.RS1.value , this.RS0.value);
			_nowValue = this.value[_iAddr];
			_originalValue = DBUS.getValue();
			if(_originalValue != _nowValue)							//更新DBUS的值
				DBUS.setValue(_nowValue);
		}
	}
	
	if(DBUS.RS_BUS$.value == false)									//数据输出到总线
	{
		var _iAddr = getAddr(this.RS1.value, this.RS0.value);
		_nowValue = this.value[_iAddr]
		_originalValue = DBUS.getValue();
		
		if(_originalValue != _nowValue)								//更新DBUS的值
			DBUS.setValue(_nowValue);
	}*/
}

rf.prototype.showRF = function()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	var t = expBox_y + expBox_Height*0.21;
	if(com[4] == -1 && (t2 == 1 || t3 == 1) && !judge(Port[85],Port[89]))								//com[4]:WRD   85:IR1  89:WR1
	{
		if(Port[89].value == false && Port[90].value == false)											//89: WR1   90: WR0
		{
			com[34] = com[33];																			//com[33]:ER
		}
		if(Port[89].value == false && Port[90].value == true)
		{
			com[35] = com[33];
		}
		if(Port[89].value == true && Port[90].value == false)
		{
			com[36] = com[33];
		}
		if(Port[89].value == true && Port[90].value == true)
		{
			com[37] = com[33];
		}		
	}
	if(t2 == 1 && judge(Port[85],Port[89]) && com[4] == -1)												//85:IR1  89:WR1 4:WRD
	{
		switch(parseInt(com[31],16))																	//com[31]:IR
		{
			case 0:com[34] = com[33];context.fillText(com[34],expBox_x+perWidth*5.7,t+perHeight*10.2);break;
			case 1:com[35] = com[33];context.fillText(com[35],expBox_x+perWidth*7.7,t+perHeight*10.2);break;
			case 2:com[36] = com[33];context.fillText(com[36],expBox_x+perWidth*9.5,t+perHeight*10.2);break;
			case 3:com[37] = com[33];context.fillText(com[37],expBox_x+perWidth*11.2,t+perHeight*10.2);break;
		}
	}
	context.fillText(com[34],expBox_x+perWidth*5.7,t+perHeight*10.2);context.fillText(com[35],expBox_x+perWidth*7.7,t+perHeight*10.2);
	context.fillText(com[36],expBox_x+perWidth*9.5,t+perHeight*10.2);context.fillText(com[37],expBox_x+perWidth*11.2,t+perHeight*10.2);
}

function getAddr(addr1,addr0)
{
	var _Addr = new Array(), _iAddr;
	if(addr1 == true)
		_Addr.push(1);
	else
		_Addr.push(0);
	if(addr0 == true)
		_Addr.push(1);
	else
		_Addr.push(0);	
	var addr = _Addr.join("");
	_iAddr = parseInt(addr,2);
	return _iAddr;
}

