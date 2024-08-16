console.log("Hello, World!");
// Function to sleep for a specified amount of time
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Function to click the "Add Vote" button 10 times if the specific artist is present
async function clickAddVoteButtonIfArtistPresent(artistName) {
  // Find all parent div elements that potentially contain the artist
  const artistContainers = document.querySelectorAll("div.css-0");

  // Check each container for the specific artist
  for (const container of artistContainers) {
    // Find the artist name within the current container
    const artistElement = container.querySelector(
      "h3.chakra-heading.css-1vcxf53"
    );
    if (artistElement && artistElement.textContent.trim() === artistName) {
      // Find the "Add Vote" button within the current container
      const addButton = container.querySelector(
        'button[aria-label="Add Vote"]'
      );

      // Click the button 10 times if it is found
      if (addButton && !addButton.disabled) {
        for (let i = 0; i < 10; i++) {
          addButton.click();
          await sleep(100); // Optional: Short delay between clicks
        }
        console.log(`${artistName} button clicked 10 times.`);

        // Wait 1 second before the next action
        await sleep(1000);

        // Click the "Submit" button
        const submitButton = document.querySelector(
          "button.chakra-button.css-ufo2k5"
        );
        if (submitButton && !submitButton.disabled) {
          submitButton.click();
          console.log("Submit button clicked.");
        } else {
          console.error("Submit button not found or is disabled.");
        }

        // Wait 5 seconds before processing the next artist
        await sleep(5000);

        break; // Stop looking for more artists after processing the current one
      }
    }
  }
}

// List of artists to check
const artists = [
  "Billie Eilish",
  "Bad Bunny",
  "Jack Harlow",
  "Chappell Roan",
  "LE SSERAFIM",
  "GloRilla, Megan Thee Stallion",
  "Dua Lipa",
  "Megan Thee Stallion",
  "Alicia Keys",
  "Imagine Dragons",
  "Kings of Leon",
  "Myke Towers",
  "LISA",
  "USHER, Pheelz",
  "RAYE",
];

// Process each artist in sequence
(async function processArtists() {
  for (const artist of artists) {
    await clickAddVoteButtonIfArtistPresent(artist);
  }
})();
