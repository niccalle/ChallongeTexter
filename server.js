var request = require('request');
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