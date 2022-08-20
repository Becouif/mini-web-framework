// using axios to send post request

import axios from 'axios';

// get request
axios.get('http://localhost:3000/users/1').then(function (response) {
  console.log(response.request);
});

// post request to the server
// axios.post('http://localhost:3000/users', {
//   name: 'Enoch',
//   age: 1188,
// });
