document.addEventListener("DOMContentLoaded", function () {
  const entriesList = document.getElementById("entriesList");
  const sortSelect = document.getElementById("sortSelect");
  let entries = JSON.parse(localStorage.getItem("formEntries") || "[]");

  function displayEntries(entries) {
    entriesList.innerHTML = entries
      .map(
        (entry) => `
            <li class="entry-item">
                <div class="entry-name">${entry.name}</div>
                <div class="entry-email">${entry.email}</div>
                <div class="entry-message">${entry.message}</div>
            </li>
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
      case "emailAZ":
        entries.sort((a, b) => a.email.localeCompare(b.email));
        break;
      case "emailZA":
        entries.sort((a, b) => b.email.localeCompare(a.email));
        break;
    }
    displayEntries(entries);
  }

  sortSelect.addEventListener("change", (e) => sortEntries(e.target.value));
  displayEntries(entries);
});
