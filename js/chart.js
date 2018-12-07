var chart = d3.select("#chart"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = parseInt(chart.style("width"))  - margin.left - margin.right,
    height = parseInt(chart.style("height"))  - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.15).round([10]),
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

    y.domain([0, 1.2]);

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

    // var triangle1 = [
    //     {"year": "1998"},
    //     {"value": "1"}
    // ];

    // svg.append(triangle);

    // svg.selectAll(".point")
    // .data(triangle1)
    // .enter().append("path")
    // .attr("class", "point")
    // .attr("d", d3.svg.symbol().type("triangle-up"))
    // .attr("transform", function(d) { return "translate(" + x(d.year) + "," + y(Number(d.value)) + ")"; });

    // svg.append('path')
    // .attr("d", d3.symbolTriangle)
    // .attr("transform", function(d) { return "translate(" + 100 + "," + 100 + ")"; })
    // .style("fill", "red");

    // svg.append("g")
    // .attr("transform","translate(" + (width/2) + "," + (height/2) + ")")
    // .selectAll("triangles")
    // .data(triangle1)
    // .enter().append("path")
    // .attr("class", function(d,i) { return "triangles triangle-" + i; })
    // .attr("d", "M 0 " + (-height/3) + " L " + (-width/3) + " " + (height/3) + "L " + (width/3) + " " + (height/3) + " Z")
    // .style("fill",function(d,i) { return colorScale(i); });

    var trianglePoints = x(1997) + ' ' + y(1.2) + ', ' + x(1998) + ' ' + y(1.1) + ', ' + x(1999) + ' ' + y(1.2) + ' ' + x(1997) + ', ' + y(1.2);

    console.log(trianglePoints);

    svg.append('polyline')
        .attr('points', trianglePoints)
        .attr("class", "triangle");

})

