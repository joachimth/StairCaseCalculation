document.addEventListener("DOMContentLoaded", function() {

    const calculateBtn = document.getElementById("calculate");
    const elevationInput = document.getElementById("elevation");
    const depthInput = document.getElementById("depth");
    const resultElement = document.getElementById("result");
    
    calculateBtn.addEventListener("click", function() {
        const elevation = parseFloat(elevationInput.value);
        const depth = parseFloat(depthInput.value);

        if (!elevation || !depth) {
            resultElement.textContent = "Please enter valid values.";
            return;
        }

        const treadDepth = 27; // standard tread depth in cm
        const riserHeight = 18; // standard riser height in cm

        const risers = Math.ceil(elevation / riserHeight);
        const totalRiserHeight = risers * riserHeight;
        const totalTreadDepth = (risers - 1) * treadDepth;

        if (totalTreadDepth > depth) {
            resultElement.textContent = "The staircase will extend beyond the provided depth. Please adjust the depth or elevation.";
            return;
        }

        resultElement.textContent = `Risers: ${risers}, Total Riser Height: ${totalRiserHeight} cm, Total Tread Depth: ${totalTreadDepth} cm`;
        
        drawStaircase(risers, riserHeight, treadDepth);
    });

    function drawStaircase(risers, riserHeight, treadDepth) {
        const width = treadDepth * (risers - 1);
        const height = riserHeight * risers;
        
        let stairsPath = "M0 " + height + " ";
        let stairsFill = "";
        let x = 0;
        let y = height;

        for (let i = 0; i < risers; i++) {
            stairsPath += `L ${x} ${y - riserHeight} L ${x + treadDepth} ${y - riserHeight}`;
            stairsFill += `<polygon points="${x},${y} ${x + treadDepth},${y} ${x + treadDepth},${y - riserHeight} ${x},${y - riserHeight}" fill="rgba(200, 200, 200, 0.5)" />`;
            x += treadDepth;
            y -= riserHeight;
        }

        const startLine = `<line x1="0" y1="${height}" x2="${width}" y2="${height}" stroke="red" stroke-width="3" stroke-dasharray="5,5"/>`;
        const endLine = `<line x1="0" y1="0" x2="${width}" y2="0" stroke="red" stroke-width="3" stroke-dasharray="5,5"/>`;
        
        let viewBoxAttr = `0 0 ${width} ${height}`;
        let svgWidth = width + 50;
        let svgHeight = height + 50;

        if (window.innerWidth <= 600) {  // If on a mobile device
            viewBoxAttr = `${width * 0.25} ${height * 0.25} ${width * 0.5} ${height * 0.5}`;
            svgWidth = width * 0.5 + 50;
            svgHeight = height * 0.5 + 50;
        }

        const svg = `
            <svg width="${svgWidth}" height="${svgHeight}" viewBox="${viewBoxAttr}" xmlns="http://www.w3.org/2000/svg">
                ${stairsFill}
                <path d="${stairsPath}" fill="none" stroke="black" stroke-width="2" />
                ${startLine}
                ${endLine}
            </svg>
        `;

        document.getElementById("staircaseDiagram").innerHTML = svg;
    }
});