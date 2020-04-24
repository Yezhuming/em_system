
function drawload()
{
	var a_canvas = document.getElementById("canvasOne");										//数据通路背景
    var context = a_canvas.getContext("2d");
    context.strokeStyle = "black";context.lineWidth = 2;
	context.strokeRect(expBox_x,expBox_y+expBox_Height*0.21,expBox_long*0.58,expBox_Height*0.47);
	
	var t = expBox_y+expBox_Height*0.21;														//数据通路y轴起始点
	
	context.lineWidth = 1;																		//ALU
	context.strokeStyle="black"; 
	context.moveTo(expBox_x+perWidth*7,t+perHeight*2);     context.lineTo(expBox_x+perWidth*11,t+perHeight*2);//顺时针
	context.lineTo(expBox_x+perWidth*13,t+perHeight*3.5);  context.lineTo(expBox_x+perWidth*5,t+perHeight*3.5);
	context.lineTo(expBox_x+perWidth*7,t+perHeight*2);
	
	context.strokeRect(expBox_x+perWidth*5,t+perHeight*4.2,perWidth*3.2,perHeight);				//DR2
	
	context.strokeRect(expBox_x+perWidth*9.8,t+perHeight*4.2,perWidth*3.2,perHeight);			//DR1
	
	
	context.strokeRect(expBox_x+perWidth*5,t+perHeight*9.5,perWidth*8,perHeight*2.5);			//RF
	
	
	context.strokeRect(expBox_x+perWidth*7.5,t+perHeight*13.5,perWidth*3.2,perHeight);			//ER
	
	
	context.strokeRect(expBox_x+perWidth*7.5,t+perHeight*16.5,perWidth*3.2,perHeight);			//SW
	context.textAlign="start";
	
	context.strokeRect(expBox_x+perWidth*25,t+perHeight*2,perWidth*8,perHeight*1.5);			//RAM
	
	if(com[32] == 1)drawtranangle(24.2,1,24.7,1.25,24.2,1.5);									//LRW
	else drawtranangle(24.2,1,23.7,1.25,24.2,1.5);
	
	context.strokeRect(expBox_x+perWidth*25,t+perHeight*4.2,perWidth*3.2,perHeight);			//AR1
	context.strokeRect(expBox_x+perWidth*26,t+perHeight*5.2,perWidth*1.32,perHeight*0.62);

	context.strokeRect(expBox_x+perWidth*29.8,t+perHeight*4.2,perWidth*3.2,perHeight);			//AR2
	
	
	context.strokeRect(expBox_x+perWidth*25,t+perHeight*8,perWidth*3.2,perHeight);				//IAR
	
	
	context.strokeRect(expBox_x+perWidth*29.8,t+perHeight*9.4,perWidth*3.2,perHeight);			//PC
	
	context.moveTo(expBox_x+perWidth*30.5,t+perHeight*11);context.lineTo(expBox_x+perWidth*32.3,t+perHeight*11);//ALU2
	context.lineTo(expBox_x+perWidth*33,t+perHeight*12);context.lineTo(expBox_x+perWidth*29.8,t+perHeight*12);
	context.lineTo(expBox_x+perWidth*30.5,t+perHeight*11);
	
	context.strokeRect(expBox_x+perWidth*29.8,t+perHeight*13.5,perWidth*3.2,perHeight);			//R4
	
	context.strokeRect(expBox_x+perWidth*29.8,t+perHeight*16.5,perWidth*3.2,perHeight);			//IR
	
	/******************************管道***************************************/
	
	/*****************RAM到IR*****************/
	context.moveTo(expBox_x+perWidth*32.1,t+perHeight*2);context.lineTo(expBox_x+perWidth*32.1,t+perHeight*1.5);//内
	context.lineTo(expBox_x+perWidth*37,t+perHeight*1.5);context.lineTo(expBox_x+perWidth*37,t+perHeight*16.7);
	context.lineTo(expBox_x+perWidth*33,t+perHeight*16.7);
	context.moveTo(expBox_x+perWidth*30.8,t+perHeight*2);context.lineTo(expBox_x+perWidth*30.8,t+perHeight*0.9);//外
	context.lineTo(expBox_x+perWidth*38.5,t+perHeight*0.9);context.lineTo(expBox_x+perWidth*38.5,t+perHeight*17.3);
	context.lineTo(expBox_x+perWidth*33,t+perHeight*17.3);
	
	/**************RAM与AR1,AR2之间**********/
	context.strokeRect(expBox_x+perWidth*26,t+perHeight*3.5,perWidth*1.3,perHeight*0.7);
	context.strokeRect(expBox_x+perWidth*30.8,t+perHeight*3.5,perWidth*1.3,perHeight*0.7);
	
	/**************ALU到RAM**********/
	context.moveTo(expBox_x+perWidth*8.5,t+perHeight*2);context.lineTo(expBox_x+perWidth*8.5,t+perHeight*0.9);
	context.lineTo(expBox_x+perWidth*27.3,t+perHeight*0.9);context.lineTo(expBox_x+perWidth*27.3,t+perHeight*2);
	
	/**************ALU到DR1右**********/
	context.moveTo(expBox_x+perWidth*9.8,t+perHeight*2);context.lineTo(expBox_x+perWidth*9.8,t+perHeight*1.5);
	context.lineTo(expBox_x+perWidth*18,t+perHeight*1.5);context.lineTo(expBox_x+perWidth*18,t+perHeight*5.8);
	context.lineTo(expBox_x+perWidth*12.1,t+perHeight*5.8);
	
	/**************ALU到DR1，DR2之间**********/
	context.strokeRect(expBox_x+perWidth*6,t+perHeight*3.5,perWidth*1.3,perHeight*0.7);
	context.strokeRect(expBox_x+perWidth*10.8,t+perHeight*3.5,perWidth*1.3,perHeight*0.7);
	
	/**************RAM与AR2左**********/
	context.moveTo(expBox_x+perWidth*26,t+perHeight*2);context.lineTo(expBox_x+perWidth*26,t+perHeight*1.5);
	context.lineTo(expBox_x+perWidth*19.5,t+perHeight*1.5);context.lineTo(expBox_x+perWidth*19.5,t+perHeight*5.8);
	context.lineTo(expBox_x+perWidth*27.3,t+perHeight*5.8);context.lineTo(expBox_x+perWidth*27.3,t+perHeight*6.4);
	context.lineTo(expBox_x+perWidth*19.5,t+perHeight*6.4);context.lineTo(expBox_x+perWidth*19.5,t+perHeight*7);
	context.lineTo(expBox_x+perWidth*30.8,t+perHeight*7);context.lineTo(expBox_x+perWidth*30.8,t+perHeight*5.2);
	
	/**************ER,SW到R4，IR**********/
	context.moveTo(expBox_x+perWidth*9.8,t+perHeight*16.5);context.lineTo(expBox_x+perWidth*9.8,t+perHeight*15.8);
	context.lineTo(expBox_x+perWidth*30.8,t+perHeight*15.8);context.lineTo(expBox_x+perWidth*30.8,t+perHeight*16.5);
	/**************DR2到RF**********/
	context.strokeRect(expBox_x+perWidth*6,t+perHeight*5.2,perWidth*1.3,perHeight*4.3);	
	/**************DR1到RF**********/
	context.moveTo(expBox_x+perWidth*10.8,t+perHeight*5.2);context.lineTo(expBox_x+perWidth*10.8,t+perHeight*9.5);
	/**************DR1到DBUS**********/
	context.moveTo(expBox_x+perWidth*12.1,t+perHeight*5.2);context.lineTo(expBox_x+perWidth*12.1,t+perHeight*8.2);
	context.lineTo(expBox_x+perWidth*18,t+perHeight*8.2);
	/**************RF到DBUS**********/
	context.moveTo(expBox_x+perWidth*12.1,t+perHeight*9.5);context.lineTo(expBox_x+perWidth*12.1,t+perHeight*8.8);
	context.lineTo(expBox_x+perWidth*18,t+perHeight*8.8);
	/**************IAR左矩形**********/
	context.strokeRect(expBox_x+perWidth*19.5,t+perHeight*8.2,perWidth*5.5,perHeight*0.6);	
	/**************DR1下面管道右矩形**********/
	context.strokeRect(expBox_x+perWidth*12.1,t+perHeight*6.4,perWidth*5.9,perHeight*0.6);
	/*************DR1到DR2管道**********/
	context.strokeRect(expBox_x+perWidth*7.3,t+perHeight*7,perWidth*3.5,perHeight*0.6);

	/*************RF到ER**********/
	context.strokeRect(expBox_x+perWidth*8.5,t+perHeight*12,perWidth*1.3,perHeight*1.5);
	/*************ER,SW到DR1右**********/
	context.moveTo(expBox_x+perWidth*12.1,t+perHeight*7.6);context.lineTo(expBox_x+perWidth*18,t+perHeight*7.6);
	context.lineTo(expBox_x+perWidth*18,t+perHeight*15.2);context.lineTo(expBox_x+perWidth*9.8,t+perHeight*15.2);
	context.lineTo(expBox_x+perWidth*9.8,t+perHeight*14.5);
	/*************ER到SW**********/
	context.moveTo(expBox_x+perWidth*8.5,t+perHeight*14.5);context.lineTo(expBox_x+perWidth*8.5,t+perHeight*16.5);
	/*************R4到IR**********/
	context.moveTo(expBox_x+perWidth*32.1,t+perHeight*14.5);context.lineTo(expBox_x+perWidth*32.1,t+perHeight*16.5);
	
	/*************R4,IR到IAR右**********/
	context.moveTo(expBox_x+perWidth*30.8,t+perHeight*14.5);
	context.lineTo(expBox_x+perWidth*30.8,t+perHeight*15.2);context.lineTo(expBox_x+perWidth*19.5,t+perHeight*15.2);
	context.lineTo(expBox_x+perWidth*19.5,t+perHeight*7.6);context.lineTo(expBox_x+perWidth*30.8,t+perHeight*7.6);
	context.lineTo(expBox_x+perWidth*30.8,t+perHeight*8.2);context.lineTo(expBox_x+perWidth*28.2,t+perHeight*8.2);
	
	/*************IAR到PC**********/
	context.moveTo(expBox_x+perWidth*28.2,t+perHeight*8.8);context.lineTo(expBox_x+perWidth*30.8,t+perHeight*8.8);
	context.lineTo(expBox_x+perWidth*30.8,t+perHeight*9.4);
	
	/*************ALU2到R4**********/
	context.strokeRect(expBox_x+perWidth*30.5,t+perHeight*12,perWidth*0.6,perHeight*1.5);
	/*************ALU2到PC**********/
	context.strokeRect(expBox_x+perWidth*30.8,t+perHeight*10.4,perWidth*1.32,perHeight*0.62);
	context.moveTo(expBox_x+perWidth*32.2,t+perHeight*12);context.lineTo(expBox_x+perWidth*32.2,t+perHeight*12.6);
	context.lineTo(expBox_x+perWidth*34,t+perHeight*12.6);context.lineTo(expBox_x+perWidth*34,t+perHeight*8.8);
	context.lineTo(expBox_x+perWidth*32.1,t+perHeight*8.8);context.lineTo(expBox_x+perWidth*32.1,t+perHeight*9.4);
	/*************ALU2到AR2**********/
	context.moveTo(expBox_x+perWidth*31.6,t+perHeight*12);context.lineTo(expBox_x+perWidth*31.6,t+perHeight*13.1);
	context.lineTo(expBox_x+perWidth*34.6,t+perHeight*13.1);context.lineTo(expBox_x+perWidth*34.6,t+perHeight*8.2);
	context.lineTo(expBox_x+perWidth*32.1,t+perHeight*8.2);context.lineTo(expBox_x+perWidth*32.1,t+perHeight*5.2);
	
	/*******************小黑长方形**********************/
	var blackrect = createblackrect();
	var ltext  = createtltext();
	var lline  = createlline();
	for(var i = 0 ;i < blackrect.length ;i++)	
	{
		blackrect[i].f = com[i];
	}
	for(var i = 0 ;i < blackrect.length ;i++)							
	{
		var x = expBox_x + blackrect[i].x*perWidth;
		var y = t + blackrect[i].y*perHeight;
		if(blackrect[i].f==1)context.fillStyle="black";if(blackrect[i].f==-1) context.fillStyle="#ffffaa";
		context.fillRect(x,y,1.32*perWidth,perHeight*0.62);
	}
	/*******************小黑长方形文字**********************/
	for(var i = 0 ;i < blackrect.length ;i++)							
	{
		var x = expBox_x + blackrect[i].x*perWidth;
		var y = t + blackrect[i].y*perHeight;
		context.fillStyle="#ffffaa";
		context.font ="10px Courier New";
		context.textAlign="start";
		context.fillText(blackrect[i].t,x+0.3*perWidth,y);
	}
	/*******************文字**********************/
	for(var i = 0 ;i < ltext.length ;i++)                  
	{
		var x = expBox_x + ltext[i].x*perWidth;
		var y = t+ltext[i].y*perHeight;
		context.fillStyle="black";
		context.textAlign="start";	
		context.font = "12px Courier New";
		if(i == 42)
			context.font = "10px Courier New";
		context.fillText(ltext[i].name,x,y);	
	}
	context.stroke();
	
	/*******************红色数字**********************/
	var redNumber = createRedNumber();
	for(var i = 0; i < redNumber.length; i++)
	{
		var x = expBox_x + redNumber[i].x*perWidth;
		var y = t + redNumber[i].y*perHeight;
		context.fillStyle="red";
		context.textAlign="start";	
		context.font = "12px Courier New";
		if(i <= 19)
		{
			if(com[i] == 1)
			{
				if(i == 6 || i == 16 || i == 17 || i == 18 || i == 19)
					rednum[i] = 1;
				else
					rednum[i] = 0;
			}
				
			if(com[i] == -1)
			{
				if(i == 6 || i == 16 || i == 17 || i == 18 || i == 19)
					rednum[i] = 0;
				else 
					rednum[i] = 1;
			}					
		}
		if(i == 29)
		{
			if(com[32] == -1)
				rednum[i] = 1;
			else
				rednum[i] = 0;
		}
		context.fillText(rednum[i],x,y);
	}
	/******************线**********************/
	for(var i=0 ;i<lline.length; i++)
	{
		context.fillStyle = "black";
		context.moveTo(expBox_x+lline[i].x1*perWidth,t+lline[i].y1*perHeight);
		context.lineTo(expBox_x+lline[i].x2*perWidth,t+lline[i].y2*perHeight);	
		context.stroke();
	}
	
	/*****************随机和清零***************/
	context.fillStyle = "navajowhite";
	context.fillRect(expBox_x + perWidth * 0.5, expBox_y + expBox_Height * 0.21 + perWidth * 0.3, perWidth * 3,perHeight );
	context.fillRect(expBox_x + perWidth * 4, expBox_y + expBox_Height * 0.21 + perWidth * 0.3, perWidth * 3, perHeight);
	context.fillStyle = "black";
	context.textAlign = "center";
	context.fillText("随机", expBox_x + perWidth * 2 , expBox_y + expBox_Height * 0.21 + perWidth * 0.5);
	context.fillText("清零", expBox_x + perWidth * 5.5, expBox_y + expBox_Height * 0.21 + perWidth * 0.5);
	context.strokeRect(expBox_x + perWidth * 0.5, expBox_y + expBox_Height * 0.21 + perWidth * 0.3, perWidth * 3,perHeight );
	context.strokeRect(expBox_x + perWidth * 4, expBox_y + expBox_Height * 0.21 + perWidth * 0.3, perWidth * 3, perHeight);
	context.fillStyle = "blue";
	SW.showSW();
	DBUS.showDBUS();
	ER.showER();
	RF.showRF();
	DR2.showDR2();
	DR1.showDR1();
	IAR.showIAR();
	C.showC();
	AR1.showAR1();
	R4.showR4();
	AR2.showAR2();
	PC.showPC();
	RAM.showRAM();
	IBUS.showIBUS();
	IR.showIR();
	t3 = 0;
}
function createblackrect()						//小黑长方形
{
	var blackrect=[
	{"f":0 ,"x" : 6 , "y" : 5.2,"t":"T3"},				//LDDR2(0)
	{"f":0 ,"x" : 10.8 , "y" : 5.2,"t":"T3"},			//LDDR1(1)
	{"f":0 ,"x" : 7.3 , "y" : 7,"t":""},				//M2(2)
	{"f":0, "x" : 12.1 , "y" : 5.8,"t":""},				//M1(3)
	{"f":0 ,"x" : 8.5 , "y" : 12,"t":"T2"},				//WRD(4)
	{"f":0 ,"x" : 8.5 , "y" : 14.5,"t":"T4"},			//LDER(5)
	{"f":0, "x" : 16.7, "y" : 0.9,"t":""},				//ALU_BUS#(6)
	{"f":0 ,"x" : 35.7 , "y" : 0.9,"t":""},				//CER(7)
	{"f":0 ,"x" : 26 , "y" : 5.2,"t":"T4"},				//LDAR1(8)
	{"f":0 ,"x" : 29.5 , "y" : 7,"t":""},				//M3(9)
	{"f":0, "x" : 30.8, "y" : 5.2,"t":"T2"},			//LDAR2(10)
	{"f":0, "x" :  28.2, "y" :8.2,"t":""},				//LDIAR(11)
	{"f":0, "x" : 30.8 , "y" :10.4 ,"t":"T4"},			//LDPC(12)
	{"f":0, "x" : 33, "y" :16.7 ,"t":"T4"},				//LDIR(13)
	{"f":0 ,"x" : 30.8, "y" : 14.5,"t":"T4"},			//LDR4(14)
	{"f":0 ,"x" : 29.5, "y" : 15.2,"t":""},				//M4(15)
	{"f":0 ,"x" : 8.5 , "y" :15.9 ,"t":""},				//SW_BUS#(16)
	{"f":0, "x" : 19.5, "y" :0.9 ,"t":""},				//CEL#(17)
	{"f":0 ,"x" : 16.7, "y" : 8.2,"t":""},				//RS_BUS#(18)
	{"f":0, "x" : 19.5, "y" : 8.2,"t":""},				//IAR_BUS#(19)

	];	
	return blackrect;
}

function createRedNumber()
{
	var redNumber = [
	
	{"name":"LDDR2", "x" : 1.7, "y" : 5},
	{"name":"LDDR1", "x" : 15.9, "y" : 5},
	{"name":"M2", "x" : 3.1, "y" : 7},
	{"name":"M1", "x" : 8.7, "y" : 5.6},
	{"name":"WRD", "x" : 5.2, "y" : 12},
	{"name":"LDER", "x" : 5.2, "y" : 14.5},
	{"name":"ALU_BUS#", "x" : 13.1, "y" : 2},
	{"name":"CER", "x" : 34.8, "y" : 2},
	{"name":"LDAR1", "x" : 21.8, "y" : 5},
	{"name":"M3", "x" : 34.7, "y" : 6.8},
	{"name":"LDAR2", "x" : 36.1, "y" : 5},
	{"name":"LDIAR", "x" :26.8, "y" : 8.9},
	{"name":"LDPC", "x" : 26.8, "y" : 10.4},
	{"name":"LDIR", "x" : 35, "y" : 17.5},
	{"name":"LDR4", "x" : 35.3, "y" : 14.5},
	{"name":"M4", "x" : 34.7, "y" : 15.3},
	{"name":"SW_BUS#", "x" : 3.6, "y" : 15.6},
	{"name":"CEL#", "x" : 21.6, "y" : 2},
	{"name":"RS_BUS#", "x" : 13.8, "y" : 8.8},
	{"name":"IAR_BUS#", "x" :23.7, "y" : 8.8},
	
	{"name":"S2", "x" : 1.4, "y" : 1.5},          //20
	{"name":"S1", "x" : 2.7, "y" : 1.5},
	{"name":"S0", "x" : 4, "y" : 1.5},
	{"name":"RD1", "x" : 1.8, "y" : 9.4},
	{"name":"RD0", "x" : 1.8, "y" : 9.9},
	{"name":"RS1", "x" : 15.3, "y" : 9.4},
	{"name":"RS0", "x" : 15.3, "y" : 9.9},
	{"name":"WR1", "x" : 13.3, "y" : 12.4},
	{"name":"WR0", "x" : 13.3, "y" : 12.9},
	{"name":"LRW", "x" : 22.6, "y" : 2},         //29
	{"name":"AR1_INC", "x" : 30.2, "y" : 5.55},
	{"name":"PC_INC", "x" : 25.8, "y" : 9.7},
	{"name":"PC_ADD", "x" : 25.7, "y" : 11.3},
	];
	return redNumber;
}

function createtltext()						
{
	var ltext = [

	{"name":"ALU", "x" : 8.4, "y" : 2.8},
	{"name":"A", "x" : 6.5, "y" : 2.8},				//上
	{"name":"B", "x" : 11.3, "y" : 2.8},
	{"name":"C", "x" : 7, "y" : 1.2},
	
	{"name":"T4", "x" : 8.5, "y" : 2},
	{"name":"S2", "x" : 1.4, "y" : 2.1},
	{"name":"S1", "x" : 2.7, "y" : 2.1},
	{"name":"S0", "x" : 4, "y" : 2.1},
	{"name":"LDDR2", "x" : 2.3, "y" : 5},
	{"name":"LDDR1", "x" : 13.3, "y" : 5},
	{"name":"M1", "x" : 9.3, "y" : 5.6},
	{"name":"M2", "x" : 3.7, "y" : 7},
	{"name":"DR2","x" : 6.6 , "y" : 4.3 },
	{"name":"DR1","x" : 11.4 , "y" : 4.3 },
	{"name":"RF","x" :  8.7, "y" :9.6 },
	{"name":"ER","x" :9.3 , "y" :13.7},
	{"name":"SW","x" :  9.3, "y" : 16.6},
	{"name":"RAM","x" : 28.3 , "y" :2.4 },
	{"name":"A", "x" : 6.5, "y" : 8.7},				//下
	{"name":"B", "x" : 11.3, "y" : 8.7},
	{"name":"00", "x" : 5.7, "y" : 11},{"name":"01", "x" : 7.7, "y" : 11},
	{"name":"10", "x" : 9.5, "y" : 11},{"name":"11", "x" : 11.2, "y" : 11},
	{"name":"WRD", "x" : 6, "y" : 12},
	{"name":"RD1", "x" : 2.5, "y" : 9.4},{"name":"RD0", "x" : 2.5, "y" : 9.9},
	{"name":"RS1", "x" : 13.8, "y" : 9.4},{"name":"RS0", "x" : 13.8, "y" : 9.9},
	{"name":"WR1", "x" : 11.7, "y" : 12.4},{"name":"WR0", "x" : 11.7, "y" : 12.9},
	{"name":"LDER", "x" : 5.9, "y" : 14.5},
	{"name":"SW_BUS#", "x" : 4.5, "y" : 15.6},
	{"name":"SW7-SW0", "x" : 7.5, "y" : 17.5},
	{"name":"ALU_BUS#", "x" : 14, "y" : 2},
	{"name":"CEL#", "x" : 19.6, "y" : 2},
	{"name":"LRW", "x" : 23.2, "y" : 2},
	{"name":"CER", "x" : 35.5, "y" : 2},
	{"name":"数据端", "x" : 25.5, "y" : 2},
	{"name":"指令端", "x" : 30.3, "y" : 2},
	{"name":"LDAR1", "x" : 22.5, "y" : 5},
	{"name":"LDAR2", "x" : 33.5, "y" : 5},
	{"name":"AR1_INC", "x" : 27.3, "y" : 5.6},
	{"name":"M3", "x" : 33.5, "y" : 6.8},
	{"name":"RS_BUS#", "x" : 14.5, "y" : 8.8},
	{"name":"IAR_BUS#", "x" :19.7, "y" : 8.8},
	{"name":"LDIAR", "x" :27.5, "y" : 8.9},
	{"name":"PC_INC", "x" : 26.5, "y" : 9.7},
	{"name":"LDPC", "x" : 27.4, "y" : 10.4},
	{"name":"PC_ADD", "x" : 26.5, "y" : 11.3},
	{"name":"LDR4", "x" : 33.3, "y" : 14.5},
	{"name":"M4", "x" : 33.7, "y" : 15.3},
	{"name":"IR3-0", "x" : 32.4, "y" : 15.7},
	{"name":"LDIR", "x" : 33, "y" : 17.5},
	{"name":"AR1","x" :  26.6, "y" : 4.3},
	{"name":"AR2","x" : 31.6 , "y" :4.3  },
	{"name":"IAR","x" : 26.4 , "y" :8.1  },
	{"name":"PC","x" : 31.7, "y" :9.5 },
	{"name":"ALU2","x" : 30.5, "y" : 11.1 },
	{"name":"R4","x" :  31.7, "y" :13.6 },
	{"name":"IR","x" : 31.7, "y" : 16.6},
	];	

	return ltext;
}

function createlline()
{
	var lline = [
	{"x1" : 5.5, "y1" : 2.5 ,"x2" : 6.2,"y2" : 2.5},					//S0S1S2
	{"x1" : 5 , "y1" : 5.4 ,"x2" : 6 ,"y2" : 5.4},						//LDDR2
	{"x1" : 12.2 , "y1" : 5.4,"x2" : 13 ,"y2" :5.4},					//LDDR1
	{"x1" : 10.4 , "y1" : 6 ,"x2" : 10.8,"y2" : 6},						//M1
	{"x1" : 5 , "y1" : 7.3,"x2" : 6 ,"y2" : 7.3},						//M2
	{"x1" : 4.2 , "y1" : 10 ,"x2" : 5 ,"y2" : 10},						//RD1,RD2
	{"x1" : 13 , "y1" : 10 ,"x2" : 13.8 ,"y2" : 10},					//RS1,RS0
	{"x1" : 7.7 , "y1" : 12.3 ,"x2" : 8.5 ,"y2" : 12.3},				//WRD
	{"x1" : 12.5 , "y1" : 12.0 ,"x2" : 12.5 ,"y2" : 12.5},				//WR1，WR0
	{"x1" :7.9 , "y1" : 14.8 ,"x2" : 8.5 ,"y2" : 14.8},					//LDER
	{"x1" : 7.9 , "y1" : 16 ,"x2" : 8.5 ,"y2" : 16},					//SW_BUS#
	{"x1" : 17.4, "y1" : 1.5 ,"x2" : 17.4 ,"y2" : 2.2},					//ALU_BUS#
	{"x1" : 20.5, "y1" : 1.5 ,"x2" : 20.5,"y2" : 2.2},					//CEL
	{"x1" : 24.2, "y1" : 1.5 ,"x2" : 24.2 ,"y2" : 2.2},					//LWR
	{"x1" : 36.4 , "y1" : 1.5 ,"x2" : 36.4 ,"y2" : 2.2},				//CER
	{"x1" : 25, "y1" : 5.4 ,"x2" : 26 ,"y2" : 5.4},					//LDAR1
	{"x1" : 32.1 , "y1" : 5.4 ,"x2" : 33.2 ,"y2" : 5.4},				//LDAR2
	{"x1" : 28, "y1" : 5.2 ,"x2" : 28 ,"y2" : 5.7},						//AR1_INC
	{"x1" : 32.1 , "y1" : 7.2 ,"x2" : 33.2 ,"y2" : 7.2},				//M3	
	{"x1" : 180 , "y1" : 160 ,"x2" : 270 ,"y2" : 160},					//LDIAR
	{"x1" : 29.5 , "y1" : 10.1 ,"x2" : 29.8 ,"y2" : 10.1},				//PC_INC
	{"x1" :29.3 , "y1" : 10.8 ,"x2" : 30.8 ,"y2" :10.8},				//LDPC
	{"x1" : 29.5  , "y1" :  11.5,"x2" : 30.2  ,"y2" :11.5 },			//PC_ADD
	{"x1" :  32.1 , "y1" : 15 ,"x2" : 33.2  ,"y2" : 15},				//LDR4
	{"x1" : 32.1  , "y1" : 15.5,"x2" :  33.2 ,"y2" :15.5 },				//M4
	{"x1" :  33.7 , "y1" : 17.3 ,"x2" : 33.7 ,"y2" : 17.7},				//LDIR

	
	];
	return lline;
}

function drawtranangle(x1,y1,x2,y2,x3,y3)
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	var t = expBox_y+expBox_Height*0.21;
	context.strokeStyle="black";
	context.moveTo(expBox_x+perWidth*x1,t+perHeight*y1);
	context.lineTo(expBox_x+perWidth*x2,t+perHeight*y2);
	context.lineTo(expBox_x+perWidth*x3,t+perHeight*y3);
	context.moveTo(expBox_x+perWidth*x1,t+perHeight*y1);
	context.lineTo(expBox_x+perWidth*x3,t+perHeight*y3);
	context.stroke();
}

function random()
{
	var temp = new Array(setnumber.length);
	for(var i = 0; i < setnumber.length; i++)
	{
		temp[i] = Math.floor(Math.random()*255).toString(16);
		if(temp[i].length == 1)
			temp[i] = '0' + temp[i];
	}
	
	com[25] = temp[0]; com[24] = temp[1]; com[33] = temp[2]; com[23] = temp[3];
	com[21] = temp[4]; com[22] = temp[5]; com[39] = temp[6]; com[38] = temp[7];
	com[40] = temp[8]; com[31] = temp[9]; com[34] = temp[10]; com[35] = temp[11];
	com[36] = temp[12]; com[37] = temp[13];
	
}

function clearZero()
{
	com[25] = "00"; com[24] = "00"; com[33] = "00"; com[23] = "00";
	com[21] = "00"; com[22] = "00"; com[39] = "00"; com[38] = "00";
	com[40] = "00"; com[31] = "00"; com[34] = "00"; com[35] = "00";
	com[36] = "00"; com[37] = "00";
}
