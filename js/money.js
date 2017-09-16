var fdb = new ForerunnerDB();
var db = fdb.db("accountting");
var accounttingCollection = db.collection('accountting');

accounttingCollection.load();

$("#enter").click(function(){
	var date=$("#date").val();
    var category=$("#category").val();
    var project=$("#project").val();
    var cost=$("#cost").val();

    accounttingCollection.insert({
    	date: date,
    	category: category,
    	project: project,
    	cost: cost
    });
    accounttingCollection.save();
    alert("儲存成功")
    
    $("#date").val("");
    $("#category").val("");
    $("#project").val("");
    $("#cost").val("");

})