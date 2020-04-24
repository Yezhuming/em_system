function clickDownload(aLink)  //写
{  	
	var str = "";
    for(var i = 1; i < Wire.length ; i++)
    {
    	str += Wire[i].theStartPoint.x + "!" + Wire[i].theStartPoint.y
    		+ "!"+ Wire[i].theEndPoint.x + "!" + Wire[i].theEndPoint.y;
    	if(i != Wire.length - 1)
    		str += "!";
    } 
    str = str + '@'+com[34]+'!'+com[35]+'!'+com[36]+'!'+com[37]+'@';			//RF
    
    var count = 0;
   for(var i = 1; i <= 15; i++)												//RAM
    {
    	for(var j = 1; j <= 15; j++)
    	{
    		if(RAM.ram1[i][j] != "00")
    			count++;
    	}
    }
    var sum = 0;
  	for(var i = 1; i <= 15; i++)												//RAM
    {
    	for(var j = 1; j <= 15; j++)
    	{
    		if(RAM.ram1[i][j] != "00")
    		{
    			sum++;
    			if(sum != count)
    				str = str + j + "#" + i + "#" + RAM.ram1[i][j] + "!" ;
    			else
    				str = str + j + "#" + i + "#" + RAM.ram1[i][j];
    		}
    	}
    }
    
    str = str + "@";
    for(var i = 0; i <Switch.length; i++)										//开关
    {
    	if(Switch[i].value == true)
    		str = str + "1";
    	else
    		str = str + "0";
    }
    
    str = str + "@";
    str =  encodeURIComponent(str);  
    aLink.href = "data:text/csv;charset=utf-8," + str;  
}  