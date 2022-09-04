import { lookupCity, lookupZipcodes } from "./zipcodesDatabase.js";

window.addEventListener("load", () => {
    let zipcodeInput = document.querySelector("#zipcodeInput");
    let cityOutput = document.querySelector("#cityOutput");
    zipcodeInput.onchange = () => {
        lookupCity(zipcodeInput.value, city => {
            cityOutput.value = city || "Город с таким почтовым индексом не найден";
        });
    };

    let cityInput = document.querySelector("#cityInput");
    let zipcodesOutput = document.querySelector("#zipcodesOutput");
    cityInput.onchange = () => {
        zipcodesOutput.textContent = "Найденные почтовые индексы:";

        lookupZipcodes(cityInput.value, zipcodes => {
            if (!zipcodes.length){
                let item = document.createElement("li");
                item.append(`Совпадений не найденнно`);
                zipcodesOutput.append(item);
            }
            zipcodes.forEach(zip => {
                let item = document.createElement("li");
                item.append(`${zip.zipcode}: ${zip.city}`);
                zipcodesOutput.append(item);
            });
        });
    };
});