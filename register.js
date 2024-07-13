let participants = 0;
const addButton = document.querySelector("#add");
const form = document.querySelector("#submitButton");
const participantList = document.querySelector("#participants");
const participantArray = [];
const summary = document.querySelector("#summary");

function totalFees() {
  let feeElements = document.querySelectorAll("[id^=fee]");
  feeElements = [...feeElements];
  const reducedFees = feeElements.reduce((accumulator, currentElement) => {
    const fee = parseFloat(currentElement.value) || 0;
    return accumulator + fee;
  }, 0);
  return reducedFees;
}

function participantTemplate(count) {
  return `
    <section class="participant${count}">
      <p>Participant ${count}</p>
      <div class="item">
        <label for="fname${count}"> First Name<span>*</span></label>
        <input id="fname${count}" type="text" name="fname" value="" required />
      </div>
      <div class="item activities">
        <label for="activity${count}">Activity #<span>*</span></label>
        <input id="activity${count}" type="text" name="activity" />
      </div>
      <div class="item">
        <label for="fee${count}">Fee ($)<span>*</span></label>
        <input id="fee${count}" type="number" name="fee" />
      </div>
      <div class="item">
        <label for="date${count}">Desired Date <span>*</span></label>
        <input id="date${count}" type="date" name="date" />
      </div>
      <div class="item">
        <p>Grade</p>
        <select>
          <option selected disabled></option>
          <option value="1">1st</option>
          <option value="2">2nd</option>
          <option value="3">3rd</option>
          <option value="4">4th</option>
          <option value="5">5th</option>
          <option value="6">6th</option>
          <option value="7">7th</option>
          <option value="8">8th</option>
          <option value="9">9th</option>
          <option value="10">10th</option>
          <option value="11">11th</option>
          <option value="12">12th</option>
        </select>
      </div>
    </section>`;
}

function successTemplate(info) {
  return `
    <p>Thank you ${info.name} for registering! You have registered ${info.participants} and owe $${info.totalFees}.</p>`;
}

addButton.addEventListener("click", function () {
  participants++;
  const newParticipant = participantTemplate(participants);
  participantList.insertAdjacentHTML("beforeend", newParticipant);

  const fnameInput = document.querySelector(`#fname${participants}`);
  participantArray.push({
    id: participants,
    name: fnameInput.value,
  });
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const total = totalFees();

  // Clear previous content in summary
  summary.innerHTML = "";

  participantArray.forEach((person) => {
    summary.innerHTML += successTemplate({
      name: person.name,
      participants: participantArray.length,
      totalFees: total,
    });
  });
});
