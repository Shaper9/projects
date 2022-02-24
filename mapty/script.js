'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const clearBtn = document.querySelector('.clear-btn');


class Workout {
    date = new Date();
    id = (Date.now() + '').slice(-10)

    constructor(coords, distance, duration) {
        this.coords = coords // [lat, lng]
        this.distance = distance // in km
        this.duration = duration // in min

    }

    _setDescription() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`
    }
}

class Running extends Workout {
    type = 'running'
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration)
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();
    }

    calcPace() {
        // min/km
        this.pace = this.duration / this.distance
        return this.pace
    }


}

class Cycling extends Workout {
    type = 'cycling'
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration)
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription();
    }

    calcSpeed() {
        // km / h
        this.speed = this.distance / (this.duration / 60)
        return this.speed
    }
}



// ************************************************************************************************* ARHITEKTURA *************************************************************************************************
class App {
    #map;
    #mapEvent;
    #workouts = [];

    constructor() {
        // Get users position
        this._getPosition();
        // Get data from local storage
        this._getLocalStorage()

        // Attach event handlers
        form.addEventListener('submit', this._newWorkout.bind(this));
        inputType.addEventListener('change', this._toggleElevationField);
        containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
        clearBtn.addEventListener('click', this.reset);
    }

    _getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
                alert("We could not get yout current position")
            });
        }
    };

    _loadMap(position) {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        // console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

        const coords = [latitude, longitude]

        this.#map = L.map('map', { zoomControl: false }).setView(coords, 13);  //L.map('ovde stoji naziv diva u kom ce mapa biti prikazana')   a seView su kordinate koje trebaju da se ucitaju

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        // Handling clicks on map
        this.#map.on("click", this._showForm.bind(this));

        this.#workouts.forEach(work => {
            this._renderWorkoutMarker(work);
        })
    }

    _showForm(mapE) {
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
    }

    _hideForm() {
        // empty the inputs 
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = "";

        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(() => form.style.display = 'grid', 1000);
    }

    _toggleElevationField() {
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }

    _newWorkout(e) {
        const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp));
        const allPositive = (...inputs) => inputs.every(inp => inp > 0)  // ovo su dve pomocne funckije

        e.preventDefault();

        // Get data from the form
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        let workout;


        const localLatitude = this.#mapEvent.latlng.lat
        const localLongitude = this.#mapEvent.latlng.lng



        // Type of workout
        // IF running create running object
        if (type === 'running') {
            const cadence = +inputCadence.value;
            // Check if data is valid
            if (!validInputs(distance, duration, cadence) || !allPositive(distance, duration, cadence)) return alert('Inputs have to be positive numbers')

            workout = new Running([localLatitude, localLongitude], distance, duration, cadence);

        }
        // If cycling create cycling object
        if (type === 'cycling') {
            // Check if data is valid
            const elevation = +inputElevation.value;
            if (!validInputs(distance, duration, elevation) || !allPositive(distance, duration)) return alert('Inputs have to be positive numbers')

            workout = new Cycling([localLatitude, localLongitude], distance, duration, elevation);
        }

        // Show workout on a map as a marker
        this._renderWorkoutMarker(workout);

        // Render workout list
        this._renderWorkout(workout);

        // add new workout array
        this.#workouts.push(workout);
        console.log(workout);

        // Clearing input fields and hide form
        this._hideForm()

        // set local storage to all workouts
        this._setLocalStorage();

    }

    // display marker
    _renderWorkoutMarker(workout) {
        L.marker(workout.coords).addTo(this.#map)
            .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `${workout.type}-popup`
            }))
            .setPopupContent(`${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`)
            .openPopup();
    }

    _renderWorkout(workout) {
        let html = `
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
        `;
        if (workout.type === 'running') {
            html += `
            <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.pace.toFixed(1)}</span>
                <span class="workout__unit">min/km</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">🦶🏼</span>
                <span class="workout__value">${workout.cadence}</span>
                <span class="workout__unit">spm</span>
            </div>
            </li>
            `
        }
        if (workout.type === 'cycling') {
            html += `
          <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.speed.toFixed(1)}</span>
                <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li> 
            `
        }

        form.insertAdjacentHTML('afterend', html)
    }

    _moveToPopup(e) {
        const workoutEl = e.target.closest('.workout');

        if (!workoutEl) return;

        const workout = this.#workouts.find(work => work.id === workoutEl.dataset.id);
        this.#map.setView(workout.coords, 13, {
            animate: true,
            pan: {
                duration: 1
            },
        })


    }

    _setLocalStorage() {
        localStorage.setItem('workouts', JSON.stringify(this.#workouts))
    }

    _getLocalStorage() {
        const data = JSON.parse(localStorage.getItem('workouts'))

        if (!data) return

        this.#workouts = data
        this.#workouts.forEach(work => {
            this._renderWorkout(work);
        })
    }

    reset() {
        localStorage.removeItem('workouts')
        location.reload();
    }
}

const app = new App();


const accounts = [
    {
        owner: "Marko Krstin",
        username: "marko",
        passowrd: 133,
        premium: true,
        sessionId: Math.random()
    },

    {
        owner: "Pera Peric",
        username: "pera",
        passowrd: 123,
        premium: false,
        sessionId: Math.random()
    },

    {
        owner: "Goran Coge",
        username: "coge",
        passowrd: "poslaosamtipassnasignal",
        premium: true,
        sessionId: Math.random()
    }
]



const title = document.querySelector('.title');
const loginWrapper = document.querySelector('.login-wrapper');
const loginForm = document.querySelector('.login-form')
const loginUserInput = document.querySelector('.login-username');
const loginPassInput = document.querySelector('.login-password');
const loginBtn = document.querySelector('.login-btn');
const logoutBtn = document.querySelector('.logout-btn');
let currentAccount;
let loggedUser;


// Login


if (sessionStorage.getItem('sessionID') != null) {
    loginWrapper.classList.add('hidden');
    loginForm.classList.add('hidden');

} else {

    loginBtn.addEventListener('click', function (e) {
        e.preventDefault();

        currentAccount = accounts.find(user => user.username === loginUserInput.value.trim());

        if (currentAccount?.passowrd === Number(loginPassInput.value)) {
            loginWrapper.classList.add('hidden')
            loginForm.classList.add('hidden')

            sessionStorage.setItem("sessionID", JSON.stringify(currentAccount))
            loggedUser = JSON.parse(sessionStorage.getItem('sessionID'));
            title.textContent = `Wlcome to Mapty ${loggedUser.owner}`
        } else {
            return alert('Username or Password incorrect')
        }
    })
};

// logout
logoutBtn.addEventListener('click', function (e) {
    sessionStorage.clear();
    document.location.reload(true);
    app.reset()
})

