/**
 * Created by Hans Dulimarta
 * TODO: Add your name below this line
 */

/**
 * Given the ID of a node {rootId}, find all its descendant elements having
 * its attribute id set and then change their class to {klazName}.
 * The function returns the number of such elements found.
 *
 * @param rootId    the ID of the "root" element to begin searching
 * @param klazName  the class to assign to each descendant whose id attrib
 *                  is set.
 * @returns {number}
 */
function findElementsWithId(rootId, klazName) {
    var elem = document.getElementById(rootId);
    var children = elem.children;
    var numChanged = 0;

    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if(child.id) {
            child.className = klazName;
            numChanged++;
        }
    }
    return numChanged;
}

/**
 * The following function finds all elements with attribute 'data-gv-row' (or
 * 'data-gv-column') and create a table of the desired dimension as a child of
 * the element.
 *
 * @returns NONE
 */
function createTable() {

    var parentDivs = document.querySelectorAll('div[data-gv-row][data-gv-column]');

    for(var r = 0; r < parentDivs.length; ++r)
    {
        var parentDiv = parentDivs[r];
        var listOfRows = parentDiv.getAttribute('data-gv-row');
        var listOfCols = parentDiv.getAttribute('data-gv-column');

        var tbl = document.createElement('table');
        //tbl.style.width = '100%';
        //tbl.setAttribute('border', '1');
        //var tBody = document.createElement('tbody');

        for (var i = 0; i <= listOfRows; i++) {
            //for entire first row, every col needs to be a header
            var tr = document.createElement('tr');

            for (var j = 0; j < listOfCols; j++) {
                if(i === 0) {
                    var th = document.createElement('th');
                    var header = "Heading " + (j+1);

                    th.appendChild(document.createTextNode(header))
                    tr.appendChild(th)

                } else {
                    var td = document.createElement('td');
                    var lips = new LoremIpsum();
                    var text = lips.generate(10);

                    td.appendChild(document.createTextNode(text))
                    tr.appendChild(td)
                }
            }
            //tBody.appendChild(tr);
            tbl.appendChild(tr);
        }
        //tbl.appendChild(tBody);
        parentDiv.appendChild(tbl)
        console.log(tbl);
    }
}