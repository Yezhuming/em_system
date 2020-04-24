function canvasApp()
{
	if(!canvasSupport())
	{
		return;
	}    
		    
	//获取DOM对象
	var theCanvas = document.getElementById("canvasOne");
	theCanvas.setAttribute("width",ourWidth);
	theCanvas.setAttribute("height",ourHight);
	//获取DOM对象的2D环境
	var context = theCanvas.getContext("2d");
	function drawBoard()									//画实验箱底板
	{
		context.fillStyle = "darkgreen";
		context.fillRect(expBox_x, expBox_y, expBox_long, expBox_Height);
					
	    //字体
	    context.textAlign = "end";
	    context.fillStyle = "#000000";
	    context.font = "20px Sans-Serif";
	    context.textBaseline = "top";
	  //  context.fillText("计算机组成原理课程虚拟实验系统", expBox_long + expBox_x , ourHight/48);
	    
	    context.textAlign = "end";
	    context.fillStyle = "#000000";
	    context.font = "15px Sans-Serif";
	    context.textBaseline = "top";
	  //  context.fillText("华南师范大学计算机学院", expBox_long + expBox_x, ourHight*3/48);
	}
	
	function drawPower()
	{
		var x = expBox_x + Power.x*perWidth;
		var y = expBox_y + Power.y*perHeight;
		if(Power.value == true)												//左红右白，显示ON	
		{			
			var gr = context.createLinearGradient(x,0,x+3*perWidth,0);
			gr.addColorStop(.5,"red");
			gr.addColorStop(.55,"white");
		
		}
		else																//左白右红，显示OFF
		{
			var gr = context.createLinearGradient(x,0,x+3*perWidth,0);
			gr.addColorStop(.5,"white");
			gr.addColorStop(.55,"red");
		}
		context.strokeStyle = "white";
		context.strokeWidth = 1;
		context.strokeRect(x, y, 3*perWidth, perHeight);
		context.fillStyle = gr;
		context.fillRect(x, y, 3*perWidth, perHeight);
		
		if(Power.value == true)
		{
			context.textAlign = "end";
	        context.fillStyle = "white";
	        context.font = "10px Sans-Serif";
	        context.textBaseline = "end";
	        context.fillText("ON", x+1.5*perWidth, y);
		}
		else
		{
			context.textAlign = "end";
	        context.fillStyle = "white";
	        context.font = "10px Sans-Serif";
	        context.textBaseline = "end";
	        context.fillText("OFF", x+3*perWidth, y);
		}	
	}
	
	//调用绘画函数
	drawBoard();
	drawPower();
	drawPort();
	drawLight();
	drawSwitch();
	drawFunctionButton();
	drawMicSwitch();
	drawWire();
}


function drawPort()																			//画插口
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	var x;
	var y;
	for(var i = 0; i < Port.length; i++)
	{
		x = expBox_x + Port[i].x * perWidth;
		y = expBox_y + Port[i].y * perHeight;
		
		context.beginPath();
		context.strokeStyle = "black";
		context.fillStyle = "wheat";
		context.lineWidth = 2;
		context.arc(x, y, perWidth/2,	((Math.PI/180)*0), (Math.PI/180)*360, false);
		context.fill();
		context.stroke();
		context.closePath();
		if(Power.value == true)
		{
			context.font = " small-caps bold 12px arial";
			if(i == 16)
			{
				if(Port[i].value == -1)
				{				
					context.fillStyle="red";
					context.fillText("H",x,y);			
				}
				else
				{
					context.fillStyle="green";
					context.fillText("L",x,y);
				}
			}
			else
			{
				if(Port[i].value == true)
				{				
					context.fillStyle="red";
					context.fillText("H",x,y);			
				}
				else
				{
					context.fillStyle="green";
					context.fillText("L",x,y);
				}
			}
					
		}
		//字
		context.textAlign = "center";
		context.fillStyle = "floralwhite";
		context.font = "10px Sans-Serif";
		context.textBaseline = "middle";
		if(se == Port[i].name)
		{
			context.fillStyle = "yellow";
		}
		context.fillText(Port[i].name, x, y+perHeight);
	}
}



function drawSwitch()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	
	//画开关，开关的宽 = perWidth , 开关的高 = perHeight*5/4
	for(var i = 0; i < Switch.length; i++)
	{
		x = expBox_x + Switch[i].x * perWidth;
		y = expBox_y + Switch[i].y * perHeight ;
		
		if(Switch[i].value == false)																//上白下黑
		{
			var gr = context.createLinearGradient(0,y,0,y+perHeight);
			gr.addColorStop(.5,"floralwhite");
			gr.addColorStop(.9,"black");
		}
		else																						//上黑下白
		{
			var gr = context.createLinearGradient(0,y,0,y+perHeight);
			gr.addColorStop(.4,"black");
			gr.addColorStop(.75,"floralwhite");
		}
		context.strokeStyle = "floralwhite";
		context.strokeRect(x, y, perWidth, perHeight);
		context.fillStyle = gr;		
		context.fillRect(x, y, perWidth, perHeight*5/4);
	}
	
	//文字
	for( var i = Switch.length - 2 ; i < Switch.length ; i++)
	{
		if(i == Switch.length - 2)
		{
			x = expBox_x + (Switch[i].x - 0.5) * perWidth;
			y = expBox_y + (Switch[i].y - 0.5) * perHeight;
			context.textAlign = "end";
			context.fillStyle = "floralwhite";
			context.font = "10px Sans-Serif";
			context.textBaseline = "top";
			context.fillText("IR", x, y);
			context.fillText("DBUS", x, y+perHeight);
		}
		else
		{
			x = expBox_x + (Switch[i].x - 0.5)* perWidth;
			y = expBox_y + (Switch[i].y - 0.5)*perHeight;
			context.textAlign = "end";
			context.fillStyle = "floralwhite";	
			context.font = "10px Sans-Serif";
			context.textBaseline = "top";
			context.fillText("AR1", x, y);
			context.fillText("AR2", x, y+perHeight);
		}
	}
}
			


function drawLight()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	var x;
	var y;
	
	for(var i = 0; i < Light.length ; i++)
	{
		x = expBox_x + Light[i].x * perWidth;
		y = expBox_y + Light[i].y * perHeight;	
		context.beginPath();
		context.strokeStyle = "darkgray";
		if(Light[i].value == true && (i <=7 && i >= 0))
			context.fillStyle ="red";
		else if(Light[i].value == true && (i <= 27 && i >= 22)) 
			context.fillStyle ="yellow";
		else if(Light[i].value == true && (i <= 21 && i >= 14)) 
			context.fillStyle = "greenyellow";
		else if(Light[i].value == true && (i <= 13 && i >= 8)) 
			context.fillStyle ="yellow";
		else context.fillStyle = Light[i].color;
		context.lineWidth = 1;
		context.arc(x, y, perWidth/2,	((Math.PI/180)*0), (Math.PI/180)*360, false);
		context.fill();
		context.stroke();
		context.closePath();
		
		//字
		context.textAlign = "center";
		context.fillStyle = "floralwhite";
		context.font = "10px Sans-Serif";
		context.textBaseline = "top";
		context.fillText(Light[i].name, x, y+perWidth/2);
	}
}

function clearCanvas()
{
	var thecanvas = document.getElementById("canvasOne");
	var w = thecanvas.width;
	var h = thecanvas.height;
	thecanvas.width = w;
	thecanvas.height = h;
}
function mm()
{
	var file = document.getElementById("file").files[0];  
    var reader = new FileReader();  
    reader.readAsText(file);  
    reader.onload = function(e)  
    {  
        var result = document.getElementById("result");  
        re = this.result;
        re = re.split('@');//re[0]:线   re[1]:RF  re[2]:RAM   re[3]:开关   re[4]:电源
      	rr1 = re[0].split('!'); 
      	var a = re[1].split('!');
      	com[34] = a[0];
      	com[35] = a[1];
      	com[36] = a[2];
      	com[37] = a[3];	
      	
      	var ramString = re[2].split('!');										//RAM
      	for(var i = 0; i <ramString.length; i++)
      	{
      		var g = ramString[i].split('#');
      		RAM.ram1[g[1]][g[0]] = g[2];
      	}
      	
      	var re3switch  = re[3].split('');										//开关
      	for(var i = 0; i < Switch.length; i++)
      	{
      		if(re3switch[i] == "1")
      		{	
      			Switch[i].value = true;
      		}     			
      	}
      	
      	if(re[4] == "1")														//电源
      		Power.value = true;
      	else
      		Power.value = false;
      	
		for (var i = 0;i < rr1.length/4; i++)
		{
			for(var j = 0;j < 4; j++)
				rr2[i][j] = rr1[i*4+j];
		}
    }  
	for(var i = 0; i < 103; i++)
	{
		for(var j=0; j<Port.length; j++)
		{
			if(rr2[i][0]==Port[j].x&&rr2[i][1]==Port[j].y)
				var startpoint = Port[j];
			if(rr2[i][2]==Port[j].x&&rr2[i][3]==Port[j].y)
				var endpoint = Port[j];
		}
		var _wire = new wirePro(startpoint,endpoint,"red");
		Wire[i+1] = _wire;
		Wire[i+1].wirePath =AStar(new node(Wire[i+1].theStartPoint.y-1,Wire[i+1].theStartPoint.x-1),
		new node(Wire[i+1].theEndPoint.y-1,Wire[i+1].theEndPoint.x-1));
	}
	Wire[0] = null;	
	clearCanvas();
	canvasApp();
}
function drawWire()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	if(Wire[0] != null || Wire[0] != undefined)										//未完成导线
	{
		context.strokeStyle = Wire[0].color;
		context.lineWidth = 3;
		context.lineCap = "square";
		context.beginPath();
		context.moveTo(expBox_x + Wire[0].theStartPoint.x * perWidth, expBox_y + Wire[0].theStartPoint.y * perHeight);
		context.lineTo(Wire[0].theEndPoint.pointX, Wire[0].theEndPoint.pointY);
		context.stroke();
		context.closePath();
	}

	for(var i = 1; i < Wire.length ; i++)											//完成的导线
	{
		if(Wire[i].isSelect == false)
		{
			if(Power.value == false)
			{
				for(var j = 0 ; j < Wire[i].wirePath.length-1; j++)						//0位不画
				{
					/*if(Wire[i].isNormal == false)
					{
						context.strokeStyle = "crimson";
						context.lineWidth = 10;
					}
					else*/
					{
						context.strokeStyle = Wire[i].color;
						context.lineWidth = 3;
					}
		    	
		    		context.lineCap = "square";
		    		context.beginPath();
		    		context.moveTo(expBox_x+(Wire[i].wirePath[j].Y+1)*perWidth, expBox_y+(Wire[i].wirePath[j].X+1)*perHeight);
		    		context.lineTo(expBox_x+(Wire[i].wirePath[j+1].Y+1)*perWidth, expBox_y+(Wire[i].wirePath[j+1].X+1)*perHeight);
					context.stroke();
					context.closePath();
		    	}//画一条导线结束
			}
			else
			{
				for(var j = 0 ; j < Wire[i].wirePath.length-1; j++)						//0位不画
				{
					context.strokeStyle = Wire[i].color;
					context.lineWidth = 3;	    	
		    		context.lineCap = "square";
		    		context.beginPath();
		    		if(j == 0 )
		    		{
		    			context.moveTo(expBox_x + (Wire[i].wirePath[j].Y + 1) * perWidth,   expBox_y + (Wire[i].wirePath[j].X+0.5 ) * perHeight);
		    			context.lineTo(expBox_x + (Wire[i].wirePath[j+1].Y + 1) * perWidth, expBox_y + (Wire[i].wirePath[j + 1].X+1) * perHeight);
		    		}
		    		else if(j == Wire[i].wirePath.length - 2)
		    		{
		    			context.moveTo(expBox_x + (Wire[i].wirePath[j].Y + 1) * perWidth,   expBox_y + (Wire[i].wirePath[j].X+1) * perHeight);
		    			context.lineTo(expBox_x + (Wire[i].wirePath[j+1].Y + 1) * perWidth, expBox_y + (Wire[i].wirePath[j + 1].X+0.5) * perHeight);
		    		}
		    		else 
		    		{
		    			context.moveTo(expBox_x + (Wire[i].wirePath[j].Y + 1) * perWidth,   expBox_y + (Wire[i].wirePath[j].X + 1) * perHeight);
		    			context.lineTo(expBox_x + (Wire[i].wirePath[j+1].Y+1) * perWidth,   expBox_y + (Wire[i].wirePath[j + 1].X + 1) * perHeight);
		    		}		    		
					context.stroke();
					context.closePath();
		    	}//画一条导线结束
		    }
		}
		else
		{
			
			//被选中的导线最后才画
		}
	}//所有导线画完
	
	
	
	if(selectWire != -1 )
	{
		for(var j = 0; j < Wire[selectWire].wirePath.length-1; j ++)
		{
			if(Power.value == false)
			{
				if(isOverlap != -1)
				{
					for(var n = 1; n < Wire.length; n++)
					{
						if(Wire[n].theEndPoint.name == isOverlap || Wire[n].theStartPoint.name == isOverlap )
						{	
		   					for(var m = 0; m < Wire[n].wirePath.length-1; m++)
		   					{
		   						if(Wire[n].wirePath[m].Y == Wire[n].wirePath[m+1].Y )
								{
						 			gr=context.createLinearGradient(expBox_x+(Wire[n].wirePath[m].Y+1)*perWidth-2,
																	expBox_y+(Wire[n].wirePath[m].X+1)*perHeight,
																	expBox_x+(Wire[n].wirePath[m].Y+1)*perWidth+2,
																	expBox_y+(Wire[n].wirePath[m].X+1)*perHeight);
								}
								else
								{
						 			gr = context.createLinearGradient(expBox_x+(Wire[n].wirePath[m].Y+1)*perWidth, 
																	expBox_y+(Wire[n].wirePath[m].X+1)*perHeight-2,
																	expBox_x+(Wire[n].wirePath[m].Y+1)*perWidth,
																	expBox_y+(Wire[n].wirePath[m].X+1)*perHeight+2);
								}
								context.lineCap = "square";
								var gr;
                				context.lineWidth = 7;
		   						context.beginPath();
                				gr.addColorStop(0,"white");
								gr.addColorStop(0.5, Wire[n].color);
								gr.addColorStop(1,"white"); 
                				context.strokeStyle = gr;  
		   						context.moveTo(expBox_x+(Wire[n].wirePath[m].Y+1)*perWidth, expBox_y+(Wire[n].wirePath[m].X+1)*perHeight);
		    					context.lineTo(expBox_x+(Wire[n].wirePath[m+1].Y+1)*perWidth, expBox_y+(Wire[n].wirePath[m+1].X+1)*perHeight);
		    					context.stroke();
		    					context.closePath();
		   					}		
						}
					}
				}
				else
				{
					//context.strokeStyle =  Wire[selectWire].color;
					var gr;
					if(Wire[selectWire].wirePath[j].Y == Wire[selectWire].wirePath[j+1].Y )
					{
						 gr=context.createLinearGradient(expBox_x+(Wire[selectWire].wirePath[j].Y+1)*perWidth-2,
															expBox_y+(Wire[selectWire].wirePath[j].X+1)*perHeight,
															expBox_x+(Wire[selectWire].wirePath[j].Y+1)*perWidth+2,
															expBox_y+(Wire[selectWire].wirePath[j].X+1)*perHeight);
					}
					else
					{
						 gr = context.createLinearGradient(expBox_x+(Wire[selectWire].wirePath[j].Y+1)*perWidth, 
														expBox_y+(Wire[selectWire].wirePath[j].X+1)*perHeight-2,
														expBox_x+(Wire[selectWire].wirePath[j].Y+1)*perWidth,
														expBox_y+(Wire[selectWire].wirePath[j].X+1)*perHeight+2);
					}
					
                	gr.addColorStop(0,"white");
					gr.addColorStop(0.5,Wire[selectWire].color);
					gr.addColorStop(1,"white"); 
                	context.strokeStyle = gr; 
					context.lineWidth = 7;
					context.lineCap = "square";
		   			context.beginPath();
		    		context.moveTo(expBox_x+(Wire[selectWire].wirePath[j].Y+1)*perWidth, expBox_y+(Wire[selectWire].wirePath[j].X+1)*perHeight);
		    		context.lineTo(expBox_x+(Wire[selectWire].wirePath[j+1].Y+1)*perWidth, expBox_y+(Wire[selectWire].wirePath[j+1].X+1)*perHeight);
		    		context.stroke();
		    		context.closePath();
				}
				
			}
			else
			{
				context.strokeStyle = Wire[selectWire].color;
				context.lineWidth = 3;
				context.lineCap = "square";
		    	context.beginPath();
		    	if(j == 0 )
		    	{
		    		context.moveTo(expBox_x + (Wire[selectWire].wirePath[j].Y + 1) * perWidth,   expBox_y + (Wire[selectWire].wirePath[j].X+0.5 ) * perHeight);
		    		context.lineTo(expBox_x + (Wire[selectWire].wirePath[j+1].Y + 1) * perWidth, expBox_y + (Wire[selectWire].wirePath[j + 1].X+1) * perHeight);
		    	}
		    	else if(j == Wire[selectWire].wirePath.length - 2)
		    	{
		    		context.moveTo(expBox_x + (Wire[selectWire].wirePath[j].Y + 1) * perWidth,   expBox_y + (Wire[selectWire].wirePath[j].X+1) * perHeight);
		    		context.lineTo(expBox_x + (Wire[selectWire].wirePath[j+1].Y + 1) * perWidth, expBox_y + (Wire[selectWire].wirePath[j + 1].X+0.5) * perHeight);
		    	}
		    	else 
		    	{
		    		context.moveTo(expBox_x + (Wire[selectWire].wirePath[j].Y + 1) * perWidth,   expBox_y + (Wire[selectWire].wirePath[j].X + 1) * perHeight);
		    		context.lineTo(expBox_x + (Wire[selectWire].wirePath[j+1].Y+1) * perWidth,   expBox_y + (Wire[selectWire].wirePath[j + 1].X + 1) * perHeight);
		    	}
		    	context.stroke();
		    	context.closePath();
			}
		    
		}
	}
}//drawWire()


function drawFunctionButton()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	for(var i = 0 ;i < Button.length ;i++)
	{
		var x = expBox_x + Button[i].x*perWidth;
		var y = expBox_y + Button[i].y*perHeight;
		context.strokeStyle = "black"
		context.lineWidth = 3;
		context.strokeRect(x,y,3*perWidth,perHeight)
		context.fillStyle = "white";
		context.fillRect(x,y,3*perWidth,perHeight);
		
		context.textAlign = "center";
	    context.fillStyle = "darkmagenta";
	    context.font = "15px Sans-Serif";
	    context.textBaseline = "top";
	    if(i == 4 || i == 5)
	    	context.font = "12px Sans-Serif";
	    context.fillText(Button[i].name, x+1.5*perWidth , y);
	}
}

function drawMicSwitch()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	for(var i = 0 ;i < micSwitch.length ;i++)
	{
		var x = expBox_x + micSwitch[i].x*perWidth;
		var y = expBox_y + micSwitch[i].y*perHeight;
		context.strokeStyle = "black"
		context.lineWidth = 3;
		context.strokeRect(x,y,1.2*perWidth,2.6*perHeight)
		context.fillStyle = "black";
		context.fillRect(x,y,1.2*perWidth,2.6*perHeight);
		
		//小灰色矩形
		context.fillStyle = "gray";
		context.fillRect(x+0.1*perWidth,y+0.3*perHeight,1*perWidth,0.3*perHeight);
		
		context.textAlign = "start";
	    context.fillStyle = "white";
	    context.font = "11px Sans-Serif";
	    context.textBaseline = "top";
	    context.fillText(micSwitch[i].name, x , y-perHeight*0.8);
	}
}


