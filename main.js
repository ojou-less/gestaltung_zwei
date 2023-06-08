function changeRefrence(callingElement)
{
  let CallingElementId = callingElement.id;
  let currentRefrence = document.getElementsByClassName("active");
  let newRefrence = document.getElementById(CallingElementId);
  document.getElementById("refrence").innerHTML=newRefrence.innerHTML;

  currentRefrence[0].classList.remove("active")
  newRefrence.classList.add("active");
}

var slider = document.getElementById("myRange");
var output = document.getElementById("sliderOutput");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
  ySliderValue = this.value;
}

// minimal heatmap instance configuration
var heatmapInstance = h337.create({
    // only container is required, the rest will be defaults
    container: document.querySelector('.heatmap'),
    backgroundColor: "rgba(175, 204, 217, .95)",
    gradient: {
      ".4": "turquoise",
      ".8": "green",
      ".95": "yellow"
    },
    maxOpacity: .9,
    minOpacity: .3
  });
  
  var heatmapWrapper = document.querySelector('.data');
  var tooltip = document.querySelector('.tooltip');
  function updateTooltip(x, y, value) {
    // + 15 for distance to cursor
    var transl = 'translate(' + (x + 15) + 'px, ' + (y + 15) + 'px)';
    tooltip.style.webkitTransform = transl;
    tooltip.innerHTML = value;
  };
  heatmapWrapper.onmousemove = function(ev) {
    var x = ev.layerX;
    var y = ev.layerY;
    // getValueAt gives us the value for a point p(x/y)
    var value = heatmapInstance.getValueAt({
      x: x,
      y: y
    });
    tooltip.style.display = 'block';
    updateTooltip(x, y, value);
  };

  heatmapWrapper.onmouseout = function() {
    tooltip.style.display = 'none';
  };

  // now generate some random data
  var points = [];
  var max = 0;
  var width = 300;
  var height = 840;
  var len = 200;
  
  while (len--) {
    var val = Math.floor(Math.random()*100);
    max = Math.max(max, val);
    var point = {
      x: Math.floor(Math.random()*width),
      y: Math.floor(Math.random()*height),
      // y: output.value,
      value: val
    };
    points.push(point);
  }
  
  // heatmap data format
  var data = {
    max: max,
    data: points
  };
  // if you have a set of datapoints always use setData instead of addData
  // for data initialization
  heatmapInstance.setData(data);
