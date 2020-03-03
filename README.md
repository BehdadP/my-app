my-app is a testing purpose app which works with AWS APIs to test Amazon relational database and provide some APIs to retrieve data this app can be tested by Postman with following samples:

                          http://localhost:3000/rank/?order=desc&aq_date=2020-02-01
                          
                          http://localhost:3000/rank/?order=desc
                          
                          http://localhost:3000/event/?tracker_uid=29960&aq_date=2020-02-01
                          
                          http://localhost:3000/event/?tracker_uid=29960
As you may notice API can work with a optional aq_date date filter. The response has a 30 seconds timout limitation as it is described in the task description.
To run this app, firstly in command line enter: "npm install" to install related packages in package.json.
After that type: "node server". 
Then the app shows the message: "App listening on port 3000!" and it would be ready to accept request from Postman application as mentioned above.
