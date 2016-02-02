var request = require('request');
var interval = 10000; //  10 seconds
setInterval(function() {
request.get({url: 'https://api.challonge.com/v1/tournaments/NicGuacTest/matches.json'},
function(err, response, body){
    data = JSON.parse(body);
    data.forEach(function(element){
        if(element['match']['state'] == 'open'){
            console.log(element['match']['id']);
        }
    });
})
.auth('niccalle', 'kybqKzS7sTjMiLi6MZCYGCJR5sgQZEczlI747hPR', true);
}, interval);

/* .auth('chenboy3', 'DTQjITLqFKyJR8kAGh8oK1uS0VBaPXjymwC2iL3d', true); */