function generateCards(processes) {
    // Get the div container for the cards
    const cardsContainer = document.getElementById("cards-container");
  
    // Loop through each process and create a card
    for (let process of processes) {
      // Create the card div
      const card = document.createElement("div");
      card.classList.add("card");
  
      // Create the image element and set its src
      const img = document.createElement("img");
      img.src = process.img;
  
      // Create the start button and set its text
      const startBtn = document.createElement("button");
      startBtn.textContent = "Start";
  
      // Attach an event listener to the start button to start the process
      startBtn.addEventListener("click", () => {
        // HTTP GET request to the server to start the process
        fetch(`/start?command=${process.command}`);
      });
  
      // Create the end button and set its text
      const endBtn = document.createElement("button");
      endBtn.textContent = "End";
  
      // Attach an event listener to the end button to end the process
      endBtn.addEventListener("click", () => {
        // HTTP GET request to the server to end the process flask server
        fetch(`/end?command=${process.command}`);
      });
  
        //Add the name of the proces to the card div
        const name = document.createElement("h3");
        name.textContent = process.name;
        card.appendChild(name);

      // Append the elements to the card
      card.appendChild(img);
      // if the service is active remove the start button and add the end button
        fetch(`/status?command=${process.command}`).then(response => {
          //te server is returning a json object
           console.log(response)

            if (response == "Running") {
              card.appendChild(endBtn);
            } else {
              card.appendChild(startBtn);
            }
          });  
  
      // Append the card to the cards container
      cardsContainer.appendChild(card);
    }
  }
  