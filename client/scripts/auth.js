async function checkAuthentication() {
  try {
      const response = await fetch("/api/checkAuth", {
          method: "GET",
          credentials: "include",
          headers: {
              "Content-Type": "application/json"
          }
      });
      const data = await response.json();

      if (response.status === 200) {
          document.getElementById("auth-status").textContent = "User is authenticated!";
          document.getElementById("auth-status").classList.add("authenticated");
          document.getElementById("auth-status").classList.remove("unauthenticated");
      } else {
          document.getElementById("auth-status").textContent = "User is not authenticated.";
          document.getElementById("auth-status").classList.add("unauthenticated");
          document.getElementById("auth-status").classList.remove("authenticated");
      }
  } catch (error) {
      console.error("There was an error checking authentication:", error);
  }
}

// Initial check on page load
checkAuthentication();
