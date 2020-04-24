
function createSwitch(){
	var _switch = [
	{"name" : "K0" , "value" : false, "y" : 29.5 , "x" : 2.5 , "w" : 0},
	{"name" : "K1" , "value" : false, "y" : 29.5 , "x" : 4.5 , "w" : 0},
	{"name" : "K2" , "value" : false, "y" : 29.5 , "x" : 6.5 , "w" : 0},
	{"name" : "K3" , "value" : false, "y" : 29.5 , "x" : 8.5 , "w" : 0},
	{"name" : "K4" , "value" : false, "y" : 29.5 , "x" : 10.5, "w" : 0},
	{"name" : "K5" , "value" : false, "y" : 29.5 , "x" : 12.5, "w" : 0},
	{"name" : "K6" , "value" : false, "y" : 29.5 , "x" : 14.5, "w" : 0},
	{"name" : "K7" , "value" : false, "y" : 29.5 , "x" : 16.5, "w" : 0},
	{"name" : "K8" , "value" : false, "y" : 29.5 , "x" : 18.5, "w" : 0},
	{"name" : "K9" , "value" : false, "y" : 29.5 , "x" : 20.5, "w" : 0},
	{"name" : "K10" , "value" : false, "y" : 29.5 , "x" : 22.5, "w" : 0},
	{"name" : "K11" , "value" : false, "y" : 29.5 , "x" : 24.5, "w" : 0},
	{"name" : "K12" , "value" : false, "y" : 29.5 , "x" : 26.5, "w" : 0},
	{"name" : "K13" , "value" : false, "y" : 29.5 , "x" : 28.5, "w" : 0},
	{"name" : "K14" , "value" : false, "y" : 29.5 , "x" : 30.5, "w" : 0},
	{"name" : "K15" , "value" : false, "y" : 29.5 , "x" : 32.5, "w" : 0},
	{"name" : "SW7" , "value" : false, "y" : 29.5 , "x" : 34.5, "w" : 128},
	{"name" : "SW6" , "value" : false, "y" : 29.5 , "x" : 36.5, "w" : 64},
	{"name" : "SW5" , "value" : false, "y" : 29.5 , "x" : 38.5, "w" : 32},
	{"name" : "SW4" , "value" : false, "y" : 29.5 , "x" : 40.5, "w" : 16},
	{"name" : "SW3" , "value" : false, "y" : 29.5 , "x" : 42.5, "w" : 8},
	{"name" : "SW2" , "value" : false, "y" : 29.5 , "x" : 44.5, "w" : 4},
	{"name" : "SW1" , "value" : false, "y" : 29.5 , "x" : 46.5, "w" : 2},
	{"name" : "SW0" , "value" : false, "y" : 29.5 , "x" : 48.5, "w" : 1},
	{"name" : "SWC" , "value" : false, "y" : 29.5 , "x" : 50.5, "w" : 0},
	{"name" : "SWB" , "value" : false, "y" : 29.5 , "x" : 52.5, "w" : 0},
	{"name" : "SWA" , "value" : false, "y" : 29.5 , "x" : 54.5, "w" : 0},
	{"name" : "DP" , "value" : false, "y" : 29.5 , "x" : 56.5, "w" : 0},
	{"name" : "DZ" , "value" : false, "y" : 29.5 , "x" : 58.5, "w" : 0},
	{"name" : "DB" , "value" : false, "y" : 29.5 , "x" : 60.5, "w" : 0},
	{"name" : "IR/DBUS" , "value" : false, "y" : 31.5 , "x" : 5.5, "w" : 0},
	{"name" : "AR1/AR2" , "value" : false, "y" : 33.5 , "x" : 5.5, "w" : 0}
	];
	return _switch;
}

function createMicSwitch()
{
	var _micSwitch = [
	{"name" : "QD" , "value" : false, "y" : 28 , "x" : 62.5 , "w" : 0},
	{"name" : "CLR#" , "value" : false, "y" : 28 , "x" : 64.5 , "w" : 0},
	{"name" : "INRT" , "value" : false, "y" : 28 , "x" : 66.5 , "w" : 0}
	
	];
	return _micSwitch;
}
function isswitch(mouseY,mouseX,type,id)//选中开关并显示端口
{
	var a_canvas = document.getElementById("canvasOne");
    var context = a_canvas.getContext("2d");
	if(mouseY > (expBox_y+Switch[0].y*perHeight) &&mouseY < (expBox_y+Switch[Switch.length-1].y*perHeight + perHeight*5/4))
	{
							
		for(var i = 0 ; i < Switch.length ;)
		{
			if(mouseY > (expBox_y+Switch[i].y*perHeight))												//大于当前未知范围的最小值
			{
				if(mouseY < (expBox_y+Switch[i].y*perHeight + perHeight*5/4))							//小于未知范围中最近的一个值的最大值
				{
					if(mouseX > (expBox_x+Switch[i].x * perWidth))										//大于当前未知范围的X最小
					{
						if(mouseX < (expBox_x+Switch[i].x*perWidth + perWidth))							//匹配
						{
							clearCanvas();canvasApp();if(flag==1)drawp();
							type = "Switch";id = i;
							for(var j=1; j<=Wire.length;j++)
							{
								if(Wire[j].theStartPoint.name==Switch[id].name||Wire[j].theEndPoint.name==Switch[id].name)
								{
									context.strokeStyle="black";
									context.lineWidth = 5;
									context.strokeRect(expBox_x+(Switch[id].x-1.2) * perWidth,expBox_y + (Switch[id].y-2.7)* perHeight + perWidth,perWidth*3.2,perHeight*0.9)
									context.fillStyle="white";
									context.fillRect(expBox_x+(Switch[id].x-1.2) * perWidth,expBox_y + (Switch[id].y-2.7) * perHeight + perWidth,perWidth*3.2,perHeight*0.9)
									context.fillStyle="black";context.font="12px Courier New";
									context.save();
									context.textAlign="center";//对齐
									if(Wire[j].theEndPoint.name==Switch[id].name)
										context.fillText(Wire[j].theStartPoint.name,expBox_x+(Switch[id].x+0.4) * perWidth,expBox_y + (Switch[id].y-2.5)* perHeight + perWidth);
									if(Wire[j].theStartPoint.name==Switch[id].name)
										context.fillText(Wire[j].theEndPoint.name,expBox_x+(Switch[id].x+0.4) * perWidth,expBox_y + (Switch[id].y-2.5)* perHeight + perWidth);
									context.restore();
								}							
							}						
							return;
						}
						else
						{
							i++;
						}
					}
					else														//小于当前未知范围的最小值
					{
						break;
					}
				}
				else															//小于当前未知范围的最小值
				{
					if(i < Switch.length - 2)
					{
						i = i + Switch.length - 2;								//下一行所在的位置
					}
					else
					{
						i++;
					}
				}   
			}
			else
			{
				break;
			}
		}
							
	}//选中开关

}
