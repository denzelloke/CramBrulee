//calendarScript.mjs

const colorMap = {
  red: "#C9052A",
  orange: "#E49D1F",
  green: "#05C9A5",
  blue: "#1652B9",
  violet: "#5902A5",
};

document.addEventListener("DOMContentLoaded", function () {
  let userIdElement = document.getElementById("userId");

  // Ensure userIdElement exists before trying to access its value
  if (userIdElement) {
    let userId = userIdElement.value;

    // Now use userId to fetch user-specific events from your server
    fetch(`/events/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        events = data; // Store the fetched events in the global `events` array
        load(); // Initialize the calendar with user-specific events after fetching
      })
      .catch((error) => console.error("Error fetching events:", error));
  } else {
    console.error("UserId element not found");
  }
});

let events = [];
let selectedEvent = null;

function handleAllDayCheckbox() {
  const allDayCheckbox = document.getElementById("allDayCheckbox");
  const startDateInput = document.getElementById("eventStartDate");
  const startTimeInput = document.getElementById("eventStartTime");
  const endDateInput = document.getElementById("eventEndDate");
  const endTimeInput = document.getElementById("eventEndTime");

  allDayCheckbox.addEventListener("change", function () {
    if (this.checked) {
      const startDate = startDateInput.value;
      startTimeInput.value = "00:00";
      endDateInput.value = startDate;
      endTimeInput.value = "23:59";
      startTimeInput.disabled = true;
      endTimeInput.disabled = true;
    } else {
      startTimeInput.disabled = false;
      endTimeInput.disabled = false;
    }
  });
}

function openModal(start) {
  selectedEvent = null;
  $("#eventTitle").val("");
  $("#eventStartDate").val(moment(start).format("YYYY-MM-DD"));
  $("#eventStartTime").val(moment(start).format("HH:mm"));
  $("#eventEndDate").val(moment(start).format("YYYY-MM-DD"));
  $("#eventEndTime").val(moment(start).format("HH:mm"));
  $("#allDayCheckbox").prop("checked", false);
  $("#eventColor").val("blue");
  $("#deleteEventButton").hide();
  $("#myModal").modal("toggle");
}

function closeModal() {
  $("#myModal").modal("toggle");
  $("#calendar").fullCalendar("unselect");
}

function saveEvent() {
  let title = $("#eventTitle").val();
  let startDate = $("#eventStartDate").val();
  let startTime = $("#eventStartTime").val();
  let endDate = $("#eventEndDate").val();
  let endTime = $("#eventEndTime").val();
  let allDay = $("#allDayCheckbox").is(":checked");
  let color = colorMap[$("#eventColor").val()];

  if (title && startDate && (startTime || allDay)) {
    let newEvent = {
      userId: document.getElementById("userId").value,
      title: title,
      start: allDay ? `${startDate}T00:00` : `${startDate}T${startTime}`,
      end: allDay ? `${startDate}T23:59` : `${endDate}T${endTime}`,
      color: color,
    };

    if (selectedEvent) {
      
      // Update existing event
      selectedEvent.title = title;
      selectedEvent.start = newEvent.start;
      selectedEvent.end = newEvent.end;
      selectedEvent.color = newEvent.color;
      selectedEvent.allDay = newEvent.allDay;

      // Update existing event
      fetch(`/events/${selectedEvent._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEvent)
      })
      .then(response => response.json())
      .then(data => {
        
        $("#calendar").fullCalendar("updateEvent", selectedEvent);
        events = events.map(event => event._id === selectedEvent._id ? selectedEvent : event);
      })
      .catch(error => console.error("Error updating event:", error));
      
    } else {
      // Add new event to server
      fetch("/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      })
        .then((response) => response.json())
        .then((data) => {
          newEvent._id = data._id;
          $("#calendar").fullCalendar("renderEvent", newEvent, true);
          events.push(newEvent);
        })
        .catch((error) => console.error("Error saving event:", error));
    }

    closeModal();
  }
}

function deleteEvent() {
  if (selectedEvent) {
    // Remove event from server
    fetch(`/events/${selectedEvent._id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Remove event from calendar
          $("#calendar").fullCalendar("removeEvents", selectedEvent._id);

          // Remove event from events array
          events = events.filter((event) => event._id !== selectedEvent._id);

          closeModal();
        } else {
          console.error("Error deleting event");
        }
      })
      .catch((error) => console.error("Error deleting event:", error));
  }
}

function suggestEvent() {
  document
    .getElementById("suggestEventButton")
    .addEventListener("click", async function () {
      suggestEventButton.disabled = true; // Disable the button so it doesnt explode my computer
      let isSuggesting;
      if (isSuggesting) return; // If already suggesting, do nothing
      isSuggesting = true;

      const userId = document.getElementById("userId").value;

      const response = await fetch("/getUserEvents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const events = await response.json();

      let eventTitle = $("#eventTitle").val();
      const suggestion = await fetch("/getEventSuggestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ events, eventTitle }),
      }).then((res) => res.json());

      if (suggestion) {
        $("#eventTitle").val(suggestion.title);
        $("#eventStartDate").val(suggestion.startDate);
        $("#eventStartTime").val(suggestion.startTime);
        $("#eventEndDate").val(suggestion.endDate);
        $("#eventEndTime").val(suggestion.endTime);
        $("#deleteEventButton").hide();
        suggestEventButton.disabled = false; // enable the button after fields are populated
      }
      isSuggesting = false;
    });
}

function load() {
  $("#calendar").fullCalendar({
    header: {
      left: "prev,next today",
      center: "title",
      right: "month,agendaWeek,agendaDay,list",
    },
    selectable: true,
    selectHelper: true,
    select: function (start, end) {
      openModal(start);
    },
    eventClick: function (event) {
      selectedEvent = event;
      $("#eventTitle").val(event.title);
      $("#eventStartDate").val(moment(event.start).format("YYYY-MM-DD"));
      $("#eventStartTime").val(moment(event.start).format("HH:mm"));
      $("#eventEndDate").val(moment(event.end).format("YYYY-MM-DD"));
      $("#eventEndTime").val(moment(event.end).format("HH:mm"));
      $("#eventColor").val(event.color);
      $("#deleteEventButton").show();
      $("#myModal").modal("toggle");
    },
    buttonText: {
      today: "Today",
      month: "Month",
      week: "Week",
      day: "Day",
      list: "List",
    },
    events: events,
  });
  handleAllDayCheckbox();
}

function initButtons() {
  $("#saveEventButton").on("click", saveEvent);
  $("#deleteEventButton").on("click", deleteEvent);
  $("#suggestEventButton").on("click", suggestEvent);
}

$(document).ready(function () {
  initButtons();
});
