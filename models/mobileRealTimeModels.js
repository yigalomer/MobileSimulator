// TEST DATA (Simulate DB)
// ===========================================================================================================================================
var iterator = 1;
var deviceMapping = [];

deviceMapping["99999997"] = 1;
deviceMapping["99999996"] = 2;
deviceMapping["99999995"] = 3;

var realTimeTargetData = [
{
 "intraDailyTarget":
	{
		"datum":"Print Volume",
		"value":150000.0, // This one change in 1000s
		"unit":"PrintedImpressions",
		"day":6,
		"hour":10, // This one in 1s
		"lastStateChangedTimeStamp":null,
		"lastSeenTimeStamp":null,
		"state":null,
		"maintenanceState":null,
		"device":"selected",
		"sheets":null, // This one in 10s
		"timeToDone":{duration:3,unit:"MINUTES"}, // This one change duration
		"meters":null,
		"squareMeters":null,
		"printedJobs":null,
		"jobsInQueue":0 // This one change in 1s
	}, 
 "shiftTarget":
	{
		"datum":"Print Volume",
		"value":160000.0, // This one in 1000s
		"unit":"PrintedImpressions",
		"day":6,
		"hour":23,
		"lastStateChangedTimeStamp":null,
		"lastSeenTimeStamp":null,
		"state":null,
		"maintenanceState":null,
		"device":"selected",
		"sheets":null, // This one in 10s
		"timeToDone":{duration:3,unit:"MINUTES"}, // This one change duration
		"meters":null,
		"squareMeters":null,
		"printedJobs":null,
		"jobsInQueue":0 // This one in 1s
	} 
}, 
//////////////////////////////////////////////////
{
 "intraDailyTarget":
	{
		"datum":"Print Volume",
		"value":50000.0, // This one in 1000s
		"unit":"PrintedImpressions",
		"day":6,
		"hour":10,
		"lastStateChangedTimeStamp":null,
		"lastSeenTimeStamp":null,
		"state":null,
		"maintenanceState":null,
		"device":"99999997",
		"sheets":null, // This one in 10s
		"timeToDone":{duration:3,unit:"MINUTES"}, // This one change duration
		"meters":null,
		"squareMeters":null,
		"printedJobs":null,
		"jobsInQueue":0 // This one in 1s
	},
 "shiftTarget":
	{
		"datum":"Print Volume",
		"value":60000.0,// This one in 1000s
		"unit":"PrintedImpressions",
		"day":6,
		"hour":23,
		"lastStateChangedTimeStamp":null,
		"lastSeenTimeStamp":null,
		"state":null,
		"maintenanceState":null,
		"device":"99999997",
		"sheets":null,// This one in 10s
		"timeToDone":{duration:3,unit:"MINUTES"}, // This one change duration
		"meters":null,
		"squareMeters":null,
		"printedJobs":null,
		"jobsInQueue":0// This one in 1s
	}
},
//////////////////////////////////////////////////
{
 "intraDailyTarget":
	{
		"datum":"Print Volume",
		"value":30000.0,
		"unit":"PrintedImpressions",
		"day":6,
		"hour":10,
		"lastStateChangedTimeStamp":null,
		"lastSeenTimeStamp":null,
		"state":null,
		"maintenanceState":null,
		"device":"99999996",
		"sheets":null,
		"timeToDone":{duration:3,unit:"MINUTES"}, // This one change duration
		"meters":null,
		"squareMeters":null,
		"printedJobs":null,
		"jobsInQueue":0
	},
 "shiftTarget":
	{
		"datum":"Print Volume",
		"value":50000.0,
		"unit":"PrintedImpressions",
		"day":6,
		"hour":23,
		"lastStateChangedTimeStamp":null,
		"lastSeenTimeStamp":null,
		"state":null,
		"maintenanceState":null,
		"device":"99999996",
		"sheets":null,
		"timeToDone":{duration:3,unit:"MINUTES"}, // This one change duration
		"meters":null,
		"squareMeters":null,
		"printedJobs":null,
		"jobsInQueue":0
	}
},
//////////////////////////////////////////////////
{
 "intraDailyTarget":
	{
		"datum":"Print Volume",
		"value":100000,
		"unit":"PrintedImpressions",
		"day":6,
		"hour":10,
		"lastStateChangedTimeStamp":null,
		"lastSeenTimeStamp":null,
		"state":null,
		"maintenanceState":null,
		"device":"99999995",
		"sheets":null,
		"timeToDone":{duration:3,unit:"MINUTES"}, // This one change duration
		"meters":null,
		"squareMeters":null,
		"printedJobs":null,
		"jobsInQueue":0
	},
 "shiftTarget":
	{
		"datum":"Print Volume",
		"value":120000,
		"unit":"PrintedImpressions",
		"day":6,
		"hour":23,
		"lastStateChangedTimeStamp":null,
		"lastSeenTimeStamp":null,
		"state":null,
		"maintenanceState":null,
		"device":"99999995",
		"sheets":null,
		"timeToDone":{duration:3,unit:"MINUTES"}, // This one change duration
		"meters":null,
		"squareMeters":null,
		"printedJobs":null,
		"jobsInQueue":0
	}
}
    ];

var realTimePrintVolumeData = [
{
	"datum":null,
	"value":160000.0, // This one 1000s
	"unit":null,
	"day":0,
	"hour":0,
	"lastStateChangedTimeStamp":null,
	"lastSeenTimeStamp":null,
	"state":null,
	"maintenanceState":null,
	"device":"Selected",
	"sheets":448, // This one 10s
	"timeToDone":null,
	"meters":null,
	"squareMeters":null,
	"printedJobs":112,
	"jobsInQueue":0 //This one 1s
},
{
	"datum":"Print Volume",
	"value":60000.0,
	"unit":"PrintedImpressions",
	"day":0,
	"hour":0,
	"lastStateChangedTimeStamp":"2015-05-28T23:37:35.790+0000",
	"lastSeenTimeStamp":"2015-05-29T07:37:42.399+0000",
	"state":"DS_STANDBY",
	"maintenanceState":"Ok",
	"device":"99999997",
	"sheets":132,
	"timeToDone":{"unit":"MINUTES", "duration":18},
	"meters":null,
	"squareMeters":null,
	"printedJobs":33,
	"jobsInQueue":0
},
{
	"datum":"Print Volume",
	"value":50000.0,
	"unit":"PrintedImpressions",
	"day":0,
	"hour":0,
	"lastStateChangedTimeStamp":"2015-05-29T06:37:42.399+0000",
	"lastSeenTimeStamp":"2015-05-29T07:37:42.399+0000",
	"state":"DS_STANDBY",
	"maintenanceState":"Ok",
	"device":"99999996",
	"sheets":316,
	"timeToDone":{"unit":"MINUTES", "duration":0},
	"meters":null,
	"squareMeters":null,
	"printedJobs":79,
	"jobsInQueue":0
},
{
	"datum":"Print Volume",
	"value":50000.0,
	"unit":"PrintedImpressions",
	"day":0,
	"hour":0,
	"lastStateChangedTimeStamp":"2015-05-29T06:37:42.399+0000",
	"lastSeenTimeStamp":"2015-05-29T07:37:42.399+0000",
	"state":"DS_STANDBY",
	"maintenanceState":"Ok",
	"device":"99999995",
	"sheets":316,
	"timeToDone":{"unit":"MINUTES", "duration":0},
	"meters":null,
	"squareMeters":null,
	"printedJobs":79,
	"jobsInQueue":0
}
];
	
function CalcPrintVolume() {
    for (var i = 0; i < realTimePrintVolumeData.length; i++){	
		realTimePrintVolumeData[i].value += iterator * 1000;
		realTimePrintVolumeData[i].sheets += iterator * 10;
		realTimePrintVolumeData[i].hour += iterator * 10;		
		realTimePrintVolumeData[i].jobsInQueue += iterator;
	}
}
function CalcTargetData() {
    for (var i = 0; i < realTimeTargetData.length; i++){	
		realTimeTargetData[i].intraDailyTarget.value += iterator * 1000 ;
		realTimeTargetData[i].intraDailyTarget.value %= 5000 ;
		realTimeTargetData[i].intraDailyTarget.sheets += iterator * 10;
		realTimeTargetData[i].intraDailyTarget.hour += iterator * 10;
		realTimeTargetData[i].intraDailyTarget.timeToDone.duration += iterator;
		realTimeTargetData[i].intraDailyTarget.jobsInQueue += iterator;
		
		realTimeTargetData[i].shiftTarget.value += iterator * 1000;
		realTimeTargetData[i].shiftTarget.sheets += iterator * 10;
		realTimeTargetData[i].shiftTarget.hour += iterator * 10;
		realTimeTargetData[i].shiftTarget.timeToDone.duration += iterator;
		realTimeTargetData[i].shiftTarget.jobsInQueue += iterator;
	}
}
// ===========================================================================================================================================

module.exports = {
	GetAllTargets: function () {			
		//console.log("GetAllTargets");		
		CalcTargetData();
		return realTimeTargetData;
	},
	GetManyTargets: function(ids){
		CalcTargetData();
		//console.log("GetManyTargets");		
		var ret = [realTimeTargetData[0]];				
		
		for(var i = 0; i < ids.length; i++){	
			//console.log("Id: %i", ids[i] );		
			//console.log("Index: %i", deviceMapping[ids[i]]);
			ret[i+1] = realTimeTargetData[deviceMapping[ids[i]]];
		}		
		return ret;
	},	
	GetAllPrintVolume: function () {			
		CalcPrintVolume();
		//console.log("GetAllPrintVolume");		
		return realTimePrintVolumeData;
	},
	GetManyPrintVolumes: function(ids){
		CalcPrintVolume();				
		var ret = [realTimePrintVolumeData[0]];
		//console.log("GetManyPrintVolumes: ids %j", ids);		
		for(var i = 0; i < ids.length; i++){
			//console.log("Id: %i", ids[i] );		
			//console.log("Index: %i", deviceMapping[ids[i]]);			
			ret[i + 1] = realTimePrintVolumeData[deviceMapping[ids[i]]];
		}				
		return ret;
	},
	GetPrintVolume: function(id){
		console.log("GetPrintVolume");		
		var index = parseInt(id);
		CalcPrintVolume();		
		return realTimePrintVolumeData[index];
	}			
};