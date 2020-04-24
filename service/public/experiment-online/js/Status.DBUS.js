function dbus(){//DBUS的构造函数
	var id;
	id = searchPortID("Status","ALU_BUS");
	if(id != -1)
		this.ALU_BUS = Port[id];
	id = searchPortID("Status","CEL#");
	if(id != -1)
		this.CEL$ = Port[id];
	id = searchPortID("Status","RS_BUS#");
	if(id != -1)
		this.RS_BUS$= Port[id];
	id = searchPortID("Status","IAR_BUS#");
	if(id != -1)
		this.IAR_BUS$ = Port[id];
	id = searchPortID("Status","SW_BUS#");
	if(id != -1)
		this.SW_BUS$ = Port[id];
	id = searchPortID("Console","SW7");
	if(id != -1)
		this.SW7 = Port[id];
	id = searchPortID("Console","SW6");
	if(id != -1)
		this.SW6 = Port[id];
	id = searchPortID("Console","SW5");
	if(id != -1)
		this.SW5 = Port[id];
	id = searchPortID("Console","SW4");
	if(id != -1)
		this.SW4 = Port[id];
	id = searchPortID("Console","SW3");
	if(id != -1)
		this.SW3 = Port[id];
	id = searchPortID("Console","SW2");
	if(id != -1)
		this.SW2 = Port[id];
	id = searchPortID("Console","SW1");
	if(id != -1)
		this.SW1 = Port[id];
	id = searchPortID("Console","SW0");
	if(id != -1)
		this.SW0 = Port[id];
	this.value = "00000000";
}

function createDBUS()							//创建DBUS
{
	var _DBUS = new dbus();
	return _DBUS;
}

dbus.prototype.getValue = function(){			//获得DBUS的value
	return this.value;
}

dbus.prototype.running1 = function(){						//无脉冲时DBUS获得值
	this.reset();
	if(this.SW_BUS$.value == false)							//读取开关SW7-SW0
	{			
		var _value = new Array();
		_value.push(Number(this.SW7.value));
		_value.push(Number(this.SW6.value));
		_value.push(Number(this.SW5.value));
		_value.push(Number(this.SW4.value));
		_value.push(Number(this.SW3.value));
		_value.push(Number(this.SW2.value));
		_value.push(Number(this.SW1.value));
		_value.push(Number(this.SW0.value));
		this.setValue(_value.join(""));
		return;
	}
	else if(this.RS_BUS$.value == false)					//读取RF
	{
		
	}
	else if(this.ALU_BUS.value == true)						//ALU输出到总线
	{
		this.value = ALU.value;
		return;		
	}
	else if(this.CEL$.value == false)						//RAM读出（有要求！）
	{	
	}
	else if(this.IAR_BUS$.value == false)					//IAR输出到总线
	{
	}
}

dbus.prototype.setValue = function(_value)					//设置DBUS的值
{
	this.value = _value;
}

dbus.prototype.isON = function()							//判断DBUS是否在工作
{
	if((com[6]+com[19]+com[16]+com[18]+com[17])==3)return true;
	else 
	{
		if((com[16]==-1&&com[17]==-1&&com[32]==1)&&(com[6]+com[19]+com[16]+com[18]+com[17])==1)return true;
		if((com[18]==-1&&com[17]==-1&&com[32]==1)&&(com[6]+com[19]+com[16]+com[18]+com[17])==1)return true;
		else return false;
	}
}

dbus.prototype.reset = function()							//重置DBUS的值
{
	var _DBUS = new dbus();
	DBUS.value = _DBUS.value;
}

dbus.prototype.showDBUS = function()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	var t = expBox_y+expBox_Height*0.21;
	context.textAlign="start";
	if(DBUS.isON())
	{
		if(com[16] == -1)
		{
			com[29] = com[23];
		}
		if(com[6]==-1)
		{
			ALU.running();
		}
		if(com[32] == -1 && com[16] == 1 && (t2 == 1 || t3 == 1) && com[17] == -1)
		{
			var c=new Array(2);c=com[21].split('');var a,b;a=parseInt(c[0]);b=parseInt(c[1]);
    		switch(c[0])
    		{
    			case 'A':{a=10;break;} case 'B':{a=11;break;} case 'C':{a=12;break;} case 'D':{a=13;break;} case 'E':{a=14;break;} case 'F':{a=15;break;}
    		}
    		switch(c[1])
    		{
    			case 'A':{b=10;break;} case 'B':{b=11;break;} case 'C':{b=12;break;} case 'D':{b=13;break;} case 'E':{b=14;break;} case 'F':{b=15;break;}
   			}
    		com[29] = RAM.ram1[b+1][a+1];
		}
		if(com[18] == -1)										//RF B口读出 
		{
			RF.running();
			var a = new Array(4)
			a = RF.getRS();
			if(a[0] == 0 && a[1] == 0)
				com[29] = com[34];
			if(a[0] == 0 && a[1] == 1)
				com[29] = com[35];
			if(a[0] == 1 && a[1] == 0)
				com[29] = com[36];
			if(a[0] == 1 && a[1] == 1)
				com[29] = com[37];
		}
	}
	else
	{
		com[29] = "ff";
		
	}
	refreshLightr();
	context.fillText(com[29],expBox_x+perWidth*18.3,t+perHeight*8);
}

