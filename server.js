var request = require('request');
var interval = 2000; //  10 seconds
var players = {
}
var matchesPinged = {}
//Get Players
request.get({url: 'https://api.challonge.com/v1/tournaments/NicGuacTest/participants.json'},
function(err, response, body){
	data = JSON.parse(body);
	data.forEach(function(element){
		players[element['participant']['id']] = element['participant']['name'];
	});
	for(var key in players){
		console.log(players[key]);
	}
	

})
.auth('niccalle', 'kybqKzS7sTjMiLi6MZCYGCJR5sgQZEczlI747hPR', true);


setInterval(function() {
request.get({url: 'https://api.challonge.com/v1/tournaments/NicGuacTest/matches.json'},
function(err, response, body){
    data = JSON.parse(body);
    data.forEach(function(element){
        if(element['match']['state'] == 'open'){
       		if(matchesPinged[element['match']['id']] != true)
       		{
        	console.log(players[element['match']['player1_id']]+" has a match vs "+players[element['match']['player2_id']]);
        	matchesPinged[element['match']['id']] = true;
        	}
        	console.log(element['match']['player1_id']);
            console.log(element['match']['id']);
        }
    });
})
.auth('niccalle', 'kybqKzS7sTjMiLi6MZCYGCJR5sgQZEczlI747hPR', true);
}, interval);

/* .auth('chenboy3', 'DTQjITLqFKyJR8kAGh8oK1uS0VBaPXjymwC2iL3d', true); */



