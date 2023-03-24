const dbconfig= require('../dbconfig')
async function neoLinkwordByName(linkWord){
    //console.log(linkWord)
	var query="MATCH (n:Linkword)<-[r:LINKED_BY]-(m:imageObject) where n.tag=\""+linkWord+"\" RETURN m" 
	console.log(this.query)
    var mes= await dbconfig.neoConfig(query,{})
	var query2="MATCH (n:Linkword)<-[r:LINKED_BY]-(m:imageObject) where \""+linkWord+"\" in m.linkwords RETURN m" 
	console.log(this.query2)
	var mes2= await dbconfig.neoConfig(query2,{})
	
	var imageNames = [];
	mes.records.forEach(record => {
		let imageRecord=record.get('m')
		imageNames.push(imageRecord.properties);
	})
	mes2.records.forEach(record => {
		let imageRecord=record.get('m')
		imageNames.push(imageRecord.properties);
	})
	//console.info(imageNames);
	return imageNames;
    // console.log(mes)
}

async function neoLinkwordByCategory(category){
	console.log(category)
	var query="MATCH (m:imageObject) where \""+category+"\" in m.category RETURN m" 
	console.log(this.query)
    var mes= await dbconfig.neoConfig(query,{})
    //console.log(mes)
	var imageNames = [];
	mes.records.forEach(record => {
		let imageRecord=record.get('m')
		imageNames.push(imageRecord.properties);
	})
	//console.info(imageNames);
	return imageNames;
}

async function neoLinkwordByKeyword(keyword){
	console.log("Inside keyword search:"+keyword)
	var query="MATCH (m:imageObject) where \""+keyword+"\" in m.keywords RETURN m"
	//var query="MATCH (n:Linkword)<-[r:LINKED_BY]-(m:imageObject) where \""+keyword+"\" in m.keywords RETURN m" 
	console.log(query)
    var mes= await dbconfig.neoConfig(query,{})
    console.log(mes)
	var imageNames = [];
	mes.records.forEach(record => {
		let imageRecord=record.get('m')
		console.log(imageRecord)
		imageNames.push(imageRecord.properties);
	})
	//console.info(imageNames);
	return imageNames;
}
module.exports = {neoLinkwordByName, neoLinkwordByCategory, neoLinkwordByKeyword}