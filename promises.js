function fetchQuotes() {
  return new Promise((resolve, reject) => {
    fetch("https://motivational-spark-api.vercel.app/api/quotes/random/10")
      .then((response) => {
        if (!response.ok) {
          reject(new Error("Failed to fetch data"));
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch(() => reject(new Error("Failed to fetch data")));
  });
}

async function displayQuotes() {
  const container = document.getElementById("quotes-container");
  const errorContainer = document.getElementById("error-message");

  fetchQuotes()
    .then((data) => {
      container.innerHTML = "";
      data.forEach((q) => {
        const div = document.createElement("div");
        div.classList.add("quote");
        div.innerHTML = `<p>"${q.quote}"</p><small>- ${q.author}</small>`;
        container.appendChild(div);
      });
    })
    .catch((err) => {
      console.error(err);
      errorContainer.textContent = err.message;
    });
}

displayQuotes();
