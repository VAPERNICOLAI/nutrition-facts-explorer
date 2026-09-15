# NutriFacts - Nutrition Facts Explorer

NutriFacts is a web application that allows users to explore nutritional
information about different foods.

The application retrieves real nutrition data from the All The Nutrients
public API using HTTP GET requests.

## Features

- Search for food nutrition information
- Quick search for selected foods
- Displays calories
- Displays protein, carbohydrates, and fat
- Displays vitamins and minerals when available
- Nutrition Facts style result
- Responsive web design
- Live data retrieved from a public API

## API Used

This project uses the All The Nutrients API.

API Documentation:
https://allthenutrients.com/api-docs/

The API returns nutrition information in JSON format.

Example request:

GET https://allthenutrients.com/api/v1/foods/broccoli-raw.json

No API key is required for this project.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Fetch API
- REST API
- JSON

## How to Run Locally

1. Clone or download this repository.
2. Open the project folder in Visual Studio Code.
3. Open index.html using Live Server.
4. Search for a supported food.
5. Nutrition information will be retrieved from the API.

## Project Structure

nutrition-facts-explorer/
├── index.html
├── style.css
├── script.js
└── README.md

## API Integration

JavaScript Fetch is used to send GET requests to the nutrition API.

Example:

fetch("https://allthenutrients.com/api/v1/foods/broccoli-raw.json")

The returned JSON data is processed using JavaScript and displayed
dynamically on the webpage.

## API Key Handling

The selected API does not require an API key. Therefore, no API credentials
or secret keys are stored in this repository.

## Purpose

This project was created as part of the Free API Niche Challenge.

Assigned niche: Nutrition Facts

## Disclaimer

Nutrition information displayed by this application is provided for
educational and informational purposes. Nutritional values may vary
depending on food variety, preparation, and serving size.