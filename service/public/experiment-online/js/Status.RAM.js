function ram()	//RAM的构造函数
{
	var id;
	id = searchPortID("Status","LRW");
	if(id != -1)
		this.LRW = Port[id];
	
	id = searchPortID("Status","CER");
	if(id != -1)
		this.CER = Port[id];
	
	this.value = new Array(256);
	for(var i = 0; i < 256; i++)
	{
		this.value[i] = "00000000";
	}
	var a =  new Array(17);   
	for(var i = 0;i < a.length; i++)  
  		a[i] = new Array(17); 
  	for(var i = 0; i <= 16; i++)
  	{
  		for(var j = 0; j <= 16; j++)
  		{
  			a[i][j] = "00";
  		}
  	}
  	this.ram1 = a;
}

function createRAM()//创建RAM
{
	var _RAM = new ram();
	return _RAM;
}

ram.prototype.reset = function()	//重置RAM
{
	var _RAM = new ram();
	for(var i = 0 ; i < _RAM.value.length ;i++)
	{
		RAM.value[i] = _RAM.value[i];
	}
}

ram.prototype.running = function()
{
	var _nowValue , _originalValue;
	
	if(DBUS.CEL$.value == false)	//左端口有效，从DBUS中读或写
	{
		var _Addr;
		_Addr = AR1.getValue();
		var _iAddr = parseInt(_Addr,2);//RAM中的获取地址	
		if(this.LRW.value == true)//读RAM到DBUS上
		{
			_originalValue = DBUS.getValue();
			_nowValue = this.value[_iAddr];
			if(_nowValue != _originalValue)	//要更新DBUS中的值
			{
				DBUS.setValue(_nowValue);
			}
		}
		
		else if(this.LRW.value == false && T == 3)//读取DBUS值写入RAM
		{
			_originalValue = this.value[_iAddr];
			_nowValue = DBUS.getValue();
			if(_nowValue != _originalValue)
			{				
				this.value[_iAddr] = _nowValue;
			}
		}//读取DBUS值写入RAM
	}//左端口有效
	
	if(this.CER.value == true)			//右端口有效，从右端口读出
	{
		var _Addr;
		_Addr = AR2.getValue();
		var _iAddr = parseInt(_Addr,2);
		
		_originalValue = IR.getValue();
		_nowValue = this.value[_iAddr];
		
		if(_originalValue != _nowValue)
		{
			IR.running();
		}
	}
}

ram.prototype.getValue = function(addr)
{
	return this.value[addr];
}

ram.prototype.showRAM = function()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");var t = expBox_y+expBox_Height*0.21;
	if(DBUS.isON())
	{
		if(com[17] == -1 && (t2 == 1 || t3 == 1) && com[32] == 1)
		{
			//if(com[21].length == 1)com[21] = '0' + com[21];
    		var c=new Array(2);c=com[21].split('');
    		var a,b;a=parseInt(c[0],16);b=parseInt(c[1],16);
    		switch(c[0])
    		{
    			case 'A':{a=10;break;} case 'B':{a=11;break;} case 'C':{a=12;break;} case 'D':{a=13;break;} case 'E':{a=14;break;} case 'F':{a=15;break;}
    			case 'a':{a=10;break;} case 'b':{a=11;break;} case 'c':{a=12;break;} case 'd':{a=13;break;} case 'e':{a=14;break;} case 'f':{a=15;break;}
    		}
    		switch(c[1])
    		{
    			case 'A':{b=10;break;} case 'B':{b=11;break;} case 'C':{b=12;break;} case 'D':{b=13;break;} case 'E':{b=14;break;} case 'F':{b=15;break;}
    			case 'a':{a=10;break;} case 'b':{a=11;break;} case 'c':{a=12;break;} case 'd':{a=13;break;} case 'e':{a=14;break;} case 'f':{a=15;break;}
   			}
   			// context.fillText(com[20],expBox_x+expBox_long*0.6+(b+1.5)*cell_width,expBox_y+expBox_Height*0.36+(a+1)*cell_height);
   			com[20] = com[29];
   			RAM.ram1[b+1][a+1] = com[20];		
		}
	}
}
