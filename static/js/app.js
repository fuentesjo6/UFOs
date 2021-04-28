// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var filters = {};

function updateFilters() {

  let changedElement = d3.select(this);

  let elementValue = changedElement.property("value");
  console.log(elementValue);

  let filtereId = changedElement.attr("id");
  console.log(filtereId)

  if (elementValue) {
    filters[filtereId] = elementValue;
  }
  else {
    delete filters[filtereId];
  }
  filterTable();
}


function filterTable() {
  let filteredData = tableData;
  Object.entries(filters).forEach(([key, value]) => {
    filteredData = filteredData.filter(row => row[key] === value);
  })
  buildTable(filteredData);
}
d3.selectAll("input").on("change", updateFilters);

buildTable(tableData)