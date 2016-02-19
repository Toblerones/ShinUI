var url = require('url');
var fs = require('fs');

function generateId()
{
	var date = new Date();
	var currentTime = addZero(date.getFullYear().toString().substring(2,4)) 
						+ addZero((date.getMonth()+1).toString())
						+ addZero(date.getDate().toString())
						+ addZero(date.getHours().toString())
						+ addZero(date.getMinutes().toString())
						+ addZero(date.getSeconds().toString());
	return "leave_" + currentTime;
}

function addZero(str){
	if(str.length==1){
		str = '0' + str;
	}
	return str;
}

function createLeave(req){
	var url_parts = url.parse(req.url, true);
    var leave = url_parts.query;

    var leaveId = generateId();
	leave.leaveId = leaveId;
	leave.status = "pending";
	var leaveFile = 'server/json/leaves/' + leaveId.toString() + '.json'
	fs.writeFileSync(leaveFile,JSON.stringify(leave));

	return {
		result: true,
		message: "Create Leave Request Completed.",
		leaveId: leaveId
	};
}

exports.result = createLeave;