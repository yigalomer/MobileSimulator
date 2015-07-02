
var mobileRealTimeModel = require('../models/mobileRealTimeModels');

var express = require("express");

var mobileRealTime_controller = express.Router();


mobileRealTime_controller.get('/', function (req, res) {
    res.send({message:"Illegal API call"});
});

mobileRealTime_controller.get('/target/many', function (req, res) {	
	var ids;
	if(req.query.devices == undefined){
		res.send(mobileRealTimeModel.GetAllTargets());
		return;
	}
	
	if(req.query.devices instanceof Array){
		ids = req.query.devices;
	}
	else{
		ids = [req.query.devices];
	}
    res.send(mobileRealTimeModel.GetManyTargets(ids));
});

mobileRealTime_controller.get('/many', function (req, res) {
	console.log("%j", req.query);
	var ids;
	
	if(req.query.devices == undefined){
		res.send(mobileRealTimeModel.GetAllPrintVolume());
		return;
	}
	
	if(req.query.devices instanceof Array){
		ids = req.query.devices;
	}
	else{
		ids = [req.query.devices];
	}
    res.send(mobileRealTimeModel.GetManyPrintVolumes(ids));
});


module.exports = mobileRealTime_controller;





