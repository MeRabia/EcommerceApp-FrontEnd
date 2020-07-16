import { API } from "../config";

export const signup = (user) => {
  //console.log(name, email, password);
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signin = (user) => {
  //console.log(name, email, password);
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// local Storage
export const authenticate = (data, next) => {
  if (typeof window !== "undifined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== "undifined") {
    localStorage.removeItem("jwt"); // clear the localStorage
    next(); // exec this callback // redirect the user to a home page
    return fetch(`${API}/signout`, {
      // make the request to an API backend
      method: "GET",
    })
      .then((response) => {
        console.log("signout", response);
      })
      .catch((err) => console.log(err));
  }
};

// in this method we hide the sigin and sigup if the user was authenticated
//and we can hide signout if the user is not authenticated

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    // To check if a script is running in a web browser or not.

    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
