// Assuming you have the correct path to your CSS module
import styles from "pages/login/LoginSignUp.module.css";
import { auth, firestore } from "backend/server.js";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "@firebase/firestore";


const LoginSignUp = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = async () => {
    const tutorRef = collection(firestore, "UsernameStudent");
    const tutorQuery = query(tutorRef, where("Email", "==", loginEmail));
    const tutorSnapshot = await getDocs(tutorQuery);

    if (tutorSnapshot.size > 0) {
      try {
        const user = await signInWithEmailAndPassword(
          auth,
          loginEmail,
          loginPassword
        );
        localStorage.setItem("userEmail", user.user.email);
        console.log(user);
        window.location.href = "/afterauthpagestudent";
      } catch (error) {
        console.error(error.message);
        alert("Authentication failed. Please check your email and password."); // Show alert for authentication failure
      }
    } else {
      alert("Authentication failed. Please check your email and password."); // Show alert for authentication failure
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}></div>

      <div className={styles.box}>
        <div className={styles.text}>Log In</div>
        <div className={styles.inputPair}>
          <div className={styles.input}>
            <img src="/assets/email.png" alt="Email icon" />
            <input
              type="email"
              className="rounded-lg"
              placeholder=" Email"
              onChange={(event) => {
                setLoginEmail(event.target.value);
              }}
            />
          </div>

          <div className={styles.input}>
            <img src="/assets/password.png" alt="Password icon" />
            <input
              type="password"
              className="rounded-lg"
              placeholder=" Password"
              onChange={(event) => {
                setLoginPassword(event.target.value);
              }}
            />{" "}
            {/* Example with medium roundness */}
          </div>
        </div>

        <div className={styles.buttons}>
          <div className="submit-container">
            <button
              className="bg-cyan-950 text-white py-2 px-6 rounded"
              onClick={login}
            >
              Enter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
