# WeatherNow — Premium Weather Application

A responsive, cinematic weather application built with HTML, CSS, JavaScript, and Node.js. WeatherNow retrieves live weather data for cities around the world and presents it through an atmospheric interface with animated weather scenes and automatic city photography.

## ✨ Features

- 🌍 Search for current weather by city name
- 🌡️ Temperature and feels-like temperature in Celsius
- ☁️ Weather conditions and icons
- 💧 Humidity and wind speed
- 🌆 Automatic city photo search with cinematic styling
- 🌦️ Animated weather scenes based on current conditions
- ⚡ Loading indicators and error handling
- 📱 Responsive desktop and mobile layout
- 🔐 Server-side OpenWeather API requests to keep the API key out of frontend JavaScript

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Node.js
- Express
- dotenv
- Fetch API
- OpenWeather API
- a12.click image search service

## 📁 Project Structure

```text
synent-task6-weatherapp-arghya-maji/
├── index.html
├── style.css
├── style-backup.css
├── script.js
├── server.js
├── package.json
├── package-lock.json
├── .env.example
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- An OpenWeather API key
- A code editor such as Visual Studio Code

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd synent-task6-weatherapp-arghya-maji
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual repository URL.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure your API key

Create a `.env` file in the project root, next to `server.js`.

Copy the placeholder from `.env.example` and replace it with your own OpenWeather API key:

```env
OPENWEATHER_API_KEY=your_openweathermap_api_key_here
```

Never commit your real `.env` file or share your API key publicly.

### 4. Start the backend

```bash
npm start
```

The backend runs at:

`http://localhost:3000`

### 5. Open the frontend

Open `index.html` using VS Code Live Server or another local development server.

Keep the backend terminal running while using the application.

## 🔑 API Configuration

WeatherNow uses the OpenWeather Current Weather API through the Node.js backend. The API key is loaded from `.env` using dotenv.

The backend provides these endpoints:

- `GET /api/weather?city=Kolkata` — retrieves current weather for a city.
- `GET /api/city-photo?city=Kolkata&country=IN` — retrieves city photo search results.

Obtain your own API key from [OpenWeather](https://openweathermap.org/api).

The city photography feature uses the a12.click image search service. Its availability and image relevance depend on the external service.

## 🔒 Security

- Store your API key in `.env`.
- Keep `.env` excluded through `.gitignore`.
- Use `.env.example` only as a placeholder template.
- Never commit API keys, passwords, or other secrets.
- Configure production environment variables before deployment.

## 👨‍💻 Author

**Arghya Maji**

## 🎓 Internship

Synent Technologies — Web Development Internship Program

## 📄 License

Created for educational and internship purposes. Check the terms of any external APIs and image services used by the project before redistribution or deployment.


## Project Verification Checklist

- [ ] Start the backend server using `npm start`.
- [ ] Confirm the backend runs at `http://localhost:3000`.
- [ ] Test weather data using `/api/weather?city=Kolkata`.
- [ ] Test the city photo endpoint using `/api/city-photo?city=Kolkata&country=IN`.
- [ ] Open the frontend with Live Server.
- [ ] Search for different cities and verify the weather updates.
- [ ] Confirm that `.env` is not committed to the repository.
