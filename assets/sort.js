document.addEventListener("DOMContentLoaded", function () {
  const entriesList = document.getElementById("entriesList");
  const sortSelect = document.getElementById("sortSelect");
  let entries = JSON.parse(localStorage.getItem("formEntries") || "[]");

  function getStarRating(rating) {
    return "⭐".repeat(rating || 0);
  }

  function formatTime(seconds) {
    if (!seconds) return "N/A";
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }

  function displayEntries(entries) {
    entriesList.innerHTML = entries
      .map(
        (entry) => `
            <div class="entry-item">
                <div class="entry-name" data-label="Name">${entry.name}</div>
                <div class="entry-email" data-label="Email">${entry.email}</div>
                <div class="entry-rating" data-label="Rating">${getStarRating(
                  entry.rating
                )}</div>
                <div class="entry-message" data-label="Message">${
                  entry.message
                }</div>
                <div class="entry-time" data-label="Time">${formatTime(
                  entry.timeSpent
                )}</div>
                <div class="entry-actions" data-label="Actions">
                    <button onclick="deleteEntry('${
                      entry.timestamp
                    }')" class="delete-btn">
                        🗑️
                    </button>
                </div>
            </div>
        `
      )
      .join("");
  }

  function sortEntries(type) {
    switch (type) {
      case "nameAZ":
        entries.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameZA":
        entries.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "default":
      default:
        entries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        break;
    }
    displayEntries(entries);
  }

  window.deleteEntry = function (timestamp) {
    if (confirm("Are you sure you want to delete this entry?")) {
      entries = entries.filter((entry) => entry.timestamp !== timestamp);
      localStorage.setItem("formEntries", JSON.stringify(entries));
      displayEntries(entries);
    }
  };

  sortSelect.addEventListener("change", (e) => sortEntries(e.target.value));
  sortEntries("default"); // Initial sort
});
