/**
 * Trappe Beregner - Script for beregning af optimale trappeforhold
 */

// Ergonomiske konstanter og grænseværdier
const IDEAL_STEP_HEIGHT_MIN = 15; // Ideel mindste trinhøjde i cm
const IDEAL_STEP_HEIGHT_MAX = 19; // Ideel maksimal trinhøjde i cm
const IDEAL_STEP_DEPTH_MIN = 22;  // Ideel mindste trindybde i cm
const IDEAL_STEP_DEPTH_MAX = 30;  // Ideel maksimal trindybde i cm
const IDEAL_RATIO = 17/29;        // Ideelt forhold mellem højde og dybde

/**
 * Hovedfunktion til beregning af trappeforhold
 */
function calculate() {
    try {
        // Hent input-værdier og valider data
        const totalHeight = parseFloat(document.getElementById('total-height').value);
        const totalLength = parseFloat(document.getElementById('total-length').value);
        const stepCount = parseInt(document.getElementById('step-count').value);
        
        if (isNaN(totalHeight) || isNaN(totalLength) || isNaN(stepCount)) {
            throw new Error("Alle felter skal udfyldes med gyldige tal");
        }
        
        if (totalHeight <= 0 || totalLength <= 0 || stepCount < 2) {
            throw new Error("Alle værdier skal være positive, og der skal være mindst 2 trin");
        }
        
        // Beregn trinhøjde og -dybde
        const stepHeight = totalHeight / stepCount;
        const stepDepth = totalLength / (stepCount - 1);
        const ratio = stepHeight / stepDepth;
        
        // Vis resultater
        document.getElementById('step-height').textContent = stepHeight.toFixed(2) + " cm";
        document.getElementById('step-depth').textContent = stepDepth.toFixed(2) + " cm";
        document.getElementById('ratio').textContent = "1:" + (stepDepth / stepHeight).toFixed(2);
        
        // Beregn og vis komfortvurdering
        calculateComfort(stepHeight, stepDepth, ratio);
        
        // Generer trappevisualisering
        drawStairDiagram(stepCount, stepHeight, stepDepth);
        
        // Vis resultaterne
        document.getElementById('results').classList.remove('hidden');
    } catch (error) {
        alert("Fejl: " + error.message);
    }
}

/**
 * Beregner og viser komfortvurdering
 * @param {number} height - Trinhøjde i cm
 * @param {number} depth - Trindybde i cm
 * @param {number} ratio - Forholdet mellem højde og dybde
 */
function calculateComfort(height, depth, ratio) {
    // Beregn score for højde (0-100)
    let heightScore = 0;
    if (height >= IDEAL_STEP_HEIGHT_MIN && height <= IDEAL_STEP_HEIGHT_MAX) {
        heightScore = 100; // Perfekt højde
    } else if (height < IDEAL_STEP_HEIGHT_MIN) {
        heightScore = 100 - ((IDEAL_STEP_HEIGHT_MIN - height) * 10);
    } else {
        heightScore = 100 - ((height - IDEAL_STEP_HEIGHT_MAX) * 10);
    }
    heightScore = Math.max(0, Math.min(100, heightScore));
    
    // Beregn score for dybde (0-100)
    let depthScore = 0;
    if (depth >= IDEAL_STEP_DEPTH_MIN && depth <= IDEAL_STEP_DEPTH_MAX) {
        depthScore = 100; // Perfekt dybde
    } else if (depth < IDEAL_STEP_DEPTH_MIN) {
        depthScore = 100 - ((IDEAL_STEP_DEPTH_MIN - depth) * 5);
    } else {
        depthScore = 100 - ((depth - IDEAL_STEP_DEPTH_MAX) * 5);
    }
    depthScore = Math.max(0, Math.min(100, depthScore));
    
    // Beregn ratio-score (0-100)
    const ratioScore = 100 - (Math.abs(ratio - IDEAL_RATIO) * 100);
    
    // Vægtning af de forskellige scores
    const totalScore = (heightScore * 0.4) + (depthScore * 0.4) + (ratioScore * 0.2);
    
    // Opdater komfort-meter
    const indicator = document.getElementById('comfort-indicator');
    indicator.style.width = totalScore + '%';
    
    // Bestem farveklasse baseret på score
    if (totalScore < 40) {
        indicator.className = 'poor';
    } else if (totalScore < 70) {
        indicator.className = 'average';
    } else {
        indicator.className = 'good';
    }
    
    // Opdater komfort-tekst
    let comfortText = "";
    if (totalScore < 40) {
        comfortText = "Lav komfort: Denne trappe kan være vanskelig at bruge.";
    } else if (totalScore < 70) {
        comfortText = "Middel komfort: Trappen er brugbar, men ikke optimal.";
    } else if (totalScore < 90) {
        comfortText = "God komfort: Trappen er behagelig at bruge.";
    } else {
        comfortText = "Fremragende komfort: Trappen opfylder alle ergonomiske krav.";
    }
    
    document.getElementById('comfort-text').textContent = comfortText;
}

/**
 * Tegner trappevisualisering
 * @param {number} steps - Antal trin
 * @param {number} height - Trinhøjde i cm
 * @param {number} depth - Trindybde i cm
 */
function drawStairDiagram(steps, height, depth) {
    const container = document.getElementById('stair-diagram');
    container.innerHTML = '';
    
    // Find det maksimale antal trin, der kan vises
    const maxVisibleSteps = Math.min(steps, 12); // Begrænser visualiseringen til 12 trin
    
    // Beregn skalering for at passe diagrammet til containeren
    const containerWidth = 400; // Bredde af diagrammet i px
    const scaleX = containerWidth / ((maxVisibleSteps - 1) * depth);
    const scaleY = containerWidth / (steps * height);
    const scale = Math.min(scaleX, scaleY) * 0.8;
    
    // Opret SVG-element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '300px');
    svg.setAttribute('viewBox', `0 0 ${depth * (maxVisibleSteps - 1) * scale + 50} ${height * steps * scale + 50}`);
    
    // Tegn trappen (fra bunden og op)
    let pathData = `M 10,${height * steps * scale + 10} `;
    
    for (let i = 0; i < maxVisibleSteps; i++) {
        const x1 = 10 + (i * depth * scale);
        const y1 = 10 + (steps - i) * height * scale;
        const x2 = 10 + ((i + 1) * depth * scale);
        const y2 = y1;
        const x3 = x2;
        const y3 = 10 + (steps - (i + 1)) * height * scale;
        
        // Tilføj vandret linje
        pathData += `H ${x2} `;
        
        // Tilføj lodret linje (hvis ikke sidste trin)
        if (i < maxVisibleSteps - 1) {
            pathData += `V ${y3} `;
        }
    }
    
    // Opret path-element
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('stroke', '#333');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('fill', 'none');
    
    svg.appendChild(path);
    container.appendChild(svg);
    
    // Tilføj skala og mål til diagrammet
    const scaleInfo = document.createElement('p');
    scaleInfo.textContent = `Visualisering af ${maxVisibleSteps} ud af ${steps} trin`;
    scaleInfo.className = 'scale-info';
    container.appendChild(scaleInfo);
}

// Tilføj event listener til formularen
document.addEventListener('DOMContentLoaded', function() {
    // Prefill med standard-værdier (kan fjernes ved behov)
    document.getElementById('total-height').value = "300";
    document.getElementById('total-length').value = "350";
    document.getElementById('step-count').value = "18";
});