// Module dependencies
var bodyParser     = require( 'body-parser' ),
    express        = require( 'express'     ),
    expressSession = require( 'express-session' ),
    cors           = require( 'cors' ),
    app            = express();

app.use( bodyParser({limit: '5mb'}));
app.use( bodyParser.json());
app.use( bodyParser.urlencoded({ extended: true }));
app.use( expressSession({
    secret: 'supersecretsecret',
    resave: false,
    saveUnititialized: true
}));

/*
app.use( '/view', express.static(__dirname + '/readmode/view' ));
app.use( cors() );

app.post( '/evernote/oauth', en.oauth );
app.post( '/evernote/token', en.token );
app.post( '/evernote/add',   en.add   );

app.post( '/view/read',      rd.read  );
app.post( '/view/clear',     rd.clear );

app.post( '/service/add',    srv.add  );
*/

app.get( '*', function ( req, res ) {
    res.redirect( "http://ksria.com/simptab" );
});

app.listen( process.env.PORT || 3000 , function() {
    console.log( 'SimpRead server started and listening on port 3000' );
});
