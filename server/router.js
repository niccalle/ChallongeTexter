//user must install "ReadLine Sync" with command - npm install readline-sync
//install twillio = npm install -g twilio
var twilio = require('twilio');
var client = require('twilio')('AC470ec0cec6bebebf541ed7e523425c24',
 '8196d83d4a674648057e7f94942ee4f3');
var request = require('request');
var interval = 2000; //  10 seconds
var players = {}
var numbers = {}
var matchesPinged = {}
var readlineSync = require('readline-sync');


module.exports = function(app){
	app.get('/', function(req,res){
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


		setInterval(function() {
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
		}, interval);

		/* .auth('chenboy3', 'DTQjITLqFKyJR8kAGh8oK1uS0VBaPXjymwC2iL3d', true); */
	})
}