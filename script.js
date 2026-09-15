// ==========================================
// NUTRIFACTS - MAIN JAVASCRIPT
// ==========================================

// HTML elements
const foodForm = document.getElementById("foodForm");
const foodInput = document.getElementById("foodInput");
const message = document.getElementById("message");
const result = document.getElementById("result");

const foodName = document.getElementById("foodName");
const foodGroup = document.getElementById("foodGroup");
const calories = document.getElementById("calories");
const nutrientList = document.getElementById("nutrientList");

const summaryCalories = document.getElementById("summaryCalories");
const summaryProtein = document.getElementById("summaryProtein");
const summaryCarbs = document.getElementById("summaryCarbs");
const summaryFat = document.getElementById("summaryFat");

const quickButtons = document.querySelectorAll(".quick-btn");


// ==========================================
// SEARCH FORM
// ==========================================

foodForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const food = foodInput.value.trim();

    if (food === "") {
        message.textContent = "Please enter a food.";
        return;
    }

    searchFood(food);
});


// ==========================================
// QUICK SEARCH BUTTONS
// ==========================================

quickButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const food = button.dataset.food;

        foodInput.value = food;

        searchFood(food);
    });

});


// ==========================================
// SEARCH API
// ==========================================

async function searchFood(food) {

    result.classList.add("hidden");

    message.textContent = "Searching nutrition information...";

    // Convert:
    // broccoli raw -> broccoli-raw

    const slug = food
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const apiURL =
        "https://allthenutrients.com/api/v1/foods/" +
        slug +
        ".json";

    console.log("GET:", apiURL);

    try {

        const response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error(
                "Request failed: " + response.status
            );
        }

        const data = await response.json();

        console.log("API Data:", data);

        displayFood(data);

        message.textContent = "";

    } catch (error) {

        console.error(error);

        message.textContent =
            "Food not found. Try Broccoli, Banana, or Avocado.";

        result.classList.add("hidden");
    }
}


// ==========================================
// DISPLAY FOOD
// ==========================================

function displayFood(data) {

    const food = data.food || data;

    const nutrients =
        data.nutrients ||
        food.nutrients ||
        [];

    // Food information

    foodName.textContent =
        food.name || "Food";

    foodGroup.textContent =
        food.groupName ||
        "Nutrition Information";


    // Find important nutrients

    const energy =
        getNutrient(nutrients, "Energy");

    const protein =
        getNutrient(nutrients, "Protein");

    const carbs =
        getNutrient(
            nutrients,
            "Carbohydrate, by difference"
        );

    const fat =
        getNutrient(
            nutrients,
            "Total lipid (fat)"
        );


    // Calories

    if (energy) {

        calories.textContent =
            formatNumber(energy.amount);

        summaryCalories.textContent =
            formatNumber(energy.amount) +
            " " +
            energy.unit;

    } else {

        calories.textContent = "N/A";
        summaryCalories.textContent = "N/A";
    }


    // Summary cards

    summaryProtein.textContent =
        formatNutrient(protein);

    summaryCarbs.textContent =
        formatNutrient(carbs);

    summaryFat.textContent =
        formatNutrient(fat);


    // Clear old nutrients

    nutrientList.innerHTML = "";


    // Nutrients we want to show

    const wanted = [
        "Total lipid (fat)",
        "Fatty acids, total saturated",
        "Cholesterol",
        "Sodium, Na",
        "Carbohydrate, by difference",
        "Fiber, total dietary",
        "Sugars, total including NLEA",
        "Protein",
        "Calcium, Ca",
        "Iron, Fe",
        "Potassium, K",
        "Vitamin C, total ascorbic acid"
    ];


    wanted.forEach(function(name) {

        const nutrient =
            getNutrient(nutrients, name);

        if (nutrient) {

            addNutrient(
                cleanName(name),
                nutrient.amount,
                nutrient.unit
            );
        }

    });


    // Show result

    result.classList.remove("hidden");

    result.scrollIntoView({
        behavior: "smooth"
    });
}


// ==========================================
// FIND NUTRIENT
// ==========================================

function getNutrient(nutrients, name) {

    return nutrients.find(function(nutrient) {

        return nutrient.name === name;

    });
}


// ==========================================
// ADD NUTRIENT TO HTML
// ==========================================

function addNutrient(name, amount, unit) {

    const row =
        document.createElement("div");

    row.className = "nutrient-row";


    const label =
        document.createElement("span");

    label.textContent = name;


    const value =
        document.createElement("strong");

    value.textContent =
        formatNumber(amount) +
        " " +
        (unit || "");


    row.appendChild(label);
    row.appendChild(value);

    nutrientList.appendChild(row);
}


// ==========================================
// FORMAT NUTRIENT
// ==========================================

function formatNutrient(nutrient) {

    if (!nutrient) {
        return "N/A";
    }

    return (
        formatNumber(nutrient.amount) +
        " " +
        nutrient.unit
    );
}


// ==========================================
// FORMAT NUMBER
// ==========================================

function formatNumber(number) {

    const value = Number(number);

    if (isNaN(value)) {
        return "N/A";
    }

    return Math.round(value * 10) / 10;
}


// ==========================================
// CLEAN NUTRIENT NAMES
// ==========================================

function cleanName(name) {

    const names = {

        "Total lipid (fat)":
            "Total Fat",

        "Fatty acids, total saturated":
            "Saturated Fat",

        "Sodium, Na":
            "Sodium",

        "Carbohydrate, by difference":
            "Total Carbohydrate",

        "Fiber, total dietary":
            "Dietary Fiber",

        "Sugars, total including NLEA":
            "Total Sugars",

        "Calcium, Ca":
            "Calcium",

        "Iron, Fe":
            "Iron",

        "Potassium, K":
            "Potassium",

        "Vitamin C, total ascorbic acid":
            "Vitamin C"
    };

    return names[name] || name;
}