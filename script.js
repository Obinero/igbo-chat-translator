async function translate() {
  const inputText = document.getElementById("inputText").value;
  const direction = document.getElementById("direction").value;

  const response = await fetch("/.netlify/functions/translate", {
    method: "POST",
    body: JSON.stringify({ inputText, direction })
  });

  const data = await response.json();
  document.getElementById("outputText").innerText = data.result;
  localStorage.setItem("lastTranslation", data.result);
}

function playAudio() {
  const text = localStorage.getItem("lastTranslation");
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = detectLanguage(text);
  window.speechSynthesis.speak(utterance);
}

function detectLanguage(text) {
  const igboChars = /ị|ọ|ụ|ɛ|ń|ñ|gb|kp/i;
  return igboChars.test(text) ? "ig-NG" : "en-US";
}
