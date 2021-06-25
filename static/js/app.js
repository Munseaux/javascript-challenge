// from data.js
var tableData = data;

function tableRender(someData) {
    someData.forEach((someData) => {
        var row = tbody.append("tr");
        Object.entries(someData).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
    return true;
}

function makeDropdown(tableData, key){

    var dropdownList = [];
    dropdownList.push("--")
    for(i=0; i<tableData.length; i++){
        if(dropdownList.includes(tableData[i][key]) === false){
            dropdownList.push(tableData[i][key]);
        }
    }
    return dropdownList;
}

function filterData() {

    d3.event.preventDefault();
    
    var dateSelect = d3.select("#date-select");
    var citySelect = d3.select("#city-select");
    var stateSelect = d3.select("#state-select");
    var countrySelect = d3.select("#country-select");
    var shapeSelect = d3.select("#shape-select");

    var dateValue = dateSelect.property("value");
    var cityValue = citySelect.property("value");
    var stateValue = stateSelect.property("value");
    var countryValue = countrySelect.property("value");
    var shapeValue = shapeSelect.property("value");

    
    var filteredData = tableData;
    console.log(dateValue)
    if (dateValue != "--"){
        filteredData = filteredData.filter(row => row.datetime === dateValue);
    }
    if (cityValue !== "--"){
        filteredData = tableData.filter(row => row.city === cityValue);
    }
    if (stateValue !== "--"){
        filteredData = filteredData.filter(row => row.state === stateValue);
    }
    if (countryValue !== "--"){
        filteredData = filteredData.filter(row => row.country === countryValue);
    }
    if(shapeValue !== "--"){
        filteredData = filteredData.filter(row => row.shape === shapeValue);
    }

    console.log(filteredData);

    tbody.html("");

    tableRender(filteredData);
}

// from data.js

var tbody = d3.select("tbody");

//render the first unfiltered table
tableRender(tableData);
makeDropdown(tableData);
var dateList = makeDropdown(tableData, "datetime");
var cityList = makeDropdown(tableData, "city");
var stateList = makeDropdown(tableData, "state");
var countryList = makeDropdown(tableData, "country");
var shapeList = makeDropdown(tableData, "shape");

//get lists of elements to render in the dropdown menus

var defaultOption = ""; 
d3.select("#date-select")
    .selectAll('myOptions')
    .data(dateList)
    .enter()
    .append('option')
    .text(function (d) { return d; }) // text showed in the menu
    .property("myOptions", function(d){ return d === defaultOption; })

d3.select("#city-select")
    .selectAll('myOptions')
    .data(cityList)
    .enter()
    .append('option')
    .text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return d; });

d3.select("#state-select")
    .selectAll('myOptions')
    .data(stateList)
    .enter()
    .append('option')
    .text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return d; });

d3.select("#country-select")
    .selectAll('myOptions')
    .data(countryList)
    .enter()
    .append('option')
    .text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return d; });

d3.select("#shape-select")
    .selectAll('myOptions')
    .data(shapeList)
    .enter()
    .append('option')
    .text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return d; });


var button = d3.select("#filter-btn");

var form = d3.select("#form");
    
button.on("click", filterData);
form.on("submit", filterData);



