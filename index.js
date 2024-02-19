//Imports
const getExif=require('exif-async');
const parse=require('parse-dms');
//Entry point functions
async function extractExif(){
    let gpsobj=await readExifData('china1.jpeg');
    console.log(gpsobj);
    let gpsParse=getGPS(gpsobj);
    console.log(gpsParse);
}
//Call entry point (not needed in gcf)
extractExif();
//Helper functions
async function readExifData(localFile){
    let exifData;
    try{
        exifData=await getExif(localFile);
        //console.log(exifData);
        //console.log(exifData.gps);
        return exifData.gps;
    }
    catch(err){
        console.log(err);
        return null;
    }
}

function getGPS(gps){
    //parse-dms needs a string in the format of
    //51:30:0.5486N 0:7:34.4503W
    const lat=`${gps.GPSLatitude[0]}:${gps.GPSLatitude[1]}:${gps.GPSLatitude[2]}${gps.GPSLatitudeRef}`;
    const long=`${gps.GPSLongitude[0]}:${gps.GPSLongitude[1]}:${gps.GPSLongitude[2]}${gps.GPSLongitudeRef}`;
    const coord=parse(`${lat} ${long}`);
    return coord;
}