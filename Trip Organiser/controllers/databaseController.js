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
   };
   
   function findIn(tableName, property, value, query) {
    var filter = new Everlive.Query(),
        data = globals.everlive.data(tableName);
    
    filter.where().query(property, value);
    data.get(filter)
        .then(function(data){
            return data;
        },
        function(error){
            alert(JSON.stringify(error));
        });
  }

  return {
    addDataType: addDataType,
    findIn: findIn
  };
}());

export { dbController }
