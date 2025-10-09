# HeuristicsEvaluationTool
Dedicated tool to collect and show result for heuristics evaluation

This tool is used on my master thesis to collect heuristics point

This uses JSON server and the answers stays local at your computer

For now it is quite barebones and it worked for my needs. This will have release tag to indicate the state, but i will improve this later. Especially the resuls page should have more data showing. I'm planing to use this on future tools

## How to run this
rename the db_example.json to db.json

To run the frontend use command: npm run dev
To run the JSON server use command: npx json-server --watch db.json --port 3001

### TODO fetures
-could add photos via the form
-possibility modify the heuristics, if not using the Nilsens 
-more brake down for the results