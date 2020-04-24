function light(){
	var _light = [
	{"name" : "D7" , "value" : false , "x" : 10 , "y" : 31.5 , "color" : "maroon"},
	{"name" : "D6" , "value" : false , "x" : 13 , "y" : 31.5 , "color" : "maroon"},
	{"name" : "D5" , "value" : false , "x" : 16 , "y" : 31.5 , "color" : "maroon"},
	{"name" : "D4" , "value" : false , "x" : 19 , "y" : 31.5 , "color" : "maroon"},
	{"name" : "D3" , "value" : false , "x" : 22 , "y" : 31.5 , "color" : "maroon"},
	{"name" : "D2" , "value" : false , "x" : 25 , "y" : 31.5 , "color" : "maroon"},
	{"name" : "D1" , "value" : false , "x" : 28 , "y" : 31.5 , "color" : "maroon"},
	{"name" : "D0" , "value" : false , "x" : 31 , "y" : 31.5 , "color" : "maroon"},
	{"name" : "P3" , "value" : false , "x" : 35 , "y" : 31.5 , "color" : "darkgoldenrod"},
	{"name" : "P2" , "value" : false , "x" : 38 , "y" : 31.5 , "color" : "darkgoldenrod"},
	{"name" : "P1" , "value" : false , "x" : 41 , "y" : 31.5 , "color" : "darkgoldenrod"},
	{"name" : "P0" , "value" : false , "x" : 44 , "y" : 31.5 , "color" : "darkgoldenrod"},
	{"name" : "C" , "value" : false , "x" : 47 , "y" : 31.5 , "color" : "darkgoldenrod"},
	{"name" : "INTR" , "value" : false , "x" : 50 , "y" : 31.5 , "color" : "darkgoldenrod"},
	{"name" : "A7" , "value" : false , "x" : 10 , "y" : 33.5 , "color" : "seagreen"},
	{"name" : "A6" , "value" : false , "x" : 13 , "y" : 33.5 , "color" : "seagreen"},
	{"name" : "A5" , "value" : false , "x" : 16 , "y" : 33.5 , "color" : "seagreen"},
	{"name" : "A4" , "value" : false , "x" : 19 , "y" : 33.5 , "color" : "seagreen"},
	{"name" : "A3" , "value" : false , "x" : 22 , "y" : 33.5 , "color" : "seagreen"},
	{"name" : "A2" , "value" : false , "x" : 25 , "y" : 33.5 , "color" : "seagreen"},
	{"name" : "A1" , "value" : false , "x" : 28 , "y" : 33.5 , "color" : "seagreen"},
	{"name" : "A0" , "value" : false , "x" : 31 , "y" : 33.5 , "color" : "seagreen"},
	{"name" : "uA5" , "value" : false , "x" : 35 , "y" : 33.5 , "color" : "darkgoldenrod"},
	{"name" : "uA4" , "value" : false , "x" : 38 , "y" : 33.5 , "color" : "darkgoldenrod"},
	{"name" : "uA3" , "value" : false , "x" : 41 , "y" : 33.5 , "color" : "darkgoldenrod"},
	{"name" : "uA2" , "value" : false , "x" : 44 , "y" : 33.5 , "color" : "darkgoldenrod"},
	{"name" : "uA1" , "value" : false , "x" : 47 , "y" : 33.5 , "color" : "darkgoldenrod"},
	{"name" : "uA0" , "value" : false , "x" : 50 , "y" : 33.5 , "color" : "darkgoldenrod"}];
	
	return _light;
}

function createLight(){
	var _light = light();
	return _light;
}

function refreshLightg()		//更新灯保存的值
{
	
	var jj;
	if(Power.value == true)//电源接通	
	{
		//綠燈
		greenlight = parseInt(com[21],16).toString(2);
		greenlight = greenlight.split('');
		
		jj = greenlight.length - 1;
		for(var i = 7; i >= 0 ;i--)
		{
			if(jj != -1)
				aac[i] = greenlight[jj--];
		}
		
		greenlight = parseInt(com[22],16).toString(2);
		greenlight = greenlight.split('');
		
	 	jj = greenlight.length - 1;
		for(var i = 7; i >= 0 ;i--)
		{
			if(jj != -1)
				bbc[i] = greenlight[jj--];
		}
		for(var i = 0; i <= 7; i++)
		{
			if(Switch[31].value == true)
			{
				if(aac[i] == '1')
				{
					Light[i+14].value = true;
					
				}					
				else
					Light[i+14].value = false;
			}
			else
			{
				if(bbc[i] == '1')
					Light[i+14].value = true;
				else
					Light[i+14].value = false;
			}
		}
	}
	else
	{
		for(var i = 0; i  < Light.length; i++)
		{
			Light[i].value = false ;
		}
	}
}
function refreshLighty(num)
{
	km = parseInt(num,16).toString(2);
	km = km.split('');
	a = ['0','0','0','0','0','0'];
	 jj = km.length - 1;
	for(var i = 5; i >= 0 ;i--)
	{
		if(jj != -1)
			a[i] = km[jj--];
	}
	for(var i = 0; i <= 5 ; i++)
	{
		if(a[i] == '1')
			Light[i+22].value = true;
		else
			Light[i+22].value = false;
	}
}
function refreshLightp(num)
{
	for(var i = 8;i <= 13;i++)
	{
		Light[i].value = false;
	}
	switch(num)
	{
		case 0:Light[11].value = true;break;
		case 1:Light[10].value = true;break;
		case 2:Light[9].value = true;break;
		case 3:Light[8].value = true;break;
	}
}
function refreshLightr()
{
	if(Power.value == true)
	{
		if(Switch[30].value == false)
		{
			km2 = parseInt(com[29],16).toString(2);
		}
		else
		{
			km2 = parseInt(com[30],16).toString(2);
		}
		km2 = km2.split('');
		cc = ['0','0','0','0','0','0','0','0'];
		jj = km2.length - 1;
		for(var i = 7; i >= 0 ;i--)
		{
			if(jj != -1)
			cc[i] = km2[jj--];
		}
		for(var i = 0;i <= 7; i++)
		{
			if(cc[i] == '1')
				Light[i].value = true;
			else 
				Light[i].value = false;
		}			
	}
}

function refreshLight()
{
	refreshLightg();
	refreshLightr();
}
