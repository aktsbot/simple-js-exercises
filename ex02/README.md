# Getting started with APIs and the node way (̿▀̿ ̿Ĺ̯̿̿▀̿ ̿)̄

#### What does this do ?
Runs an API which when triggered does 3 operations to a string passed to it.

##### Example
On sending the below to the API URL (`http://localhost:1337/do-stuff`) as a `POST` request,

	{	
		"rev": true,
		"upc": false,
		"num": false,
		"str": "room"
	}
	
we'd recieve 

	{
		"error" : 0,
		"msg": "moor"
	}

#### To run

	$ npm install 
	$ npm start
	
#### TODO
Document the thing, you lazy ass.