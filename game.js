document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("waveCanvas");
    const ctx = canvas.getContext("2d");

    let targetFrequency = 3;
    let playerFrequency = 1;
    let gameActive = false;

    const characters = [
        document.getElementById("char1"),
        document.getElementById("char2"),
        document.getElementById("char3"),
        document.getElementById("char4")
    ];

    const obstacles = [{ x: 400, y: 200 }, { x: 600, y: 250 }];

    function drawWave(frequency, color) {
        ctx.beginPath();
        for (let x = 0; x <= 800; x += 5) {
            let y = 200 + 50 * Math.sin(frequency * (x / 800) * 2 * Math.PI);
            ctx.lineTo(x, y);
        }
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.closePath();
    }

    function update() {
        if (!gameActive) return;

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawWave(targetFrequency, "green"); // Target wave
        drawWave(playerFrequency, "red"); // Player wave

        // Draw obstacles
        ctx.fillStyle = "blue";
        obstacles.forEach(obstacle => {
            ctx.fillRect(obstacle.x, obstacle.y, 20, 20);
        });

        // Move characters
        characters.forEach(character => {
            let charX = parseInt(character.style.left, 10);
            let charY = parseInt(character.style.top, 10);

            charX += 2; // Move forward
            charY = 200 + 50 * Math.sin(playerFrequency * 2 * Math.PI);

            character.style.left = `${charX}px`;
            character.style.top = `${charY}px`;

            // Check collision with obstacles
            obstacles.forEach(obstacle => {
                if (Math.abs(charX - obstacle.x) < 20 && Math.abs(charY - obstacle.y) < 20) {
                    character.style.display = "none";
                }
            });
        });

        // Check for win condition
        if (Math.abs(playerFrequency - targetFrequency) < 0.1 && characters.length > 0) {
            ctx.fillStyle = "white";
            ctx.font = "30px Arial";
            ctx.fillText("Great Job! Frequency Matched!", 250, 380);
            endGame();
        }
    }

    function increaseFreq() {
        if (gameActive) playerFrequency += 0.1;
    }

    function decreaseFreq() {
        if (gameActive) playerFrequency -= 0.1;
    }

    function startGame() {
        gameActive = true;
        characters.forEach(character => character.style.display = "block");
    }

    function endGame() {
        gameActive = false;
    }

    // Event Listeners for buttons
    document.getElementById("start").addEventListener("click", startGame);
    document.getElementById("increase").addEventListener("click", increaseFreq);
    document.getElementById("decrease").addEventListener("click", decreaseFreq);

    // Keyboard Controls
    document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowUp" || event.key === "w") increaseFreq();
        if (event.key === "ArrowDown" || event.key === "s") decreaseFreq();
    });

    setInterval(update, 30);
});
document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("waveCanvas");
    const ctx = canvas.getContext("2d");

    let targetFrequency = 3;
    let playerFrequency = 1;
    let gameActive = false;

    const gameWidth = canvas.width;
    const gameHeight = canvas.height;

    const characters = [
        document.getElementById("char1"),
        document.getElementById("char2"),
        document.getElementById("char3"),
        document.getElementById("char4")
    ];

    const obstacles = [{ x: 400, y: 200 }, { x: 600, y: 250 }];

    function drawWave(frequency, color) {
        ctx.beginPath();
        for (let x = 0; x <= gameWidth; x += 5) {
            let y = gameHeight / 2 + 50 * Math.sin(frequency * (x / gameWidth) * 2 * Math.PI);
            ctx.lineTo(x, y);
        }
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.closePath();
    }

    function update() {
        if (!gameActive) return;

        // Bersihkan layar
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, gameWidth, gameHeight);
        drawWave(targetFrequency, "green"); // Target wave
        drawWave(playerFrequency, "red"); // Player wave

        // Gambar rintangan
        ctx.fillStyle = "blue";
        obstacles.forEach(obstacle => {
            ctx.fillRect(obstacle.x, obstacle.y, 20, 20);
        });

        // Gerakkan karakter
        characters.forEach(character => {
            if (character.style.display === "none") return;

            let charX = parseInt(character.style.left, 10);
            let charY = parseInt(character.style.top, 10);

            // Batasi pergerakan karakter agar tetap dalam area permainan
            charX = Math.min(gameWidth - 50, Math.max(0, charX + 2)); // Bergerak ke kanan
            charY = gameHeight / 2 + 50 * Math.sin(playerFrequency * 2 * Math.PI);

            character.style.left = `${charX}px`;
            character.style.top = `${charY}px`;

            // Periksa tabrakan dengan rintangan
            obstacles.forEach(obstacle => {
                if (Math.abs(charX - obstacle.x) < 20 && Math.abs(charY - obstacle.y) < 20) {
                    character.style.display = "none"; // Karakter disembunyikan, tidak dihapus dari array
                }
            });
        });

        // Periksa kondisi kemenangan
        if (Math.abs(playerFrequency - targetFrequency) < 0.1 && characters.some(char => char.style.display !== "none")) {
            ctx.fillStyle = "white";
            ctx.font = "30px Arial";
            ctx.fillText("Great Job! Frequency Matched!", 250, 380);
            endGame();
        }
    }

    function increaseFreq() {
        if (gameActive) playerFrequency = Math.min(5, playerFrequency + 0.1);
    }

    function decreaseFreq() {
        if (gameActive) playerFrequency = Math.max(0.1, playerFrequency - 0.1);
    }

    function startGame() {
        gameActive = true;
        characters.forEach(character => {
            character.style.display = "block"; // Tampilkan kembali karakter jika disembunyikan
            character.style.left = "50px"; // Reset posisi karakter
            character.style.top = "300px";
        });
    }

    function endGame() {
        gameActive = false;
    }

    // Event Listeners untuk tombol
    document.getElementById("start").addEventListener("click", startGame);
    document.getElementById("increase").addEventListener("click", increaseFreq);
    document.getElementById("decrease").addEventListener("click", decreaseFreq);

    // Kontrol Keyboard (W, S, ArrowUp, ArrowDown)
    document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowUp" || event.key === "w") increaseFreq();
        if (event.key === "ArrowDown" || event.key === "s") decreaseFreq();
    });

    setInterval(update, 30);
});
