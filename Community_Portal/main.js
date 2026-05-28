console.log("Welcome to the Community Portal");

window.onload = function () {
    alert("Page Fully Loaded");
};

const portalName = "Community Portal";
const launchDate = "2026";

let totalSeats = 100;

totalSeats++;

console.log(`${portalName} launched in ${launchDate}`);

class Event {

    constructor(id, name, category, location, date, seats) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.location = location;
        this.date = date;
        this.seats = seats;
    }
}

Event.prototype.checkAvailability = function () {
    return this.seats > 0;
};

let events = [];

events.push(
    new Event(
        100,
        "Dance Show",
        "Music",
        "Madurai",
        "2026-11-11",
        10
    )
);

function addEvent(eventObj) {
    events.push(eventObj);
}

function registerUser(eventId) {

    try {

        let event = events.find(e => e.id === eventId);

        if (!event) {
            throw new Error("Event not found");
        }

        if (event.seats <= 0) {
            throw new Error("No seats available");
        }

        event.seats--;

        displayEvents(events);

        console.log("Registration successful");

    } catch (error) {

        console.error(error.message);
    }
}

function filterEventsByCategory(category) {

    return events.filter(event => {

        if (category === "all") {
            return true;
        }

        return event.category === category;
    });
}

function registrationTracker() {

    let totalRegistrations = 0;

    return function () {

        totalRegistrations++;

        console.log(
            `Total Registrations: ${totalRegistrations}`
        );
    };
}

const trackMusicRegistration = registrationTracker();

const eventContainer =
    document.querySelector("#eventContainer");

function displayEvents(eventList) {

    eventContainer.innerHTML = "";

    eventList.forEach(event => {

        let today = new Date();

        if (
            new Date(event.date) < today ||
            event.seats <= 0
        ) {
            return;
        }

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <h3>${event.name}</h3>
            <p>Category: ${event.category}</p>
            <p>Location: ${event.location}</p>
            <p>Seats: ${event.seats}</p>

            <button onclick="registerUser(${event.id})">
                Register
            </button>
        `;

        eventContainer.appendChild(card);
    });
}

function showObjectEntries(eventObj) {

    Object.entries(eventObj).forEach(([key, value]) => {

        console.log(`${key}: ${value}`);
    });
}

function showMusicEvents() {

    let musicEvents = events.filter(
        event => event.category === "Music"
    );

    console.log(musicEvents);
}

function eventCards() {

    let cards = events.map(event =>
        `Workshop on ${event.name}`
    );

    console.log(cards);
}

document
    .querySelector("#categoryFilter")
    .onchange = function () {

        let filtered =
            filterEventsByCategory(this.value);

        displayEvents(filtered);
    };

document
    .querySelector("#searchBox")
    .addEventListener("keydown", function () {

        let text = this.value.toLowerCase();

        let filtered = events.filter(event =>
            event.name.toLowerCase().includes(text)
        );

        displayEvents(filtered);
    });

fetch("events.json")

    .then(response => response.json())

    .then(data => {

        document.querySelector("#loading").style.display =
            "none";

        events = data.map(event =>
            new Event(
                event.id,
                event.name,
                event.category,
                event.location,
                event.date,
                event.seats
            )
        );

        displayEvents(events);
    })

    .catch(error => {

        console.error("Fetch Error:", error);
    });

async function loadEvents() {

    try {

        document.querySelector("#loading").style.display =
            "block";

        let response = await fetch("events.json");

        let data = await response.json();

        events = data;

        displayEvents(events);

    } catch (error) {

        console.error(error);

    } finally {

        document.querySelector("#loading").style.display =
            "none";
    }
}

function showEventDetails(
    {
        name,
        category,
        location
    }
) {

    console.log(name, category, location);
}

let copiedEvents = [...events];

document
    .querySelector("#registrationForm")

    .addEventListener("submit", function (event) {

        event.preventDefault();

        console.log("Form Submitted");

        let form = event.target;

        let name = form.elements["name"].value;

        let email = form.elements["email"].value;

        let selectedEvent =
            form.elements["event"].value;

        let valid = true;

        document.querySelector("#nameError")
            .textContent = "";

        document.querySelector("#emailError")
            .textContent = "";

        if (name === "") {

            document.querySelector("#nameError")
                .textContent = "Name Required";

            valid = false;
        }

        if (email === "") {

            document.querySelector("#emailError")
                .textContent = "Email Required";

            valid = false;
        }

        if (!valid) return;

        submitRegistration({
            name,
            email,
            selectedEvent
        });
    });

function submitRegistration(userData) {

    document.querySelector("#message")
        .textContent = "Submitting...";

    setTimeout(() => {

        fetch("https://jsonplaceholder.typicode.com/posts", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(userData)
        })

            .then(response => response.json())

            .then(data => {

                console.log(data);

                document.querySelector("#message")
                    .textContent =
                    "Registration Successful";
            })

            .catch(error => {

                document.querySelector("#message")
                    .textContent =
                    "Registration Failed";

                console.error(error);
            });

    }, 2000);
}

$("#registerBtn").click(function () {

    console.log("Register Button Clicked");
});

$(".card").fadeIn(1000);

setTimeout(() => {

    $(".card").fadeOut(1000);

}, 3000);