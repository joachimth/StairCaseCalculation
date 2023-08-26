const drawingArea = document.querySelector('#drawingArea');
const svgns = "http://www.w3.org/2000/svg";

function drawStaircase(steps, stepHeight, stepDepth) {
    // Clear previous drawings
    drawingArea.innerHTML = "";

    const svgContainer = d3.select("#drawingArea").append("svg")
        .attr("width", 300)
        .attr("height", 300);

    // Add shadow filter
    let defs = svgContainer.append("defs");
    let filter = defs.append("filter")
        .attr("id", "shadow")
        .attr("height", "130%");

    filter.append("feOffset")
        .attr("dx", "2")
        .attr("dy", "2")
        .attr("result", "offOut");

    filter.append("feGaussianBlur")
        .attr("in", "offOut")
        .attr("stdDeviation", "2")
        .attr("result", "blurOut");

    filter.append("feBlend")
        .attr("in", "SourceGraphic")
        .attr("in2", "blurOut")
        .attr("mode", "normal");

    // Create steps with shadow effect
    for (let i = 0; i < steps; i++) {
        svgContainer.append("rect")
            .attr("x", 0)
            .attr("y", i * stepHeight)
            .attr("width", stepDepth)
            .attr("height", stepHeight)
            .style("fill", "#888")
            .style("stroke", "#333")
            .style("filter", "url(#shadow)"); // Apply shadow here
    }

    // Drawing the base level
    svgContainer.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 300)
        .attr("y2", 0)
        .attr("stroke", "black")
        .attr("stroke-width", 2);

    // Drawing the top level
    svgContainer.append("line")
        .attr("x1", 0)
        .attr("y1", steps * stepHeight)
        .attr("x2", 300)
        .attr("y2", steps * stepHeight)
        .attr("stroke", "black")
        .attr("stroke-width", 2);
}

function drawSingleStep(stepHeight, stepDepth) {
    // Clear previous drawings
    drawingArea.innerHTML = "";

    const svgContainer = d3.select("#drawingArea").append("svg")
        .attr("width", 300)
        .attr("height", 300);

    // Add shadow filter (same as above)
    let defs = svgContainer.append("defs");
    let filter = defs.append("filter")
        .attr("id", "shadow")
        .attr("height", "130%");

    filter.append("feOffset")
        .attr("dx", "2")
        .attr("dy", "2")
        .attr("result", "offOut");

    filter.append("feGaussianBlur")
        .attr("in", "offOut")
        .attr("stdDeviation", "2")
        .attr("result", "blurOut");

    filter.append("feBlend")
        .attr("in", "SourceGraphic")
        .attr("in2", "blurOut")
        .attr("mode", "normal");

    // Drawing the step with shadow effect
    svgContainer.append("rect")
        .attr("x", 50)
        .attr("y", 100)
        .attr("width", stepDepth)
        .attr("height", stepHeight)
        .style("fill", "#888")
        .style("stroke", "#333")
        .style("filter", "url(#shadow)");

    // Add measurements and labels...
    // [Code for adding measurement lines, text, etc.]
}

// Event listeners for input changes
document.querySelector('#heightDifference').addEventListener('input', calculateAndDraw);
document.querySelector('#maxDepth').addEventListener('input', calculateAndDraw);

function calculateAndDraw() {
    // ... [Rest of the function as provided before]
}

calculateAndDraw();  // Initial drawing