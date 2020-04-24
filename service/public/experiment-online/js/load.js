function drawDataroad(id,erflag,sw,lder,drm)
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	context.fillStyle = "#ffffaa";
	context.fillRect(expBox_x,0,expBox_long,expBox_Height/4*3);//数据通路背景
	
	var load_x = expBox_long/6;
	var load_y = expBox_Height/8;
	var tlong = expBox_long/8;
	var t = expBox_Height/15;
	
	context.lineWidth = 1;																		//ALU
	context.beginPath();
	context.strokeStyle="black";
	context.moveTo(load_x+t,load_y);;
	context.lineTo(load_x+t+tlong,load_y);
	context.stroke();	
	context.moveTo(load_x,load_y+t);
	context.lineTo(load_x+tlong+2*t,load_y+t);
	context.stroke();	
	context.moveTo(load_x+t,load_y);
	context.lineTo(load_x,load_y+t);
	context.stroke();
	context.moveTo(load_x+t+tlong,load_y);
	context.lineTo(load_x+tlong+2*t,load_y+t);
	context.stroke();
	context.font = "23px Courier New";
    context.fillStyle = "black";
    context.fillText("ALU", load_x+2.5*t,load_y+0.4*t);										
    context.fillRect(load_x+t*6.08,0.8*t,tlong/3,t*0.6);
    context.moveTo(load_x+t*6.6,1.4*t); context.lineTo(load_x+t*6.6,1.7*t); context.stroke();
    context.save();
    context.font = "9px Courier New";
	context.translate(load_x+t*6.8,2.3*t);
	context.rotate(Math.PI/2);
	context.fillText("ALU_BUS#",0,0);
	context.restore();
	context.save();
	 context.font = "11px Courier New";
    context.fillStyle="red";
    context.fillText("0",load_x+t*6.6,2.9*t);
  	context.restore();
    
    context.moveTo(load_x+5,load_y+t*0.5);														//ALU左边
    context.lineTo(load_x+t*0.5,load_y+t*0.5);
    context.font = "12px Courier New";
    context.fillText("s0",load_x-34,load_y+0.3*t);
    context.fillText("s1",load_x-17,load_y+0.3*t);
    context.fillText("s2",load_x-2,load_y+0.3*t);
    context.fillStyle = "red";
    context.fillText("0",load_x-34,load_y+0.1*t);
    context.fillText("0",load_x-17,load_y+0.1*t);
    context.fillText("0",load_x-2,load_y+0.1*t);

    context.fillStyle = "black";															//ALU上面管道
    context.moveTo(load_x+t*2,load_y);
    context.lineTo(load_x+t*2,0.8*t);														
    context.lineTo(load_x+t*12.5,0.8*t);
    context.lineTo(load_x+t*12.5,1.84*t);
    context.moveTo(load_x+t*3,load_y);
    context.lineTo(load_x+t*3,1.4*t);
    context.lineTo(load_x+t*7,1.4*t);
    context.lineTo(load_x+t*7,load_y+2.39*t);
    
    context.strokeRect(load_x+t*7,load_y-1.8*t,t,t*0.5);									//最上面小方块
    context.moveTo(load_x+t*7.3,load_y-1.3*t);
    context.lineTo(load_x+t*7.5,load_y-1.1*t);
    context.lineTo(load_x+t*7.7,load_y-1.3*t);
    context.strokeStyle="#ffffaa";
    
    context.strokeStyle="black";
    context.moveTo(load_x+t*11.6,1.84*t);													//RAM到AR1左管道
    context.lineTo(load_x+t*11.6,1.4*t);
    context.lineTo(load_x+t*8,1.4*t);
    context.lineTo(load_x+t*8,4.3*t);
    context.lineTo(load_x+t*12.7,4.3*t);
    context.lineTo(load_x+t*12.7,4.6*t);
    context.lineTo(load_x+t*8,4.6*t);
    context.lineTo(load_x+t*8,4.9*t);
    context.lineTo(load_x+t*14.8,4.9*t);
    context.lineTo(load_x+t*14.8,4.3*t);
    context.fillRect(load_x+t*7.98,0.8*t,tlong/3,t*0.6);									//黑块
    context.moveTo(load_x+t*8.4,0.8*t);
    context.lineTo(load_x+t*8.4,1.7*t);
    context.save();
    context.fillStyle="red";
    context.fillText("1",load_x+t*8.4,2.35*t);
  	context.restore();
  	context.save();
	context.translate(load_x+t*8.58,2.05*t);
	context.rotate(Math.PI/2);
	context.fillText("CEL#",0,0);
	context.restore();

    context.moveTo(load_x+t*15,1.84*t)													   //RAM到IR之间管道
	context.lineTo(load_x+t*15,0.8*t);
	context.lineTo(load_x+t*19,0.8*t);													   //外
	context.lineTo(load_x+t*19,10.7*t);
	context.lineTo(load_x+t*16.15,10.7*t);
	context.moveTo(load_x+t*15.8,1.84*t);                                                  //内
	context.lineTo(load_x+t*15.8,1.3*t);
	context.lineTo(load_x+t*18.4,1.3*t);
	context.lineTo(load_x+t*18.4,10.3*t);
	context.lineTo(load_x+t*16.15,10.3*t);
	
	context.strokeStyle = "black";
	context.strokeRect(load_x+t/2,load_y+t,tlong/3,t/2.1);
	context.strokeRect(load_x+3.5*t,load_y+t,tlong/3,t/2.1);
	
	context.strokeStyle = "black";
	
	context.strokeRect(load_x,load_y+t*3/2,tlong*2/3,t*2/3);								//DR1
	context.fillText("DR1", load_x+4.38*t,load_y+1.54*t);
	context.fillStyle = "gray";
	context.fillRect(load_x+0.1*t,load_y+t*1.62,0.8*t,0.4*t);
	
	
	context.strokeRect(load_x+tlong*18/17,load_y+t*3/2,tlong*2/3,t*2/3);					//DR2
	context.fillText(drm[13], load_x+1.4*t,load_y+1.54*t);
	context.fillRect(load_x+tlong*1.1,load_y+t*1.62,0.8*t,0.4*t);
	
	context.fillStyle = "black";
	context.font = "15px Courier New";
	context.strokeRect(load_x+t/2,load_y+t*3/2+t*2/3,tlong/3,t*2.05);						//DR2下管道
	context.fillRect(load_x+t/2,load_y+t*3/2+t*2/3,tlong/3,t*0.25);		
	context.save();context.fillStyle = "red";
	context.fillText("0",load_x-25,load_y+2.92*t);		context.restore();
	context.fillText("M2",load_x-5,load_y+2.92*t);
	context.moveTo(load_x+5,load_y+3.1*t);
	context.lineTo(load_x+t*0.5,load_y+3.1*t);
	drawtranangle(4.55*t,5.2*t,4.4*t,5.4*t,4.7*t,5.4*t);									//三角形
	drawtranangle(4.95*t,5.2*t,4.8*t,5.4*t,5.10*t,5.4*t);
	context.fillText("A",load_x+t,load_y+t*3.8);
	context.moveTo(load_x+t/2,load_y+2.3*t);
	context.lineTo(load_x+10,load_y+2.3*t);
	context.font = "12px Courier New";
	context.fillText("LDDR2",load_x-10,load_y+2.15*t);context.save();context.fillStyle = "red";
	context.fillText("0",load_x-35,load_y+2.15*t); context.restore();
	
	context.moveTo(load_x+t*3.5,load_y+2.39*t);												//DR1,AR1之间		
	context.lineTo(load_x+t*7,load_y+2.39*t);
	context.moveTo(load_x+t*3.5,load_y+2.75*t);														
	context.lineTo(load_x+t*7,load_y+2.75*t);
	context.fillRect(load_x+t*4.43,load_y+2.39*t,tlong/3,t*0.38);
	
						
	
	context.strokeRect(load_x+t*3.5,load_y+t*3/2+t*2/3,tlong/3,t*2.05);         			//DR1下管道
	context.fillRect(load_x+t*3.5,load_y+t*3/2+t*2/3,tlong/3,t*0.25);
	context.fillText("M1",load_x+t*2.8,load_y+t*2.35);context.save();context.fillStyle = "red";
	context.fillText("0",load_x+t*2.46,load_y+t*2.35); context.restore();
	context.moveTo(load_x+t*3,load_y+2.5*t);
	context.lineTo(load_x+t*3.5,load_y+2.5*t);
	drawtranangle(7.55*t,4.67*t,7.4*t,4.87*t,7.7*t,4.87*t);									//三角形
	drawtranangle(7.95*t,4.67*t,7.80*t,4.87*t,8.10*t,4.87*t);			
	context.fillText("B",load_x+t*4,load_y+t*3.8);
	context.moveTo(load_x+t*3.5+tlong/3,load_y+2.3*t);
	context.lineTo(load_x+t*5,load_y+2.3*t);
	context.font = "12px Courier New";
	context.fillText("LDDR1",load_x+t*5.4,load_y+2.1*t);context.save();context.fillStyle = "red";
	context.fillText("0",load_x+t*5.9,load_y+2.1*t);context.restore();
	
	
	context.font = "23px Courier New";
	context.strokeRect(load_x+t*1.462,t*4.8,tlong*0.72,t/3);								//两个T3之间
	context.fillRect(load_x+t*1.462,t*4.8,tlong/3,t*0.315);
	
	context.strokeRect(load_x,load_y+4.2*t,tlong+2*t,1.5*t);								//RF
	context.fillText("RF",load_x+2.5*t,load_y+4.22*t);
	context.fillStyle = "gray";
	context.fillRect(load_x+t*0.7,load_y+4.9*t,0.8*t,0.4*t);
	context.fillRect(load_x+t*1.6,load_y+4.9*t,0.8*t,0.4*t);
	context.fillRect(load_x+t*2.5,load_y+4.9*t,0.8*t,0.4*t);
	context.fillRect(load_x+t*3.4,load_y+4.9*t,0.8*t,0.4*t);
	
	context.fillStyle = "black";
	context.strokeRect(load_x+t*2,load_y+5.7*t,tlong/3,t*0.8);
	context.fillRect(load_x+t*2,load_y+5.7*t,tlong/3,t*0.3);
	
	context.strokeRect(load_x+1.5*t,load_y+6.5*t,tlong*2/3,t*2/3);							//ER
	context.fillText("ER",load_x+3*t,load_y+6.6*t)
	if(erflag == 1)
	context.fillText(id,load_x+2*t,load_y+6.6*t);
	else
	context.fillText("00",load_x+2*t,load_y+6.6*t);
	
	
	context.strokeRect(load_x+t*2,load_y+7.18*t,tlong/3,t*0.81);
	
	context.strokeRect(load_x+1.5*t,load_y+8*t,tlong*2/3,t*2/3);							//SW
	//alert(id);
	context.fillText(id,load_x+2*t,load_y+8.1*t)
	context.fillText("SW",load_x+3*t,load_y+8.1*t)
	
	context.fillRect(load_x+t*2,load_y+7.75*t,tlong/3,t*0.25)                           	//SW上面的小黑块
	context.moveTo(load_x+t*1.5,load_y+7.9*t);
	context.lineTo(load_x+t*2,load_y+7.9*t);
	context.font = "15px Courier New";
	context.fillText("SW_BUS#",load_x+0.8*t,load_y+7.7*t);
	context.save();  context.fillStyle = "red";
	context.fillText("1",load_x,load_y+7.7*t);	context.restore();
	context.fillRect(load_x+t*2,load_y+7.15*t,tlong/3,t*0.25)								//T4(LERD)
	context.moveTo(load_x+t*2,load_y+7.3*t);
	context.lineTo(load_x+t*1.5,load_y+7.3*t);
	context.fillText("LDER",load_x+t,load_y+7.1*t);
	context.save();
	context.fillStyle = "red";
	context.fillText("0",load_x+20,load_y+7.1*t);
	context.restore();
	
	context.moveTo(load_x+2.9*t,load_y+7.4*t);												//SW到DR1下面管道
	context.lineTo(load_x+7*t,load_y+7.4*t);
	context.lineTo(load_x+7*t,load_y+3.3*t);
	context.lineTo(load_x+4.45*t,load_y+3.3*t);
	
	context.font = "23px Courier New";
	context.strokeRect(15*t,load_y,tlong+2*t,t);											//RAM
	context.fillText("RAM",17.3*t,1.15*load_y);
	context.font = "13px Courier New";
	context.fillText("数据端",load_x+12*t,load_y+0.1*t);
	context.fillText("指令端",load_x+15.5*t,load_y+0.1*t);
	
	context.strokeRect(15.5*t,load_y+t,t,t*0.48);											//RAM到AR1之间
	context.strokeRect(18.5*t,load_y+t,t,t*0.48);
	
	context.moveTo(load_x+t*12.5,1.84*t)													//RAM到IR之间管道
	context.lineTo(load_x+t*12.5,0.8*t);
	context.stroke();
	
	context.font = "23px Courier New";
	context.strokeRect(15*t,load_y+t*3/2,tlong*2/3,t*2/3);									//AR1
	context.fillStyle = "gray";
	context.fillRect(15.15*t,load_y+t*1.65,t*0.75,t*0.4);
	context.fillStyle = "black";
	context.fillRect(load_x+t*11.92,4.05*t,0.8*t,0.25*t); 
	
	context.strokeRect(18*t,load_y+t*3/2,tlong*2/3,t*2/3);									//AR2
	context.fillStyle = "gray";
	context.fillRect(18.15*t,load_y+t*1.65,t*0.75,t*0.4);
	context.fillStyle = "black";
	context.fillRect(load_x+t*14.78,4.05*t,0.9*t,0.28*t);
	context.fillText("AR1",16.4*t,load_y+t*1.6);	
	context.fillText("AR2",19.4*t,load_y+t*1.6);	
	
	context.strokeRect(15*t,load_y+t*3.5,tlong*2/3,t*2/3)									//IAR
	context.fillText("IAR",16.3*t,load_y+t*3.62);
	context.moveTo(15*t,load_y+t*3.7);														//IAR左
	context.lineTo(11.7*t,load_y+t*3.7);
	context.moveTo(15*t,load_y+t*4);																		
	context.lineTo(11.7*t,load_y+t*4);
	context.fillRect(11.7*t,load_y+t*3.7,t*0.7,t*0.3);context.save();
	context.font = "9px Courier New";
	context.translate(12.2*t,load_y+t*5);
	context.rotate(Math.PI/2);
	context.fillText("IAR_BUS#",0,0);context.restore();
	context.moveTo(12.05*t,load_y+t*4);context.lineTo(12.05*t,load_y+t*4.42);
	context.save();context.fillStyle = "red";context.font="9px Courier New";
	context.fillText("1",12.05*t,load_y+t*5.6);context.restore();
	
	context.moveTo(10.75*t,load_y+t*3.7);														
	context.lineTo(8.18*t,load_y+t*3.7);
	context.moveTo(10.75*t,load_y+t*4);																		
	context.lineTo(8.18*t,load_y+t*4);
	context.fillRect(10.07*t,load_y+t*3.7,t*0.7,t*0.3);context.save();
	context.font = "9px Courier New";
	context.translate(10.54*t,load_y+t*5);
	context.rotate(Math.PI/2);
	context.fillText("RS_BUS#",0,0);context.restore();
	context.moveTo(10.4*t,load_y+t*4);context.lineTo(10.4*t,load_y+t*4.42);
	context.save();context.fillStyle = "red";context.font="9px Courier New";
	context.fillText("1",10.4*t,load_y+t*5.6);context.restore();
	
	context.strokeRect(18*t,load_y+t*4.3,tlong*2/3,t*2/3);										//PC
	context.fillText("PC",19.3*t,load_y+t*4.4);
	context.fillRect(18.6*t,load_y+t*4.95,t*0.8,t*0.25);
	
	context.moveTo(18.5*t,load_y+t*5.2);														//ALU2
	context.lineTo(19.5*t,load_y+t*5.2);
	context.stroke();	
	context.moveTo(18*t,load_y+t*5.7);
	context.lineTo(20*t,load_y+t*5.7);
	context.stroke();
	context.moveTo(18.5*t,load_y+t*5.2);
	context.lineTo(18*t,load_y+t*5.7);
	context.stroke();
	context.moveTo(19.5*t,load_y+t*5.2);
	context.lineTo(20*t,load_y+t*5.7);
	context.stroke();		
	context.font = "18px Courier New";
	context.fillText("ALU2",19*t,load_y+t*5.25);
	
	context.font = "23px Courier New";
	context.strokeRect(18*t,load_y+t*6.3,tlong*2/3,t*2/3);										 //R4
	context.fillText("R4",19.4*t,load_y+t*6.4);
	context.fillRect(18.7*t,load_y+t*6.98,t*0.8,t*0.31);
	
	context.strokeRect(18*t,load_y+t*8.3,tlong*2/3,t*2/3);										 //IR
	context.fillText("IR",19.4*t,load_y+t*8.4)
	
	context.strokeRect(13*t,load_y+t*8.1,tlong,t);												//控制器
	context.fillText("控制器", 14.4*t,load_y+8.35*t);											//DR1	
	
	context.moveTo(load_x+2.9*t,load_y+7.75*t);													//ER到R4
	context.lineTo(load_x+15*t,load_y+7.75*t);
	context.lineTo(load_x+15*t,load_y+8.3*t);	
	context.fillRect(load_x+14*t,load_y+7.32*t,t,t*0.42);
	
	context.moveTo(16.9*t,load_y+t*3.7);                                                        //IAR到IR
	context.lineTo(18.5*t,load_y+t*3.7);
	context.lineTo(18.5*t,load_y+t*3.35);
	context.lineTo(11.7*t,load_y+t*3.35);
	context.lineTo(11.7*t,load_y+t*7.3);
	context.lineTo(19.5*t,load_y+t*7.3);
	context.lineTo(19.5*t,load_y+t*8.3);
	
	context.moveTo(16.9*t,load_y+t*4);                                                          //IAR到PC
	context.lineTo(18.5*t,load_y+t*4);	
	context.lineTo(18.5*t,load_y+t*4.3);
	
	context.moveTo(10.75*t,4.64*t);
	context.lineTo(10.75*t,4.87*t);
	context.lineTo(8.2*t,4.87*t);
	context.stroke();
	
	context.strokeRect(18.5*t,load_y+t*5.7,t*0.3,t*0.6);										//ALU2到R4
	
	context.moveTo(19.5*t,load_y+t*5.7);														//ALU2到PC
	context.lineTo(19.5*t,load_y+t*5.9);
	context.lineTo(20.5*t,load_y+t*5.9);
	context.lineTo(20.5*t,load_y+t*4);
	context.lineTo(19.37*t,load_y+t*4);
	context.lineTo(19.37*t,load_y+t*4.28);
	
	context.moveTo(19.2*t,load_y+t*5.7);														//ALU2到AR2
	context.lineTo(19.2*t,load_y+t*6.1);
	context.lineTo(20.8*t,load_y+t*6.1);
	context.lineTo(20.8*t,load_y+t*3.7);
	context.lineTo(19.4*t,load_y+t*3.7);
	context.lineTo(19.4*t,load_y+t*2.45);
	context.stroke();
	
	var dr1,dr2;
	if(sw==1) opgate();
	if(lder==1) opLDER();
	//if(sw==1&&lder==1) showER(id);
	if(drm[0]==1) opM1();
	if(drm[1]==1) opM2();
	if(drm[2]==1) opLDDR1();
	if(drm[3]==1) opLDDR2();
	if(drm[0]==1&&drm[2]==1&&sw==1){dr1=id;showDR1(dr1);}
	if(drm[1]==1&&drm[3]==1&&sw==1){dr2=id;showDR2(dr2);}
	if(drm[4]==0&&drm[5]==1&&drm[6]==0)showtoprect(parseInt(dr1)+ parseInt(dr2));
	/*if(drm[4]==0&&drm[5]==0&&drm[6]==1)showtoprect(dr1&dr1);
	if(drm[4]==0&&drm[5]==1&&drm[6]==0)showtoprect(dr1+dr2);
	if(drm[4]==0&&drm[5]==1&&drm[6]==1)showtoprect(dr1-dr2);
	if(drm[4]==1&&drm[5]==0&&drm[6]==0)showtoprect(dr1*dr2);*/
	//showtoprect(77);
	if(drm[7]==1)opLDAR1();
	if(drm[8]==1)opLDAR2();
	if(sw==1&&drm[7]==1)showAR1(id);
	if(sw==1&&drm[8]==1)showAR2(id);
	if(drm[9]==1)opALU_BUS();
	if(drm[10]==1)opCEL();
	if(drm[11]==1)opIAR_BUS();
	if(drm[12]==1)opRS_BUS();
	
	//drm[9]:cel#
	//if(drm[9]==0&&drm[7]==0)
	
		//drawRAM();
	//showRAM(id,id);
	if((drm[10]+drm[11]+drm[12]+sw+drm[9])>=2)
	{
		showtoprect("FF");
	}
	if(sw==1&&(drm[9]+drm[10]+drm[11]+drm[12])==0) showtoprect(id);
		
		
	
	

}


function showtoprect(sum)
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	var load_x = expBox_long/6;
	var load_y = expBox_Height/8;
	var t = expBox_Height/15;
	context.clearRect(load_x+t*7,load_y-1.8*t,t,t*0.5)
	context.fillStyle="#ffffaa";
	context.fillRect(load_x+t*7,load_y-1.8*t,t,t*0.5)
	context.font = "20px Courier New";
	context.fillStyle = "black";
	context.fillText(sum,load_x+t*7.5,load_y-1.8*t);
}


function opIAR_BUS()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	var load_x = expBox_long/6;
	var load_y = expBox_Height/8;
	var tlong = expBox_long/8;
	var t = expBox_Height/15;
	context.fillStyle = "#ffffaa";
	context.fillRect(11.7*t,load_y+t*3.7,t*0.7,t*0.3); 
}
function opRS_BUS()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	var load_x = expBox_long/6;
	var load_y = expBox_Height/8;
	var t = expBox_Height/15;
	context.fillStyle = "#ffffaa";
	context.fillRect(10.07*t,load_y+t*3.7,t*0.7,t*0.3); 
}
function opCEL()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	var load_x = expBox_long/6;
	var load_y = expBox_Height/8;
	var tlong = expBox_long/8;
	var t = expBox_Height/15;
	context.fillStyle = "#ffffaa";
	context.fillRect(load_x+t*7.98,0.8*t,tlong/3,t*0.6); 
}
function opLDAR1()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	var load_x = expBox_long/6;
	var load_y = expBox_Height/8;
	var tlong = expBox_long/8;
	var t = expBox_Height/15;
	context.fillStyle = "#ffffaa";
	context.fillRect(load_x+t*11.92,4.05*t,0.8*t,0.25*t); 							
	
}

function opLDAR2()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	var load_x = expBox_long/6;
	var load_y = expBox_Height/8;
	var tlong = expBox_long/8;
	var t = expBox_Height/15;
	context.fillStyle = "#ffffaa";
	context.fillRect(load_x+t*14.78,4.05*t,0.9*t,0.28*t);										
}

function opM2()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	var load_x = expBox_long/6;
	var load_y = expBox_Height/8;
	var tlong = expBox_long/8;
	var t = expBox_Height/15;
	context.fillStyle = "#ffffaa";
	context.fillRect(load_x+t*1.462,t*4.81,tlong/3,t*0.31);
	context.fillStyle = "black";
	context.fillRect(load_x+t/2,load_y+t*3.3,tlong/3,t*0.3);
	drawtranangle(load_x+t*1.5,t*5,load_x+1.65*t,t*4.85,load_x+1.65*t,t*5.1);
}

function opM1()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	var load_x = expBox_long/6;
	var load_y = expBox_Height/8;
	var tlong = expBox_long/8;
	var t = expBox_Height/15;
	context.fillStyle = "#ffffaa";
	context.fillRect(load_x+t*4.43,load_y+2.41*t,tlong/3,t*0.32);
	context.fillStyle = "black";
	context.fillRect(load_x+t*3.5,load_y+t*2.75,tlong/3,t*0.3);
	drawtranangle(load_x+t*4.55,load_y+2.55*t,load_x+t*4.7,load_y+2.4*t,load_x+t*4.7,load_y+2.7*t);
}

function opLDDR1()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	var load_x = expBox_long/6;
	var load_y = expBox_Height/8;
	var tlong = expBox_long/8;
	var t = expBox_Height/15;
	context.fillStyle = "#ffffaa";
	context.fillRect(load_x+t*3.5,load_y+t*3/2+t*2/3,tlong/3,t*0.25);
}

function opLDDR2()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	var load_x = expBox_long/6;
	var load_y = expBox_Height/8;
	var tlong = expBox_long/8;
	var t = expBox_Height/15;
	context.fillStyle = "#ffffaa";
	context.fillRect(load_x+t/2,load_y+t*3/2+t*2/3,tlong/3,t*0.25);
}

function opgate()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	var load_x = expBox_long/6;
	var load_y = expBox_Height/8;
	var tlong = expBox_long/8;
	var t = expBox_Height/15;
	context.fillStyle = "#ffffaa";
	context.fillRect(load_x+t*2,load_y+7.75*t,tlong/3,t*0.25)//SW上面的小黑块
	
}

function clgate()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	var load_x = expBox_long/6;
	var load_y = expBox_Height/8;
	var tlong = expBox_long/8;
	var t = expBox_Height/15;
	context.fillStyle = "black";
	context.fillRect(load_x+t*2,load_y+7.75*t,tlong/3,t*0.25)//SW上面的小黑块

	
}

function opALU_BUS()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	var load_x = expBox_long/6;
	var load_y = expBox_Height/8;
	var tlong = expBox_long/8;
	var t = expBox_Height/15;
	context.fillStyle = "#ffffaa";
	context.fillRect(load_x+t*6.08,0.8*t,tlong/3,t*0.6);
	context.fillStyle = "black";
	context.font = "14px Courier New";
	context.fillText("GATE",load_x+t*6.55,0.9*t);
}

function drawS(s)
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	var load_x = expBox_long/6;
	var load_y = expBox_Height/8;
	var tlong = expBox_long/8;
	var t = expBox_Height/15;

	switch(s)
	{
		case "S0":
				context.strokeStyle = "#ffffaa";
				context.clearRect(load_x-38,load_y+0.1*t,t*0.25,t*0.25);
				context.fillStyle="#ffffaa";
				context.fillRect(load_x-38,load_y+0.1*t,t*0.25,t*0.25);
				context.font = "12px Courier New";
				context.fillStyle = "red";
				context.fillText("1",load_x-32,load_y+0.1*t);
				break;			
		case "S1":
				context.strokeStyle = "#ffffaa";
				context.clearRect(load_x-25,load_y+0.1*t,t*0.25,t*0.25);
				context.fillStyle="#ffffaa";
				context.fillRect(load_x-25,load_y+0.1*t,t*0.25,t*0.25);
				context.font = "12px Courier New";
				context.fillStyle = "red";
				context.fillText("1",load_x-17,load_y+0.1*t);
				break;
		case "S2":
				context.strokeStyle = "#ffffaa";
				context.clearRect(load_x-5,load_y+0.1*t,t*0.25,t*0.25);
				context.fillStyle="#ffffaa";
				context.fillRect(load_x-5,load_y+0.1*t,t*0.25,t*0.25);
				context.font = "12px Courier New";
				context.fillStyle = "red";
				context.fillText("1",load_x-5,load_y+0.1*t);
				break;
	}
}
function opLDER()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	var load_x = expBox_long/6;
	var load_y = expBox_Height/8;
	var tlong = expBox_long/8;
	var t = expBox_Height/15;
	context.fillStyle = "#ffffaa";
	context.fillRect(load_x+t*2,load_y+7.18*t,tlong/3,t*0.25);
	context.fillStyle = "black";
	context.font = "14px Courier New";
	context.fillText("GATE",load_x+t*6.5,0.9*t);
}
function clLDER()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	var load_x = expBox_long/6;
	var load_y = expBox_Height/8;
	var tlong = expBox_long/8;
	var t = expBox_Height/15;
	context.fillStyle = "black";
	context.fillRect(load_x+t*2,load_y+7.18*t,tlong/3,t*0.25);

}
function opWRD()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	var load_x = expBox_long/6;
	var load_y = expBox_Height/8;
	var tlong = expBox_long/8;
	var t = expBox_Height/15;
	context.fillStyle = "#ffffaa";
	context.fillRect(load_x+t*2,load_y+5.7*t,tlong/3,t*0.3);
}
function opLDDR1()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	var load_x = expBox_long/6;
	var load_y = expBox_Height/8;
	var tlong = expBox_long/8;
	var t = expBox_Height/15;
	context.fillStyle = "#ffffaa";
	context.fillRect(load_x+t*3.5,load_y+t*3/2+t*2/3,tlong/3,t*0.25);
}
function opLDDR2()
{
	var thecanvas = document.getElementById("canvasOne");
	var context = thecanvas.getContext("2d");
	var load_x = expBox_long/6;
	var load_y = expBox_Height/8;
	var tlong = expBox_long/8;
	var t = expBox_Height/15;
	context.fillStyle = "#ffffaa";
	context.fillRect(load_x+t/2,load_y+t*3/2+t*2/3,tlong/3,t*0.25);
}
