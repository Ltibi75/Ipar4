let start = document.querySelector("#start");
let stopp = document.querySelector("#stop");
let count = document.querySelector("#count");
let coils = document.querySelector("#coils");

start.addEventListener("mousedown", () => {
  sendCommand("start1");
});
start.addEventListener("mouseup", () => {
  sendCommand("stop1");
});
stopp.addEventListener("mousedown", () => {
  sendCommand("start2");
});
stopp.addEventListener("mouseup", () => {
  sendCommand("stop2");
});

function sendCommand(command) {
  fetch("/send-command", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ command: command }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
}

async function readInputRegisters() {
  try {
    const response = await fetch("/read_input_registers");
    const data = await response.json();

    count.textContent = JSON.stringify(data);
  } catch (error) {
    count.textContent = "Fetching...";
  }
}

async function readCoils() {
  try {
    const response = await fetch("/read_coils");
    const data = await response.json();
    coils.textContent = JSON.stringify(data);
  } catch (error) {
    coils.textContent = "Fetching...";
  }
}

setInterval(readInputRegisters, 200);
setInterval(readCoils, 200);
