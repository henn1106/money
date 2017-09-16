var fdb = new ForerunnerDB();
var db = fdb.db("accountting");
var accounttingCollection = db.collection('accountting');
accounttingCollection.load();

function creatAccounttingHTMLString(date,category,project,cost){
	return"<tr><td>"+date+"</td><td>"+category+"</td><td>"+project+"</td><td>"+cost+"</td></tr>"
}



setTimeout(function(){
	var accountting = accounttingCollection.find(
		{},
		{
			$orderBy: {date:-1},
			$limit:10
		}
    );
	for (var i = 0; i <accountting.length; i++) {
		$("#accounttingTable").append(creatAccounttingHTMLString(accountting[i].date,accountting[i].category,accountting[i].project,accountting[i].cost))
	}
}, 500);

