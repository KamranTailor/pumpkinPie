function onStart() {
  console.log(userData)

  if (userData.accessLevel >= 9) {
    console.log("auth")
    document.getElementById("admin").style.display = "flex";
  }
}