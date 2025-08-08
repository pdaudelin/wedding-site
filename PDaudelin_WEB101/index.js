
/*** Dark Mode ***/


let themeButton = document.getElementById("theme-button")


const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
}

themeButton.addEventListener("click", toggleDarkMode);

/*** Form Handling ***
  
  Purpose:
  - When the user submits the RSVP form, the name and state they 
    entered should be added to the list of participants.

***/
const submitButton = document.getElementById('rsvp-button');

const addParticipant = (person) => {
  // Create a new <p> element
  const newParticipant = document.createElement('p');
  newParticipant.textContent = `💐 ${person.name} from ${person.hometown} has RSVP'd.`;

  // Add the <p> to the rsvp-participants div
  const participantsDiv = document.querySelector('.rsvp-participants');
  participantsDiv.appendChild(newParticipant);
};

const validateForm = () => {
  let containsErrors = false;

  const rsvpInputs = document.getElementById("rsvp-form").elements;

  // Validate each input
  for (let i = 0; i < rsvpInputs.length; i++) {
    const input = rsvpInputs[i];

    if (input.type !== "text" && input.type !== "email") continue;

    if (input.value.trim().length < 2) {
      containsErrors = true;
      input.classList.add("error");
    } else {
      input.classList.remove("error");
    }
  };

  let person = {
      name: rsvpInputs[0].value,
      hometown: rsvpInputs[1].value,
      email: rsvpInputs[2].value
  };

  // If no errors, add participant and clear inputs
  if (!containsErrors) {
    addParticipant(person);
    toggleModal(person);

    for (let i = 0; i < rsvpInputs.length; i++) {
      const input = rsvpInputs[i];
      if (input.type === "text" || input.type === "email") {
        input.value = "";
      }
    }
  }

  return !containsErrors;
};

// Attach validation to the submit button
submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  validateForm();
});

/*** Modal ***/

const toggleModal = (person) => {
    let modal = document.getElementById('success-modal');
    let modalContent = document.getElementById('modal-message');

    modal.style.display = "flex";

    modalContent.textContent = `Thank you for RSVPing, ${person.name}! We're so excited you'll be joining us and we can't wait to celebrate with you 💕`;

    modal.classList.add('show');

    // Set modal timeout to 5 seconds
    let intervalID = setInterval(animateImage, 500);
    setTimeout(() => {
      modal.style.display = "none";
      clearInterval(intervalID);
    }, 8000);
}

// Close modal when clicking outside the container
document.getElementById('success-modal').addEventListener('click', (event) => {
  const modal = document.getElementById('success-modal');
  const container = document.querySelector('.modal-container');

  if (!container.contains(event.target)) {
    modal.classList.remove('show');
  }
});

// Animates image in modal
let rotateFactor = 0;
let modalImage = document.querySelector('.modal-image img');

const animateImage = () => {
  rotateFactor = rotateFactor === 0 ? 20 : 0;

  modalImage.style.transform = `rotate(${rotateFactor}deg)`;
}
