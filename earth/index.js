const fs           = require( 'fs' ),
      request      = require( 'request' ),
      schedule     = require( 'node-schedule' ),

      EARTH_JSON   = 'http://himawari8.nict.go.jp/img/D531106/latest.json',
      EARTH_IMG    = 'http://himawari8-dl.nict.go.jp/himawari8/img/D531106/2d/550/<date>_<suffix>.png',
      EARTH_SUFFIX = [ '0_0', '0_1', '1_0', '1_1' ],
      earth        = {
          date: "",
          imgs: []
      },
      earth_folder = __dirname + '/images/';

function task() {
    getJSON();
    schedule.scheduleJob( '3 * * * * *', () => {
        console.log('=== Start get json and download image process:' + new Date());
        getJSON();
    });
}

function getJSON() {
    request( EARTH_JSON, ( error, response, body ) => {
        if ( !error && response.statusCode === 200 ) {
            const json = JSON.parse( body );
            if ( json.date ) {
                earth.imgs = [];
                earth.date = json.date.replace( /[- ]/ig, '/' ).replace( /:/ig, '' );
                const img  = EARTH_IMG.replace( '<date>', earth.date );
                EARTH_SUFFIX.forEach( item => earth.imgs.push( img.replace( '<suffix>', item )));
                console.log( "=== Himawari8 latest background is ", earth )
                saveImage();
            }
        } else {
          console.log( 'Got an error: ', error, ', status code: ', response.statusCode )
        }
    });
}

function saveImage() {
    let count = 0;
    const download = ( url, filename, callback ) => {
            request.head( url, ( err, res, body ) => {
                request( url ).pipe( fs.createWriteStream( earth_folder + filename )).on( 'close', callback );
            });
        },
        complete = () => {
            count++;
            if ( count < EARTH_SUFFIX.length ) {
                download( earth.imgs[count], EARTH_SUFFIX[count] + ".png", complete );
            } else {
                console.log( "=== End get json and download image process." )
            }
        };
    download( earth.imgs[count], EARTH_SUFFIX[count] + ".png", complete );
}

exports.task = task;