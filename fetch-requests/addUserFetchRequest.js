async function addUser() {
  try {
    const response = await fetch('http://localhost:3000/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName: 'jnayoub',
        userEmail: 'jnayoub@gmail.com',
        userPassword: 'Sprinthome1',
        userInfo: {
          age: 30,
          city: 'San Francisco',
          country: 'USA'
        },
        permissions: [0,2] // Generate array of 5 random numbers between 0-9
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const user = await response.json();

    console.log(user);
  } catch (error) {
    console.error('There was a problem with the fetch operation: ' + error.message);
  }
}

addUser();
