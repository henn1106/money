var fdb = new ForerunnerDB();
var db = fdb.db("accountting");
var accounttingCollection = db.collection('accountting');
accounttingCollection.load();


function creatAccounttingHTMLString(date,category,project,cost){
	return"<tr><td>"+date+"</td><td>"+category+"</td><td>"+project+"</td><td>"+cost+"</td></tr>"
}

$("#lookup").click(function() {
    $("#accounttingTable").find("tr").remove();
	if($('input[name=howlookup]:checked').val()=="thismonth"){
		var date= new Date();
		var year= date.getUTCFullYear();
		var month= date.getUTCMonth()+1;
		if(month<10){
			month="0"+month;
		}
		var dateString = year+"-"+month+"-"+"01";
		var accounttings=accounttingCollection.find(
			{
				date:{
						$gte:dateString
				}            
			}
		);
		for (var i = 0; i < accounttings.length; i++) {
        	$("#accounttingTable").append(creatAccounttingHTMLString(accounttings[i].date,accounttings[i].category,accounttings[i].project,accounttings[i].cost))
    	}
    	var eatcost=0
		var playcost=0
		var othercost=0
		for (var i = 0; i < accounttings.length; i++) {
			if(accounttings[i].category=="吃"){
				eatcost=eatcost+accounttings[i].cost/1
			} else if (accounttings[i].category=="玩") {
				playcost=playcost+accounttings[i].cost/1
			} else if (accounttings[i].category=="其他") {
				othercost=othercost+accounttings[i].cost/1
			}
		}
		var totalcost=eatcost/1+playcost/1+othercost/1
		var eatproportion=Math.round(eatcost/totalcost*100)+"%"
		var playproportion=Math.round(playcost/totalcost*100)+"%"
		var otherproportion=Math.round(othercost/totalcost*100)+"%"
		$("#eatcost").text(eatcost);
		$("#eatproportion").text(eatproportion);
		$("#playcost").text(playcost);
		$("#playproportion").text(playproportion);
		$("#othercost").text(othercost);
		$("#otherproportion").text(otherproportion);
		$("#totalcost").text(totalcost);
	}else{
		var startdate = $("#startdate").val()
    	var finishdate = $("#finishdate").val()
		var accounttings = accounttingCollection.find({
        	date: {
            	$gte: startdate,
            	$lte: finishdate
         	}

   		})
    	for (var i = 0; i < accounttings.length; i++) {
        	$("#accounttingTable").append(creatAccounttingHTMLString(accounttings[i].date,accounttings[i].category,accounttings[i].project,accounttings[i].cost))
    	}
		var eatcost=0
		var playcost=0
		var othercost=0
		for (var i = 0; i < accounttings.length; i++) {
			if(accounttings[i].category=="吃"){
				eatcost=eatcost+accounttings[i].cost/1
			} else if (accounttings[i].category=="玩") {
				playcost=playcost+accounttings[i].cost/1
			} else if (accounttings[i].category=="其他") {
				othercost=othercost+accounttings[i].cost/1
			}
		}
		var totalcost=eatcost/1+playcost/1+othercost/1
		var eatproportion=Math.round(eatcost/totalcost*100)+"%"
		var playproportion=Math.round(playcost/totalcost*100)+"%"
		var otherproportion=Math.round(othercost/totalcost*100)+"%"
		$("#eatcost").text(eatcost);
		$("#eatproportion").text(eatproportion);
		$("#playcost").text(playcost);
		$("#playproportion").text(playproportion);
		$("#othercost").text(othercost);
		$("#otherproportion").text(otherproportion);
		$("#totalcost").text(totalcost);
	}
});