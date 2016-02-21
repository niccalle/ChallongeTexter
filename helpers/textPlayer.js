var request = require('request');

var Brackets = require ('../models/bracketModel');
var twilio = require('twilio');
var client = require('twilio')('AC470ec0cec6bebebf541ed7e523425c24',
 '8196d83d4a674648057e7f94942ee4f3');
module.exports.pingNewMatches = function(req,res){
	//access challonge API
	//Need to make MatchesPinged, players(name/number).
	console.log("trying to ping matches now"); 
	var pinged = [];
	var playerDatabase = []; //name:'Armada' number: '6969696996969'

	Brackets.findOne({'bracketName': req.params.name}, function(error, bracket){
		if(error){
			console.log(error);
		}
		else{
			bracket['playerInfo'].forEach(function(element){
				playerDatabase.push(element);
			});
			bracket['matchesPinged'].forEach(function(element){
				pinged.push(element);
			});

			request.get({url: 'https://api.challonge.com/v1/tournaments/'+req.params.name+'/matches.json'},
				function(err,response,body){
					data= JSON.parse(body);
					data.forEach(function(element){
						if(element['match']['state'] == 'open'){
							var matchId = element['match']['id'].toString();
							if(pinged.indexOf(matchId) == -1)
							{	
							var player1;
							var player2;
							playerDatabase.forEach(function(player){
								if(player['playerId'] == element['match']['player1_id']){
									player1 = player;
								}
								if(player['playerId'] == element['match']['player2_id']){
									player2 = player;
								}
							})
							//textPlayer(player1,player2);
							printMatch(player1,player2);
							pinged.push(matchId);
							console.log(pinged);
							}
						}
					})
				Brackets.update({'bracketName': req.params.name}, {matchesPinged: pinged}, function(err, numAffected){});
				})
				.auth('niccalle', 'kybqKzS7sTjMiLi6MZCYGCJR5sgQZEczlI747hPR', true);
			}

	});
}

function printMatch(player1, player2){
	if(player1['number']!="")
		console.log("Hello "+ player1['name'] + " you have a match vs " + player2['name']);
	if(player2['number']!="")
		console.log("Hello "+ player2['name'] + " you have a match vs " + player1['name']);
}
function textPlayer(player1,player2){
		client.sendMessage({
		    body: "Hello "+ player1['name'] + "you have a match vs " + player2['name'],
			to: "+1"+player1['number'],
			from: "+19256607127"
		}, function(err, data) {
		     
		});	
		client.sendMessage({
		    body: "Hello "+ player2['name'] + "you have a match vs " + player1['name'],
			to: "+1"+player2['number'],
			from: "+19256607127"
		}, function(err, data) {
		     
		});	
}
