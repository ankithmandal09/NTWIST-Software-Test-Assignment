document.addEventListener("DOMContentLoaded", function () {
  const entriesList = document.getElementById("entriesList");
  const sortSelect = document.getElementById("sortSelect");

  // Dummy data
  const dummyData = [
    {
      name: "John Doe",
      email: "john@example.com",
      message: "Great experience using this form!",
      rating: 5,
      timeSpent: 120,
      formStartTime: "2024-01-15 10:30:00",
      timestamp: new Date("2024-01-15T10:32:00").toISOString(),
    },
    {
      name: "Alice Smith",
      email: "alice@example.com",
      message: "Quick and easy to use.",
      rating: 4,
      timeSpent: 85,
      formStartTime: "2024-01-15 11:45:00",
      timestamp: new Date("2024-01-15T11:46:25").toISOString(),
    },
    {
      name: "Bob Wilson",
      email: "bob@example.com",
      message: "Could use some improvements.",
      rating: 3,
      timeSpent: 150,
      formStartTime: "2024-01-15 14:20:00",
      timestamp: new Date("2024-01-15T14:22:30").toISOString(),
    }
  ];

  // Get entries from localStorage or use dummy data
  let entries = JSON.parse(localStorage.getItem("formEntries") || "[]");
  if (entries.length === 0) {
    entries = dummyData;
    console.log("No entries found in localStorage, using dummy data");
  }

  function formatTimeSpent(seconds) {
    if (!seconds) return "N/A";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return minutes > 0
      ? `${minutes}m ${remainingSeconds}s`
      : `${remainingSeconds}s`;
  }

  function getStarRating(rating) {
    return "⭐".repeat(Number(rating) || 0);
  }

  function displayEntries(entries) {
    entriesList.innerHTML = entries
      .map(
        (entry) => `
            <div class="entry-item">
                <div class="entry-name" data-label="Name">
                    ${entry.name}
                </div>
                <div class="entry-email" data-label="Email">
                    ${entry.email}
                </div>
                <div class="entry-rating" data-label="Rating">
                    ${getStarRating(entry.rating)}
                </div>
                <div class="entry-message" data-label="Message">
                    ${entry.message}
                </div>
                <div class="entry-time" data-label="Time Info">
                    <span class="time-spent">
                        ${formatTimeSpent(entry.timeSpent)}
                    </span>
                    <span class="start-time">
                        Started: ${entry.formStartTime}
                    </span>
                </div>
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
      default:
        entries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }
    displayEntries(entries);
  }

  window.deleteEntry = function (timestamp) {
    if (confirm("Are you sure you want to delete this entry?")) {
      entries = entries.filter((entry) => entry.timestamp !== timestamp);
      if (entries.length === 0) {
        entries = dummyData; // Reset to dummy data if all entries are deleted
      }
      localStorage.setItem("formEntries", JSON.stringify(entries));
      displayEntries(entries);
    }
  };

  sortSelect.addEventListener("change", (e) => sortEntries(e.target.value));
  sortEntries("default"); // Initial sort
});
