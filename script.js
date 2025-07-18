let clickCount = 0;
const maxClicks = 5;
const shareBtn = document.getElementById("shareBtn");
const clickCounter = document.getElementById("clickCounter");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");
const form = document.getElementById("registrationForm");

// Check if already submitted
const submittedFlag = localStorage.getItem("submitted");
if (submittedFlag === "true") {
  disableForm();
  message.innerText = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
  message.classList.remove("hidden");
}

shareBtn.addEventListener("click", () => {
  if (clickCount >= maxClicks) return;

  clickCount++;
  clickCounter.innerText = `Click count: ${clickCount}/${maxClicks}`;

  const text = encodeURIComponent("Hey Buddy, Join Tech For Girls Community!");
  const url = `https://wa.me/?text=${text}`;
  window.open(url, "_blank");

  if (clickCount === maxClicks) {
    shareBtn.disabled = true;
    clickCounter.innerText = "Sharing complete. Please continue.";
    submitBtn.disabled = false;
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (clickCount < maxClicks) {
    alert("Please complete sharing before submitting.");
    return;
  }

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const college = document.getElementById("college").value.trim();

  if (!name || !phone || !email || !college) {
    alert("Please fill in all fields.");
    return;
  }

  const data = {
    data: {
      name,
      phone,
      email,
      college
    }
  };

  try {
    const res = await fetch("https://sheetdb.io/api/v1/3ajbxpbp6mlnr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("Network response was not ok");

    message.innerText = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
    message.classList.remove("hidden");

    localStorage.setItem("submitted", "true");
    disableForm();
  } catch (err) {
    alert("Submission failed. Try again.");
    console.error(err);
  }
});

function disableForm() {
  const inputs = form.querySelectorAll("input, button");
  inputs.forEach((input) => input.disabled = true);
}
