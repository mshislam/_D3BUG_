# _D3BUG_

config file is a json file in the root of the project
ex:
{
"db": {
"mongoURI": connection String to mongo DB
},
"jwt": {
"secretOrKey": String used for verifying the token's signature used in passport.
},
"cloudTranslation": {
"Key": API key used to connect to google cloud translate
},
"port": port which node server will run on
}

-To run server ---> npm run dev in main directory
-make sure to run npm i in main directory & in client directory
