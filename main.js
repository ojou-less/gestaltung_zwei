// minimal heatmap instance configuration
var heatmapInstance = h337.create({
    // only container is required, the rest will be defaults
    container: document.querySelector('.heatmap')
  });
  
  var demoWrapper = document.querySelector('.data');
  var tooltip = document.querySelector('.tooltip');
  function updateTooltip(x, y, value) {
    // + 15 for distance to cursor
    var transl = 'translate(' + (x + 15) + 'px, ' + (y + 15) + 'px)';
    tooltip.style.webkitTransform = transl;
    tooltip.innerHTML = value;
  };

  // now generate some random data
  var points = [];
  var max = 0;
  var width = 840;
  var height = 400;
  var len = 200;
  
  while (len--) {
    var val = Math.floor(Math.random()*100);
    max = Math.max(max, val);
    var point = {
      x: Math.floor(Math.random()*width),
      y: Math.floor(Math.random()*height),
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