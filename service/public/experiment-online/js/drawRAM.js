function drawRAM2()
{
	var a_canvas = document.getElementById("canvasOne");
    var context = a_canvas.getContext("2d");
    context.fillStyle = "#ffffaa";
	context.fillRect(expBox_x+expBox_long*0.6,expBox_y+expBox_Height*0.36,expBox_long*0.4,expBox_Height*0.32);//数据通路背景
    var cell_height = expBox_Height*0.32/17;
    var cell_width = expBox_long*0.4/17;
    context.lineWidth = 1;
    context.strokeStyle = "#a0a0a0";   
    context.beginPath();
    
    // 竖
    for (var col = 0; col <= 17; col++) 
    {
        var x = expBox_x+expBox_long*0.6+col * cell_width;
        context.moveTo(x,expBox_y+expBox_Height*0.36);
        context.lineTo(x,expBox_y+expBox_Height*0.68);
    }
    // 横
    for(var row = 0; row <= 17; row++)
    {
        var y = expBox_y+expBox_Height*0.36+row * cell_height;
        context.moveTo(expBox_x+expBox_long*0.6,y);
        context.lineTo(expBox_x+expBox_long, y);
    }
    context.stroke();
    var ramtext = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
    for(var i=0; i <ramtext.length; i++)
    {
    	context.font = "12px Courier New";
    	context.fillStyle="blue";
    	context.fillText(ramtext[i],expBox_x+expBox_long*0.6+cell_width*(i+1)+perWidth-0.5*perWidth,expBox_y+expBox_Height*0.36);
    }
    for(var i=0; i <ramtext.length; i++)
    {
    	context.font = "12px Courier New";
    	context.fillStyle="blue";
    	context.fillText(ramtext[i],expBox_x+expBox_long*0.6+perWidth-0.5*perWidth,expBox_y+expBox_Height*0.36+cell_height*(i+1));
    }
    if(isRamHideZero == 1)
    {
   	   for(var i = 1; i <= 16; i++)
  	   {
  			for(var j = 1; j <= 16; j++)
  			{
  				context.fillText(RAM.ram1[i][j],expBox_x+expBox_long*0.6+(i+0.5)*cell_width-0.5*perWidth,expBox_y+expBox_Height*0.36+(j)*cell_height);
  			}
  		}
   }
   else
   {
   		for(var i = 1; i <= 16; i++)
  	    {
  			for(var j = 1; j <= 16; j++)
  			{
  				if(RAM.ram1[i][j] != "00")
  					context.fillText(RAM.ram1[i][j],expBox_x+expBox_long*0.6+(i+0.5)*cell_width-0.5*perWidth,expBox_y+expBox_Height*0.36+(j)*cell_height);
  			}
  		}
   }
 
}

function drawRAM()
{
	drawRAM2();
	a_canvas1 = document.getElementById("canvasOne");
    var context = a_canvas1.getContext("2d");
    context.strokeRect(expBox_x+expBox_long*0.6, expBox_y+expBox_Height*0.32, perWidth*4.2, perHeight*1.5);
    context.textAlign="start";
    context.font ="16px Courier New";
    context.fillStyle = "black";
    context.fillText("RAM",expBox_x+expBox_long*0.6+perWidth*0.5,  expBox_y+expBox_Height*0.33-perHeight*0.1);
    context.font="10px Courier New";
    //context.fillText("隐藏",expBox_x+expBox_long*0.6+perWidth*2,  expBox_y+expBox_Height*0.33);
    context.strokeRect(expBox_x+expBox_long*0.6+perWidth*3,  expBox_y+expBox_Height*0.33, perWidth*0.8, perWidth*0.8);
    if(isRamHideZero == -1)
    {
    	context.strokeStyle = "black"
    	context.moveTo(expBox_x+expBox_long*0.6+perWidth*3,  expBox_y+expBox_Height*0.33 + perHeight * 0.4);
    	context.lineTo(expBox_x+expBox_long*0.6+perWidth*3 + perWidth * 0.3,  expBox_y+expBox_Height*0.33 + perHeight * 0.5);
    	context.lineTo(expBox_x+expBox_long*0.6+perWidth*3.8,  expBox_y+expBox_Height*0.33);
    	context.stroke();
    }
	var grid_cols = 40;
    var grid_rows = 40;
    var cell_height = expBox_Height*0.32/17;
    var cell_width = expBox_long*0.4/17;   
 
	a_canvas1.addEventListener("mousemove", eventMouseMove1, false);  
}
 function rem() 
 {
       	a_canvas1 = document.getElementById("canvasOne");
        a_canvas1.removeEventListener('mousemove', eventMouseMove1, false);      
}
function eventMouseMove1(e)
{
    drawRAM2();
    a_canvas1 = document.getElementById("canvasOne");
    var context = a_canvas1.getContext("2d");
    var load_x = expBox_long/6;
	var load_y = expBox_Height/8;
	var t = expBox_Height/15;
	var grid_cols = 40;
    var grid_rows = 40;
    var cell_height = expBox_Height*0.32/17;
    var cell_width = expBox_long*0.4/17;
       	var x, y;
		if(e.pageX || e.pageY)
		{//鼠标有移动
			x = e.pageX;
			y = e.pageY;
		}
		context.fillStyle="rgba(176,224,230,0.5)";
		if(y>=expBox_y+expBox_Height*0.36&&y<=expBox_y+expBox_Height*0.68&&x>=expBox_x+expBox_long*0.6&&x<=expBox_x+expBox_long)
		{
			for (var i = 0; i <= 17; i++) 
    		{
        		if(y>=expBox_y+expBox_Height*0.36+i*cell_height&&y<=expBox_y+expBox_Height*0.36+(i+1)*cell_height)
        			y=expBox_y+expBox_Height*0.36+i*cell_height;
    		}
			context.fillRect(expBox_x+expBox_long*0.6,y,expBox_long*0.4,cell_height);
			for(var i = 0;i <= 17;i++)
			{
				if(x>=expBox_x+expBox_long*0.6+i*cell_width&&x<=expBox_x+expBox_long*0.6+(i+1)*cell_width)
					x=expBox_x+expBox_long*0.6+i*cell_width;
			}
			context.fillRect(x,expBox_y+expBox_Height*0.36,cell_width,expBox_Height*0.32);
		}
    }