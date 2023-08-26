document.getElementById('calculateBtn').addEventListener('click', updateStaircase);

function updateStaircase() {
    const totalHeight = parseFloat(document.getElementById('totalHeight').value);
    const totalDepth = parseFloat(document.getElementById('totalDepth').value);

    const MIN_STEP_HEIGHT = 15; // cm
    const MAX_STEP_HEIGHT = 25; // cm
    const MIN_STEP_DEPTH = 20; // cm
    const MAX_STEP_DEPTH = 50; // cm

    let optimalStepHeight = (MIN_STEP_HEIGHT + MAX_STEP_HEIGHT) / 2;
    let optimalStepDepth = (MIN_STEP_DEPTH + MAX_STEP_DEPTH) / 2;

    const numSteps = Math.round(totalHeight / optimalStepHeight);

    optimalStepHeight = totalHeight / numSteps;
    optimalStepDepth = totalDepth / (numSteps - 1);

    document.getElementById('numSteps').innerText = numSteps;
    document.getElementById('stepHeight').innerText = optimalStepHeight.toFixed(2);
    document.getElementById('stepDepth').innerText = optimalStepDepth.toFixed(2);

    drawStaircase(totalHeight, totalDepth, optimalStepHeight, optimalStepDepth);
    drawSingleStep(optimalStepHeight, optimalStepDepth);
}

function drawStaircase(steps, stepHeight, stepDepth) {
    // Select the SVG container and clear any previous drawing
    let svgContainer = d3.select("#staircaseDiagram");
    svgContainer.selectAll("*").remove();

    // Dimensions
    let width = 400;
    let height = steps * stepHeight + 50; // Added +50 for some margin

    svgContainer.attr("width", width).attr("height", height);

    // Create steps
    for (let i = 0; i < steps; i++) {
        svgContainer.append("rect")
            .attr("x", 0)
            .attr("y", i * stepHeight) // This should place steps above each other
            .attr("width", stepDepth)
            .attr("height", stepHeight)
            .style("fill", "#888")
            .style("stroke", "#333");
    }

    // Draw ground and top floor levels
    svgContainer.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", width)
        .attr("y2", 0)
        .style("stroke", "#333")
        .style("stroke-width", 3);

    svgContainer.append("line")
        .attr("x1", 0)
        .attr("y1", height - 50)
        .attr("x2", width)
        .attr("y2", height - 50)
        .style("stroke", "#333")
        .style("stroke-width", 3);
}


function drawSingleStep(stepHeight, stepDepth) {
    d3.select("#singleStepDiagram").html("");

    const stepWidth = 300;
    const svgHeight = stepHeight * 10 + 50;
    const svgDepth = stepDepth * 10 + 50;

    const svg = d3.select("#singleStepDiagram")
                  .append("svg")
                  .attr("width", stepWidth)
                  .attr("height", svgHeight + svgDepth);

    svg.append("rect")
       .attr("x", 50)
       .attr("y", 50)
       .attr("width", stepDepth * 10)
       .attr("height", stepHeight * 10)
       .attr("fill", "#ddd");

    svg.append("line")
       .attr("x1", 30)
       .attr("y1", 50)
       .attr("x2", 30)
       .attr("y2", 50 + stepHeight * 10)
       .attr("stroke", "black")
       .attr("stroke-width", 2)
       .attr("marker-start", "url(#arrowhead)")
       .attr("marker-end", "url(#arrowhead)");

    svg.append("text")
       .attr("x", 10)
       .attr("y", 50 + (stepHeight * 10 / 2))
       .attr("text-anchor", "middle")
       .attr("alignment-baseline", "middle")
       .text(`${stepHeight.toFixed(2)} cm`);

    svg.append("line")
       .attr("x1", 50)
       .attr("y1", svgHeight + 30)
       .attr("x2", 50 + stepDepth * 10)
       .attr("y2", svgHeight + 30)
       .attr("stroke", "black")
       .attr("stroke-width", 2)
       .attr("marker-start", "url(#arrowhead)")
       .attr("marker-end", "url(#arrowhead)");

    svg.append("text")
       .attr("x", 50 + (stepDepth * 10 / 2))
       .attr("y", svgHeight + 40)
       .attr("text-anchor", "middle")
       .attr("alignment-baseline", "middle")
       .text(`${stepDepth.toFixed(2)} cm`);
}