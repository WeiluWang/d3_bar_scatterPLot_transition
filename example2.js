function main(){
    var data = [{
        key: "AAPL",
        a: 0,
        b: 1
    },
    
    {
        key: "aaa",
        a: 0,
        b: 2
    }
    //  ,{
    //     key: "IBM",
        
    //     sumPrice: 4
    // }, {
    //     key: "MSFT",
        
    //     sumPrice: 4
    // }
    ],
        svg = d3.select("svg"),
        margin =200,
        width = svg.attr("width")-margin,
        height = svg.attr("height") - margin

    var xScale = d3.scaleBand().range([0, width]),
        yScale = d3.scaleLinear().range([height, 0]);

    var g = svg.append('g').attr("transform", "translate(100,100)")
    
    d3.csv("../example.csv").then(function(data){
        console.log(data)
        xScale.domain(data.map(function(d){
            return d.year
        }))
        yScale.domain([0, d3.max(data, function(d){
            return d.value
        })])
        
        g.append("g")
        .attr("class", "x_axis")
        .attr('transform', 'translate(0,'+height+')')
        .transition().duration(2000).ease(d3.easeLinear)
        .call(d3.axisBottom(xScale))
        g.append('g')
        .attr("class", "y_axis")
        .transition().duration(2000).ease(d3.easeLinear)
        .call(d3.axisLeft(yScale).tickFormat(function(d){
            return "$" + d
        }).ticks(10))

        g.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class","bar")
            .attr("x",function(d){ return xScale(d.year)})
            .attr("y",height)
            .attr("height", function(d){return 0})
            .attr("width", xScale.bandwidth())
            .transition()
            .duration(5000)
            .delay(function(d,i){ return i*50})
            .attr("height", function(d){return height-yScale(d.value)})
            .attr("y", function(d){return yScale(d.value);})
        
        setTimeout(changeX, 10000)
        setTimeout(toDot,10000)
        setTimeout(toPosition,11000)
        function changeX(){
            g.selectAll(".x_axis").remove()
            var newXScale = d3.scaleLinear().range([0, width])
            newXScale.domain([0, 10])
    
            g.append("g").attr('transform', 'translate(0,'+height+')')
            .transition().duration(2000).ease(d3.easeLinear)
            .call(d3.axisBottom(newXScale).ticks(10))
            g.append('g')
            .transition().duration(2000).ease(d3.easeLinear)
            .call(d3.axisLeft(yScale).tickFormat(function(d){
                return "$" + d
            }).ticks(10))
        } 
        function toDot(){
            
            g.selectAll(".bar")
                .transition().duration(500)
                .delay(function(d,i){ return i*50})
                .attr("width",20)
                .attr("height",20)
                .attr("rx",500)
                

        }  
        function toPosition(){
            var newXScale = d3.scaleLinear().range([0, width])
            newXScale.domain([0, 10])
            g.selectAll(".bar")
                .transition().duration(500)
                .attr("x", function(d){ return newXScale(d.v)-10})
        }
    })
    
    
    
}