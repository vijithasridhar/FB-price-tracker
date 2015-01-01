var searchText;
var listJSONresults;
var resultsOffset = 5;
var resultCount = 0;

function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                listJSONresults = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
}

function sendInfo() {
    searchText = document.getElementById("searchInput").value;
    $.ajax({
        type: "POST",
        url: "http://www.google.com",
        data: searchText,
        success: addResults,
        error: function() {
            "We couldn't fetch the data: " + errorThrown;
        },
    });
}

function subscribe() {
    alert("You will now receive notifications for: " + document.getElementById("searchInput").value);
    readTextFile("file:///Users/vijithasridhar/Desktop/Fall 2014/HackJam 9-14/json.txt");
    addItemsToTable();
}

function addResults(data) {
    listJSONresults = JSON.parse(data);
    var items = "";
    addItemsToTable();
}

function addItemsToTable() {
    for (i = resultCount; i < resultsOffset; i++) {
        var newRow = document.createElement("tr");
        var res = document.createElement("td");
        var text = "Cost: " + listJSONresults.results[i].cost + "\n";
        text += listJSONresults.results[i].message + "\n";
        text += listJSONresults.results[i].url + "\n";
        text += listJSONresults.results[i].picture;
        var resText = document.createTextNode(text);
        res.appendChild(resText);
        newRow.appendChild(res);
        document.getElementById("allResults").appendChild(newRow);

        resultCount++;
        if (resultCount > offset) {
            offset += 2*offset;
            break;
        }
    }
}

window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        addItemsToTable();
    }
};

