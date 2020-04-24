function ar2()  								//AR2的构造函数
{
	var id;
	id = searchPortID("Status","LDAR2");
	if(id != -1)
		this.LDAR2 = Port[id];
	id = searchPortID("Status","M3");
	if(id != -1)
		this.M3 = Port[id];
	this.value = "00000000";
}

function createAR2(){							//创建AR2
	var _AR2 = new ar2();
	return _AR2;
}

ar2.prototype.reset = function(){				//重置AR2
	var _AR2 = new ar2();
	AR2.value = _AR2.value;
}

ar2.prototype.running = function(){				//AR2的逻辑
	var _nowValue , _originalValue;
	
	if(this.LDAR2.value == true && T == 2)
	{											//写DR2
		_originalValue = this.value;
		
		if(this.M3.value == true)				//M3=1，读取DBUS中的值
		{
			if(DBUS.isON())						//DBUS在工作
			{
				_nowValue = DBUS.getValue();
				if(_nowValue != _originalValue) //更新DR2的值
				{
					this.value = _nowValue;			
				}
			}
		}
		else									//读取来自PC的值
		{
			
		}
	}
}

ar2.prototype.getValue = function(){			//获取AR2的值
	return this.value;
}

ar2.prototype.showAR2 = function(){
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");var t = expBox_y+expBox_Height*0.21;
	if(DBUS.isON())
	{
		if(com[10] == -1 && com[9] == -1 && (t2 == 1 || t3 == 1))
		{
			com[22] = com[29];
			refreshLightg();	
		}
	}
	if(com[9] == 1 && com[10] == -1 && (t2 == 1 || t3 == 1))
	{
		com[22] = com[38];
		
	}
		
	if(com[22].length == 1)
		com[22] = '0' + com[22];
	refreshLightg();
    context.fillText(com[22],expBox_x+perWidth*30.2,t+perHeight*4.3);
}