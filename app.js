document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("calculate").addEventListener("click", function() {
        const totalHeight = parseFloat(document.getElementById("totalHeight").value);
        const totalLength = parseFloat(document.getElementById("totalLength").value);

        if (isNaN(totalHeight) || isNaN(totalLength)) {
            alert("Indtast gyldige værdier!");
            return;
        }

        const optimalRiserHeight = 18;  // standard riser height in cm
        const optimalTreadDepth = 29;   // standard tread depth in cm

        const risers = Math.ceil(totalHeight / optimalRiserHeight);
        const actualRiserHeight = totalHeight / risers;
        const actualTreadDepth = totalLength / risers;

        document.getElementById("risers").innerText = risers;
        document.getElementById("actualRiserHeight").innerText = actualRiserHeight.toFixed(2);
        document.getElementById("actualTreadDepth").innerText = actualTreadDepth.toFixed(2);

        drawStaircase(risers, actualRiserHeight, actualTreadDepth);
    });
});

function drawStaircase(risers, riserHeight, treadDepth) {
    const width = treadDepth * risers;
    const height = riserHeight * risers;

    let stairsPath = "";
    let stairsFill = "";
    let x = 0;
    let y = height;

    for (let i = 0; i < risers; i++) {
        stairsPath += `L ${x} ${y - riserHeight} L ${x + treadDepth} ${y - riserHeight}`;
        stairsFill += `<polygon points="${x},${y} ${x + treadDepth},${y} ${x + treadDepth},${y - riserHeight} ${x},${y - riserHeight}" fill="rgba(200, 200, 200, 0.5)" />`;
        x += treadDepth;
        y -= riserHeight;
    }

    let viewBoxAttr = `0 0 ${width} ${height}`;
    let svgWidth = width + 50;
    let svgHeight = height + 50;

    if (window.innerWidth <= 600) {  // If on a mobile device
        viewBoxAttr = `${width * 0.25} ${height * 0.25} ${width * 0.5} ${height * 0.5}`;
        svgWidth = width * 0.5 + 50;
        svgHeight = height * 0.5 + 50;
    }

    const startLine = `<line x1="0" y1="${height}" x2="${width}" y2="${height}" stroke="red" stroke-width="3" stroke-dasharray="5,5"/>`;
    const endLine = `<line x1="0" y1="0" x2="${width}" y2="0" stroke="red" stroke-width="3" stroke-dasharray="5,5"/>`;

    const svg = `
        <svg width="${svgWidth}" height="${svgHeight}" viewBox="${viewBoxAttr}" xmlns="http://www.w3.org/2000/svg">
            ${stairsFill}
            <path d="M0 ${height} ${stairsPath}" fill="none" stroke="black" stroke-width="2" />
            ${startLine}
            ${endLine}
        </svg>
    `;

    document.getElementById("staircaseDiagram").innerHTML = svg;
}