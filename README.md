# Reflex: 16-Bit Reaction Timer
**Reflex** is a high-precision reaction speed game designed with a retro 16-bit aesthetic. This project demonstrates the use of vanilla JavaScript for timing-critical logic, CSS Flexbox for structured UI, and efficient DOM manipulation.

## 🎮 Gameplay
Players must wait for the screen to turn from red to green. The goal is to click as fast as possible to record a reaction time. After 5 rounds, the game calculates an average and assigns a **Pixel Art Rank** based on real-world animal speeds.

## 🛠️ Technical Deep Dive
Since the source code is kept "clean" (without inline comments) for production readiness, the logic is detailed here:

### 1. High-Precision Timing (The Epoch)
To ensure the most accurate reaction tracking, the game utilizes Date.now(). Unlike a standard counter, which can be affected by browser lag, this method captures two specific timestamps:
 * **Timestamp A:** The exact millisecond the screen turns green.
 * **Timestamp B:** The exact millisecond the user clicks.
 * **Result:** The score is calculated as B - A = \text{Reaction Time}.

### 2. State Machine Logic
The game's EventListener acts as a state machine, using the waitingForClick boolean and the current displayText to determine the game's phase:
 * **Waiting Phase:** Triggers a setTimeout with a randomized delay (3,000ms–5,000ms).
 * **Reaction Phase:** Captures input and checks for "Early Clicks" by clearing active timeouts.
 * **Result Phase:** Processes the current score into the history array.
 * **End Phase:** Triggers the final rank calculation.

### 3. Data Processing with .reduce()
To calculate the final average across 5 rounds, the project uses the .reduce() method. This allows for a clean, functional approach to summing the scoreHistory array:
$$
\text{Average Score} = \frac{\sum \text{scoreHistory}}{5}
$$

### 4. Responsive Retro UI
 * **Flexbox Architecture:** The layout uses a fluid .click-area for gameplay and a fixed-width .recent-scores sidebar.
 * **Layout Safety:** Using flex-shrink: 0 on the sidebar ensures that score data remains readable even on smaller mobile screens.
 * **Pixel Art Rendering:** CSS image-rendering: pixelated; is used to ensure all assets maintain their sharp, blocky 16-bit look without browser blurring.

## 🚀 Live Demo
[Click here to play Reflex!](https://challavenkatasaipavanreddy.github.io/Reflex/)

## 🛠️ How to Run Locally
1. **Clone the Repository:**
2. ```bash
   git clone [https://github.com/challavenkatasaipavanreddy/Reflex.git](https://github.com/challavenkatasaipavanreddy/Reflex.git)
3. **No Dependencies:** This is a "Vanilla" project, meaning it requires no external libraries or installations to run.

## 📁 Project Structure
 * index.html: Structural layout and UI containers.
 * style.css: 16-bit styling, zebra-striped lists, and layer management (z-index).
 * main.js: Core game engine, timing logic, and animal ranking system.
 * assets/: Contains all 16-bit pixel art background environments.
> **Design Choice:** All code comments were removed during the final optimization phase to adhere to "Self-Documenting Code" principles, relying on descriptive variable naming and this documentation for technical clarity.
>
