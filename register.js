let participants = 1;

const addButton = document.querySelector("#add");

const form = document.querySelector("#submitButton");

const participantList = document.querySelector("#participants");

const participantArray = [];

const summary = document.querySelector("#summary");

function totalFees() {
  // the selector below lets us grab any element that has an id that begins with "fee"
  let feeElements = document.querySelectorAll("[id^=participant][id$=fee]");
  console.log(feeElements);
  // querySelectorAll returns a NodeList. It's like an Array, but not exactly the same.
  // The line below is an easy way to convert something that is list-like to an actual Array so we can use all of the helpful Array methods...like reduce
  // The "..." is called the spread operator. It "spreads" apart the list, then the [] we wrapped it in inserts those list items into a new Array.
  feeElements = [...feeElements];
  // sum up all of the fees. Something like Array.reduce() could be very helpful here :) Or you could use a Array.forEach() as well.
  // Remember that the text that was entered into the input element will be found in the .value of the element.
  reducedFees = feeElements.reduce((accumulator, currentElement) => {
    const fee = parseFloat(currentElement.value);
    return accumulator + fee;
  }, 0);
  // once you have your total make sure to return it!
  return reducedFees;
}

function participantTemplate(count) {
  return `
    <section class="participant${count}">
      <p>Participant ${count}</p>
      <div class="item">
        <label for="fname${count}"> First Name<span>*</span></label>
        <input id="fname${count}" type="text" name="fname" value="" required="" />
        <div
          data-lastpass-icon-root=""
          style="
            position: relative !important;
            height: 0px !important;
            width: 0px !important;
            float: left !important;
          "
        ></div>
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
          <option selected="" value="" disabled=""></option>
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

// function submitForm(event) {
//   event.preventDefault();
// }

function successTemplate(info) {
  return `
  <p>Thank you ${info.name} for registering! You have registered ${info.participants} and owe $${info.totalFees}.</p>`;
}

addButton.addEventListener("click", function () {
  participants++;
  const newParticipant = participantTemplate(participants);
  addButton.insertAdjacentHTML("beforebegin", newParticipant);

  participantArray.push({
    id: participants,
    name: document.querySelector("#fname").value,
  });
});

form.addEventListener("click", function (event) {
  event.preventDefault();

  const total = totalFees();

  participantArray.forEach((person) => {
    summary.innerHTML += successTemplate({
      name: person.name,
      participants: participantArray.length,
      totalFees: total,
    });
    // summary.hidden = false;
    // form.hidden = true;
  });
});
