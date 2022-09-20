let button = document.querySelector(".button")
let result = document.querySelector(".result")

let arrayRate = []

const getValues = () => {
  let fromValue = document.querySelector(".from").value
  let toValue = document.querySelector(".to").value

  fromValue = Date.parse(fromValue)
  toValue = Date.parse(toValue)

  if (+fromValue < +toValue) {
    for (let i = fromValue; i < toValue; i = i + 24 * 60 * 60 * 1000) {

      date = new Date(i).toISOString().substr(0, 10);

      let newDate = date.split('-').map(n => {
        return parseInt(n)
      }).join('-')

      getData(newDate);
    }
  }
  else {
    result.innerHTML = "Проверьте даты"
  }
}

let min = 100000;
let max = 0;

function getData(data) {
  fetch(`https://www.nbrb.by/api/exrates/rates/145?ondate=${data}&periodicity=0`)
    .then((response) => response.json())
    .then((data) => {
      arrayRate.push(data.Cur_OfficialRate);

      let minValue = Math.min(...arrayRate);
      let maxValue = Math.max(...arrayRate);

      if (minValue < min) {
        min = minValue
        result.innerHTML = `
          <span>Минимальный курс: ${min}</span>
          <span>Максимальный курс: ${max}</span>
        `;
      }

      if (maxValue > max) {
        max = maxValue
        result.innerHTML = `
          <span>Минимальный курс: ${min}</span>
          <span>Максимальный курс: ${max}</span>
        `;
      }
    });
}

button.addEventListener("click", getValues)