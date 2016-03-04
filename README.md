# ChallongeTexter

Website is live at http://matchalert.herokuapp.com/

# Tutorial 

On the homescreen enter the custom URL of the respective challonge bracket you wish to use in the textbox titled "Bracket Name". 
For demo purposes you can use the bracket name "MatchAlertTest". Fill in the URL and click "Set up Phone Numbers". 

Fill in the respective names of the users entered in the tournament with phone numbers. 
The respective numbers will then be texted with their match information after clicking "Set up Phone Numbers".

# Description
The purpose of this web application is to serve as a tool for Tournament Organizers. The Tournament Organizer (or T.O. for short) will load the entrants in the tournament into a Challonge Bracket (challonge.com), and enter the name of that tournament to our website. Our application will parse the data in the Challonge Bracket, and then prompt the T.O. for all the phone numbers of each participant in the tournament. When a match between two participants is ready, our application will text both players by finding their phone numbers that were submitted earlier, and notify them that their match is ready. This will help automate the tournament process, and make it easier on the T.O. to track down missing players and start games earlier, finishing tournaments faster. 

Additional features to be implemented: Manual control of texting players at the T.O.'s discretion, as well as allowing players to text the T.O. back so they can explain if they will be late due to whatever reason (lunch, bathroom, etc.), and a user system to allow permission to only authenticated users.

This program was written in Node, and uses MongoDB as its database, and was hosted through Heroku. The APIs used were the Challonge API, as well as the Twilio API. 

Created by Nicolas Calle, Victor Chen, Ashkon Honardoost.
