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
      .attr("x", i * stepDepth + Math.round(steps * stepDepth * 0.5 ))
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

  const svgContainer = d3.select("#drawingAreaSingleStep").append("svg")
    .attr("width", 300)
    .attr("height", 300);

  // Drawing the step
  svgContainer.append("rect")
    .attr("x", 50)
    .attr("y", 100)
    .attr("width", stepDepth)
    .attr("height", stepHeight)
    .style("fill", "#888")
    .style("stroke", "#333");

  // Add measurements and labels...
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
