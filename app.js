const MIN_STEP_HEIGHT = 15;
const MAX_STEP_HEIGHT = 20;
const MIN_STEP_DEPTH = 22;
const MAX_STEP_DEPTH = 25;

function validateInput(totalHeight, totalLength) {
    if (totalHeight <= 0 || totalLength <= 0) {
        return "Indtast gyldige positive værdier for både højde og længde.";
    }
    return null;
}

function guideForStandards(totalHeight, totalLength) {
    const optimalStepHeight = totalHeight / Math.round(totalHeight / MIN_STEP_HEIGHT);
    const optimalStepDepth = totalLength / Math.round(totalLength / MIN_STEP_DEPTH);

    if (optimalStepHeight > MAX_STEP_HEIGHT || optimalStepDepth > MAX_STEP_DEPTH) {
        return "Dine mål overstiger de standardstørrelser, der anbefales for trapper. Vurder at justere dine mål.";
    }

    return `Anbefalet trinhøjde: ${optimalStepHeight.toFixed(2)} cm og trindybde: ${optimalStepDepth.toFixed(2)} cm.`;
}

function generateStaircaseSVG(totalHeight, totalLength) {
    const stepHeight = totalHeight / Math.round(totalHeight / MIN_STEP_HEIGHT);
    const stepDepth = totalLength / Math.round(totalLength / MIN_STEP_DEPTH);
    const totalSteps = Math.round(totalHeight / stepHeight);

    let svgContent = `<svg width="${totalSteps * stepDepth}" height="${totalHeight}" xmlns="http://www.w3.org/2000/svg">`;

    for (let i = 0; i < totalSteps; i++) {
        svgContent += `<rect x="${i * stepDepth}" y="${(totalSteps - i - 1) * stepHeight}" width="${stepDepth}" height="${stepHeight}" fill="gray"/>`;
    }

    svgContent += "</svg>";
    return svgContent;
}

function calculateStairs() {
    const totalHeight = parseFloat(document.getElementById('totalHeight').value);
    const totalLength = parseFloat(document.getElementById('totalLength').value);

    const validationError = validateInput(totalHeight, totalLength);
    if (validationError) {
        document.getElementById('responseText').textContent = validationError;
        document.getElementById('staircaseSVG').innerHTML = "";
        return;
    }

    const guidance = guideForStandards(totalHeight, totalLength);
    document.getElementById('responseText').textContent = guidance;

    const svgContent = generateStaircaseSVG(totalHeight, totalLength);
    document.getElementById('staircaseSVG').innerHTML = svgContent;
}
