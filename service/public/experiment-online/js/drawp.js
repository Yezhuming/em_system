function drawp()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	context.fillStyle = "#ffffaa";
	context.fillRect(expBox_x,expBox_y,expBox_long,expBox_Height*0.68);							//微程序背景
	
	var rect = createRect();
	var srect =  createsRect();
	var lrect = createlRect();
	var zrect =  createzRect();
	var sline = createsline();
	var stext = createstext();
	var trect = createtRect();
	
	for(var i = 0 ;i < rect.length ;i++)							//正常方形
	{
		var x = expBox_x + rect[i].x*perWidth;
		var y = expBox_y + rect[i].y*perHeight;
		
		if(rectflag[i] == 0)
		{
			context.lineWidth = 2;
			context.strokeStyle = "dimgrey";
		}
		else
		{
			context.lineWidth = 4;
			context.strokeStyle = "red";
		}
			
		context.strokeRect(x,y,3.5*perWidth,2*perHeight)
		context.fillStyle = "white";
		context.fillRect(x,y,3.5*perWidth,2*perHeight);
		context.fillStyle = "black";
		drawtext(rect[i].name,x,y);
	}
	
	for(var i = 0 ;i < srect.length ;i++)							//小方形
	{
		var x = expBox_x + srect[i].x*perWidth;
		var y = expBox_y + srect[i].y*perHeight;
		
		
		if(srectflag[i] == 0)
		{
			context.lineWidth = 2;
			context.strokeStyle = "dimgrey";
		}
		else
		{
			context.lineWidth = 4;
			context.strokeStyle = "red";
		}
			
		context.strokeRect(x,y,3.5*perWidth,perHeight*0.6)
		context.fillStyle = "white";
		context.fillRect(x,y,3.5*perWidth,perHeight*0.6);
		context.fillStyle="black";
		context.font = "12px Courier New";
		context.textAlign="start";	
		context.fillText(srect[i].name,x,y);
	}
	
	for(var i = 0 ;i < lrect.length ;i++)						//大方型
	{
		var x = expBox_x + lrect[i].x*perWidth;
		var y = expBox_y + lrect[i].y*perHeight;
		
		
		if(lrectflag[i] == 0)
		{
			context.lineWidth = 2;
			context.strokeStyle = "dimgrey";
		}
		else
		{
			context.lineWidth = 4;
			context.strokeStyle = "red";
		}
			
		context.strokeRect(x,y,3.5*perWidth,2.8*perHeight)
		context.fillStyle = "white";
		context.fillRect(x,y,3.5*perWidth,2.8*perHeight);
		context.fillStyle="black";
		drawtext(lrect[i].name,x,y);
	}	
	
	for(var i = 0 ;i < zrect.length ;i++)					//中方形
	{
		var x = expBox_x + zrect[i].x*perWidth;
		var y = expBox_y + zrect[i].y*perHeight;
		if(zrectflag[i] == 0)
		{
			context.lineWidth = 2;
			context.strokeStyle = "dimgrey";
		}
		else
		{
			context.lineWidth = 4;
			context.strokeStyle = "red";
		}
		context.strokeRect(x,y,3.5*perWidth,perHeight*1.35)
		context.fillStyle = "white";
		context.fillRect(x,y,3.5*perWidth,perHeight*1.35);
		context.fillStyle="black";
		//context.font = "6px Courier New";
		drawtext(zrect[i].name,x,y);
	}
	
	for(var i = 0 ;i < trect.length ;i++)                  //小小正方形
	{
		var x = expBox_x + trect[i].x*perWidth;
		var y = expBox_y + trect[i].y*perHeight;
		context.strokeStyle = "dimgrey";
		context.lineWidth = 1;
		context.strokeRect(x,y,perWidth,0.5*perHeight)
		context.fillStyle = "white";
		context.fillRect(x,y,perWidth,0.5*perHeight);
		context.fillStyle="black";
		context.font = "12px Courier New";
		context.textAlign="start";	
		context.fillText(trect[i].name,x,y-perWidth*0.15);
	}
	
	for(var i=0 ;i<sline.length; i++)
	{
		context.fillStyle = "black";
		context.moveTo(expBox_x+sline[i].x1*perWidth,expBox_y+sline[i].y1*perHeight);
		context.lineTo(expBox_x+sline[i].x2*perWidth,expBox_y+sline[i].y2*perHeight);	
		context.stroke();
	}
	context.font = "12px Courier New";																//菱形
	context.strokeStyle = "black";
	context.fillText("P2",expBox_x+24.6*perWidth,expBox_y+perHeight*0.1);
	context.fillText("P0",expBox_x+26.3*perWidth,expBox_y+perHeight*2.65);
	context.fillText("P1",expBox_x+42.5*perWidth,expBox_y+perHeight*7.35);
	context.fillText("P3",expBox_x+71*perWidth,expBox_y+perHeight*6.15);
	drawdiamond(expBox_x + 25 * perWidth, expBox_y, diamondRedOrBlack[2]);
	drawdiamond(expBox_x + 26.75 * perWidth, expBox_y + perHeight * 2.5,diamondRedOrBlack[0]);
	drawdiamond(expBox_x + 43 * perWidth,expBox_y + perHeight * 7.2, diamondRedOrBlack[1]);
	drawdiamond(expBox_x + 71.4 * perWidth,expBox_y + perHeight * 6,diamondRedOrBlack[3]);
	diamondRedOrBlack = [1,1,1,1];
	
	context.lineJoin = "round";  																	//圆角
	context.lineWidth = 5;   
	context.strokeStyle="black";
	context.strokeRect(expBox_x+69.5*perWidth,expBox_y+perHeight*0.9, 4*perWidth, perHeight); 
	context.fillStyle="black";
	context.font = "18px Courier New";
	context.fillText("kt",expBox_x+71.5*perWidth,expBox_y+perHeight*0.8);
	
	for(var i=0; i<stext.length;i++)																//蓝字
	{
		context.fillStyle="blue";
		context.textAlign="center";
		context.font = "12px Courier New";
		context.fillText(stext[i].name,expBox_x + stext[i].x*perWidth,expBox_y + stext[i].y*perHeight);	
	}
	drawload();
	drawRAM();
}
function drawdiamond(x,y,i)
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	context.beginPath();
	if(i == 1)
		context.strokeStyle = "black";
	if(i == 0)
	{
		context.strokeStyle = "red";
	}
		
	context.moveTo(x,y);
	context.lineTo(x-perWidth,y+perHeight*0.45);
	context.lineTo(x,y+perHeight*0.9);
	context.lineTo(x+perWidth,y+perHeight*0.45);
	context.lineTo(x,y);
	
	context.stroke();

}
function drawtext(text,x,y)
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	var row= text.split("!");
	context.font = "12px Courier New";
	context.save();
	context.textAlign="start";						//对齐
	for(var i = 0;i < row.length; i++)
	{
		if(row[i] == "TJ")
			context.fillStyle = "red";
		else
			context.fillStyle = "black";
		context.fillText(row[i],x,y+i*perHeight*0.6);
	}
	context.restore();
}
function createtRect()						//小小正方形
{
	var trect = [
	//小方形
	{"name":"19", "x" : 27.5 , "y" : 1.5},
	{"name":"1B","x" : 31.5 , "y" : 1.5 },
	{"name":"1C","x" : 35.5 , "y" : 1.5 },
	{"name":"16","x" : 39.5 , "y" : 1.5},
	{"name":"0F","x" : 37.5, "y" : 7.43},
	{"name":"34","x" : 11.5 , "y" : 6.36},
	{"name":"00","x" : 72 , "y" : 3.05},
	//正常方形
	{"name":"10","x" : 3.5 , "y" : 3},
	{"name":"11","x" : 7.5 , "y" : 3 },
	{"name":"12","x" : 11.5 , "y" : 3 },
	{"name":"13","x" : 15.5 , "y" : 3},
	{"name":"15","x" : 19.5 , "y" : 3 },

	{"name":"3B","x" : 3.5 , "y" : 5.3},
	{"name":"3A","x" : 7.5 , "y" : 5.3},
	{"name":"39","x" : 11.5 , "y" : 5.3},
	{"name":"38","x" : 15.5 , "y" : 5.3},
	{"name":"36","x" : 19.5, "y" : 5.3},
	
	
	
	{"name":"18","x" : 43.5 , "y" : 2.95},
	{"name":"1A","x" : 47.5 , "y" : 2.95 },
	{"name":"25","x" : 43.5 , "y" : 6.3},
	{"name":"26","x" : 47.5 , "y" : 6.3},
	
	{"name":"07","x" : 64.5 , "y" :1.5 },
	{"name":"3F","x" : 60.5 , "y" : 4 },
	{"name":"17","x" : 64.5 , "y" : 4},
	{"name":"3D","x" : 60.5 , "y" : 6.7},
	{"name":"27","x" : 64.5 , "y" : 6.7 },
	
	{"name":"33","x" : 60.5 , "y" : 10.2},
	{"name":"46","x" : 60.5 , "y" : 13.4 },
	
	//大方形
	{"name":"14","x" : 23.5 , "y" : 3.8},
	{"name":"35","x" : 23.5 , "y" : 6.9},
	{"name":"05","x" : 51.5 , "y" : 2.3 },
	{"name":"37","x" : 64.5 , "y" : 10.2 },
	{"name":"47","x" : 64.5 , "y" : 13.4 },
	{"name":"1F","x" : 27.5 , "y" : 6.9},
	
	//中方形
	{"name":"3E","x" : 56.5 , "y" : 4},
	{"name":"3C","x" : 56.5 , "y" : 6.7 },
	{"name":"32","x" : 56.5 , "y" : 10.2 },
	{"name":"45","x" : 56.5 , "y" : 13.4 },
	{"name":"31","x" : 52.5 , "y" : 10.2},
	{"name":"30","x" : 48.5 , "y" : 10.2},
	{"name":"44","x" : 52.5 , "y" : 13.4 },
	];	

	return trect;
}
function createstext()												//蓝字
{
	var stext=[
	{"name":"ADD","x" : 3 , "y" : 0.4},
	{"name":"SJB","x" : 7 , "y" : 0.4},
	{"name":"MUL","x" : 11 , "y" : 0.4},
	{"name":"AND","x" : 15 , "y" : 0.4},
	{"name":"LDA","x" : 19 , "y" : 0.4},
	{"name":"STA","x" : 23 , "y" : 0.4},
	{"name":"JC","x" : 27, "y" : 0.4},
	{"name":"INTS","x" : 31 , "y" : 0.4},
	{"name":"INTC","x" : 35 , "y" : 0.4},
	{"name":"STP","x" : 39, "y" : 0.4},
	{"name":"JMP","x" : 43 , "y" : 0.4},
	{"name":"IRET","x" : 47 , "y" : 0.4},
	{"name":"QE","x" : 875 , "y" : 70},
	{"name":"C=0","x" : 558, "y" : 62},
	{"name":"C=1","x" : 520, "y" : 94},
	{"name":"WD","x" : 285, "y" : 170},
	{"name":"INTQ=1","x" : 795, "y" : 157},
	{"name":"INTQ=0","x" : 807, "y" : 182},
	
	{"name":"PR","x" :66.8 , "y" :0.5},{"name":"000","x" : 66.8, "y" :1.2 },
	{"name":"KRD","x" : 67, "y" : 3.2},{"name":"001","x" :67 , "y" :3.9 },
	{"name":"KWE","x" :67 , "y" : 6},{"name":"010","x" : 67, "y" :6.7 },
	{"name":"KLD","x" :67 , "y" : 9.5},{"name":"011","x" :67 , "y" : 10.2},
	{"name":"KRR","x" :67 , "y" : 12.7},{"name":"100","x" : 67, "y" :13.4 },

	];	
	return stext;
}

function createsline()
{
	var sline = [
	{"x1" : 25 , "y1" : 0.9 ,"x2" : 25 ,"y2" : 1.2},					//p2下面的竖
	
	{"x1" : 2.75 , "y1" : 1.2 ,"x2" : 2.75 ,"y2" : 1.5},				//上竖
	{"x1" : 6.75 , "y1" : 1.2 ,"x2" : 6.75 ,"y2" :1.5},
	{"x1" : 10.75 , "y1" : 1.2 ,"x2" : 10.75 ,"y2" : 1.5},
	{"x1" : 14.75 , "y1" : 1.2,"x2" : 14.75 ,"y2" : 1.5},
	{"x1" : 18.75 , "y1" : 1.2 ,"x2" : 18.75 ,"y2" : 1.5},
	
	{"x1" : 22.75 , "y1" : 1.2 ,"x2" : 22.75 ,"y2" : 1.5},				//上竖
	{"x1" : 26.75 , "y1" : 1.2 ,"x2" : 26.75 ,"y2" : 1.5},
	{"x1" : 30.75 , "y1" : 1.2 ,"x2" : 30.75 ,"y2" : 1.5},
	{"x1" : 34.75 , "y1" : 1.2 ,"x2" : 34.75 ,"y2" : 1.5},
	{"x1" : 38.75 , "y1" : 1.2 ,"x2" : 38.75 ,"y2" : 1.5},
	{"x1" : 42.75 , "y1" : 1.2 ,"x2" : 42.75 ,"y2" : 1.5},
	{"x1" : 46.75 , "y1" : 1.2 ,"x2" : 46.75 ,"y2" : 1.5},
	
	
	{"x1" : 2.5 , "y1" : 1.2 ,"x2" : 46.75 ,"y2" : 1.2},				//横
	
	{"x1" : 2.75 , "y1" : 3.5 ,"x2" : 2.75 ,"y2" : 3.8},				//中竖
	{"x1" : 6.75 , "y1" : 3.5 ,"x2" : 6.75 ,"y2" : 3.8},
	{"x1" : 10.75 , "y1" : 3.5 ,"x2" : 10.75 ,"y2" : 3.8},
	{"x1" : 14.75 , "y1" : 3.5 ,"x2" : 14.75 ,"y2" : 3.8},
	{"x1" : 18.75 , "y1" : 3.5 ,"x2" : 18.75 ,"y2" : 3.8},
	{"x1" : 22.75 , "y1" : 4.3 ,"x2" : 22.75 ,"y2" : 4.6},				//14和35之间竖
	{"x1" : 22.75 , "y1" : 7.4 ,"x2" : 22.75 ,"y2" : 7.7},				//35下竖
	
	{"x1" : 180 , "y1" : 160 ,"x2" : 270 ,"y2" : 160},					//横
	{"x1" : 322 , "y1" : 160 ,"x2" : 420 ,"y2" : 160},
	
	{"x1" :2.75  , "y1" : 5.8 ,"x2" : 2.75  ,"y2" :6.6 },				//下竖
	{"x1" : 6.75  , "y1" :  5.8,"x2" : 6.75  ,"y2" :6.6 },
	{"x1" :  10.75 , "y1" : 5.8 ,"x2" : 10.75  ,"y2" : 6.2},
	{"x1" : 14.75  , "y1" : 5.8 ,"x2" :  14.75 ,"y2" :6.6 },
	{"x1" :  18.75 , "y1" : 5.8 ,"x2" : 18.75 ,"y2" : 6.6},
	
	
	{"x1" : 2.75 , "y1" : 6.6 ,"x2" : 9 ,"y2" : 6.6},					//WDF左右两横
	{"x1" : 12.5 , "y1" : 6.6 ,"x2" : 18.75 ,"y2" : 6.6},
	
	{"x1" : 10.75 , "y1" : 6.9 ,"x2" : 10.75 ,"y2" : 7.65},				//WDF下竖
	{"x1" : 10.75 , "y1" : 7.65 ,"x2" : 35 ,"y2" : 7.65},				//LDAR2左横
	{"x1" : 38.5 , "y1" : 7.65 ,"x2" : 42 ,"y2" : 7.65},				//LDAR2右横
	
	{"x1" : 26.75 , "y1" : 2.1 ,"x2" : 26.75 ,"y2" : 2.55},				//JC到P0竖
	{"x1" : 26.75 , "y1" : 3.4 ,"x2" : 26.75 ,"y2" : 4.5},				//P0到1F
	{"x1" : 26.75 , "y1" : 7.4 ,"x2" : 26.75 ,"y2" : 7.65},				//1F下竖
	{"x1" : 30.75 , "y1" : 2.1 ,"x2" : 30.75 ,"y2" : 7.65},				//INTS到LDAR2左横
	{"x1" : 30.75 , "y1" : 4 ,"x2" : 46.75 ,"y2" : 4},					//18，25之间横
	{"x1" : 34.75 , "y1" : 2.1 ,"x2" : 34.75 ,"y2" : 4},				//INIC到18，25之间横
	{"x1" : 38.75 , "y1" : 2.1 ,"x2" : 38.75 ,"y2" : 4},				//TJ18，25之间横
	{"x1" : 42.75 , "y1" : 3.5 ,"x2" : 42.75 ,"y2" : 4},				//JMP到18，25之间横
	{"x1" : 46.75 , "y1" : 3.5 ,"x2" : 46.75 ,"y2" : 4},				//IRET到18，25之间横
	{"x1" : 50.75 , "y1" : 2.8 ,"x2" : 50.75 ,"y2" : 7.65},				//05下竖
	{"x1" : 44 , "y1" : 7.65 ,"x2" : 50.75 ,"y2" : 7.65},				//P1右横
	{"x1" : 43 , "y1" : 6.8,"x2" : 43 ,"y2" : 7.2},						//25到P1
	{"x1" : 48.5 , "y1" : 5.8 ,"x2" : 50.75 ,"y2" : 5.8},				//06到25下竖
	{"x1" : 44.5 , "y1" : 5.8 ,"x2" : 44.9 ,"y2" : 5.8},				//25到26
	{"x1" : 26 , "y1" : 0.4 ,"x2" : 49 ,"y2" : 0.4},					//P2到05横
	
	/*****************************右*****************************/
	{"x1" :52.5 , "y1" : 1.2 ,"x2" : 62 ,"y2" : 1.2},					//05到07横
	
	{"x1" : 66, "y1" : 1.2 ,"x2" : 66 ,"y2" : 13.5},					//07到47竖
	
	{"x1" : 65.5 , "y1" : 1.2 ,"x2" : 66 ,"y2" : 1.2},					//07到  （07到47横）
	
	{"x1" : 53.9 , "y1" : 3.7 ,"x2" : 53.4 ,"y2" : 3.7},				//3E到3F左
	{"x1" : 53.4 , "y1" : 3.7 ,"x2" : 53.4 ,"y2" : 2.8},
	{"x1" : 53.4 , "y1" : 2.8,"x2" : 57.9 ,"y2" : 2.8},
	{"x1" : 57.5 , "y1" : 3.7 ,"x2" : 57.9 ,"y2" : 3.7},				//3E到3F
	{"x1" : 61.5 , "y1" : 3.7 ,"x2" : 61.9 ,"y2" : 3.7},				//3F到17
	{"x1" : 65.5 , "y1" : 3.7 ,"x2" : 65.9 ,"y2" : 3.7},				//17到（07到47横）
	
	{"x1" : 53.9 , "y1" : 6.5 ,"x2" : 53.4 ,"y2" : 6.5},				//3C到3D左
	{"x1" : 53.4 , "y1" : 6.5 ,"x2" : 53.4 ,"y2" : 5.6},
	{"x1" : 53.4 , "y1" : 5.6 ,"x2" : 57.9 ,"y2" : 5.6},
	{"x1" : 57.5 , "y1" : 6.5 ,"x2" : 57.9 ,"y2" : 6.5},				//3C到3D
	{"x1" : 61.5 , "y1" : 6.5 ,"x2" : 61.9 ,"y2" : 6.5},				//3D到27
	{"x1" : 65.5 , "y1" : 6.5 ,"x2" : 65.9 ,"y2" : 6.5},				//27到（07到47横）
	
	{"x1" : 45.9 , "y1" : 10 ,"x2" : 45.4 ,"y2" : 10},					//30到31左
	{"x1" : 45.4 , "y1" : 10 ,"x2" : 45.4 ,"y2" : 9.1},					
	{"x1" : 45.4 , "y1" : 9.1 ,"x2" : 57.9 ,"y2" : 9.1},
	{"x1" : 49.5 , "y1" : 10 ,"x2" : 49.9 ,"y2" : 10},					//30到31
	{"x1" : 53.5 , "y1" : 10 ,"x2" : 53.9 ,"y2" : 10},					//31到32
	{"x1" : 57.5 , "y1" : 10 ,"x2" : 57.9 ,"y2" : 10},					//32到33
	{"x1" : 61.5 , "y1" : 10 ,"x2" : 61.9 ,"y2" : 10},					//33到37
	{"x1" : 65.5 , "y1" : 10 ,"x2" : 65.9 ,"y2" : 10},					//37到（07到47横）

	{"x1" : 49.9 , "y1" : 13.4 ,"x2" : 49.4 ,"y2" : 13.4},				//44到45左
	{"x1" : 49.4 , "y1" : 13.4 ,"x2" : 49.4,"y2" : 12.4},				
	{"x1" : 49.4 , "y1" : 12.4 ,"x2" : 57.9 ,"y2" : 12.4},				
	{"x1" : 53.5 , "y1" : 13.4 ,"x2" : 53.9 ,"y2" : 13.4},				//44到45
	{"x1" : 57.5 , "y1" : 13.4 ,"x2" : 57.9 ,"y2" : 13.4},				//45到33
	{"x1" : 61.5 , "y1" : 13.4 ,"x2" : 61.9 ,"y2" : 13.4},				//33到37
	{"x1" : 65.5 , "y1" : 13.4 ,"x2" : 65.9 ,"y2" : 13.4},				//37到（07到47横）
	
	{"x1" : 71.5 , "y1" : 2 ,"x2" : 71.5 ,"y2" : 3},					//KT到00竖
	{"x1" : 71.5 , "y1" : 3.6 ,"x2" : 71.5 ,"y2" : 6},					//00到P3竖
	{"x1" : 71.5 , "y1" : 7 ,"x2" : 71.5 ,"y2" : 8.5},					//P3到（07到47横）
	{"x1" : 71.5 , "y1" : 8.5 ,"x2" : 66 ,"y2" : 8.5},
	
	
	];
	return sline;
}

function createRect()				//正常方形
{
	var rect = [
	{"name":"M1/2=0!LDDR1/2","x" : 1 , "y" : 1.5 , "flag" : 0},
	{"name":"M1/2=0!LDDR1/2","x" : 5 , "y" : 1.5 , "flag" : 0},
	{"name":"M1/2=0!LDDR1/2","x" : 9 , "y" : 1.5 , "flag" : 0},
	{"name":"M1/2=0!LDDR1/2","x" : 13 , "y" : 1.5, "flag" : 0},
	{"name":"RS_BUS#!LDAR1","x" : 17 , "y" : 1.5 , "flag" : 0},

	{"name":"ALU=A+B!ALU_BUS!LDER","x" : 1 , "y" : 3.8, "flag" : 0},
	{"name":"ALU=A-B!ALU_BUS!LDER","x" : 5 , "y" : 3.8, "flag" : 0},
	{"name":"ALU=A*B!ALU_BUS!LDER","x" : 9 , "y" : 3.8 , "flag" : 0},
	{"name":"ALU=A&B!ALU_BUS!LDER","x" : 13 , "y" : 3.8, "flag" : 0},
	{"name":"CEL#!LRW=1!LDER","x" : 17 , "y" : 3.8 , "flag" : 0},
	
	
	
	{"name":"RS_BUS#!LDR4/M4!LDPC","x" : 41 , "y" : 1.5, "flag" : 0},
	{"name":"IAR_BUS#!LDR4/M4!LDPC","x" : 45 , "y" : 1.5 , "flag" : 0},
	{"name":"INTC!LDIAR!TJ","x" : 41 , "y" : 4.8, "flag" : 0},
	{"name":"SW_BUS#!LDR4/M4!LDPC","x" : 45 , "y" : 4.8 , "flag" : 0},
	
	{"name":"SW_BUS#!LDR4/M4!LDPC","x" : 62 , "y" : 0 , "flag" : 0},
	{"name":"SW_BUS#!LDAR1","x" : 62 , "y" : 2.5, "flag" : 0 },
	{"name":"SW_BUS#!LDAR1!TJ","x" : 62 , "y" : 5.2, "flag" : 0},
	{"name":"LRW=1!CEL#!TJ","x" : 58 , "y" : 2.5 , "flag" : 0},
	{"name":"SW_BUS#!CEL#!LRW=0","x" : 58 , "y" : 5.2 , "flag" : 0},
	
	{"name":"SW_BUS#!CEL#!LRW=0","x" : 58 , "y" : 8.7 , "flag" : 0},
	{"name":"SW_BUS#!CEL#!LRW=0","x" : 58 , "y" : 12, "flag" : 0 },
	
	];	
	return rect;
}

function createsRect()						//小正方形
{
	var srect = [
	{"name":"","x" : 25 , "y" :1.5},
	{"name":"INTS","x" : 29 , "y" : 1.5 },
	{"name":"INTC","x" : 33 , "y" : 1.5},
	{"name":"TJ","x" : 37 , "y" : 1.5},
	{"name":"WRD","x" : 9 , "y" : 6.3},
	{"name":"LDAR2","x" : 35 , "y" : 7.4},
	{"name":"","x" : 69.5 , "y" : 3},
	];	
	return srect;
}

function createlRect()						//大方形
{
	var lrect = [
	{"name":"M2=0!LDDR2!RS_BUS#!LDAR1","x" : 21 , "y" : 1.5, "flag" : 0},
	{"name":"ALU=A!ALU_BUS!CEL#!LRW=0","x" : 21 , "y" : 4.6 , "flag" : 0},
	{"name":"M4=0!PC_ADD!LDPC!LDR4","x" : 25 , "y" : 4.6 , "flag" : 0},
	{"name":"CER!PC-INC!LDAR2!LDIR","x" : 49 , "y" : 0 , "flag" : 0},
	{"name":"SW_BUS#!LDAR1/2!M3=1!TJ","x" : 62 , "y" : 8, "flag" : 0 },
	{"name":"SW_BUS#!LDAR1/2!M3=1!TJ","x" : 62 , "y" : 11.2 , "flag" : 0},
	];	
	return lrect;
}

function createzRect()						//中方形
{
	var zrect = [
	{"name":"AR1_INC","x" : 54 , "y" : 3.15},
	{"name":"AR1_INC!TJ","x" : 54 , "y" : 5.85 },
	{"name":"CER/TJ!LDIR","x" : 54 , "y" : 9.3 },
	{"name":"LDIR!CER","x" : 54 , "y" : 12.6 },
	{"name":"SW_BUS#!LDER","x" : 50 , "y" : 9.3 },
	{"name":"WRD!TJ","x" : 46 , "y" : 9.3 },
	{"name":"RS_BUS#!TJ","x" : 50 , "y" : 12.6 },

	];	
	return zrect;
}

function clearRect()
{
	for(var i = 0; i < rectflag.length; i++)
	{
		rectflag[i] = 0;
	}
	for(var i = 0; i < lrectflag.length; i++)
	{
		lrectflag[i] = 0;
	}
	for(var i = 0; i < srectflag.length; i++)
	{
		srectflag[i] = 0;
	}
	for(var i = 0; i < zrectflag.length; i++)
	{
		zrectflag[i] = 0;
	}
}

function createSetnumber()
{
	var setnumber = [
	
	{"x" : 5.3 , "y" : 4.3, "addx" : 8.2 , "addy" : 5.2},   					//DR2
	{"x" : 10.2 , "y" : 4.3, "addx" : 13 , "addy" : 5.2},						//DR1
	{"x" : 8 , "y" : 13.7, "addx" : 10.7 , "addy" : 14.5},						//ER
	{"x" : 8.5 , "y" : 16.57, "addx" : 10.7 , "addy" : 17.5},					//SW
	{"x" : 25.2 , "y" : 4.3, "addx" : 28.5 , "addy" : 5.2},						//AR1
	{"x" : 30.2 , "y" : 4.3, "addx" : 33 , "addy" : 5.2},						//AR2
	{"x" : 25.3 , "y" : 8.1, "addx" : 28.5 , "addy" : 9},						//IAR
	{"x" : 30.2 , "y" : 9.5, "addx" : 33 , "addy" : 10.4},						//PC
	{"x" : 30.2 , "y" : 13.65, "addx" : 33 , "addy" : 14.4},					//R4
	{"x" : 30.4 , "y" : 16.65, "addx" : 33 , "addy" : 17.4},                 	//IR
	{"x" : 5.7 , "y" : 10.2, "addx" : 6.7 , "addy" : 11.2},  					//RF(00)
	{"x" : 7.7 , "y" : 10.2, "addx" : 8.7 , "addy" : 11.2},  //RF(01)
	{"x" : 9.5 , "y" : 10.2, "addx" : 10.5 , "addy" : 11.2},  //RF(02)
	{"x" : 11.2 , "y" : 10.2, "addx" : 12.2 , "addy" : 11.2},  //RF(03)
	]
	return setnumber;
}
