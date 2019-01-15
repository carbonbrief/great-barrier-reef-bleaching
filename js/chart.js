var chart = d3.select("#chart"),
    margin = {top: 30, right: 10, bottom: 30, left: 0},
    width = parseInt(chart.style("width"))  - margin.left - margin.right,
    height = parseInt(chart.style("height"))  - margin.top - margin.bottom - 20;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.0),
    y = d3.scaleLinear().rangeRound([height, 0]);
    color = d3.scaleOrdinal().domain(["n", "b"]).range(["#F3F3F3", "#FF6F61"]);

var svg = chart.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tooltip;
var triangle;
var triangleBBox;
var triangleWidth;

let tooltipHeight = 20;
let tooltipWidth = 34;

d3.csv("./data/years.csv").then(function (data) {

    x.domain(data.map(function (d) {
        return d.year;
    }));

    y.domain([0, 1.3]);

    color.domain(data.map(function (d){ return d.mass_bleaching; }));

    svg.append("g")
    .attr("class", "axis")
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
    })
    .on("mouseover", mouseover)
    .on("mouseout", mouseout)
    .on("click", mouseclick);

    var trianglePoints = x(1980) + ' ' + y(1.3) + ', ' + x(1981) + ' ' + y(1.1) + ', ' + x(1982) + ' ' + y(1.3) + ' ' + x(1980) + ', ' + y(1.3);

    triangle = svg.append('polyline')
        .attr('points', trianglePoints)
        .attr("id", "triangle")
        // otherwise doesn't align in the middle of the bar
        .attr("transform", "scale(0.5,1)");

    tooltip = svg.append('g')
        .attr("id", "tooltip");

    tooltip.append("rect")
        .attr("id", "rect-1")
        .attr("width", tooltipWidth)
        .attr("height", tooltipHeight)
        .attr("transform", "translate(2,2)");

    tooltip.append("rect")
        .attr("id", "rect-2")
        .attr("width", tooltipWidth)
        .attr("height", tooltipHeight);

    tooltip.append("text")
        .attr("id", "tooltip-text")
        .attr("y", tooltipHeight/2)
        .text("1998")
        .attr("transform", "translate(2.5,4.1)");

    tooltip.attr("opacity", 0)
        .attr("transform", "translate(" + (x(1980) - tooltipWidth/2) + "," + y(2) + ")");

})

function mouseover (d) {

    // change styling on mouseover
    d3.select(this)
    .attr("opacity", function(d) {
        if (d.mass_bleaching == "b") {
            return 0.5;
        } 
        else {
            return 1;
        }
    });

}

function mouseout () {

    // resume normal styling on mouseout
    d3.select(this).transition()
    .duration(300)
    .ease(d3.easeLinear)
    .attr("opacity", 1);

}

function mouseclick (d) {
    let year = d.year;

    if (year == 1998 || year == 2002 || year == 2016 || year == 2017) {
        console.log(year);

        $('html, body').animate({
            scrollTop: $("#" + year).offset().top - (screenHeight/2)
        }, 1000);

    }
}

function triangle1998 (){

    triangleBBox = d3.select("polyline#triangle").node().getBBox();
    triangleWidth = (triangleBBox.width/2) + 4;

    triangle.transition()
    .duration(750)
    .style("opacity", 1)
    .attr("transform", "translate(" + (x(1997) + triangleWidth/2) + ",0)scale(0.5,1)");

    tooltip.transition()
        .duration(750)
        .style("opacity", 1)
        .attr("transform", "translate(" + (x(1998) - tooltipWidth/2.5) + "," + y(2) + ")");

};

function triangle2002 (){

    triangleBBox = d3.select("polyline#triangle").node().getBBox();
    triangleWidth = (triangleBBox.width/2) + 4;

    triangle.transition()
    .duration(750)
    .attr("transform", "translate(" + (x(2001) + triangleWidth/2) + ",0)scale(0.5,1)");

    tooltip.transition()
    .duration(750)
    .style("opacity", 1)
    .attr("transform", "translate(" + (x(2002) - tooltipWidth/2.5) + "," + y(2) + ")");

};

function triangle2016 (){

    triangleBBox = d3.select("polyline#triangle").node().getBBox();
    triangleWidth = (triangleBBox.width/2) + 4;

    triangle.transition()
    .duration(750)
    .attr("transform", "translate(" + (x(2015) + triangleWidth/2) + ",0)scale(0.5,1)");

    tooltip.transition()
    .duration(750)
    .style("opacity", 1)
    .attr("transform", "translate(" + (x(2016) - tooltipWidth/2.5) + "," + y(2) + ")");

};

function triangle2016second (){
    // same year so maintain position
    triangle2016();
};

function triangle2017 (){

    triangleBBox = d3.select("polyline#triangle").node().getBBox();
    triangleWidth = (triangleBBox.width/2) + 4;

    triangle.transition()
    .duration(750)
    .attr("transform", "translate(" + (x(2016) + triangleWidth/2) + ",0)scale(0.5,1)");

    tooltip.transition()
    .duration(750)
    .style("opacity", 1)
    .attr("transform", "translate(" + (x(2017) - tooltipWidth/2.5) + "," + y(2) + ")");

};

