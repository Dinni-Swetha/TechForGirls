let clickCount = 0;
const maxClicks = 5;
const shareBtn = document.getElementById("shareBtn");
const clickCounter = document.getElementById("clickCounter");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");
const form = document.getElementById("registrationForm");

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
  if (clickCount < maxClicks) return;

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const college = document.getElementById("college").value;
  const file = document.getElementById("screenshot").files[0];

  // STEP 1: Upload file to Google Drive (via Apps Script Web App)
  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("email", email);
  formData.append("college", college);
  formData.append("file", file);

  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbw2BE6M3Y0AtjmP84aRRTBg1cvcrPgJ6Lf3tIDI_Bk4KHaUnZ6gc0XYWjTvT8VDnCgU/exec", {
      method: "POST",
      body: formData
    });

    const result = await res.text();
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
