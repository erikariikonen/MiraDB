var myAppModule = angular.module('myApp', []);

function initialize_table(tabledata, table_name, db){
  var insertQuery = "CREATE TABLE " + table_name + " (" + tabledata[table_name].schema + ");";
  db.run(insertQuery);

  values = tabledata[table_name].data[0].length

  qmarks = "?"
  for (var i=1; i<values; i++) {
      qmarks += ",?"
  }

  tabledata[table_name].data.forEach( function( item ){
      db.run("INSERT INTO " + table_name + " VALUES (" + qmarks + ")", item);
  } );
}


myAppModule.controller('weekOneSqlController', function($scope) {
  var db = new SQL.Database();
  $scope.db = db;

  $scope.tabledata = TABLES;
  $scope.tables = ['Opiskelija', 'Kurssisuoritus'];

  $scope.tables.forEach(function(table) {
    initialize_table($scope.tabledata, table, db);
  });
});

myAppModule.controller('weekTwoSqlController', function($scope) {
  var db = new SQL.Database();
  $scope.db = db;

  $scope.tabledata = WK2TABLES;
  $scope.tables = ['Opiskelija', 'Kurssi', 'Kurssisuoritus', 'Tehtävä', 'Kurssitehtävä'];

    
  $scope.tables.forEach(function(table) {
    initialize_table($scope.tabledata, table, db);
  });
});


myAppModule.controller('weekThreeSqlController', function($scope) {
  var db = new SQL.Database();
  $scope.db = db;

  $scope.tabledata = WK3TABLES;
  $scope.tables = ['Opiskelija', 'Kurssi', 'Kurssisuoritus', 'Tehtävä', 'Kurssitehtävä', 'Tehtäväsuoritus'];

  
  $scope.tables.forEach(function(table) {
    initialize_table($scope.tabledata, table, db);
  });
});

myAppModule.controller('noTablesSqlController', function($scope) {
  var db = new SQL.Database();
  $scope.db = db;

  $scope.tabledata = NOTABLES;
  $scope.tables = [];
  
  $scope.tables.forEach(function(table) {
    initialize_table($scope.tabledata, table, db);
  });
});


/*
myAppModule.controller('weekOneSqlController', function($scope) {
  var db = new SQL.Database();
  $scope.db = db;

  $scope.tables = ['students', 'courses', 'participations'];

  $scope.tables.forEach( function(table){
      initialize_table(table, db);
  });
});
*/