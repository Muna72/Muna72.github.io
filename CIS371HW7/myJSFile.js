// JavaScript Document

function processUpload() {
  var uploadInfo = document.getElementById('upload');
  if ('files' in uploadInfo) {
    var reader = new FileReader();
    reader.onload = function(event) {
      var jsonObj = JSON.parse(event.target.result);
      /* put your code here, whatever you need to do with jsonObj */
	  console.log(jsonObj);
	  addTable(jsonObj);
    };
    /* file is an array and we are interested only in the first element */
    reader.readAsText(uploadInfo.files[0]);
  }
}

function addTable(jsonObj) {

            var myTableDiv = document.getElementById("metric_results")
            var table = document.createElement('TABLE')
            var tableBody = document.createElement('TBODY')

            table.border = '1'
            table.appendChild(tableBody);

            var heading = new Array();
            heading[0] = "Name"
            heading[1] = "Phone Number"
            heading[2] = "Age"
			heading[3] = "Action"

            var stock = new Array();
			
			//creates an array of arrays that are a name->value pairs
			for(var x in jsonObj) {
				//if var is a phone number, then take value and format it
		    	if (jsonObj.hasOwnProperty(x)) {
        			stock.push(x, jsonObj[x]);
   				 }
			}

			
			//stock[0] = new Array("Cars", "88.625", "85.50", "85.81", "987")
            //stock[1] = new Array("Veggies", "88.625", "85.50", "85.81", "988")

            //TABLE COLUMNS
            for (i = 0; i < stock.length; i++) {
				var tr = document.createElement('TR');
				for (j = 0; j < stock[i].length; j++) {
					var td = document.createElement('TD')
					td.appendChild(document.createTextNode(stock[i][j]));
					tr.appendChild(td)
				}
				tableBody.appendChild(tr);
			}

            //TABLE ROWS
            var tr = document.createElement('TR');
            tableBody.appendChild(tr);

            for (i = 0; i < stock.length; i++) {
                for (j = 0; j < stock[i].length; j++) {
                    var td = document.createElement('TD')
					if(i == ) {
                    	td.appendChild(document.createTextNode(stock[i][j]));
					} else {
						//create button for deleting rows
					}
                    td.appendChild(td)
                }
            }

            myTableDiv.appendChild(table)
			
			var deleteAll = document.createElement('button');
			deleteAll.id = "deleteAll";
			var body = document.getElementByTagName("BODY");
			body.appendChild(deleteAll);
			addInsertData();

        }
		
		function addInsertData() {
			
			var body = document.getElementByTagName("BODY");
			var insertForm = document.createElement("FORM");
			var 
			
		}
		
		function validateInputData() {
		
		//first letter up, others lower: /^[A-Z][a-z]$/	
		//to read already-formatted 10 digit number: ^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$
		//Check phone number: (^[0-9]{7} | ^[0-9]{10})$
		//Age: ^[0-9]{1,2}$
			
		}
		
		function searchDatabase() {
			//first letter up, others lower: /^[a-z][A-Z]{1, }$/	
			
		}
		