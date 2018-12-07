var chart = d3.select("#chart"),
    margin = {top: 20, right: 10, bottom: 30, left: 0},
    width = parseInt(chart.style("width"))  - margin.left - margin.right,
    height = parseInt(chart.style("height"))  - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.0),
    y = d3.scaleLinear().rangeRound([height, 0]);
    color = d3.scaleOrdinal().domain(["n", "b"]).range(["#f3f3f3", "#C7432B"]);

var svg = chart.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("./data/years.csv").then(function (data) {

    x.domain(data.map(function (d) {
        return d.year;
    }));

    y.domain([0, 1.3]);

    color.domain(data.map(function (d){ return d.mass_bleaching; }));

    svg.append("g")
    .attr("transform", "translate(0," + (height + 10) + ")")
    .call(d3.axisBottom(x)
        .tickValues([1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015])
    );

    svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function (d) {
        return x(d.year);
    })
    .attr("y", function (d) {
        return y(Number(d.value));
    })
    .attr("width", x.bandwidth())
    .attr("height", function (d) {
        return height - y(Number(d.value));
    })
    .attr("rx", 3)
    .attr("ry", 3)
    .attr("fill", function (d) {
        return color(d.mass_bleaching)
    });

    var trianglePoints = x(1980) + ' ' + y(1.3) + ', ' + x(1981) + ' ' + y(1.1) + ', ' + x(1982) + ' ' + y(1.3) + ' ' + x(1980) + ', ' + y(1.3);

    var triangle = svg.append('polyline')
        .attr('points', trianglePoints)
        .attr("id", "triangle")
        // otherwise doesn't align in the middle of the bar
        .attr("transform", "scale(0.5,1)");

    var triangleBBox = d3.select("polyline#triangle").node().getBBox();

    console.log(triangleBBox);
    console.log(triangleBBox[width]);

    var triangleWidth = (triangleBBox.width/2) + 4;

    console.log(triangleWidth);

    setTimeout(function(){

        triangle.transition()
        .duration(750)
        .attr("transform", "translate(" + (x(1997) + triangleWidth/2) + ",0)scale(0.5,1)");

    }, 2000);

    setTimeout(function(){

        triangle.transition()
        .duration(750)
        .attr("transform", "translate(" + (x(2001) + triangleWidth/2) + ",0)scale(0.5,1)");

    }, 4000);


    setTimeout(function(){

        triangle.transition()
        .duration(750)
        .attr("transform", "translate(" + (x(2015) + triangleWidth/2) + ",0)scale(0.5,1)");

    }, 6000);

    

})

