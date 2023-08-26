function updateTextInput(textInputId, val) {
    document.getElementById(textInputId).value = val;
}

function updateSlider(sliderId, val) {
    document.getElementById(sliderId).value = val;
}

function calculateStairs() {
    const totalHeight = parseFloat(document.getElementById("totalHeight").value);
    const maxLength = parseFloat(document.getElementById("maxLength").value);

    // Simple validations
    if (isNaN(totalHeight) || isNaN(maxLength)) {
        alert("Indtast venligst gyldige værdier.");
        return;
    }

    // Calculation logic
    let idealRiser = (totalHeight / maxLength) * 2;
    let numberOfRisers = Math.round(totalHeight / idealRiser);
    let treadDepth = maxLength / numberOfRisers;

    while (treadDepth > 24) { 
        idealRiser += 0.5;
        numberOfRisers = Math.round(totalHeight / idealRiser);
        treadDepth = maxLength / numberOfRisers;
    }

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `
        Antal trin: ${numberOfRisers} <br>
        Højde pr. trin: ${idealRiser.toFixed(2)} cm <br>
        Dybde pr. trin: ${treadDepth.toFixed(2)} cm
    `;

    // SVG visualization
    drawStaircase(numberOfRisers, idealRiser, treadDepth);
}

function drawStaircase(risers, riserHeight, treadDepth) {
    const width = treadDepth * risers;
    const height = riserHeight * risers;

    let stairsPath = "";
    let x = 0;
    let y = height;

    for (let i = 0; i < risers; i++) {
        stairsPath += `L ${x} ${y - riserHeight} L ${x + treadDepth} ${y - riserHeight}`;
        x += treadDepth;
        y -= riserHeight;
    }

    const svg = `
        <svg width="${width + 50}" height="${height + 50}" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 ${height} ${stairsPath}" fill="none" stroke="black" stroke-width="2" />
        </svg>
    `;

    document.getElementById("staircaseDiagram").innerHTML = svg;
}