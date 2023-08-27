const drawingAreadrawingAreaStaircase = document.querySelector('#drawingAreaSingleStep');
const drawingAreaSingleStep = document.querySelector('#drawingAreaSingleStep');
const svgns = "http://www.w3.org/2000/svg";

function drawStaircase(steps, stepHeight, stepDepth) {
  // Clear previous drawings
  drawingAreaStaircase.innerHTML = "";

  const svgContainer = d3.select("#drawingAreaStaircase").append("svg")
    .attr("width", 300)
    .attr("height", 300);

  // Create steps
  for (let i = 0; i < steps; i++) {
    svgContainer.append("rect")
      .attr("x", i * stepDepth + Math.round(steps * stepDepth * 0.5))
      .attr("y", i * stepHeight)
      .attr("width", stepDepth)
      .attr("height", stepHeight)
      .style("fill", "#888")
      .style("stroke", "#333");
  }

  // Drawing the base level
  svgContainer.append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 300)
    .attr("y2", 0)
    .attr("stroke", "red")
    .attr("stroke-width", 2);

  // Drawing the top level
  svgContainer.append("line")
    .attr("x1", 0)
    .attr("y1", steps * stepHeight)
    .attr("x2", 300)
    .attr("y2", steps * stepHeight)
    .attr("stroke", "red")
    .attr("stroke-width", 2);
}

function drawSingleStep(stepHeight, stepDepth) {
  // Clear previous drawings
  drawingAreaSingleStep.innerHTML = "";

  const stepWidth = 300;
  const svgOffsetx = 20;
  const svgHeight = stepHeight * 10 + 50;
  const svgDepth = stepDepth * 10 + 50;

  const svgContainer = d3.select("#drawingAreaSingleStep").append("svg")
    .attr("width", 300)
    .attr("height", 300);

  // Drawing the step
  svgContainer.append("rect")
    .attr("x", svgOffsetx + 50)
    .attr("y", svgOffsetx + 50)
    .attr("width", svgOffsetx + stepDepth * 10)
    .attr("height", svgOffsetx + stepHeight * 10)
    .style("fill", "#888")
    .style("stroke", "#333");

  // Add measurements and labels...
  svgContainer.append("line")
    .attr("x1", svgOffsetx + 30)
    .attr("y1", svgOffsetx + 50)
    .attr("x2", svgOffsetx + 30)
    .attr("y2", svgOffsetx + 50 + stepHeight * 10)
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("marker-start", "url(#arrowhead)")
    .attr("marker-end", "url(#arrowhead)");

  svgContainer.append("text")
    .attr("x", svgOffsetx + 10)
    .attr("y", svgOffsetx + 50 + (stepHeight * 10 / 2))
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "right")
    .text(`${stepHeight.toFixed(2)} cm`);

  svgContainer.append("line")
    .attr("x1", svgOffsetx + 50)
    .attr("y1", svgOffsetx + svgHeight + 30)
    .attr("x2", svgOffsetx + 50 + stepDepth * 10)
    .attr("y2", svgOffsetx + svgHeight + 30)
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("marker-start", "url(#arrowhead)")
    .attr("marker-end", "url(#arrowhead)");

  svgContainer.append("text")
    .attr("x", svgOffsetx + 50 + (stepDepth * 10 / 2))
    .attr("y", svgOffsetx + svgHeight + 40)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text(`${stepDepth.toFixed(2)} cm`);
}

// Event listeners for input changes
document.querySelector('#heightDifference').addEventListener('input', calculateAndDraw);
document.querySelector('#maxDepth').addEventListener('input', calculateAndDraw);

function calculateAndDraw() {
  let heightDifference = parseFloat(document.querySelector('#heightDifference').value);
  let maxDepth = parseFloat(document.querySelector('#maxDepth').value);

  if (!heightDifference || !maxDepth) {
    return; // One of the inputs is not filled, so we don't calculate or draw anything.
  }

  let stepHeight = 18; // This is a standard step height, adjust as needed
  let steps = Math.round(heightDifference / stepHeight);
  let stepDepth = heightDifference / steps;

  if (stepDepth > maxDepth) {
    // Adjust based on maxDepth input.
    stepDepth = maxDepth;
    stepHeight = heightDifference / stepDepth;
    steps = Math.round(heightDifference / stepHeight);
  }

  document.querySelector('#stepCount').innerText = `Steps: ${steps}`;
  document.querySelector('#calculatedStepDepth').innerText = `Step Depth: ${stepDepth.toFixed(2)} cm`;
  document.querySelector('#calculatedStepHeight').innerText = `Step Height: ${stepHeight.toFixed(2)} cm`;

  drawStaircase(steps, stepHeight, stepDepth);
  drawSingleStep(stepHeight, stepDepth);
}

calculateAndDraw(); // Initial drawing
