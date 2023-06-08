//testscript

var slider = document.getElementById("myRange");
var output = document.getElementById("sliderOutput");
output.innerHTML = slider.value; //display default slider val

//update current slider val
slider.oninput = function() {
    output.innerHTML = this.value;
    ySliderValue = this.value;
  }

// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// read data
d3.csv("test-vals.csv").then( function(data) {

  // Add X axis
  const x = d3.scaleLinear()
    .domain([5, 20])
    .range([ margin.left, width - margin.right ]);
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([5, 25])
    .range([ height - margin.bottom, margin.top ]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Prepare a color palette
  const color = d3.scaleLinear()
      .domain([0, 1]) // Points per square pixel.
      .range(["white", "#69b3a2"])

  // compute the density data
  const densityData = d3.contourDensity()
    .x(function(d) { return x(d.x); })
    .y(function(d) { return y(d.y); })
    .size([width, height])
    .bandwidth(20)
    (data)

  // show the shape!
  svg.insert("g", "g")
    .selectAll("path")
    .data(densityData)
    .enter().append("path")
      .attr("d", d3.geoPath())
      .attr("fill", function(d) { return color(d.value); })
})

async function getApiData() {
    let response = await fetch("https://www.umweltbundesamt.de/api/air_data/v2/meta/json?use=airquality&date_from=2021-12-31&date_to=2022-01-01/");
    let data = await response. json ()
    return data;
    }

const fs = require('fs')

fs.writeFile("data.json", getApiData(), (err) =>{
    if (err) throw err;
});
