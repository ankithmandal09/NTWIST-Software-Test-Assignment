// Form timer functionality
let startTime = new Date();
let formStarted = false;
let timerInterval = null;
const timerDisplay = document.getElementById("timer");
const formElements = document.querySelectorAll(
  "#contactForm input, #contactForm textarea"
);
const contactForm = document.getElementById("contactForm");
const confirmationMessage = document.getElementById("confirmationMessage");

// Start timer on first form field focus
formElements.forEach((element) => {
  element.addEventListener("focus", () => {
    if (!formStarted) {
      startTime = new Date();
      formStarted = true;
      startTimer();
    }
  });
});

// Update timer every second
function startTimer() {
  timerInterval = setInterval(updateTimer, 1000);
}

// Calculate and display the time spent on the form
function updateTimer() {
  if (!formStarted) return;

  const currentTime = new Date();
  const timeSpent = Math.floor((currentTime - startTime) / 1000); // Time in seconds

  // Format time display
  if (timeSpent < 60) {
    timerDisplay.textContent = `${timeSpent}s`;
  } else {
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;
    timerDisplay.textContent = `${minutes}m ${seconds}s`;
  }
}

// Form submission handling
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const endTime = new Date();
  const timeSpent = Math.floor((endTime - startTime) / 1000); // in seconds
  const formStartTime = startTime.toLocaleString();

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
    rating:
      document.querySelector('input[name="rating"]:checked')?.value || "0",
    timeSpent,
    formStartTime,
    timestamp: new Date().toISOString(),
  };

  // Get existing entries or initialize new array
  const existingEntries = JSON.parse(
    localStorage.getItem("formEntries") || "[]"
  );
  existingEntries.push(formData);
  localStorage.setItem("formEntries", JSON.stringify(existingEntries));

  // Clear timer
  clearInterval(timerInterval);

  // Show confirmation message
  confirmationMessage.classList.remove("hidden");

  // Log form submission to console (in a real app, this would be sent to a server)
  console.log("Form submitted:", formData);
  console.log("Time spent on form:", timerDisplay.textContent);

  // Clear form
  this.reset();
  alert("Form submitted successfully!");

  // Hide confirmation message after 5 seconds
  setTimeout(() => {
    confirmationMessage.classList.add("hidden");

    // Reset timer
    formStarted = false;
    startTime = new Date();
    timerDisplay.textContent = "0s";
  }, 5000);
});

// Enhanced form validation with custom error messages
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

// Validate name
nameInput.addEventListener("blur", () => {
  if (nameInput.value.trim() === "") {
    nameError.textContent = "Name is required";
    nameInput.classList.add("error");
  } else {
    nameError.textContent = "";
    nameInput.classList.remove("error");
  }
});

// Validate email
emailInput.addEventListener("blur", () => {
  const emailValue = emailInput.value.trim();
  if (emailValue === "") {
    emailError.textContent = "Email is required";
    emailInput.classList.add("error");
  } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(emailValue)) {
    emailError.textContent = "Please enter a valid email address";
    emailInput.classList.add("error");
  } else {
    emailError.textContent = "";
    emailInput.classList.remove("error");
  }
});

// Validate message
messageInput.addEventListener("blur", () => {
  if (messageInput.value.trim() === "") {
    messageError.textContent = "Message is required";
    messageInput.classList.add("error");
  } else {
    messageError.textContent = "";
    messageInput.classList.remove("error");
  }
});
