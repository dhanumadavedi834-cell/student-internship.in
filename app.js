import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";


const firebaseConfig = {

  apiKey: "AIzaSyAIDGW_1Im5wVDQMoxcvBpGGWtCWzPi_NU",

  authDomain: "internship-90876.firebaseapp.com",

  projectId: "internship-90876",

  storageBucket: "internship-90876.firebasestorage.app",

  messagingSenderId: "636162155777",

  appId: "1:636162155777:web:ab092000d6841fcc0ee700",

  measurementId: "G-WCT67X3S9C"

};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


const authModal =
  document.getElementById("authModal");

const opportunityModal =
  document.getElementById("opportunityModal");


const authTitle =
  document.getElementById("authTitle");

const authEyebrow =
  document.getElementById("authEyebrow");

const authDescription =
  document.getElementById("authDescription");

const authSubmit =
  document.getElementById("authSubmit");

const switchAuth =
  document.getElementById("switchAuth");

const authStatus =
  document.getElementById("authStatus");

const email =
  document.getElementById("email");

const password =
  document.getElementById("password");


let isSignup = false;


function openAuth(signup = false) {

  isSignup = signup;

  authEyebrow.textContent =
    signup
      ? "JOIN STUDENTHUB"
      : "WELCOME BACK";

  authTitle.textContent =
    signup
      ? "Create Account"
      : "Login";

  authDescription.textContent =
    signup
      ? "Create your student account with your email and password."
      : "Login to your StudentHub account.";

  authSubmit.textContent =
    signup
      ? "Sign Up"
      : "Login";

  switchAuth.textContent =
    signup
      ? "Login"
      : "Sign Up";

  authStatus.textContent = "";

  authModal.classList.remove("hidden");
}


function closeAuth() {

  authModal.classList.add("hidden");

  authStatus.textContent = "";

}


document.getElementById("loginBtn").onclick =
  () => openAuth(false);


document.getElementById("signupBtn").onclick =
  () => openAuth(true);


document.getElementById("heroSignup").onclick =
  () => openAuth(true);


document.getElementById("closeModal").onclick =
  closeAuth;


switchAuth.onclick =
  () => openAuth(!isSignup);


authSubmit.onclick = async () => {

  const e = email.value.trim();

  const p = password.value;


  if (!e || !p) {

    authStatus.textContent =
      "Please enter your email and password.";

    return;
  }


  if (p.length < 6) {

    authStatus.textContent =
      "Password must be at least 6 characters.";

    return;
  }


  authSubmit.disabled = true;

  authStatus.textContent =
    "Please wait...";


  try {

    if (isSignup) {

      await createUserWithEmailAndPassword(
        auth,
        e,
        p
      );

      authStatus.textContent =
        "Account created successfully!";

    } else {

      await signInWithEmailAndPassword(
        auth,
        e,
        p
      );

      authStatus.textContent =
        "Login successful!";

    }


    setTimeout(closeAuth, 800);


  } catch (error) {

    const messages = {

      "auth/email-already-in-use":
        "This email already has an account.",

      "auth/invalid-email":
        "Please enter a valid email address.",

      "auth/invalid-credential":
        "Email or password is incorrect.",

      "auth/weak-password":
        "Password must be at least 6 characters."

    };


    authStatus.textContent =
      messages[error.code] ||
      error.message;

  } finally {

    authSubmit.disabled = false;

  }

};


document
  .querySelectorAll(".card-btn")
  .forEach(button => {

    button.onclick = () => {

      document.getElementById(
        "opportunityTitle"
      ).textContent =
        button.dataset.title;


      document.getElementById(
        "opportunityText"
      ).textContent =
        "Sign up or log in to your StudentHub account to continue with this opportunity.";


      opportunityModal.classList.remove(
        "hidden"
      );

    };

  });


document.getElementById(
  "closeOpportunity"
).onclick = () =>
  opportunityModal.classList.add("hidden");


document.getElementById(
  "opportunitySignup"
).onclick = () => {

  opportunityModal.classList.add("hidden");

  openAuth(true);

};


onAuthStateChanged(auth, user => {

  const loginBtn =
    document.getElementById("loginBtn");


  if (user) {

    loginBtn.textContent =
      "Logout";


    loginBtn.onclick = async () => {

      await signOut(auth);

      loginBtn.textContent =
        "Login";

      loginBtn.onclick =
        () => openAuth(false);

      alert(
        "You have been logged out."
      );

    };


  } else {

    loginBtn.textContent =
      "Login";

    loginBtn.onclick =
      () => openAuth(false);

  }

});
