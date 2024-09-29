function onStart() {
  console.log(userData)

  if (userData.accessLevel <= 9) {
    goTo("/")
  }
}