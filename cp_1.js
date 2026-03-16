document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("feedbackForm");
    const tooltip = document.getElementById("tooltip");

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const feedbackInput = document.getElementById("feedback");

    const nameErr = document.getElementById("nameErr");
    const emailErr = document.getElementById("emailErr");
    const feedbackErr = document.getElementById("feedbackErr");

    const charCount = document.getElementById("charCount");
    const feedbackDisplay = document.getElementById("feedback-display");



    form.addEventListener("input", function (event) {

        if (event.target.id === "feedback") {
            charCount.textContent = feedbackInput.value.length + " / 600";
        }

    });



    form.addEventListener("mouseover", function (event) {

        const group = event.target.closest(".form-group");
        if (!group) return;

        const message = group.dataset.tooltip;
        if (!message) return;

        tooltip.textContent = message;
        tooltip.style.display = "block";

        const rect = group.getBoundingClientRect();

        tooltip.style.top = rect.bottom + window.scrollY + "px";
        tooltip.style.left = rect.left + window.scrollX + "px";

    });



    form.addEventListener("mouseout", function () {

        tooltip.style.display = "none";

    });



    form.addEventListener("submit", function (event) {

        event.preventDefault();
        event.stopPropagation();

        nameErr.textContent = "";
        emailErr.textContent = "";
        feedbackErr.textContent = "";

        let valid = true;

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const feedback = feedbackInput.value.trim();

        if (name === "") {
            nameErr.textContent = "Name is required.";
            valid = false;
        }

        if (email === "") {
            emailErr.textContent = "Email is required.";
            valid = false;
        }

        if (feedback === "") {
            feedbackErr.textContent = "Feedback cannot be empty.";
            valid = false;
        }

        if (!valid) return;



        const entry = document.createElement("div");
        entry.classList.add("feedback-item");

        entry.innerHTML = `
            <strong>${name}</strong> (${email})
            <p>${feedback}</p>
        `;

        feedbackDisplay.appendChild(entry);



        form.reset();
        charCount.textContent = "0 / 600";

    });

});