function setUser(useObject) {
  localStorage.setItem("user", JSON.stringify(useObject));
  // window.location.href = "/";
}

function getUser() {
  const userObject = JSON.parse(localStorage.getItem("user"));
  return userObject;
}

function getUserId() {
  const userObj = JSON.parse(localStorage.getItem("user"));
  return userObj.user_id;
}

function getUserRole() {
  const userObject = JSON.parse(localStorage.getItem("user"));

  // Check if userObject and user_details exist and are not null
  if (userObject && userObject["user_details"]) {
    // Check if role_name exists, is a string, and is not just whitespace
    const roleName = userObject["user_details"]["role_name"];
    if (typeof roleName === "string" && roleName.trim() !== "") {
      return roleName; // roleName has a value and is not blank
    } else {
      return "Blank or invalid role_name"; // roleName is blank or not a string
    }
  } else {
    return "userObject or user_details is null"; // userObject or user_details doesn't exist
  }
}

export { setUser, getUser, getUserId, getUserRole };
