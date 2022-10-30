// mode toggle
const modeToggler = document.querySelector('.mode-toggle');
const body = document.body;

modeToggler.onclick = () => {
  body.classList.toggle('light');
  if (body.classList.contains('light')) {
    modeToggler.classList.replace('fa-sun', 'fa-moon');
  } else {
    modeToggler.classList.replace('fa-moon', 'fa-sun');
  }
}

//Battery
const levelText = document.getElementById('level');
const chargingIcon = document.querySelector('.charging');
const chargingText = document.getElementById('charging-text');
const batteryBar = document.querySelector('.battery-bar');

if (!navigator.getBattery) {
  alert('Your device does not support this function');
} else {
  const Battery = navigator.getBattery().then(battery => {
    let level = battery.level * 100;
    levelText.textContent = level;
    
    if (level > 70) {
      body.classList.remove('medium');
      body.classList.remove('red');
    } else if (level > 30 && level < 70) {
      body.classList.remove('red');
      body.classList.add('medium');
    } else if (level < 30) {
      body.classList.remove('medium');
      body.classList.add('red');
    }
    
    if (battery.charging === false) {
      chargingIcon.style.display = "none";
      chargingText.textContent = "Discharging";
      batteryBar.classList.remove('active')
    } else {
      chargingIcon.style.display = "inline-block";
      chargingText.textContent = "Charging";
      batteryBar.classList.add('active')
    }
    
    
    battery.onlevelchange = () => {
      level = battery.level * 100;
      if (level > 70) {
        body.classList.remove('medium');
        body.classList.remove('red');
      } else if (level > 30 && level < 70) {
        body.classList.remove('red');
        body.classList.add('medium');
      } else if (level < 30) {
        body.classList.remove('medium');
        body.classList.add('red');
      } else if (level == 100) {
        chargingText.textContent = "Charged";
        batteryBar.classList.remove('active')
        body.classList.remove('medium');
        body.classList.remove('red');
      }
      levelText.textContent = level;
    }
    
    battery.onchargingchange = () => {
      if (battery.charging === false) {
        chargingIcon.style.display = "none";
        chargingText.textContent = "Discharging";
        batteryBar.classList.remove('active')
      } else {
        chargingIcon.style.display = "inline-block";
        chargingText.textContent = "Charging";
        batteryBar.classList.add('active')
      }
       level = battery.level;
       levelText.textContent = level;
    }
    
    
  })
}
