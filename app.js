// Module dependencies
var bodyParser     = require( 'body-parser' ),
    express        = require( 'express'     ),
    expressSession = require( 'express-session' ),
    cors           = require( 'cors' ),
    earth          = require( './earth' ),
    app            = express();

app.use( bodyParser({limit: '5mb'}));
app.use( bodyParser.json());
app.use( bodyParser.urlencoded({ extended: true }));
app.use( expressSession({
    secret: 'supersecretsecret',
    resave: false,
    saveUnititialized: true
}));

app.use( '/earth', express.static(__dirname + '/earth/images' ));
app.use( cors() );

earth.task();

app.get( '*', function ( req, res ) {
    res.redirect( "http://ksria.com/simptab" );
});

app.listen( process.env.PORT || 3000 , function() {
    console.log( 'SimpRead server started and listening on port 3000' );
});
