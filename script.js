const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

//Fetch random user
const getRandomUser = async () => {
  const res = await fetch('https://randomuser.me/api/');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name : `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)  
  };
  addData(newUser);
}
//Add new users to data array
const addData = (newUser) => {
  data.push(newUser);
  updateDOM();
}

//update DOM
const updateDOM = (providedData = data) => {
  //clean the main div and create a new div with class
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(element);
  
  });
}
//Format money
const formatMoney = (number) => {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
//Multiply money by 2
const doubleMoney = () => {
  data = data.map(user => {
    return {...user, money:user.money*2};
  });
  updateDOM();  
}
//Sort rich people
const sortByRichest = () => {
  data.sort((a,b) =>  b.money-a.money);
  updateDOM();
}
//Showing millionaires with filter
const showOnlyMillionaires = () => {
  data=data.filter(user => user.money > 1000000);
  updateDOM();
}
//Total Wealth with reduce
const calculateTotalWealth = () => {
  const wealth = data.reduce((acc, user) => (acc + user.money),0);
  console.log(wealth);
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
  main.appendChild(wealthEl);
  
}

//Event Listeners

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showOnlyMillionaires);
calculateWealthBtn.addEventListener('click', calculateTotalWealth);