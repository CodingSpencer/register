let participants = 1;

const button = document.querySelector("#add");

button.addEventListener("click", function () {
  participants++;
  const newParticipant = document
    .getElementById("participant1")
    .cloneNode(true);

  newParticipant.id = "participant" + participants;
  newParticipant.querySelectorAll("label, input").forEach((element) => {});
});
