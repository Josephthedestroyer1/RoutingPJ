const express = require('express');
const app = express();

// Middleware to check working hours
const checkWorkingHours = (req, res, next) => {
     const currentDate = new Date();
     const currentDay = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
     const currentHour = currentDate.getHours(); // 0 to 23
   
     if (currentDay >= 1 && currentDay <= 5 && currentHour >= 9 && currentHour < 17) {
       // Request falls within working hours, allow it to proceed
       next();
     } else {
       // Request falls outside working hours, respond with an error or custom message
       res.status(403).send('This web application is only available during working hours (Monday to Friday, 9 AM to 5 PM).');
     }
   };
   
   // Apply the middleware to all routes
//    app.use(checkWorkingHours);

app.use(express.static('view'));

app.get('/',checkWorkingHours, (req, res) => {
  res.sendFile(__dirname + '/view/home-page.html');
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/view/contact-us.html');
});
app.get('/services', (req, res) => {
  res.sendFile(__dirname + '/view/our-services.html');
});

// Adding routes


app.listen(3000, () => {
  console.log('Server is running http://localhost:3000/');
});

