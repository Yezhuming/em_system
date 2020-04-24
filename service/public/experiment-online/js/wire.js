function wirePro(theStartPoint,theEndPoint,color)
{
	this.theStartPoint = theStartPoint;     //线段开始的点
	this.theEndPoint = theEndPoint;         //线段结束的点
	this.color = color;                     //线段的颜色
	this.isSelect = false;                  //线段是否被选择
	this.wirePath = new Array();
	this.isNormal = true;                   //连接导线是否合法
}
function node2(x,y)
{
	this.x = x;
	this.y = y;
}
function pointPro(x, y)
{
	this.pointX = x || 0;                   //点的x坐标
	this.pointY = y || 0;                   //点的y坐标
}

function createWire()
{
	var wire = new Array();
	return wire;
}

function revokeWire()						//撤销一根导线
{                          
	var length = Wire.length;
	if(length > 1 && Wire[length - 1] != null)
	{
		Wire.pop();
		selectWire = -1;
	}
}


function clearWire()									  //清空导线函数
{							
	var length = Wire.length;
	for(var i = 1 ; i < length ; i++)
	{
		Wire.pop();
		selectWire = -1;
	}
}



function removeWire()
{
	var length = Wire.length;
	if(selectWire == -1)									//not remove
	{
		return false;
	}
	else													//remove
	{
		if(selectWire == length - 1)						//导线是最后一根	
		{		
			Wire.pop();
			selectWire = -1;
		}
		else												//导线不是最后一根
		{	
			Wire[0] = Wire[selectWire];
			for(var i = selectWire; i < length-1 ; i++)
			{
				Wire[i] = Wire[i+1];
			}
			Wire[length-1] = Wire[0];
			Wire[0] = null;
			Wire.pop();	
			selectWire = -1;
		}
		return true;
	}
}

function refreshPortFWire()									//根据导线连接内容更新组件
{
	for(var i = 1 ; i < Wire.length ; i++)
	{
		if(Wire[i].isNormal == true)
		{
			if(Wire[i].theStartPoint.type == "output")
			{
				var outputPort = Wire[i].theStartPoint;
				var inputPort = Wire[i].theEndPoint;
			}
			else
			{
				var inputPort = Wire[i].theStartPoint;
				var outputPort = Wire[i].theEndPoint;
			}
			inputPort.value = outputPort.value;
		}
	}
}
function openGate(id)
{
	var i=0;
	for(i = 1; i < Wire.length; i++)			//各个端口的逻辑
	{
		if((Wire[i].theStartPoint.name == "LDDR2"&&Switch[id].value == true&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "LDDR2"&&Switch[id].value == true&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[0]=-1;							
		}
		if((Wire[i].theStartPoint.name == "LDDR2"&&Switch[id].value == false&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "LDDR2"&&Switch[id].value == false&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[0]=1;									
		}
		if((Wire[i].theStartPoint.name == "LDDR1"&&Switch[id].value == true&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "LDDR1"&&Switch[id].value == true&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[1]=-1;		
		}
		if((Wire[i].theStartPoint.name == "LDDR1"&&Switch[id].value == false&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "LDDR1"&&Switch[id].value == false&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[1]=1;									
		}
		if((Wire[i].theStartPoint.name == "M2"&&Switch[id].value == true&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "M2"&&Switch[id].value == true&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[2]=-1;
		}
		if((Wire[i].theStartPoint.name == "M2"&&Switch[id].value == false&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "M2"&&Switch[id].value == false&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[2]=1;					
		}	
		if((Wire[i].theStartPoint.name == "M1"&&Switch[id].value == true&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "M1"&&Switch[id].value == true&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[3]=-1;				
		}
		if((Wire[i].theStartPoint.name == "M1"&&Switch[id].value == false&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "M1"&&Switch[id].value == false&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[3]=1;				
		}
		if((Wire[i].theStartPoint.name == "WRD"&&Switch[id].value == true&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "WRD"&&Switch[id].value == true&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[4]=-1;				
		}
		if((Wire[i].theStartPoint.name == "WRD"&&Switch[id].value == false&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "WRD"&&Switch[id].value == false&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[4]=1;			
		}
		if((Wire[i].theStartPoint.name == "LDER"&&Switch[id].value == true&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "LDER"&&Switch[id].value == true&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[5]=-1;					
		}
		if((Wire[i].theStartPoint.name == "LDER"&&Switch[id].value == false&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "LDER"&&Switch[id].value == false&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[5]=1;			
		}
		if((Wire[i].theStartPoint.name == "ALU_BUS#"&&Switch[id].value == true&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "ALU_BUS#"&&Switch[id].value == true&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[6]=-1;				
		}
		if((Wire[i].theStartPoint.name == "ALU_BUS#"&&Switch[id].value == false&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "ALU_BUS#"&&Switch[id].value == false&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[6]=1;			
		}
		if((Wire[i].theStartPoint.name == "CER"&&Switch[id].value == true&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "CER"&&Switch[id].value == true&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[7]=-1;					
		}
		if((Wire[i].theStartPoint.name == "CER"&&Switch[id].value == false&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "CER"&&Switch[id].value == false&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[7]=1;			
		}
		if((Wire[i].theStartPoint.name == "LDAR1"&&Switch[id].value == true&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "LDAR1"&&Switch[id].value == true&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[8]=-1;				
		}
		if((Wire[i].theStartPoint.name == "LDAR1"&&Switch[id].value == false&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "LDAR1"&&Switch[id].value == false&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[8]=1;			
		}
		if((Wire[i].theStartPoint.name == "M3"&&Switch[id].value == true&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "M3"&&Switch[id].value == true&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[9]=-1;				
		}
		if((Wire[i].theStartPoint.name == "M3"&&Switch[id].value == false&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "M3"&&Switch[id].value == false&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[9]=1;			
		}
		if((Wire[i].theStartPoint.name == "LDAR2"&&Switch[id].value == true&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "LDAR2"&&Switch[id].value == true&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[10]=-1;			
		}
		if((Wire[i].theStartPoint.name == "LDAR2"&&Switch[id].value == false&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "LDAR2"&&Switch[id].value == false&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[10]=1;			
		}
		if((Wire[i].theStartPoint.name == "LDIAR"&&Switch[id].value == true&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "LDIAR"&&Switch[id].value == true&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[11]=-1;				
		}
		if((Wire[i].theStartPoint.name == "LDIAR"&&Switch[id].value == false&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "LDIAR"&&Switch[id].value == false&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[11]=1;				
		}
		if((Wire[i].theStartPoint.name == "LDPC"&&Switch[id].value == true&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "LDPC"&&Switch[id].value == true&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[12]=-1;				
		}
		if((Wire[i].theStartPoint.name == "LDPC"&&Switch[id].value == false&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "LDPC"&&Switch[id].value == false&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[12]=1;			
		}
		if((Wire[i].theStartPoint.name == "LDIR"&&Switch[id].value == true&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "LDIR"&&Switch[id].value == true&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[13]=-1;				
		}
		if((Wire[i].theStartPoint.name == "LDIR"&&Switch[id].value == false&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "LDIR"&&Switch[id].value == false&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[13]=1;			
		}
		if((Wire[i].theStartPoint.name == "LDR4"&&Switch[id].value == true&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "LDR4"&&Switch[id].value == true&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[14]=-1;				
		}
		if((Wire[i].theStartPoint.name == "LDR4"&&Switch[id].value == false&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "LDR4"&&Switch[id].value == false&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[14]=1;			
		}
		if((Wire[i].theStartPoint.name == "M4"&&Switch[id].value == true&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "M4"&&Switch[id].value == true&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[15]=-1;			
		}
		if((Wire[i].theStartPoint.name == "M4"&&Switch[id].value == false&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "M4"&&Switch[id].value == false&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[15]=1;			
		}
		if((Wire[i].theStartPoint.name == "SW_BUS#"&&Switch[id].value == true&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "SW_BUS#"&&Switch[id].value == true&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[16]=-1;
		}
		if((Wire[i].theStartPoint.name == "SW_BUS#"&&Switch[id].value == false &&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "SW_BUS#"&&Switch[id].value == false &&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[16]=1;							
		}
		if((Wire[i].theStartPoint.name == "CEL#"&&Switch[id].value == true&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "CEL#"&&Switch[id].value == true&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[17]=-1;				
		}
		if((Wire[i].theStartPoint.name == "CEL#"&&Switch[id].value == false&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "CEL#"&&Switch[id].value == false&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[17]=1;			
		}	
		if((Wire[i].theStartPoint.name == "RS_BUS#"&&Switch[id].value == true&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "RS_BUS#"&&Switch[id].value == true&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[18]=-1;				
		}
		if((Wire[i].theStartPoint.name == "RS_BUS#"&&Switch[id].value == false&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "RS_BUS#"&&Switch[id].value == false&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[18]=1;			
		}
		if((Wire[i].theStartPoint.name == "IAR_BUS#"&&Switch[id].value == true&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "IAR_BUS#"&&Switch[id].value == true&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[19]=-1;				
		}
		if((Wire[i].theStartPoint.name == "IAR_BUS#"&&Switch[id].value == false&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "IAR_BUS#"&&Switch[id].value == false&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[19]=1;			
		}	
		if((Wire[i].theStartPoint.name == "LRW"&&Switch[id].value == true&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "LRW"&&Switch[id].value == true&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[32]=-1;			
		}
		if((Wire[i].theStartPoint.name == "LRW"&&Switch[id].value == false&&Wire[i].theEndPoint.name==Switch[id].name)||(Wire[i].theEndPoint.name == "LRW"&&Switch[id].value == false&&Wire[i].theStartPoint.name==Switch[id].name))
		{
			com[32]=1;			
		}
	}//end for				
}
