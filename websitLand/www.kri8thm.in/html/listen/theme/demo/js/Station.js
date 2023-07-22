
function CanvasCtxAudio(elem) { 
    // path is this
    // $(this).parent().parent().attr('data-song-url')
    // button -> div -> div (with the url)
    const path = $(elem).parent().parent().attr("data-song-url")
    let audio, analyser, dataArray, bufferLength;
    const canvas = document.getElementById('visualizer');
    const canvasCtx = canvas.getContext('2d');
    // const playButton = document.getElementById('playButton');
    const centerX = canvas.width / 2;
    const barWidth = 5;
    const barSpacing = 2;
    const barCount = Math.floor(canvas.width / (barWidth + barSpacing));
    const maxAmplitude = 400;
    const bars = [];

    const audioFile = path;
    console.log(audioFile)
    // Function to initialize the audio element
    function initializeAudio() {
        audio = new Audio(audioFile);
        audio.crossOrigin = "anonymous"; // Ensure CORS is enabled for the audio element
        analyser = new AnalyserNode(audioContext, { fftSize: 256 });
        dataArray = new Uint8Array(analyser.frequencyBinCount);
        bufferLength = analyser.frequencyBinCount;

        const source = audioContext.createMediaElementSource(audio);
        source.connect(analyser).connect(audioContext.destination);

        elem.addEventListener('click', () => {
            if (audio.paused) {
                audioContext.resume().then(() => {
                    audio.play();
                });
            } else {
                audio.pause();
            }
        });

        initializeBars();
        animateVisualizer();
    }

    // Function to initialize the bars
    function initializeBars() {
        for (let i = 0; i < barCount; i++) {
            const x = i * (barWidth + barSpacing);
            const y = canvas.height / 2;
            const barHeight = 1;
            bars.push({ x, y, barHeight });
        }
    }

    // Function to animate the canvas and the bars based on the audio data
    function animateVisualizer() {
        analyser.getByteFrequencyData(dataArray);

        canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Background color
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

        const barStep = Math.floor(bufferLength / barCount);

        for (let i = 0; i < barCount; i++) {
            const barAmplitude = dataArray[i * barStep] / maxAmplitude;
            const barHeight = barAmplitude * canvas.height;
            const bar = bars[i];

            // Add smooth animation to the bar's movement
            bar.barHeight = Math.max(bar.barHeight, barHeight);

            // Draw the bar
            const hue = (i * 360) / barCount; // Use hue for a cool color gradient
            const saturation = 100;
            const lightness = 50 + barAmplitude * 50; // Adjust lightness based on the amplitude
            canvasCtx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
            canvasCtx.fillRect(bar.x, bar.y - bar.barHeight / 2, barWidth, bar.barHeight);

            // Reduce the bar height smoothly
            bar.barHeight *= 0.9;
        }

        requestAnimationFrame(animateVisualizer);
    }

    // Check if the Web Audio API is available in the browser
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    if (audioContext) {
        // Start the audio visualization
        initializeAudio();
    } else {
        alert('Web Audio API is not supported in this browser.');
    }
}