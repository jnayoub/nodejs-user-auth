async function login() {

    const userName = prompt('Enter your username:');
    const userPassword = prompt('Enter your password:');
  
    try {
  
      const response = await fetch('http://localhost:3000/getUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userName,
          userPassword  
        })
      });
  
      if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if(data.token) {
        document.cookie = `jwt=${data.token}; path=/; max-age=3600`; 
      }
  
      alert(JSON.stringify(data));
  
    } catch(error) {
      alert('There was a problem logging in: ' + error.message);
    }
  }
  
  async function addUser() {
    const permissionsList = {
        1: 'Read',
        2: 'Write',
        3: 'Delete',
        4: 'Share',
        5: 'Upload',
        6: 'Download',
        7: 'Create'
      };
      
    const userName = prompt('Enter username:');
    const userEmail = prompt('Enter email:');
    const userPassword = prompt('Enter password:');
  
    const age = prompt('Enter age:');
    const city = prompt('Enter city:');
    const country = prompt('Enter country:');
    
    const userInfo = {
      age,
      city, 
      country
    };
  
    let permissionsInput = prompt(`Enter permissions (options: ${Object.keys(permissionsList).join(', ')}):`);
  
    if(permissionsInput) {
      permissions = permissionsInput.replaceAll(' ', '').split(','); 
    } else {
      permissions = [0];
    }
  
    try {
        const response = await fetch('http://localhost:3000/addUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userName,
            userEmail,
            userPassword,
            userInfo,
            permissions  
          })
        });
        
      } catch (error) {
        alert('There was a problem adding the user: ' + error.message)
      }
    
  
  }
  


  // HTML element to trigger login 
  const loginButton = document.getElementById('login');
  loginButton.addEventListener('click', login);

    // HTML element to trigger addUser
    const addUserButton = document.getElementById('addUser');
    addUserButton.addEventListener('click', addUser);
