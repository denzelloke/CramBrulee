let nav = 0; //keeps track of which month is being viewed
let clicked = null;
let events = localStorage.getItem("events")
  ? JSON.parse(localStorage.getItem("events"))
  : [];

const calendar = document.getElementById("calendar");
const newEventModal = document.getElementById("newEventModal");
const deleteEventModal = document.getElementById("deleteEventModal");
const backDrop = document.getElementById("modalBackDrop");
const eventTitleInput = document.getElementById("eventTitleInput");
const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function openModal(date) {
  clicked = date;

  const eventForDay = events.find((e) => e.date === clicked);

  if (eventForDay) {
    document.getElementById("eventText").innerText = eventForDay.title;
    deleteEventModal.style.display = "block";
  } else {
    newEventModal.style.display = "block";
  }

  backDrop.style.display = "block";
}

function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setDate(new Date().getDate() + 7 * nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const currDateString = dt.toLocaleDateString("en-uk", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const currDOTW = weekdays.indexOf(currDateString.split(", ")[0]) + 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  console.log("daysInMonth:", daysInMonth);
  console.log("month:", month + 1);

  monDate = day - currDOTW + 1;
  console.log("mondate:", monDate);

  document.getElementById("monthDisplay").innerText = `${dt.toLocaleDateString(
    "en-uk",
    { month: "long" }
  )} ${year}`;

  calendar.innerHTML = "";

  for (let i = 0; i < 7; i++) {
    currDay = monDate + i;

    if (currDay > daysInMonth) {
      monDate = 1 - i;
      currDay = monDate + i;
    } //prevents overshooting

    if (currDay <= 0) {
      daysInPrevMonth = new Date(year, month, 0).getDate();
      currDay = currDay + daysInPrevMonth;
    } //prevents -ve dates

    const daySquare = document.createElement("div");
    daySquare.classList.add("day");
    daySquare.innerText = currDay;

    const dayString = `${month + 1}/${monDate + i}/${year}`;

    const eventForDay = events.find((e) => e.date === dayString);

    if (nav === 0 && monDate + i === day) {
      daySquare.id = "currentDay";
    }

    daySquare.addEventListener("click", () => openModal(dayString));
    if (eventForDay) {
      const eventDiv = document.createElement("div");
      eventDiv.classList.add("event");
      eventDiv.innerText = eventForDay.title;
      daySquare.appendChild(eventDiv);
    }
    daySquare.addEventListener("click", () => openModal(dayString));

    calendar.appendChild(daySquare);
  }
}

function closeModal() {
  eventTitleInput.classList.remove("error");
  newEventModal.style.display = "none";
  deleteEventModal.style.display = "none";
  backDrop.style.display = "none";
  eventTitleInput.value = "";
  clicked = null;
  load();
}

function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove("error");

    events.push({
      date: clicked,
      title: eventTitleInput.value,
    });

    localStorage.setItem("events", JSON.stringify(events));
    closeModal();
  } else {
    eventTitleInput.classList.add("error");
  }
}

function deleteEvent() {
  events = events.filter((e) => e.date !== clicked);
  localStorage.setItem("events", JSON.stringify(events));
  closeModal();
}

function initButtons() {
  document.getElementById("nextButton").addEventListener("click", () => {
    nav++;
    load();
  });

  document.getElementById("todayButton").addEventListener("click", () => {
    nav = 0;
    load();
  });

  document.getElementById("backButton").addEventListener("click", () => {
    nav--;
    load();
  });

  document.getElementById("saveButton").addEventListener("click", saveEvent);
  document.getElementById("cancelButton").addEventListener("click", closeModal);
  document
    .getElementById("deleteButton")
    .addEventListener("click", deleteEvent);
  document.getElementById("closeButton").addEventListener("click", closeModal);
}

initButtons();
load();
