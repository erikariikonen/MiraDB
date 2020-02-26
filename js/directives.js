var myAppModule = angular.module('myApp');

myAppModule.directive('togglable', function() {
  return {
      restrict: 'E',
      scope: {
          content: '@',
	  db: '=',
      },
      transclude: true,
      templateUrl: 'templates/togglable-template.html',

      controller: function($scope){
        $scope.visible = false;
        $scope.command = "näytä";

        $scope.toggle = function () {
          $scope.visible = !$scope.visible;
          $scope.command = $scope.visible ? "piilota" : "näytä";

          if(!$scope.visible) {
              return;
	  }

          var query = "SELECT substr(sql, 13) AS Taulut FROM sqlite_master";

	  console.log("Retrieving tables from database");
	  console.log("Running query " + query);

	  var stmt = $scope.db.prepare(query);

          stmt.getAsObject();
          stmt.bind();

          $scope.table_rows = [];
            
	  while(stmt.step()) {
            var row = stmt.getAsObject();
            $scope.table_rows.push(row);
          }

          if($scope.table_rows.length <= 0) {
            console.log("No tables in database");
	    return;
	  }
            
	  $scope.table_columns = Object.keys($scope.table_rows[0]);
	  console.log($scope.table_columns);
	  console.log($scope.table_rows);
        }
      }
  };
});

/*
myAppModule.directive('tableInfo', function() {
  return {
      restrict: 'E',
      templateUrl: 'templates/table-template.html',
      controller: function($scope){

        $scope.table_details = function (table_name) {
	    console.log("Retrieving table details for " + table_name);

            var stmt = $scope.db.prepare("SELECT substr(sql, 13) AS Taulut FROM sqlite_master");
            stmt.getAsObject();
            stmt.bind();

            $scope.table_rows = [];
            
	    while(stmt.step()) {
                var row = stmt.getAsObject();
                $scope.table_rows.push(row);
            }
            
	    $scope.table_columns = Object.keys($scope.rows[0]);
	    console.log($scope.table_columns);
	    console.log($scope.table_rows);

            return $scope.tabledata[table_name].schema;
        }
      }
  };
});
*/

myAppModule.directive('query', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/query-template.html',
      scope: {
          db: '=',
          query: '@',
          editable: '@',
          done: '=?',
	  valid: '@?',
          order: '=?',
          rows: '=?',
	  reset: '=?'
      },
      controller: function($scope) {
	  if (!$scope.rows) {
	      $scope.rows = 4;
	  }

          $scope.run_query = function(query) {
              try {
		  console.log("Running query " + query);
		  $scope.done = false;
		  $scope.validMessage = null;
                  $scope.error = null;

		  if(!query || query.length == 0) {
		      $scope.error = "Annettiin tyhjä kysely -- ei suoritettavaa.";
		      return;
		  }

		  if (query.toUpperCase().indexOf("DELETE") > -1 || 
		      query.toUpperCase().indexOf("INSERT") > -1 || 
		      query.toUpperCase().indexOf("CREATE") > -1 || 
		      query.toUpperCase().indexOf("ALTER") > -1) {

		      $scope.db.run(query);

		      if(!$scope.valid) {
			  $scope.done = true;
		      } else {
			  console.log("TODO: validate update");
		      }
		      

		      return;		      
		  }

                  var stmt = $scope.db.prepare(query);
                  stmt.getAsObject();
                  stmt.bind();
                  $scope.rows = [];
                  
		  while(stmt.step()) {
                      var row = stmt.getAsObject();
                      $scope.rows.push(row);
                  }

		  if($scope.rows.length <= 0) {
		      $scope.columns = ["Tyhjä vastaus"];
		      $scope.done = true;
		      return;
		  }
                  
		  $scope.columns = Object.keys($scope.rows[0]);
		  
		  if(!$scope.valid) {
                      $scope.done = true
		  } else {
		      console.log("Validating against result " + query);
      		      var testStmt = $scope.db.prepare($scope.valid);
                      testStmt.getAsObject();
                      testStmt.bind();
		      
		      var testRows = [];
                      
		      while(testStmt.step()) {
			  var row = testStmt.getAsObject();
			  testRows.push(row);
                      }

		      var testColumns = Object.keys(testRows[0]);

		      // test cases
		      // 1. onko sarakkeiden lukumäärä toivottu
		      console.log("Test case 1");
		      if(testColumns.length != $scope.columns.length) {
			  $scope.validMessage = [];
			  $scope.validMessage.push("Kyselyn vastauksessa tulisi olla " + testColumns.length + " saraketta, mutta nyt niitä oli " + $scope.columns.length);
			  return;
		      }

		      console.log("Test case 2");
		      // 2. ovatko sarakkeet nimetty toivotulla tavalla
		      for (var i = 0; i < testColumns.length; i++) {
			  if(testColumns[i].valueOf() == $scope.columns[i].valueOf()) {
			      continue;
			  }

			  $scope.validMessage = [];
			  $scope.validMessage.push("Sarakkeen " + (i + 1) + " pitäisi olla " + testColumns[i] + ", mutta nyt se oli " + $scope.columns[i]);
			  return;
		      }
		      
		      console.log("Test case 3");
 		      // 3. onko rivien lukumäärä toivottu
		      if(testRows.length != $scope.rows.length) {
			  $scope.validMessage = [];
			  $scope.validMessage.push("Kyselyn vastauksessa tulisi olla " + testRows.length + " riviä, mutta nyt niitä oli " + $scope.rows.length);
			  return;
		      }

		      // 4. ovatko rivit järjestyksessä tai oikein
		      // TODO: myöh

		      console.log("Test case 4");
		      if($scope.order) {
			  console.log("Expecting ordered data");
			  // 5. onko n:s datarivi ok
			  for (var i = 0; i < testRows.length; i++) {
			      for (var j = 0; j < testColumns.length; j++) {
				  if(testRows[i][testColumns[j]].valueOf() == $scope.rows[i][testColumns[j]].valueOf()) {
				      continue;
				  }
				  
				  $scope.validMessage = [];
				  $scope.validMessage.push("Virhe vastauksen rivillä " + i + ". Odotettiin, että arvot olisivat seuraavat:");
				  
				  for (var k = 0; k < testColumns.length; k++) {
				      $scope.validMessage.push("  " + testColumns[k] + ": " + testRows[i][testColumns[k]]);
				  }
				  
				  return;
			      }
			  }
		      } else {
			  console.log("Not expecting ordered data");
			  var expectedRows = [];
			  var outputRows = [];
			  for (var i = 0; i < testRows.length; i++) {
			      var expectedRow = "  " + testColumns[0] + ": " + testRows[i][testColumns[0]].valueOf();
			      var outputRow = "  " + testColumns[0] + ": " + $scope.rows[i][testColumns[0]].valueOf();

			      for (var j = 1; j < testColumns.length; j++) {
				  expectedRow += "\n  " + testColumns[j] + ": " +  " " + testRows[i][testColumns[j]].valueOf();
				  outputRow += "\n  " + testColumns[j] + ": " +  " " + $scope.rows[i][testColumns[j]].valueOf();
			      }

			      expectedRows.push(expectedRow);
			      outputRows.push(outputRow);
			  }
			  
//			  console.log(expectedRows);
//			  console.log(outputRows);

			  for(var i = 0; i < expectedRows.length; i++) {
			      if(outputRows.indexOf(expectedRows[i]) < 0) {
				  $scope.validMessage = [];
				  $scope.validMessage.push("Odotettua riviä ei löytynyt vastauksesta. Odotettu rivi oli: ");
				  
				  var parts = expectedRows[i].split("\n");
				  for (var j = 0; j < parts.length; j++) {
				      $scope.validMessage.push(parts[j]);				      
				  }

				  return;
			      }
			  }

			  // check that expected has all rows in output
		      }

		      $scope.done = true;
		  } 
              }
              catch(err) {
                  $scope.error = err.toString();
              }
          };

          $scope.doReset = function() {
	      $scope.rows = null;
              $scope.columns = null;
              

              var query = "SELECT tbl_name FROM sqlite_master";
	      var stmt = $scope.db.prepare(query);

              stmt.getAsObject();
              stmt.bind();
	      
              $scope.table_rows = [];
              
	      while(stmt.step()) {
		  var row = stmt.getAsObject();
		  console.log(row);
		  console.log("Dropping table " + row[0]);
		  $scope.db.run("DROP TABLE " + row[0]);
	      }
	  };

          $scope.clear = function () {
              $scope.rows = null;
              $scope.columns = null;
          };
      }
  };
});