function portPro(sName , iID)					//插口的构造函数
{
	this.name = null || sName;
	this.ID = null || iID;
}


function port()
{
 	var _Port = [
    {"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "S2" , "type" : "output" , "value" : false , "y" : 3 , "x" : 3},
    {"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "S1" , "type" : "output" , "value" : false , "y" : 3 , "x" : 7},
    {"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "S0" , "type" : "output" , "value" : false, "y" : 3 , "x" : 11},
    {"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "TJ" , "type" : "output" , "value" : false, "y" : 3 , "x" : 15},
    {"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "WRD" , "type" : "output" , "value" : false, "y" : 3 , "x" : 19},
    {"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "LRW" , "type" : "output" , "value" : false, "y" : 3 , "x" : 23},
    {"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "CEL#" , "type" : "output" , "value" : true, "y" : 3 , "x" : 27},
    {"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "IR7" , "type" : "input" , "value" : false, "y" : 3 , "x" : 31},
    {"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "IR6" , "type" : "input" , "value" : false, "y" : 3 , "x" : 35},
    {"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "IR5" , "type" : "input" , "value" : false, "y" : 3 , "x" : 39},
    {"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "IR4" , "type" : "input" , "value" : false, "y" : 3 , "x" : 43},
    {"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conducto" , "name" : "PC_INC" , "type" : "output" , "value" : false, "y" : 3 , "x" : 47},
    {"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "PC_ADD" , "type" : "output" , "value" : false, "y" : 3 , "x" : 51},
    {"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "LDPC" , "type" : "output" , "value" : false, "y" : 3 , "x" : 55},
    {"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "INTC" , "type" : "output" , "value" : false, "y" : 3 , "x" : 59},
    {"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "INTS" , "type" : "output" , "value" : false, "y" : 3 , "x" : 63},
    {"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "MF" , "type" : "output" , "value" : 1, "y" : 3 , "x" : 67},
    {"componentName" : "Mic_Conductor" , "slugName" : "POW" , "name" : "5V" , "type" : "output" , "value" : false, "y" : 6 , "x" : 3},
    {"componentName" : "Mic_Conductor" , "slugName" : "POW" , "name" : "GND" , "type" : "output" , "value" : false, "y" : 6 , "x" : 7},
    {"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "LDDR1" , "type" : "output" , "value" : false, "y" : 6 , "x" : 11},
    {"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "M1" , "type" : "output" , "value" : false, "y" : 6 , "x" : 15},
    {"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "ALU_BUS#" , "type" : "output" , "value" : false, "y" : 6 , "x" : 19},
    {"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "M3" , "type" : "output" , "value" : false, "y" : 6 , "x" : 23},
    {"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "M4" , "type" : "output" , "value" : false, "y" : 6 , "x" : 27},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "LDIAR" , "type" : "output" , "value" : false, "y" : 6 , "x" : 31},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "LDAR1" , "type" : "output" , "value" : false, "y" : 6 , "x" : 35},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "C" , "type" : "input" , "value" : 0, "y" : 6 , "x" : 39},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "AR1_INC" , "type" : "output" , "value" : false, "y" : 6 , "x" : 43},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "LDIR" , "type" : "output" , "value" : false, "y" : 6 , "x" : 47},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "P3" , "type" : "output" , "value" : false, "y" : 6 , "x" : 51},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "P2" , "type" : "output" , "value" : false, "y" : 6 , "x" : 55},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "P1" , "type" : "output" , "value" : false, "y" : 6 , "x" : 59},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "P0" , "type" : "output" , "value" : false, "y" : 6 , "x" : 63},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "TJI" , "type" : "output" , "value" : false, "y" : 6 , "x" : 67},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "NC4" , "type" : "output" , "value" : false, "y" : 9 , "x" : 3},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "NC3" , "type" : "output" , "value" : false, "y" : 9 , "x" : 7},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "NC2" , "type" : "output" , "value" : false, "y" : 9 , "x" : 11},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "NC1" , "type" : "output" , "value" : false, "y" : 9 , "x" : 15},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "NC0" , "type" : "output" , "value" : false, "y" : 9 , "x" : 19},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "RS_BUS#" , "type" : "output" , "value" : true, "y" : 9 , "x" : 23},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "SW_BUS#" , "type" : "output" , "value" : true, "y" : 9 , "x" : 27},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "IAR_BUS#" , "type" : "output" , "value" : true, "y" : 9 , "x" : 31},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "LDER" , "type" : "output" , "value" : false, "y" : 9 , "x" : 35},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "uA5" , "type" : "output" , "value" : false, "y" : 9 , "x" : 39},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "uA4" , "type" : "output" , "value" : false, "y" : 9 , "x" : 43},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "uA3" , "type" : "output" , "value" : false, "y" : 9 , "x" : 47},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "uA2" , "type" : "output" , "value" : false, "y" : 9 , "x" : 51},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "uA1" , "type" : "output" , "value" : false, "y" : 9 , "x" : 55},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "uA0" , "type" : "output" , "value" : false, "y" : 9 , "x" : 59},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "INTQ" , "type" : "output" , "value" : false, "y" : 9 , "x" : 63},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "INTE" , "type" : "output" , "value" : false, "y" : 9 , "x" : 67},
	{"componentName" : "Mic_Conductor" , "slugName" : "POW" , "name" : "5V" , "type" : "output" , "value" : false, "y" : 12 , "x" : 3},
	{"componentName" : "Mic_Conductor" , "slugName" : "POW" , "name" : "GND" , "type" : "output" , "value" : false, "y" : 12 , "x" : 7},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "uD5" , "type" : "output" , "value" : false, "y" : 12 , "x" : 11},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "uD4" , "type" : "output" , "value" : false, "y" : 12 , "x" : 15},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "uD3" , "type" : "output" , "value" : false, "y" : 12 , "x" : 19},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "uD2" , "type" : "output" , "value" : false, "y" : 12 , "x" : 23},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "uD1" , "type" : "output" , "value" : false, "y" : 12 , "x" : 27},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "uD0" , "type" : "output" , "value" : false, "y" : 12 , "x" : 31},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "T4" , "type" : "output" , "value" : false, "y" : 12 , "x" : 35},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "T3" , "type" : "output" , "value" : false, "y" : 12 , "x" : 39},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "T2" , "type" : "output" , "value" : false, "y" : 12 , "x" : 43},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "T1" , "type" : "output" , "value" : false, "y" : 12 , "x" : 47},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "W4" , "type" : "output" , "value" : false, "y" : 12 , "x" : 51},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "W3" , "type" : "output" , "value" : false, "y" : 12 , "x" : 55},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "W2" , "type" : "output" , "value" : false, "y" : 12 , "x" : 59},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "W1" , "type" : "output" , "value" : false, "y" : 12 , "x" : 63},
	{"componentName" : "Mic_Conductor" , "slugName" : "Mic_Conductor" , "name" : "SKIP" , "type" : "output" , "value" : false, "y" : 12 , "x" : 67},
	{"componentName" : "Mic_Conductor" , "slugName" : "POW" , "name" : "5V" , "type" : "output" , "value" : false, "y" : 12 , "x" : 71},
	{"componentName" : "Status" , "slugName" : "ER" , "name" : "LDER" , "type" : "input" , "value" : false, "y" : 16 , "x" : 3},
	{"componentName" : "Status" , "slugName" : "DR2" , "name" : "M2" , "type" : "input" , "value" : false, "y" : 16 , "x" : 7},
	{"componentName" : "Status" , "slugName" : "DR2" , "name" : "LDDR2" , "type" : "input" , "value" : false, "y" : 16 , "x" : 11},
	{"componentName" : "Status" , "slugName" : "DR1" , "name" : "M1" , "type" : "input" , "value" : false, "y" : 16 , "x" : 15},
	{"componentName" : "Status" , "slugName" : "DR1" , "name" : "LDDR1" , "type" : "input" , "value" : false, "y" : 16 , "x" : 19},
	{"componentName" : "Status" , "slugName" : "ALU" , "name" : "S2" , "type" : "input" , "value" : false, "y" : 16 , "x" : 23},
	{"componentName" : "Status" , "slugName" : "ALU" , "name" : "S1" , "type" : "input" , "value" : false, "y" : 16 , "x" : 27},
	{"componentName" : "Status" , "slugName" : "ALU" , "name" : "S0" , "type" : "input" , "value" : false, "y" : 16 , "x" : 31},
	{"componentName" : "Status" , "slugName" : "ALU" , "name" : "ALU_BUS#" , "type" : "input" , "value" : false, "y" : 16 , "x" : 35},
	{"componentName" : "Status" , "slugName" : "C" , "name" : "C" , "type" : "output" , "value" : 0, "y" : 16 , "x" : 39},
	{"componentName" : "Status" , "slugName" : "IR" , "name" : "IR7" , "type" : "output" , "value" : false, "y" : 16 , "x" : 43},
	{"componentName" : "Status" , "slugName" : "IR" , "name" : "IR6" , "type" : "output" , "value" : false, "y" : 16 , "x" : 47},
	{"componentName" : "Status" , "slugName" : "IR" , "name" : "IR5" , "type" : "output" , "value" : false, "y" : 16 , "x" : 51},
	{"componentName" : "Status" , "slugName" : "IR" , "name" : "IR4" , "type" : "output" , "value" : false, "y" : 16 , "x" : 55},
	{"componentName" : "Status" , "slugName" : "IR" , "name" : "IR3" , "type" : "output" , "value" : false, "y" : 16 , "x" : 59},
	{"componentName" : "Status" , "slugName" : "IR" , "name" : "IR2" , "type" : "output" , "value" : false, "y" : 16 , "x" : 63},
	{"componentName" : "Status" , "slugName" : "IR" , "name" : "IR1" , "type" : "output" , "value" : false, "y" : 16 , "x" : 67},
	{"componentName" : "Status" , "slugName" : "IR" , "name" : "IR0" , "type" : "output" , "value" : false, "y" : 16 , "x" : 71},
	{"componentName" : "Status" , "slugName" : "POW" , "name" : "5V" , "type" : "output" , "value" : false, "y" : 19 , "x" : 3},
	{"componentName" : "Status" , "slugName" : "POW" , "name" : "GND" , "type" : "output" , "value" : false, "y" : 19 , "x" : 7},
	{"componentName" : "Status" , "slugName" : "RF" , "name" : "WR1" , "type" : "input" , "value" : false, "y" : 19 , "x" : 11},
	{"componentName" : "Status" , "slugName" : "RF" , "name" : "WR0" , "type" : "input" , "value" : false, "y" : 19 , "x" : 15},
	{"componentName" : "Status" , "slugName" : "RF" , "name" : "WRD" , "type" : "input" , "value" : false, "y" : 19 , "x" : 19},
	{"componentName" : "Status" , "slugName" : "RF" , "name" : "RD1" , "type" : "input" , "value" : false, "y" : 19 , "x" : 23},
	{"componentName" : "Status" , "slugName" : "RF" , "name" : "RD0" , "type" : "input" , "value" : false, "y" : 19 , "x" : 27},
	{"componentName" : "Status" , "slugName" : "RF" , "name" : "RS1" , "type" : "input" , "value" : false, "y" : 19 , "x" : 31},
	{"componentName" : "Status" , "slugName" : "RF" , "name" : "RS0" , "type" : "input" , "value" : false, "y" : 19 , "x" : 35},
	{"componentName" : "Status" , "slugName" : "RAM" , "name" : "CEL#" , "type" : "input" , "value" : true, "y" : 19 , "x" : 39},
	{"componentName" : "Status" , "slugName" : "RAM" , "name" : "BUSYL" , "type" : "output" , "value" : false, "y" : 19 , "x" : 43},
	{"componentName" : "Status" , "slugName" : "RAM" , "name" : "LRW" , "type" : "input" , "value" : false, "y" : 19 , "x" : 47},
	{"componentName" : "Status" , "slugName" : "RAM" , "name" : "CER" , "type" : "input" , "value" : false, "y" : 19 , "x" : 51},
	{"componentName" : "Status" , "slugName" : "RAM" , "name" : "BUSYR" , "type" : "output" , "value" : false, "y" : 19 , "x" : 55},
	{"componentName" : "Status" , "slugName" : "R4" , "name" : "M4" , "type" : "input" , "value" : false, "y" : 19 , "x" : 59},
	{"componentName" : "Status" , "slugName" : "R4" , "name" : "LDR4" , "type" : "input" , "value" : false, "y" : 19 , "x" : 63},
	{"componentName" : "Status" , "slugName" : "AR2" , "name" : "M3" , "type" : "input" , "value" : false, "y" : 19 , "x" : 67},
	{"componentName" : "Status" , "slugName" : "AR2" , "name" : "LDAR2" , "type" : "input" , "value" : false, "y" : 19 , "x" : 71},
	{"componentName" : "Status" , "slugName" : "POW" , "name" : "5V" , "type" : "output" , "value" : false, "y" : 22 , "x" : 3},
	{"componentName" : "Status" , "slugName" : "POW" , "name" : "GND" , "type" : "output" , "value" : false, "y" : 22 , "x" : 7},
	{"componentName" : "Status" , "slugName" : "RF" , "name" : "RS_BUS#" , "type" : "input" , "value" : true, "y" : 22 , "x" : 11},
	{"componentName" : "Status" , "slugName" : "RF" , "name" : "5V" , "type" : "output" , "value" : false, "y" : 22 , "x" : 15},
	{"componentName" : "Status" , "slugName" : "RF" , "name" : "GND" , "type" : "output" , "value" : false, "y" : 22 , "x" : 19},
	{"componentName" : "Status" , "slugName" : "IR" , "name" : "LDIR" , "type" : "input" , "value" : false, "y" : 22 , "x" : 23},
	{"componentName" : "Status" , "slugName" : "RF" , "name" : "5V" , "type" : "output" , "value" : false, "y" : 22 , "x" : 27},
	{"componentName" : "Status" , "slugName" : "RF" , "name" : "GND" , "type" : "output" , "value" : false, "y" : 22 , "x" : 31},
	{"componentName" : "Status" , "slugName" : "PC" , "name" : "PC_ADD" , "type" : "input" , "value" : false, "y" : 22 , "x" : 35},
	{"componentName" : "Status" , "slugName" : "PC" , "name" : "LDPC" , "type" : "input" , "value" : false, "y" : 22 , "x" : 39},
	{"componentName" : "Status" , "slugName" : "PC" , "name" : "PC_INC" , "type" : "input" , "value" : false, "y" : 22 , "x" : 43},
	{"componentName" : "Status" , "slugName" : "POW" , "name" : "5V" , "type" : "output" , "value" : false, "y" : 22 , "x" : 47},
	{"componentName" : "Status" , "slugName" : "POW" , "name" : "GND" , "type" : "output" , "value" : false, "y" : 22 , "x" : 51},
	{"componentName" : "Status" , "slugName" : "AR1" , "name" : "AR1_INC" , "type" : "input" , "value" : false, "y" : 22 , "x" : 55},
	{"componentName" : "Status" , "slugName" : "AR1" , "name" : "LDAR1" , "type" : "input" , "value" : false, "y" : 22 , "x" : 59},
	{"componentName" : "Status" , "slugName" : "IAR" , "name" : "IAR_BUS#" , "type" : "input" , "value" : true, "y" : 22 , "x" : 63},
	{"componentName" : "Status" , "slugName" : "IAR" , "name" : "LDIAR" , "type" : "input" , "value" : false, "y" : 22 , "x" : 67},
	{"componentName" : "Status" , "slugName" : "DBUS" , "name" : "SW_BUS#" , "type" : "input" , "value" : true, "y" : 22 , "x" : 71},
	{"componentName" : "Console" , "slugName" : "Switch" , "name" : "K0" , "type" : "output" , "value" : false, "y" : 28 , "x" : 3},
	{"componentName" : "Console" , "slugName" : "Switch" , "name" : "K1" , "type" : "output" , "value" : false, "y" : 28 , "x" : 5},
	{"componentName" : "Console" , "slugName" : "Switch" , "name" : "K2" , "type" : "output" , "value" : false, "y" : 28 , "x" : 7},
	{"componentName" : "Console" , "slugName" : "Switch" , "name" : "K3" , "type" : "output" , "value" : false, "y" : 28 , "x" : 9},
	{"componentName" : "Console" , "slugName" : "Switch" , "name" : "K4" , "type" : "output" , "value" : false, "y" : 28 , "x" : 11},
	{"componentName" : "Console" , "slugName" : "Switch" , "name" : "K5" , "type" : "output" , "value" : false, "y" : 28 , "x" : 13},
	{"componentName" : "Console" , "slugName" : "Switch" , "name" : "K6" , "type" : "output" , "value" : false, "y" : 28 , "x" : 15},
	{"componentName" : "Console" , "slugName" : "Switch" , "name" : "K7" , "type" : "output" , "value" : false, "y" : 28 , "x" : 17},
	{"componentName" : "Console" , "slugName" : "Switch" , "name" : "K8" , "type" : "output" , "value" : false, "y" : 28 , "x" : 19},
	{"componentName" : "Console" , "slugName" : "Switch" , "name" : "K9" , "type" : "output" , "value" : false, "y" : 28 , "x" : 21},
	{"componentName" : "Console" , "slugName" : "Switch" , "name" : "K10" , "type" : "output" , "value" : false, "y" : 28 , "x" : 23},
	{"componentName" : "Console" , "slugName" : "Switch" , "name" : "K11" , "type" : "output" , "value" : false, "y" : 28 , "x" : 25},
	{"componentName" : "Console" , "slugName" : "Switch" , "name" : "K12" , "type" : "output" , "value" : false, "y" : 28 , "x" : 27},
	{"componentName" : "Console" , "slugName" : "Switch" , "name" : "K13" , "type" : "output" , "value" : false, "y" : 28 , "x" : 29},
	{"componentName" : "Console" , "slugName" : "Switch" , "name" : "K14" , "type" : "output" , "value" : false, "y" : 28 , "x" : 31},
	{"componentName" : "Console" , "slugName" : "Switch" , "name" : "K15" , "type" : "output" , "value" : false, "y" : 28 , "x" : 33},
	{"componentName" : "Console" , "slugName" : "Switch" , "name" : "SW7" , "type" : "output" , "value" : false, "y" : 28 , "x" : 35},
	{"componentName" : "Console" , "slugName" : "Switch" , "name" : "SW6" , "type" : "output" , "value" : false, "y" : 28 , "x" : 37},
	{"componentName" : "Console" , "slugName" : "Switch" , "name" : "SW5" , "type" : "output" , "value" : false, "y" : 28 , "x" : 39},
	{"componentName" : "Console" , "slugName" : "Switch" , "name" : "SW4" , "type" : "output" , "value" : false, "y" : 28 , "x" : 41},
	{"componentName" : "Console" , "slugName" : "Switch" , "name" : "SW3" , "type" : "output" , "value" : false, "y" : 28 , "x" : 43},
	{"componentName" : "Console" , "slugName" : "Switch" , "name" : "SW2" , "type" : "output" , "value" : false, "y" : 28 , "x" : 45},
	{"componentName" : "Console" , "slugName" : "Switch" , "name" : "SW1" , "type" : "output" , "value" : false, "y" : 28 , "x" : 47},
	{"componentName" : "Console" , "slugName" : "Switch" , "name" : "SW0" , "type" : "output" , "value" : false, "y" : 28 , "x" : 49},
	{"componentName" : "Console" , "slugName" : "Switch" , "name" : "SWC" , "type" : "output" , "value" : false, "y" : 28 , "x" : 51},
	{"componentName" : "Console" , "slugName" : "Switch" , "name" : "SWB" , "type" : "output" , "value" : false, "y" : 28 , "x" : 53},
	{"componentName" : "Console" , "slugName" : "Switch" , "name" : "SWA" , "type" : "output" , "value" : false, "y" : 28 , "x" : 55},
	{"componentName" : "Console" , "slugName" : "Switch" , "name" : "DP" , "type" : "output" , "value" : false, "y" : 28 , "x" : 57},
	{"componentName" : "Console" , "slugName" : "Switch" , "name" : "DZ" , "type" : "output" , "value" : false, "y" : 28 , "x" : 59},
	{"componentName" : "Console" , "slugName" : "Switch" , "name" : "DB" , "type" : "output" , "value" : false, "y" : 28 , "x" : 61},
	//{"componentName" : "Console" , "slugName" : "Switch" , "name" : "IR/DUBS" , "type" : "input" , "value" : false, "y" : 30 , "x" : 6},
	//{"componentName" : "Console" , "slugName" : "Switch" , "name" : "AR1/AR2" , "type" : "input" , "value" : false, "y" : 33 , "x" : 6}
	];
	return _Port;
}

function createPort()
{
	var _port = port();
	return _port;
}

function PortLabPro(componentName , minID)
{
	this.componentName = componentName;
	this.minID = minID;
	this.len = 0;
}

function createPortIDLab()
{
	var _PortIDLab = new Array();
	for(var i = 0 ; i < Port.length ; i++)												//查找所有的Port//适用于存放类型连续时
	{
		if(_PortIDLab.length == 0)														//数组为空时，直接放入数组中
		{
			var lab = new PortLabPro(Port[i].componentName,i);
			lab.len++;
			_PortIDLab.push(lab);
		}
		else																			//PortIDLab中有数据
		{
			for(var j = 0 ; j < _PortIDLab.length ; j++)								//找PortIDLab中是否有相同Port类型
			{
				var isIN = false;
				if(Port[i].componentName == _PortIDLab[j].componentName)				//PortIDLab中有相同的Port类型时
				{
					_PortIDLab[j].len++;
					isIN = true;
					break;
				}
			}
			if(isIN == false)															//PortIDLab中无相同的Port类型
			{
				var lab = new PortLabPro(Port[i].componentName,i);
				lab.len++;
				_PortIDLab.push(lab);
			}
		}
	}
	return _PortIDLab;
}

function searchPortID(componentName , name)						//通过componentName和name获取Port中的ID
{
	for(var i = 0 ; i < PortIDLab.length ; i++)					//在PortIDLab中检索到相同的component，获得minID和len
	{
		var lab = PortIDLab[i];
		if(lab.componentName == componentName)
		{
			for(var j = 0 ; j < lab.len ; j++)
			{
				if(name == Port[lab.minID + j].name)
				{
					return lab.minID+j;
				}
			}
		}
	}
	return -1;
}

function refreshPort()
{
	var _port = port();
	for(var i = 0 ; i < _port ; i++)
	{
		Port[i].value = _port[i].value;
	}
}

function clearPort()
{
	var _port = port2();
	for(var i = 0 ; i < _port.length ; i++)
	{
		Port[i].value = _port[i];
	}
}

function port2()
{
	var port2 = [false,false,false,false,false,false,true,false,false,false,
				 false,false,false,false,false,false,false,false,false,false,
				 false,false,false,false,false,false,false,false,false,false,
				 false,false,false,false,false,false,false,false,false,true,
				 true,true,false,false,false,false,false,false,false,false,
				 false,false,false,false,false,false,false,false,false,false,
				 false,false,false,false,false,false,false,false,false,false,
				 false,false,false,false,false,false,false,false,false,false,
				 false,false,false,false,false,false,false,false,false,false,
				 false,false,false,false,false,false,true,false,false,false,
				 false,false,false,false,false,false,false,true,false,false,
				 false,false,false,false,false,false,false,false,false,false,
				 true,false,true//,false,false,false,false,false,false,false,
				// false,false,false,false,false,false,false,false,false,false,
				// false,false,false,false,false,false,false,false,false,false,
				// false,false
				];
	return port;
}
