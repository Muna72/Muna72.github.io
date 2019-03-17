// JavaScript Document

var db = firebase.database();
var rootRef = db.ref();
var stock = new Object();
var firstTime = true;
//friendRef = rootRef.child(“friend”);

rootRef.on('child_added', addTable);
rootRef.on('child_removed', removeTableRow);
//rootRef.on('value', addFriend);

function processUpload() {
  var uploadInfo = document.getElementById('upload');
  if ('files' in uploadInfo) {
    var reader = new FileReader();
    reader.onload = function(event) {
      var jsonObj = JSON.parse(event.target.result); //an array of objects
      /* put your code here, whatever you need to do with jsonObj */
	  for(var i = 0; i < jsonObj.length; i++) {
	       rootRef.push().set(jsonObj[i]);  
	  }
    };
    /* file is an array and we are interested only in the first element */
    reader.readAsText(uploadInfo.files[0]);
  }
}

function addTable(snapshot) {
	

            var myTable = document.getElementById("friendTable");
			var div = myTable.parentNode;
			var temp;
			
			stock[snapshot.key] = snapshot.val();
			
			for(var key in stock) {
				if(stock.hasOwnProperty(key)) {
					var x = stock[key].phone;	
					if(x.length == 7 || x.length == 10) {
						if(x.length == 7) {
							temp = x.substring(0,3) + "-" + x.substring(3);
						}
						if(x.length == 10) {
							temp = "(" + x.substring(0,3) + ")" + x.substring(3,6) + "-" + x.substring(6);
						}
						stock[key].phone = temp;
					}
				}
				
			}


			//var stockSet = new Set(stock);
			//stock = Array.from(stockSet);


            //TABLE COLUMNS
				var tr = document.createElement('TR');
				for (var val in stock[snapshot.key]) {
					if(stock[snapshot.key].hasOwnProperty(val)) {
						var td = document.createElement('TD')
						td.appendChild(document.createTextNode(stock[snapshot.key][val]));
						tr.appendChild(td)
					}
				}
				var td = document.createElement('TD')
				var colButton = document.createElement('BUTTON');
				colButton.appendChild(document.createTextNode("Delete"));
				colButton.setAttribute('onclick', `removeRow("${snapshot.key}")`);
				td.appendChild(colButton);
				tr.appendChild(td)
				myTable.appendChild(tr);


			if(firstTime) {
				if(document.getElementById("deleteAll") == null) {
					var deleteAll = document.createElement('button');
					deleteAll.id = "deleteAll";
					deleteAll.innerHTML = "Delete All Records";
					deleteAll.setAttribute('onclick', "removeAllRows()");
					div.appendChild(deleteAll);
				}
			div.className = "center";
			
			firstTime = false;
			
			}

        }
		
		function validateInputData() {
			
			var nameValue = document.getElementById("nameField").value;
			var numberValue = document.getElementById("numberField").value;
			var ageValue = document.getElementById("ageField").value;
			
			var allPassed = true;
			
			if(/[A-Z]{1}[a-z]+/.test(nameValue)) {
				
			} else {
				allPassed = false;
				alert("Name formatting incorrect. Please re-enter.");
			}
			if(/^([0-9]{7})$|^([0-9]{10})$/.test(numberValue)) {
				
			} else {
				allPassed = false;
				alert("Invalid phone number. Please re-enter.");
			}
			if(/^[0-9]{1,2}$/.test(ageValue)) {
				
			} else {
				allPassed = false;
				alert("Inavlid age. Please re-enter.");
			}
			
			if(allPassed) {
				addFriend(nameValue, numberValue, ageValue);
			}
		}
		
		function searchDatabase() {
			
			var searchValue = document.getElementById("searchField").value;
			
			if(/[A-Za-z]+/.test(searchValue)) {
				
			var resultsTable = document.getElementById("resultsTable");
			var parentDiv = resultsTable.parentNode;
			parentDiv.className = "show";
			
			//Clear table of all possible previous values
			var oldContent = document.querySelectorAll("#resultsTable tr");
			var oldLength = resultsTable.rows.length;
			
			for(var i = 1; i < oldLength; ++i) {
				resultsTable.deleteRow(1);
			}
			}
			rootRef.orderByChild('name').on('child_added', executeQuery);
		}
		
		function executeQuery(snapshot) {
			
			var searchValue = document.getElementById("searchField").value;
			var resultsTable = document.getElementById("resultsTable");
			
			if(/[A-Za-z]+/.test(searchValue)) {
			var results = new Object();
			results[snapshot.key] = snapshot.val();
			
			var valid = new Object();
			
			for(var val in results) {
				if(results.hasOwnProperty(val)) {
					if(results[snapshot.key].name.toLowerCase().includes(searchValue.toLowerCase())) {
						valid[snapshot.key] = snapshot.val();
					}
				}
				
			}
			
			    //TABLE COLUMNS
				var tr = document.createElement('TR');
				for (var val in valid[snapshot.key]) {
					if(valid[snapshot.key].hasOwnProperty(val)) {
						var td = document.createElement('TD')
						td.appendChild(document.createTextNode(valid[snapshot.key][val]));
						tr.appendChild(td)
						resultsTable.appendChild(tr);
					}
				}
				

			 }
		}
		
		function removeRow(key) {
			
			var childRef = rootRef.child(key);
			childRef.remove();
		}
		
		function removeTableRow(snapshot) {
			
			var name = snapshot.val().name;
			
			var rows = document.getElementsByTagName("tr");
			for (var i = rows.length; i--;) {
			  if(rows[i].innerHTML.indexOf(name) !== -1) {
				rows[i].parentNode.removeChild( rows[i] );
			  }
			}
			
		}
		
		function removeAllRows() {
			rootRef.remove();
			
			var emptyTable = document.getElementById("friendTable");
			var d = emptyTable.parentNode;
			
			d.className = "hidden";
			firstTime = true;
		}
		
		function addFriend(nameValue, numberValue, ageValue) {
			
			rootRef.push().set({ name: nameValue, phone: numberValue, age: ageValue });

		}
		