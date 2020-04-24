
var T = 0;																				//T代表当前所在时钟
var T_Type = 4;																			//4:单拍，一条微指令；2：单指，用于微程序控制器；1：单步，硬布线
function refreshPortFSwitches()//更新Switch对应Port的值
{	
	if(Power.value == true)
	{
		for(var i = 0 ; i < Switch.length-2 ; i++)
		{
			var portID = i+123;
			if(Port[portID].name == Switch[i].name)
			{
				Port[portID].value = Switch[i].value;
			}
		}
	}	
}

function expBox()
{
	if(Power.value == true)
	{
		powerOn();							//改变所有5V插口
		refreshPortFSwitches();				//更新所有开关关联的插口
		refreshPortFWire();					//更新所有有导线连接的插口
		clearCanvas();
		canvasApp();
	}
	else
	{
		powerOff();
		refreshPort();
		//resetComponent();
		clearCanvas();
		canvasApp();
	}
}

function expBoxRunning()																//QD被触发且电源开关闭合时
{
	if(T_Type == 4 && Power.value == true)												//单拍
	{
		for(T = 1 ; T < 5; T++)
		{
			for(var i = 1 ; i < Wire.length ; i++)										//遍历每根导线
			{
				var wire = Wire[i];
				if(wire.isNormal == true)												//导线正确
				{	
					if(wire.theStartPoint.type == "input")								//起始点为输入口
					{
						var inputPort = wire.theStartPoint;
					}
					else																//终止点为输入口
					{	
						var inputPort = wire.theEndPoint;
					}
					
					switch(inputPort.slugName)
					{
						case "DR1":
						{
							DR1.running();
							break;
						}
						case "DR2":{
							DR2.running();
							break;
						}
						case "AR1":{
							AR1.running();
							break;
						}
						case "AR2":{
							AR2.running();
							break;
						}
						case "RAM":{
							RAM.running();
							break;
						}
						case "RF":{
							RF.running();
							break;
						}
						case "ER":{
							ER.running();
							break;
						}
					}
				}
			}
			C.running();
		}//T1、T2、T3、T4
		T=0;
		refreshLight();
		clearCanvas();
		canvasApp();
	}
}

function expBoxOff()
{
	
}

function resetComponent()
{
	DR1.reset();
	DR2.reset();
	ALU.reset();
	C.reset();
	DBUS.reset();
	AR1.reset();
	AR2.reset();
	IR.reset();
	ER.reset();
	RF.reset();
}

function showtime()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");	
	if((Switch[24].value == false) && (Switch[25].value == false) && (Switch[26].value == false))             		//000
	{	
		var rect ;
		if(IR1 == 0) rect = createRect000();if(IR1 == 1) rect = createRect0001();
		if(IR1 == 2) rect = createRect0010();if(IR1 == 3) rect = createRect0011();
		if(IR1 == 4) rect = createRect0100();if(IR1 == 5) rect = createRect0101();
		if(IR1 == 6) rect = createRect0110();if(IR1 == 8) rect = createRect1000();
		if(IR1 == 9) rect = createRect1001();if(IR1 == 10) rect = createRect1010();
		if(IR1 == 11) rect = createRect1011();if(IR1 == 12) rect = createRect1100();
		setTimeout(function () {
		if(counti == rect.length)
			counti = 2; 
		_time=setTimeout(arguments.callee, speed);
		clearPort();
		if((t2 == 0))
			clearTimeout(_time);
		if(counti == 1)
		{
			refreshLighty(rect[counti].number);								//SW_BUS#,SW_BUS#
			if(judge(Port[40],Port[122]))
			{
				clearcom();
				com[16] = -1;
			}			
			if(judge(Port[13],Port[102])){com[14] = -1;}					//LDPC,LDR4
			if(judge(Port[23],Port[101])){com[15] = -1;}					//M4,M4
			if(judge(Port[13],Port[114])){com[12] = -1;}					//LDPC,LDPC
			clearRect();rectflag[14] = 1;
			canvasApp();if(flag==1)drawp();
		}
		if(counti == 2)
		{
			if(judge(Port[28],Port[99])){com[7] = -1;}							//LDIR,CER
			if(judge(Port[22],Port[99])){com[103] = -1;}						//M3,M3
			if(judge(Port[115],Port[11])){com[13] = -1;}						//PC_INC,PC_INC		
			if(judge(Port[25],Port[104])){com[10] = -1;}						//LDAR1,LDAR2
			if(judge(Port[28],Port[110])){com[13] = -1;IR.running()}			//LDIR,LDIR
			refreshLighty(rect[counti].number);refreshLightp(2);
			clearRect();lrectflag[3] = 1;
			diamondRedOrBlack[2] = 0;
			clearCanvas();canvasApp();if(flag==1)drawp();
		}
		if(counti == 3)
		{
			refreshLighty(rect[counti].number);
			clearRect();
			if(IR1 <= 3 && IR1 >= 0)
			{			
				if(judge(Port[20],Port[70])){clearcom();com[2] = 1;}			//M1,M2
				if(judge(Port[20],Port[72])){com[3] = 1;}						//M1,M1
				if(judge(Port[19],Port[71])){com[0] = -1;}						//LDDR1,LDDR2
				if(judge(Port[19],Port[73])){com[1] = -1;}						//LDDR1,LDDR1
				if(IR1 == 0)rectflag[0] = 1;
				if(IR1 == 1)rectflag[1] = 1;
				if(IR1 == 2)rectflag[2] = 1;
				if(IR1 == 3)rectflag[3] = 1;
			}
			if(IR1 == 4)
			{
				if(judge(Port[19],Port[71])){com[0] = -1;}						//LDDR1,LDDR2
				if(judge(Port[25],Port[119])){com[1] = -1;}						//LDAR1,LDAR1
				if(judge(Port[39],Port[107])){clearcom();com[18] = -1;}			//RS_BUS#,RS_BUS#
				lrectflag[0] = 1
			}
			if(IR1 == 5)
			{
				if(judge(Port[39],Port[107])){com[18] = -1;}					//RS_BUS#,RS_BUS#
				if(judge(Port[25],Port[119])){com[0] = -1;}						//LDAR1,LDAR1
				rectflag[4] = 1;
			}		
			if(IR1 == 6)
			{
				srectflag[3] = 1;
			}
			if(IR1 == 8)
			{
				rectflag[10] = 1;
			}
			if(IR1 == 9)
			{
				if(judge(Port[13],Port[114])){com[12] = -1;}					//LDPC,LDPC
				if(judge(Port[13],Port[102])){com[14] = -1;}					//LDPC,LDR4
				srectflag[0] = 1; 
			}
			if(IR1 == 10)
			{
				rectflag[11] = 1;
			}
			if(IR1 == 11)
			{
				srectflag[1] = 1; 
			}
			if(IR1 == 12)
			{
				srectflag[2] = 1; 
			}
			canvasApp();if(flag==1)drawp();
		}
		if(counti == 4 && (IR1 >= 0 && IR1 <=5 || IR1 == 9))
		{
			refreshLighty(rect[counti].number);
			clearRect();
			if(IR1 <= 3 && IR1 >= 0)
			{
				if(judge(Port[21],Port[77])){clearcom();com[6] = -1;}			//ALU_BUS#
				if(judge(Port[42],Port[69])){com[5] = -1;}						//LDER		
				if(IR1 == 0)rectflag[5] = 1;
				if(IR1 == 1)rectflag[6] = 1;
				if(IR1 == 2)rectflag[7] = 1;
				if(IR1 == 3)rectflag[8] = 1;
			}
			if(IR1 == 4)
			{
				if(judge(Port[21],Port[77])){clearcom();com[6] = -1;}			//ALU_BUS#
				if(judge(Port[6],Port[96])){clearcom();com[17] = -1;}			//CEL#,CEL#
				if(judge(Port[5],Port[98])){com[32] = -1;}						//LRW,LRW
				lrectflag[1] = 1;
			}
			if(IR1 == 5)
			{
				if(judge(Port[6],Port[96])){clearcom();com[17] = -1;}			//CEL#,CEL#
				if(judge(Port[5],Port[98])){com[32] = -1;}						//LRW,LRW
				if(judge(Port[42],Port[69])){com[5] = -1;}						//LDER		
				rectflag[9] = 1;
			}
			if(IR1 == 9)
			{
				if(judge(Port[13],Port[114])){com[12] = -1;}					//LDPC,LDPC
				if(judge(Port[13],Port[102])){com[14] = -1;}					//LDPC,LDR4
				lrectflag[2] = 1;
			}
			canvasApp();if(flag==1)drawp();
		}

		if(counti == 5 && ( (IR1 >= 0 && IR1 <=3) || (IR1 == 5) ) )
		{
			if(judge(Port[4],Port[91]))	{clearcom();com[4] = -1;}				//WRD
			refreshLighty(rect[counti].number);
			clearRect();srectflag[4] = 1;
			clearCanvas();canvasApp();if(flag==1)drawp();
		}
		if(counti == 6)
		{
			refreshLightp(1);
			if(judge(Port[25],Port[104])){clearcom();com[10]=-1;}				//LDAR1,LDAR2
			refreshLighty(rect[counti].number);
			clearRect();srectflag[5] = 1;
			diamondRedOrBlack[1] = 0;
			clearCanvas();canvasApp();if(flag==1)drawp();
		}
		counti++;           
        }, 1000)	
	}

	
	if((Switch[24].value==false)&&(Switch[25].value==false)&&(Switch[26].value==true))     					//001
	{	
		var rect = createRect001();
		setTimeout(function () 
		{
			if(counti == rect.length)
				counti = 2;
			_time = setTimeout(arguments.callee, speed);
			clearPort();
			if(counti == 1)
			{
				if(judge(Port[40],Port[122]))									//SW_BUS#,SW_BUS#
				{
					clearcom();
					com[16] = -1;
				}			
				if(judge(Port[25],Port[119])){com[1] = -1;}						//LDAR1,LDAR1
				refreshLighty(rect[counti].number);
				clearRect();rectflag[15] = 1;
				clearCanvas();canvasApp();if(flag==1)drawp();
			}
			if(counti == 2)
			{
				if(judge(Port[6],Port[96]))										//CEL#,CEL#
				{
					clearcom();
					com[17] = -1;
				}			
				if(judge(Port[5],Port[98])){com[32] = -1;}						//LRW,LRW
				refreshLighty(rect[counti].number);
				clearRect();rectflag[17] = 1;
				clearCanvas();canvasApp();if(flag==1)drawp();
			}
			if(counti == 3)
			{
				if(judge(Port[27],Port[118]))									//AR1_INC,AR1_INC
				{
					clearcom();
					com[16] = -1;
				}			
				refreshLighty(rect[counti].number);
				clearRect();zrectflag[0] = 1;
				clearCanvas();canvasApp();if(flag==1)drawp();	
			}
			counti++;           
        }, 1000)		
	}
	
	if((Switch[24].value==false)&&(Switch[25].value==true)&&(Switch[26].value==false))						//010
	{
		var rect = createRect010();
		setTimeout(function () 
		{
			if(counti == rect.length) 
				counti = 2;
			_time = setTimeout(arguments.callee, speed);
			clearPort();
			if(counti == 1 && judgeTime010(counti,TJ))
			{
				if(judge(Port[27],Port[118])){clearTimeout(_time);clearcom();TJ = 1;com[16] = -1;}	 		//SW_BUS#,SW_BUS#
				if(judge(Port[25],Port[119])){com[8] = -1;}													//LDAR1,LDAR1
				refreshLighty(rect[counti].number);clearCanvas();
				clearRect();rectflag[16] = 1;
				canvasApp();if(flag==1)drawp();
				if(TJ != 0)t2 = 0;
			}
			if(counti == 2)
			{
				if(judge(Port[27],Port[118])){clearcom();TJ = 2;com[16] = -1;}	 							//SW_BUS#,SW_BUS#
				if(judge(Port[6],Port[96])){com[17] = -1;}													//CEL#,CEL#
				if(judge(Port[5],Port[98])){com[32] = 1;}													//LRW,LRW
				refreshLighty(rect[counti].number);
				clearRect();rectflag[18] = 1;
				clearCanvas();canvasApp();if(flag==1)drawp();
			}		
			if(counti==3 && judgeTime010(counti,TJ))
			{
				Port[118].value = true;
				if(judge(Port[27],Port[118]))																//AR1_INC,AR1_INC
				{
					clearTimeout(_time);clearcom();TJ =3;
					AR1.running();
				}	
				refreshLighty(rect[counti].number);
				clearRect();zrectflag[1] = 1;
				clearCanvas();canvasApp();if(flag==1)drawp();
			}
			counti++;           
        }, 1000)
	}
	
	if((Switch[24].value == false) && (Switch[25].value == true) && (Switch[26].value == true))						//011
	{	
		var rect = createRect011();
		setTimeout(function () 
		{
			if(counti == rect.length)
				counti = 2;
			_time = setTimeout(arguments.callee, speed);
			if(t2 == 0)
				clearTimeout(_time);
			clearPort();
			if(counti == 1 && judgeTime(counti,TJ))
			{
				if(judge(Port[27],Port[118])){clearTimeout(_time);TJ = 1;clearcom();com[16] = -1;}	 			//SW_BUS#,SW_BUS#
				if(judge(Port[25],Port[119])){com[8] = -1;}														//LDAR1,LDAR1
				if(judge(Port[25],Port[104])){com[10] = -1;}													//LDAR1,LDAR2
				if(judge(Port[22],Port[103])){com[9] = -1;}														//M3,M3
				//if(judge(Port[3],Port[33]))																	//TJ,TJ1
				refreshLighty(rect[counti].number);clearCanvas();
				clearRect();
				lrectflag[4] = 1;
				canvasApp();if(flag==1)drawp();
				if(TJ != 0)t2 = 0;	
			}
			if(counti == 2 && judgeTime(counti,TJ))
			{
				if(judge(Port[27],Port[118])){clearcom();com[16] = -1;}											//SW_BUS#,SW_BUS#
				if(judge(Port[6],Port[96])){com[17] = -1;}														//CEL#,CEL#
				if(judge(Port[5],Port[98])){com[32] = 1;}														//LRW,LRW
				refreshLighty(rect[counti].number);
				clearRect();rectflag[19] = 1;
				clearCanvas();canvasApp();if(flag==1)drawp();
			}
		
			if(counti == 3 && judgeTime(counti,TJ))
			{
				if(judge(Port[28],Port[99])){clearTimeout(_time);TJ = 3;clearcom();com[7] = -1;}				//LDIR,CER
				if(judge(Port[28],Port[28])){com[13] = -1;}														//LDIR,LDIR
				refreshLighty(rect[counti].number);
				clearRect();zrectflag[2] = 1;
				clearCanvas();canvasApp();if(flag==1)drawp();
			}
			if(counti == 4 && judgeTime(counti,TJ))
			{
				if(judge(Port[27],Port[118])){clearcom();com[16] = -1;}											//SW_BUS#,SW_BUS#
				if(judge(Port[42],Port[69])){com[5] = -1;}														//LDER
				refreshLighty(rect[counti].number);
				clearRect();zrectflag[4] = 1;
				clearCanvas();canvasApp();if(flag==1)drawp();
			}
			if(counti == 5 && judgeTime(counti,TJ))
			{
				if(judge(Port[4],Port[91]))	{clearTimeout(_time);TJ = 5;clearcom();com[4] = -1;}				//WRD
				refreshLighty(rect[counti].number);
				clearRect();zrectflag[5] = 1;
				clearCanvas();canvasApp();if(flag==1)drawp();
			}		
		counti++;           
        }, 1000)
	}
	
	if((Switch[24].value == true) && (Switch[25].value == false) && (Switch[26].value == false))						//100
	{
		setTimeout(function () 
		{
			var rect = createRect100();
			if(counti == rect.length)
				counti = 2;
			_time = setTimeout(arguments.callee, speed);
			clearPort();
			if(counti == 1 && judgeTime100(counti , TJ))
			{
				if(judge(Port[27],Port[118]))																//SW_BUS#,SW_BUS#
				{
					clearcom();
					if(judge(Port[3] , Port[33]))
					{
						clearTimeout(_time);
						TJ = 1; 
					}
					com[16] = -1;
				}	 		
				if(judge(Port[25],Port[119])){com[1] = -1;}			//LDAR1,LDAR1
				if(judge(Port[25],Port[104])){com[0] = -1;}			//LDAR1,LDAR2
				if(judge(Port[22],Port[103])){com[0] = -1;}			//M3,M3		
				refreshLighty(rect[counti].number);
				clearRect();
				lrectflag[5] = 1;
				clearCanvas();canvasApp();if(flag==1)drawp();
			}
			if(counti == 2)
			{
				if(judge(Port[27],Port[118])){clearcom(); TJ = 2; com[16] = -1;}			//SW_BUS#,SW_BUS#
				if(judge(Port[6],Port[96])){com[17] = -1;}			            //CEL#,CEL#
				refreshLighty(rect[counti].number);
				clearRect();
				rectflag[20] = 1;
				clearCanvas();canvasApp();if(flag==1)drawp();
			}
			if(counti == 3)
			{
				if(judge(Port[28],Port[28])){clearcom();com[13] = -1;}			//LDIR,LDIR
				if(judge(Port[28],Port[99])){com[7] = -1;}			//LDIR,CER	
				refreshLighty(rect[counti].number);
				clearRect();zrectflag[3] = 1;
				clearCanvas();canvasApp();if(flag==1)drawp();
			}
			if(counti == 4 && judgeTime100(counti , TJ))						//RS_BUS#,RS_BUS#
			{
				if(judge(Port[39],Port[107]))
				{
					clearcom();
					if(judge(Port[3] , Port[33]))
					{
						clearTimeout(_time);
						TJ = 4;
					}
					com[18] = -1;				
				}			
				refreshLighty(rect[counti].number);
				clearRect();zrectflag[6] = 1;
				clearCanvas();canvasApp();if(flag==1)drawp();
			}	
			counti++;           
        }, 1000)
	}
}



function showtime2()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");	
	if((Switch[24].value == false) && (Switch[25].value == false) && (Switch[26].value == false))             		//000
	{	
		var rect ;
		if(IR1 == 0) rect = createRect000();if(IR1 == 1) rect = createRect0001();
		if(IR1 == 2) rect = createRect0010();if(IR1 == 3) rect = createRect0011();
		if(IR1 == 4) rect = createRect0100();if(IR1 == 5) rect = createRect0101();
		if(IR1 == 6) rect = createRect0110();if(IR1 == 8) rect = createRect1000();
		if(IR1 == 9) rect = createRect1001();if(IR1 == 10) rect = createRect1010();
		if(IR1 == 11) rect = createRect1011();if(IR1 == 12) rect = createRect1100();
		
		setTimeout(function () {
		if(count2 == rect.length)
			count2 = 2; 
		if((t2 == 0))
			clearTimeout(_time);
		
		if(count2 == 1)
		{
			refreshLighty(rect[count2].number);
			if(judge(Port[40],Port[122])){clearcom();com[16] = -1;}			//SW_BUS#,SW_BUS#
			if(judge(Port[13],Port[102])){com[14] = -1;}					//LDPC,LDR4
			if(judge(Port[23],Port[101])){com[15] = -1;}					//M4,M4
			if(judge(Port[13],Port[114])){com[12] = -1;}					//LDPC,LDPC
			clearRect();rectflag[14] = 1;	
			
		}
		if(count2 == 2)
		{
			if(judge(Port[28],Port[99])){clearcom();com[7] = -1;}				//LDIR,CER
			if(judge(Port[115],Port[11])){com[13] = -1;}						//PC_INC,PC_INC		
			if(judge(Port[25],Port[104])){com[10] = -1;}						//LDAR1,LDAR2
			if(judge(Port[28],Port[110])){com[13] = -1;IR.running()}			//LDIR,LDIR
			refreshLighty(rect[count2].number);refreshLightp(2);
			clearRect();lrectflag[3] = 1;
			diamondRedOrBlack[2] = 0;
			PC.running();			
		}
		if(count2 == 3)
		{
			refreshLighty(rect[count2].number);
			clearRect();
			if(IR1 <= 3 && IR1 >= 0)
			{			
				if(judge(Port[19],Port[71])){clearcom();com[0] = -1;}						//LDDR1,LDDR2
				if(judge(Port[19],Port[73])){com[1] = -1;}						//LDDR1,LDDR1
				if(IR1 == 0)rectflag[0] = 1;
				if(IR1 == 1)rectflag[1] = 1;
				if(IR1 == 2)rectflag[2] = 1;
				if(IR1 == 3)rectflag[3] = 1;
			}
			if(IR1 == 4)
			{
				if(judge(Port[19],Port[71])){clearcom();com[0] = -1;}						//LDDR1,LDDR2
				if(judge(Port[25],Port[119])){com[1] = -1;}									//LDAR1,LDAR1
				if(judge(Port[39],Port[107])){com[18] = -1;}								//RS_BUS#,RS_BUS#
				lrectflag[0] = 1
			}
			if(IR1 == 5)
			{
				if(judge(Port[39],Port[107])){com[18] = -1;}								//RS_BUS#,RS_BUS#
				if(judge(Port[25],Port[119])){com[8] = -1;}									//LDAR1,LDAR1
				rectflag[4] = 1;
			}		
			if(IR1 == 6)
			{
				srectflag[3] = 1;
			}
			if(IR1 == 8)
			{
				rectflag[10] = 1;
			}
			if(IR1 == 9)
			{
				if(judge(Port[13],Port[114])){clearcom();com[12] = -1;}					//LDPC,LDPC
				if(judge(Port[13],Port[102])){com[14] = -1;}							//LDPC,LDR4
				srectflag[0] = 1; 
			}
			if(IR1 == 10)
			{
				rectflag[11] = 1;
			}
			if(IR1 == 11)
			{
				srectflag[1] = 1; 
			}
			if(IR1 == 12)
			{
				srectflag[2] = 1; 
			}
		}
		if(count2 == 4 && (IR1 >= 0 && IR1 <=5 || IR1 == 9))
		{
			refreshLighty(rect[count2].number);
			clearRect();
			if(IR1 <= 3 && IR1 >= 0)
			{
				if(judge(Port[21],Port[77])){clearcom();com[6] = -1;}			//ALU_BUS#
				if(judge(Port[42],Port[69])){com[5] = -1;}						//LDER		
				if(IR1 == 0)rectflag[5] = 1;
				if(IR1 == 1)rectflag[6] = 1;
				if(IR1 == 2)rectflag[7] = 1;
				if(IR1 == 3)rectflag[8] = 1;
			}
			if(IR1 == 4)
			{
				if(judge(Port[21],Port[77])){clearcom();com[6] = -1;}			//ALU_BUS#
				if(judge(Port[6],Port[96])){clearcom();com[17] = -1;}			//CEL#,CEL#
				if(judge(Port[5],Port[98])){com[32] = -1;}						//LRW,LRW
				lrectflag[1] = 1;
			}
			if(IR1 == 5)
			{
				if(judge(Port[6],Port[96])){clearcom();com[17] = -1;}			//CEL#,CEL#
				if(judge(Port[5],Port[98])){com[32] = -1;}						//LRW,LRW
				if(judge(Port[42],Port[69])){com[5] = -1;}						//LDER		
				rectflag[9] = 1;
			}
			if(IR1 == 9)
			{
				if(judge(Port[13],Port[114])){clearcom();com[12] = -1;}					//LDPC,LDPC
				if(judge(Port[13],Port[102])){com[14] = -1;}					//LDPC,LDR4
				lrectflag[2] = 1;
			}
		}

		if(count2 == 5 && ( (IR1 >= 0 && IR1 <=3) || (IR1 == 5) ) )
		{
			if(judge(Port[4],Port[91]))	{clearcom();com[4] = -1;}				//WRD
			refreshLighty(rect[count2].number);
			clearRect();srectflag[4] = 1;
		}
		if(count2 == 6)
		{
			refreshLightp(1);
			if(judge(Port[25],Port[104])){clearcom();com[10]=-1;}				//LDAR1,LDAR2
			refreshLighty(rect[count2].number);
			clearRect();srectflag[5] = 1;
			diamondRedOrBlack[1] = 0;
		}      
        }, speed)	
        clearCanvas();if(flag==1)drawp();canvasApp();if(flag==1)drawp();
	}

	
	if((Switch[24].value == false) && (Switch[25].value == false) && (Switch[26].value == true))     					//001
	{	
		var rect = createRect001();
		
		setTimeout(function () 
		{
			if(count2 == rect.length)
				count2 = 2;
			if(count2 == 1)
			{
				if(judge(Port[40],Port[122])){clearcom();com[16] = -1;}										//SW_BUS#,SW_BUS#
				if(judge(Port[25],Port[119])){com[8] = -1;}													//LDAR1,LDAR1
				if(judge(Port[25],Port[104])){com[10] = -1;}												//LDAR1,LDAR2
				refreshLighty(rect[count2].number);
				clearPort();                                                                               //控制端口“L”,"H"
				Port[40].value = false; Port[25].value = true; 
				clearRect();rectflag[15] = 1;
			}
			if(count2 == 2)
			{
				if(judge(Port[6],Port[96])){clearcom();com[17] = -1;}										//CEL#,CEL#
				if(judge(Port[5],Port[98])){com[32] = -1;}													//LRW,LRW
				refreshLighty(rect[count2].number);
				clearPort();                                                                               //控制端口“L”,"H"
				Port[6].value = false; Port[5].value = true;
				clearRect();rectflag[17] = 1;
			}
			if(count2 == 3)
			{
				AR1.running();
				clearcom();
				refreshLighty(rect[count2].number);
				
				clearRect();zrectflag[0] = 1;			
			}    
			clearCanvas();if(flag==1)drawp();canvasApp();if(flag==1)drawp();	
        }, speed)	
        
	}
	
	if((Switch[24].value==false)&&(Switch[25].value==true)&&(Switch[26].value==false))						//010
	{
		var rect = createRect010();
		setTimeout(function () 
		{
			if(count2 == rect.length) 
				count2 = 2;
			if(count2 == 1 )
			{
				if(judge(Port[27],Port[118])){clearcom();com[16] = -1;}	 											//SW_BUS#,SW_BUS#
				if(judge(Port[25],Port[119])){com[8] = -1;}													//LDAR1,LDAR1
				if(judge(Port[25],Port[104])){com[10] = -1;}												//LDAR1,LDAR2
				refreshLighty(rect[count2].number);
				clearRect();rectflag[16] = 1;
				if(TJ != 0)t2 = 0;
			}
			if(count2 == 2)
			{
				if(judge(Port[27],Port[118])){clearcom();com[16] = -1;}					 							//SW_BUS#,SW_BUS#
				if(judge(Port[6],Port[96])){com[17] = -1;}													//CEL#,CEL#
				if(judge(Port[5],Port[98])){com[32] = 1;}													//LRW,LRW
				refreshLighty(rect[count2].number);
				clearRect();rectflag[18] = 1;
			}		
			if(count2 == 3)
			{
				Port[118].value = true;
				if(judge(Port[27],Port[118]))																//AR1_INC,AR1_INC
				{
					clearTimeout(_time);clearcom();TJ =3;
					AR1.running();
				}	
				refreshLighty(rect[count2].number);
				clearRect();zrectflag[1] = 1;				
			}  
			clearCanvas();if(flag==1)drawp();canvasApp();if(flag==1)drawp();
        }, speed)
	}
	
	if((Switch[24].value == false) && (Switch[25].value == true) && (Switch[26].value == true))						//011
	{	
		var rect = createRect011();
		setTimeout(function () 
		{
			if(count2 == rect.length)
				count2 = 2;
			if(count2 == 1)
			{
				if(judge(Port[27],Port[118])){clearTimeout(_time);TJ = 1;clearcom();com[16] = -1;}	 			//SW_BUS#,SW_BUS#
				if(judge(Port[25],Port[119])){com[8] = -1;}														//LDAR1,LDAR1
				if(judge(Port[25],Port[104])){com[10] = -1;}													//LDAR1,LDAR2
				if(judge(Port[22],Port[103])){com[9] = -1;}														//M3,M3
				//if(judge(Port[3],Port[33]))																	//TJ,TJ1
				refreshLighty(rect[count2].number);clearCanvas();
				clearRect();
				lrectflag[4] = 1;
				canvasApp();if(flag==1)drawp();
				if(TJ != 0)t2 = 0;	
			}
			if(count2 == 2)
			{
				if(judge(Port[27],Port[118])){clearcom();com[16] = -1;}											//SW_BUS#,SW_BUS#
				if(judge(Port[6],Port[96])){com[17] = -1;}														//CEL#,CEL#
				if(judge(Port[5],Port[98])){com[32] = 1;}														//LRW,LRW
				refreshLighty(rect[count2].number);
				clearRect();rectflag[19] = 1;
				clearCanvas();canvasApp();if(flag==1)drawp();
			}
		
			if(count2 == 3)
			{
				if(judge(Port[28],Port[99])){clearTimeout(_time);TJ = 3;clearcom();com[7] = -1;}				//LDIR,CER
				if(judge(Port[28],Port[28])){com[13] = -1;}														//LDIR,LDIR
				refreshLighty(rect[count2].number);
				clearRect();zrectflag[2] = 1;
				clearCanvas();canvasApp();if(flag==1)drawp();
			}
			if(count2 == 4)
			{
				if(judge(Port[27],Port[118])){clearcom();com[16] = -1;}											//SW_BUS#,SW_BUS#
				if(judge(Port[42],Port[69])){com[5] = -1;}														//LDER
				refreshLighty(rect[count2].number);
				clearRect();zrectflag[4] = 1;
				clearCanvas();canvasApp();if(flag==1)drawp();
			}
			if(count2 == 5)
			{
				if(judge(Port[4],Port[91]))	{clearTimeout(_time);TJ = 5;clearcom();com[4] = -1;}				//WRD
				refreshLighty(rect[count2].number);
				clearRect();zrectflag[5] = 1;
				clearCanvas();canvasApp();if(flag==1)drawp();
			}		        
        }, speed)
	}
	
	if((Switch[24].value == true) && (Switch[25].value == false) && (Switch[26].value == false))						//100
	{
		setTimeout(function () 
		{
			var rect = createRect100();
			if(count2 == rect.length)
				count2 = 2;
			if(count2 == 1)
			{
				if(judge(Port[27],Port[118])){clearcom();com[16] = -1;}	 		//SW_BUS#,SW_BUS#
				if(judge(Port[25],Port[119])){com[8] = -1;}			//LDAR1,LDAR1
				if(judge(Port[25],Port[104])){com[10] = -1;}			//LDAR1,LDAR2
				if(judge(Port[22],Port[103])){com[9] = -1;}			//M3,M3		
				refreshLighty(rect[count2].number);
				clearRect();
				lrectflag[5] = 1;
				clearCanvas();canvasApp();if(flag==1)drawp();
			}
			if(count2 == 2)
			{
				if(judge(Port[27],Port[118])){clearcom();com[16] = -1;}			//SW_BUS#,SW_BUS#
				if(judge(Port[6],Port[96])){com[17] = -1;}						//CEL#,CEL#
				refreshLighty(rect[count2].number);
				clearRect();
				rectflag[20] = 1;
				clearCanvas();canvasApp();if(flag==1)drawp();
			}
			if(count2 == 3)
			{
				if(judge(Port[28],Port[28])){clearcom();com[13] = -1;}			//LDIR,LDIR
				if(judge(Port[28],Port[99])){com[7] = -1;}			//LDIR,CER	
				refreshLighty(rect[count2].number);
				clearRect();zrectflag[3] = 1;
				clearCanvas();canvasApp();if(flag==1)drawp();
			}
			if(count2 == 4)
			{
				if(judge(Port[39],Port[107])){clearcom();com[18] = -1;}			//RS_BUS#,RS_BUS#
				refreshLighty(rect[count2].number);
				clearRect();zrectflag[6] = 1;
				clearCanvas();canvasApp();if(flag==1)drawp();
			}	        
        }, speed)
	}
	
}


function createRect000()				
{
	var rect = [
	{"number":"07"},{"number":"07"},{"number":"05"},
	{"number":"10"},{"number":"3B"},{"number":"34"},
	{"number":"0F"},
	];	
	return rect;
}
function createRect001()				
{
	var rect = [
	{"number":"17"},{"number":"17"},
	{"number":"3F"},{"number":"3E"},
	];	
	return rect;
}
function createRect010()				
{
	var rect = [
	{"number":"27" },{"number":"27"},
	{"number":"3D"},{"number":"3C"},
	];	
	return rect;
}
function createRect011()				
{
	var rect = [
	{"number":"37"},{"number":"37" },{"number":"33" },
	{"number":"32"},{"number":"31" },{"number":"30"},
	];	
	return rect;
}
function createRect100()				
{
	var rect = [
	{"number":"47"},{"number":"47"},{"number":"46"},
	{"number":"45"},{"number":"44"},
	];	
	return rect;
}
function createRect0001()	
{
	var rect = [
	{"number":"07"},{"number":"07"},{"number":"05"},
	{"number":"11"},{"number":"3A"},{"number":"34"},
	{"number":"0F"},
	];	
	return rect;
}
function createRect0010()	
{
	var rect = [
	{"number":"07"},{"number":"07"},{"number":"05"},
	{"number":"12"},{"number":"39"},{"number":"34"},
	{"number":"0F"},
	];	
	return rect;
}
function createRect0011()	
{
	var rect = [
	{"number":"07"},{"number":"07"},{"number":"05"},
	{"number":"13"},{"number":"38"},{"number":"34"},
	{"number":"0F"},
	];	
	return rect;
}
function createRect0101()	
{
	var rect = [
	{"number":"07"},{"number":"07"},{"number":"05"},
	{"number":"15"},{"number":"36"},{"number":"34"},
	{"number":"0F"},
	];	
	return rect;
}

function createRect0100()	
{
	var rect = [
	{"number":"07"},{"number":"07"},{"number":"05"},
	{"number":"14"},{"number":"35" },{"number":"34"},
	{"number":"0F"},
	];	
	return rect;
}
function createRect1000()	
{
	var rect = [
	{"number":"07"},{"number":"07"},{"number":"05"},
	{"number":"18"},{"number":"35" },{"number":"34"},
	{"number":"0F"},
	];	
	return rect;
}
function createRect1001()	
{
	var rect = [
	{"number":"07"},{"number":"07"},{"number":"05"},
	{"number":"19"},{"number":"1F"},{"number":"34"},
	{"number":"0F"},
	];	
	return rect;
}
function createRect0110()	
{
	var rect = [
	{"number":"07"},{"number":"07"},{"number":"05"},
	{"number":"16"},{"number":"1F"},{"number":"34"},
	{"number":"0F"},
	];	
	return rect;
}
function createRect1010()	
{
	var rect = [
	{"number":"07"},{"number":"07"},{"number":"05"},
	{"number":"1A"},{"number":"1F"},{"number":"34"},
	{"number":"0F"},
	];	
	return rect;
}
function createRect1011()	
{
	var rect = [
	{"number":"07"},{"number":"07"},{"number":"05"},
	{"number":"1B"},{"number":"1F"},{"number":"34"},
	{"number":"0F"},
	];	
	return rect;
}
function createRect1100()	
{
	var rect = [
	{"number":"07"},{"number":"07"},{"number":"05"},
	{"number":"1C"},{"number":"1F"},{"number":"34"},
	{"number":"0F"},
	];	
	return rect;
}
function judge(a,b)
{
	a.value = true;
	b.value = true;
	for(var i = 1; i <Wire.length; i++)	
	{
		if((Wire[i].theStartPoint.name == a.name && Wire[i].theEndPoint.name ==b.name)||
		(Wire[i].theEndPoint.name == a.name && Wire[i].theStartPoint.name ==b.name))
		{
			return true;
		}		
	}
	return false;
}
function clearcom()
{
	for(var i=0; i <=19; i++)
	{
		com[i] = 1;
	}
	com[32] = 1;
}

function judgeTime(count,tj)
{
	switch(count)
	{
		case 1:
			if(TJ == 1 || TJ == 3 || TJ == 5)
				return false;
			break;
		case 2:
			if(TJ == 2 || TJ == 3 )
				return false;
			break;
		case 3:
			if(TJ == 3 || TJ == 4)
				return false;
			break;
		case 5:
			if(TJ == 5)
				return false;
			break;
	}
	return true;
}

function judgeTime010(count,TJ)
{
	switch(count)
	{
		case 1:
			if(TJ == 1 || TJ == 3)
				return false;
			break;
		case 3:
			if(TJ == 3)
				return false;
			break;
	}
	return true;
}

function judgeTime100(count,TJ)
{
	switch(count)
	{
		case 1:
			if(TJ == 1 || TJ == 4)
				return false;
			break;
		case 4:
			if(TJ == 4)
				return false;
			break;
	}
	return true;
}

function MF()
{
	setTimeout(function () 
	{
		
		Port[16].value = -Port[16].value;
		clearCanvas();
		canvasApp();
		if(flag==1)drawp();   
		setTimeout(arguments.callee, speed);
    }, 1000)
}


function showT()
{
	var count = 0;
	var t1_t4;
	clearT1T4();
	setTimeout(function () 
	{		
		clearT1T4();
		t1_t4 = setTimeout(arguments.callee, speed);
		if(count == 3)
			clearTimeout(t1_t4);
		Port[62-count].value = true;
		clearCanvas();	
		canvasApp();
		if(flag==1)drawp();  
		count++;
    }, 1000)
}

function clearT1T4()
{
	for(var i = 59; i < 63; i++)
	{
		Port[i].value = false;
	}
}
