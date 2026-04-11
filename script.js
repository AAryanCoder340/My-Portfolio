document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (!contactForm) {
    console.error("Form with id='contact-form' not found.");
    return;
  }

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const message = document.getElementById("message")?.value.trim();

    try {
      const response = await fetch("http://localhost:5000/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
      });

      const data = await response.json();

      if (data.success) {
        if (formStatus) formStatus.textContent = "Message sent successfully!";
        contactForm.reset();
      } else {
        if (formStatus) formStatus.textContent = data.message || "Failed to send message.";
      }
    } catch (error) {
      console.error("Error:", error);
      if (formStatus) formStatus.textContent = "Something went wrong. Please try again.";
    }
  });
});