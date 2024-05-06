let images = [];
let numberOfImages = 26;
let imageWidth, imageHeight;
let currentImageIndex = 0; 
let daysPassed = 0;

let monthSelect;
let daySelect;

let month = 1;
let day = 1;

let daysMapping = [
  0, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 16
];

let sumDaysMapping = []

for (let i = 0; i < daysMapping.length; i++) {
  sumDaysMapping[i] = daysMapping[i] + (sumDaysMapping[i - 1] || 0);
}

let days = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let sumDays = [0];

for (let i = 1; i < days.length; i++) {
  sumDays[i] = days[i] + sumDays[i - 1];
}

function preload() {
  for (let i = 1; i <= numberOfImages; i++) {
    images.push(loadImage('images/h' + i + '.jpg'));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageWidth = images[0].width;
  imageHeight = images[0].height;

  monthSelect = createSelect();
  for (let i = 1; i <= 12; i++) {
    monthSelect.option(i);
  }
  monthSelect.changed(monthSelected);
  
  daySelect = createSelect();
  for (let i = 1; i <= days[1]; i++) {
    daySelect.option(i);
  }
  daySelect.changed(daySelected);

  changeDays();
}

function monthSelected() {
  month = int(this.value());
  for (let i = 1; i <= days[month]; i++) {
    daySelect.option(i);
  }
  daySelect.value(1);
  day = 1;
  changeDays();
}

function daySelected() {
  day = int(this.value());
  changeDays();
}

function changeDays() {
  daysPassed = sumDays[month - 1] + day;
  daysPassed = (daysPassed + 153) % 366;
  currentImageIndex = 0;
  while (daysPassed > sumDaysMapping[currentImageIndex]) currentImageIndex++;
  currentImageIndex = currentImageIndex % numberOfImages;
}

function draw() {
  background(0);

  let x = width / 2 - imageWidth / 2;
  let y = height / 2 - imageHeight / 2;
  image(images[currentImageIndex], x, y);

  textSize(20);
  fill(255);
  textAlign(CENTER, TOP);
  textSize (35)
  text("2024/", width / 2, 20);
  monthSelect.position(width / 2 + 50, 25);
  text("/", width / 2 + 100, 20);
  daySelect.position(width / 2 + 110, 25);
  
}

