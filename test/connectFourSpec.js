describe('Connect Four Game', function() {
    beforeAll(function(done) {
        // Load the HTML fixture manually
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '../lib/index.html', true);
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 400) {
                document.body.innerHTML = xhr.responseText;
                console.log("HTML fixture loaded.");

                // Correctly load styles and scripts
                var head = document.getElementsByTagName('head')[0];

                // Add the styles.css link
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = '../lib/styles.css';
                head.appendChild(link);

                // Add the script.js script
                var script = document.createElement('script');
                script.src = '../lib/script.js';
                script.onload = function() {
                    console.log("Script loaded.");
                    done();
                };
                head.appendChild(script);
            } else {
                done.fail('Failed to load fixture');
            }
        };
        xhr.onerror = function () {
            done.fail('Failed to load fixture');
        };
        xhr.send();
    });

    beforeEach(function(done) {
        setTimeout(function() {
            // Reset the game state before each test
            var startButton = document.querySelector('#startButton');
            if (startButton) {
                startButton.click();
                console.log("Game started.");
            }
            done();
        }, 100); // Adding a small delay to ensure scripts are loaded
    });

    afterAll(function() {
        // Clean up the document body after all tests
        document.body.innerHTML = '';
    });

    it('should win with a row', function() {
        for (let col = 0; col < 4; col++) {
            document.querySelector(`.cell[data-col='${col}']`).click();
            document.querySelector(`.cell[data-col='${col}']`).click();
        }
        const winnerText = document.querySelector('#winnerAnnouncement').textContent;
        expect(winnerText).toBe("Well done, red player win!");
    });

    it('should win with a column', function() {
        document.querySelector('#restartButton').click();
        for (let row = 0; row < 4; row++) {
            document.querySelector(`.cell[data-col='0']`).click();
        }
        const winnerText = document.querySelector('#winnerAnnouncement').textContent;
        expect(winnerText).toBe("Well done, red player win!");
    });

    it('should win with a diagonal', function() {
        document.querySelector('#restartButton').click();
        // Moves to create a diagonal win
        document.querySelector(`.cell[data-col='0']`).click();
        document.querySelector(`.cell[data-col='1']`).click();
        document.querySelector(`.cell[data-col='1']`).click();
        document.querySelector(`.cell[data-col='2']`).click();
        document.querySelector(`.cell[data-col='2']`).click();
        document.querySelector(`.cell[data-col='2']`).click();
        document.querySelector(`.cell[data-col='3']`).click();
        document.querySelector(`.cell[data-col='3']`).click();
        document.querySelector(`.cell[data-col='3']`).click();
        document.querySelector(`.cell[data-col='3']`).click();

        const winnerText = document.querySelector('#winnerAnnouncement').textContent;
        expect(winnerText).toBe("Well done, red player win!");
    });

    it('should handle invalid column selection', function() {
        document.querySelector('#restartButton').click();
        // Fill the first column
        for (let i = 0; i < 6; i++) {
            document.querySelector(`.cell[data-col='0']`).click();
        }
        // Attempt to place another disc in the same column
        document.querySelector(`.cell[data-col='0']`).click();
        // Assuming you have a way to check for the message (you'd need to implement this in your code)
        const errorMessage = document.querySelector('#errorMessage') ? document.querySelector('#errorMessage').textContent : '';
        expect(errorMessage).toBe("You must choose a valid column");
    });

    it('should declare a draw when the grid is full', function() {
        document.querySelector('#restartButton').click();
        // Fill the grid without winning
        const moves = [
            [0, 1, 2, 3, 4, 5, 6], [0, 1, 2, 3, 4, 5, 6],
            [0, 1, 2, 3, 4, 5, 6], [0, 1, 2, 3, 4, 5, 6],
            [0, 1, 2, 3, 4, 5, 6], [0, 1, 2, 3, 4, 5, 6]
        ];
        for (const row of moves) {
            for (const col of row) {
                document.querySelector(`.cell[data-col='${col}']`).click();
            }
        }
        const winnerText = document.querySelector('#winnerAnnouncement').textContent;
        expect(winnerText).toBe("It's a draw!");
    });
});
