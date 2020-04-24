function alu()//ALU构造函数
{
	var id;
	id = searchPortID("Status","S2");
	if(id != -1)
	{
		this.S2 = Port[id];
	}	
	id = searchPortID("Status","S1");
	if(id != -1)
		this.S1 = Port[id];
	id = searchPortID("Status","S0");
	if(id != -1)
		this.S0 = Port[id];	
	this.C_A = "0";
}

function createALU()//创建ALU
{
	var _ALU = new alu();
	return _ALU;
}

alu.prototype.reset = function()//重置ALU
{
	var _ALU = new alu();
	this.value = _ALU.value;
	this.C_A = _ALU.C_A;
}

alu.prototype.running = function()		//ALU.running
{
	var _nowValue , _originalValue , _iOperation;
	//var A = DR2.getValue();
	//var B = DR1.getValue();
	
	var x = new Array();
	x.push(Number(this.S2.value));
	x.push(Number(this.S1.value));
	x.push(Number(this.S0.value));
	_iOperation = parseInt(x.join(""),2);
	
	//ALU进行运算
	switch(_iOperation)
	{
		case 0:// A  &  B
		{
			var A1 = parseInt(com[24],16);
			var B1 = parseInt(com[25],16);
			com[29] = (A1 & B1).toString(16);
			break;
		}	
		case 1 :// A  &  A，直通
		{
			com[29] = com[25];	
			break;
		}
		case 2 :		//A  +  B，产生进位
		{
			var A1 = parseInt(com[24],16);
			var B1 = parseInt(com[25],16);
			var S2,S,C1="0";
			add(S1);
			S2 = A1 + B1;
			if(S2.length == 1)S2='0'+S2;
			com[29] = S2.toString(16).substring(0,2);
			break;
		}
		case 3 ://A  -  B，产生进位
		{		
			var A1 = parseInt(com[24],16); 
			var B1 = -(parseInt(com[25],16));
			var S1,S,C1=0;	
			S1 = A1 + B1;
			com[29] = S1.toString(16).substring(1,3);
			break;
		}
		case 4 :								//A（低4位） X  B（低4位）
		{	
			A = com[24].substring(1,2);
			B = com[24].substring(1,2);		
			var A1 = parseInt(A,16);
			var B1 = parseInt(B,16);
			var S1,S,C1=0;
			S1 = A1 * B1;
			com[29] = S1.toString(16);		
			break;
		}
	}
	
	function add(S1)
	{
		S1 = A1+B1;
		if(S1 < 0)
		{
		    C1 = 1;
		    S1 = - S1;
		}
		S = S1.toString(2);
		if(S.length<8)
		{
			for(var i = S.length ; i < 8; i++)
			{
			    S = "0"+ S;
			}
			com[41] = 0;
		}
		else if(S.length > 8)
		{
			com[41] = 1;
			//C1 = S[S.length-9];
			//S = S.substring(S.length-8,S.length);
		}
	}
	return;
}//ALU.running
