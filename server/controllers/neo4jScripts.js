const {neoConfig}= require('../dbconfig')
"use strict";

async function neoCreateImageNode(imageObj){ 
  const funParams={
    query:`
    MERGE (a:imageObject {imagename: $name, created_date: $createdDate, linkwords: $linkwords})
    SET a.category = split($category, ' ')
    SET a.keywords = split($keywords, ' ')
    WITH a, REDUCE(s = [], x IN COLLECT(a.category) | s + x) AS categories, REDUCE(s = [], x IN COLLECT(a.keywords) | s + x) AS keywords
    SET a.category = categories
    SET a.keywords = keywords
    `,
    params: {
      name:imageObj.image_name,
      createdDate:imageObj.created_date,
      category:imageObj.category,
      keywords:imageObj.keywords,
      linkwords:imageObj.linkwords
    }
  };
  //console.log(funParams.query);
  await neoConfig(funParams.query, funParams.params);

  funParams.query=`
  MATCH (a:imageObject)
  UNWIND a.linkwords as linkword
  WITH linkword, count(*) as count
  where count >1
  match (b:imageObject) 
  where linkword in b.linkwords 
  SET b.linkwords = [word IN b.linkwords WHERE word <> linkword]
  MERGE (c:Linkword{tag: linkword})
  MERGE (c)<-[:LINKED_BY {category:b.category, keywords:b.keywords}]-(b)
  return b,c;
  `;
  await neoConfig(funParams.query, {});

  //console.log(funParams.query);

  funParams.query=`
  MATCH (a:imageObject)
  UNWIND a.linkwords as linkword
  Match (b:Linkword {tag:linkword})
  SET a.linkwords = [word IN a.linkwords WHERE word <> linkword]
  MERGE (b)<-[:LINKED_BY {category:a.category, keywords:a.keywords}]-(a)
  return a,b;
  `;
  //console.log(funParams.query);
  await neoConfig(funParams.query, {});
} 


module.exports={neoCreateImageNode};
