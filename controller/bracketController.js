var request = require('request');
var Bracket = require('./model/bracketModel');
module.exports.home = function(req,res){
	res.render('index');
}
module.exports.phoneNumber = function(req,res){
	res.render('input');
}
module.exports.getBracket = function(req,res){
	console.log(req.params.id);
	var participants = [];
	request.get({url: 'https://api.challonge.com/v1/tournaments/'+req.params.id+'/participants.json'},
	function(err, response, body){ 
		data = JSON.parse(body);
		data.forEach(function(element){
			var name = element['participant']['name'];
			console.log(name);
			participants.push(name);
		});
		res.send(participants);
	})
	.auth('niccalle', 'kybqKzS7sTjMiLi6MZCYGCJR5sgQZEczlI747hPR', true);
}
/*
Function: pingNewMatches

Purpose: Checks all of the open matches on challonge, it then checks to see which matches have
already been pinged for texting. It will then ping the match if it hasn't been called before.

Algorithm Description: Go through open matches on challonge api. Make a comparison with the matchID
to the pinged match list database. If the match has already pinged then it will be ignored. If it has 
not been pinged then the players number will be texted via twilio and then added to the pinged database.
*/

module.exports.pingNewMatches = function(req, res){
	//access challonge API
	//Need to make MatchesPinged, players(name/number). 
	var matchesPinged = [];
	var playerDatabase = []; //name:'Armada' number: '6969696996969'

	Bracket.findOne({'bracketName': req.params.name}, function(error, bracket){
		if(error)
			console.log(error);
		bracket['playerInfo'].forEach(function(element){
			playerDatabase.push(element);
		});
		bracket['matchesPinged'].forEach(function(element){
			matchesPinged.push(element);
		});

		request.get({url: 'https://api.challonge.com/v1/tournaments/NicGuacTest/matches.json'},
			function(err,response,body){
				data= JSON.parse(body);
				data.forEach(function(element){
					if(element['match']['state'] == 'open'){
						if(matchesPinged[element['match']] != true)
						{
							console.log(players[element['match']['player1_id']]);
						}
					}
				})
			})

	});
	request.get({url: 'https://api.challonge.com/v1/tournaments/NicGuacTest/matches.json'},
		function(err, response, body){
		    data = JSON.parse(body);
		    data.forEach(function(element){
		        if(element['match']['state'] == 'open'){
		       		if(//MatchesPinged != true)
		       		{
		        	console.log(//players[element['match']['player1_id']] has a match vs players[element['match']['player2_id']])
		            console.log(//"Sending a text to " + players[element['match']['player1_id']]+ " at number " + numbers[players[element['match']['player1_id']]] +
		            //" & " +  players[element['match']['player2_id']]+ " at number " + numbers[players[element['match']['player2_id']]] );
		        	
		        	//Set matchesPinged[element['match']['id']] to true
		        	
		            //send text to both players
		                client.sendMessage({
		                    body: "Hello "+ players[element['match']['player1_id']] + "you have a match vs " + players[element['match']['player2_id']],
		                    to: "+1"+numbers[players[element['match']['player1_id']]],
		                    from: "+19256607127"
		                }, function(err, data) {
		                    if(err)
		                        console.log(err);
		                    console.log(data);
		                });
		                client.sendMessage({
		                    body: "Hello "+ players[element['match']['player2_id']] + "you have a match vs " + players[element['match']['player1_id']],
		                    to: "+1"+numbers[players[element['match']['player2_id']]],
		                    from: "+19256607127"
		                }, function(err, data) {
		                    if(err)
		                        console.log(err);
		                    console.log(data);
		                });

		            }
		        }
		    });
		})
		.auth('niccalle', 'kybqKzS7sTjMiLi6MZCYGCJR5sgQZEczlI747hPR', true);

}

/*
Function: startTexting

Purpose:  To make a model in the database for the specific bracket. 
It'll have all the numbers that we need to add. Look at the server.js code for an example of how to make a
new model and insert it into the database. 

Algorithm Descripion: Go through the array of numbers (req.body['numbers']), and make an array of Players.
Only make a player if the number isn't empty.

Return: res.render(...havent decided what to make this yet) This is going to a page that the user gets once they enter
the numbers
*/

module.exports.startTexting = function(req,res){
	//Get Players
		request.get({url: 'https://api.challonge.com/v1/tournaments/NicGuacTest/participants.json'},
		function(err, response, body){

		   
			data = JSON.parse(body);
			data.forEach(function(element){
				players[element['participant']['id']] = element['participant']['name'];
			});
			for(var key in players){
				console.log(players[key]);
		        //Gets users number.
		        var userName = readlineSync.question('What is the number of '+ players[key]+'? :');
		        numbers[players[key]]=userName;
		        console.log('Hi ' + players[key] + '! Your number is ' + numbers[players[key]] );
			}
			
		})
		.auth('niccalle', 'kybqKzS7sTjMiLi6MZCYGCJR5sgQZEczlI747hPR', true);

		//require("path/to/twilio-node/lib");
		// Twilio Credentials 




		//require the Twilio module and create a REST client 


		/* setInterval(function() { */
		request.get({url: 'https://api.challonge.com/v1/tournaments/NicGuacTest/matches.json'},
		function(err, response, body){
		    data = JSON.parse(body);
		    data.forEach(function(element){
		        if(element['match']['state'] == 'open'){
		       		if(matchesPinged[element['match']['id']] != true)
		       		{
		        	console.log(players[element['match']['player1_id']]+" has a match vs "+players[element['match']['player2_id']]);
		            console.log("Sending a text to " + players[element['match']['player1_id']]+ " at number " + numbers[players[element['match']['player1_id']]] +
		            " & " +  players[element['match']['player2_id']]+ " at number " + numbers[players[element['match']['player2_id']]] );
		        	matchesPinged[element['match']['id']] = true;
		        	
		            //send text to players
		                client.sendMessage({
		                    body: "Hello "+ players[element['match']['player1_id']] + "you have a match vs " + players[element['match']['player2_id']],
		                    to: "+1"+numbers[players[element['match']['player1_id']]],
		                    from: "+19256607127"
		                }, function(err, data) {
		                    if(err)
		                        console.log(err);
		                    console.log(data);
		                });
		                client.sendMessage({
		                    body: "Hello "+ players[element['match']['player2_id']] + "you have a match vs " + players[element['match']['player1_id']],
		                    to: "+1"+numbers[players[element['match']['player2_id']]],
		                    from: "+19256607127"
		                }, function(err, data) {
		                    if(err)
		                        console.log(err);
		                    console.log(data);
		                });




		            }
		        	console.log(element['match']['player1_id']);
		            console.log(element['match']['id']);
		        }
		    });
		})
		.auth('niccalle', 'kybqKzS7sTjMiLi6MZCYGCJR5sgQZEczlI747hPR', true);
		/*}, interval); */

		/* .auth('chenboy3', 'DTQjITLqFKyJR8kAGh8oK1uS0VBaPXjymwC2iL3d', true); */
	}
