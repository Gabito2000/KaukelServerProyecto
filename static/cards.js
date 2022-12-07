// let fetchEnd = () => {
//   console.log("end");
//   return fetch(`/end?command=${process.command}`);
// }

// let fetchStart = () => {
//   let command = process.command;
//   console.log("start");
//   return fetch(`/start?command=${process.command}`);
// }

function generateCards(processes) {
    // Get the div container for the cards
    const cardsContainer = document.getElementById("cards-container");
    for (let process of processes) {
      // Create the card div
      const card = document.createElement("div");
      //add padding to the card 
      card.classList.add("p-4");
      let endpoint = "";
      textButton = "";
      fetch(`/status?command=${process.command}`).then(response => {
        //te server is returning a json object
        response.json().then(data => {
          if (data.status == "Running") {
            endpoint = "/end";
            textButton = "End";
          } else {
            endpoint = "/start";
            textButton = "Start";
          }
          card.innerHTML = 
          ` 
          <div>
            <div class="pt-16 pr-16 max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
              <img class="rounded-t-lg" src="${process.img}" alt="" style="width: 150px; height: 150px; object-fit: cover;" />
              <div class="p-5">
                <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">${process.name}</h5>
                <form action="${endpoint}" method="GET">
                  <input type="text" name="command" value="${process.command}" hidden>
                  <button class="inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    ${textButton}
                    <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </button>
                </form>
              </div>
            </div>
          </div>

          `;
          cardsContainer.appendChild(card);
        });
      });
    }
  }
  



