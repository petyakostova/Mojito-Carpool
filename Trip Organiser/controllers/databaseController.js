//import {_} from './bower_components/underscore/underscore-min.js'
import { globals } from 'globals.js';

var dbController = (function(){

  function addDataType(tableName, entry) {
     var table = globals.everlive.data(tableName);
     console.log(entry);
 
     table.create(entry,
       function(success) {
         //entry successfully added to database
       }, function(error) {
         //error adding entry to database
     });
   }

  return {
    addDataType: addDataType
  };
}());

export { dbController }
