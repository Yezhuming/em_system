function ibus()
{
	
}

function createIBUS()
{
	var _IBUS = new ibus();
	return _IBUS;
}

ibus.prototype.showIBUS = function()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	var t = expBox_y+expBox_Height*0.21;
	if(com[7] == -1)
	{
		var c = new Array(2);
		c = com[22].split('');
    	var a,b;
    	a = parseInt(c[0],16);
    	b = parseInt(c[1],16);
    	switch(c[0])
    	{
    		case 'A':{a=10;break;} case 'B':{a=11;break;} case 'C':{a=12;break;} 
    		case 'D':{a=13;break;} case 'E':{a=14;break;} case 'F':{a=15;break;}
    		case 'a':{a=10;break;} case 'b':{a=11;break;} case 'c':{a=12;break;} 
    		case 'd':{a=13;break;} case 'e':{a=14;break;} case 'f':{a=15;break;}
    	}
    	switch(c[1])
    	{
    		case 'A':{b=10;break;} case 'B':{b=11;break;} case 'C':{b=12;break;} 
    		case 'D':{b=13;break;} case 'E':{b=14;break;} case 'F':{b=15;break;}
    		case 'a':{a=10;break;} case 'b':{a=11;break;} case 'c':{a=12;break;} 
    		case 'd':{a=13;break;} case 'e':{a=14;break;} case 'f':{a=15;break;}
   		}
    	com[30] = RAM.ram1[b+1][a+1];		
	}
	com[30] = com[30].toString(16);
	if(com[30].length == 1)
		com[30] = '0' + com[30];
	context.fillText(com[30],expBox_x+perWidth*37.3,t+perHeight*8);
	
}
