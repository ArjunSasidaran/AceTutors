// Assuming you have the correct path to your CSS module
import styles from "pages/login/LoginSignUp.module.css";
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { firestore } from "backend/server.js";

const auth = getAuth(); // Initialize the auth object

const LoginSignUp = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [userType, setUserType] = useState("");

  const register = async () => {
    if (!userType) {
      alert('Please select whether you are a Student or Tutor.');
      return;
    }
    
    // Password validation
    if (registerPassword.length < 6) {
      alert('Password must be 6 characters or more.');
      return;
    }

    // Email validation using a stricter regex pattern
    const strictEmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!strictEmailRegex.test(registerEmail)) {
      alert('Invalid email format.');
      return;
    }

    try {
      // Check if the email already exists
      const signInMethods = await fetchSignInMethodsForEmail(auth, registerEmail);
      if (signInMethods.length > 0) {
        alert('Email already exists. Please use a different email.');
        return;
      }

      // Check if the domain exists
      const domainExists = await checkDomainExists(registerEmail.split('@')[1]);
      if (!domainExists) {
        alert('Invalid email domain. Please use a valid email.');
        return;
      }

      // Create a new user
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );

      const userDocStudent = doc(firestore, "UsernameStudent", user.user.uid);
      const userDocTutor = doc(firestore, "UsernameTutor", user.user.uid);
      var userDoc;
      if (userType === "Student") {
        userDoc = userDocStudent
      }
      else {
        userDoc = userDocTutor
      }
      await setDoc(userDoc, {
        Email: registerEmail,
        Username: registerUsername,
        Type: userType,
      });

      alert('Form submitted successfully!');
      console.log(user);

      setRegisterEmail("");
      setRegisterPassword("");
      setRegisterUsername("");

      if (userType === "Student") {
        window.location.href = '/afterauthpagestudent';
      } else if (userType === "Tutor") {
        window.location.href = '/afterauthpagetutor';
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  const checkDomainExists = async (domain) => {
    try {
      const response = await fetch(`https://dns.google/resolve?name=${domain}`, {
        method: 'GET',
      });

      const data = await response.json();
      return data.Status === 0;
    } catch (error) {
      console.error('Error checking domain:', error);
      return false;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}></div>

      <div className={styles.box}>
        <div className={styles.text}>Sign Up</div>
        <div className={styles.inputPair}>
          <div className={styles.input}>
            <img src="/assets/person.png" alt="User icon" />
            <input type="text" className="rounded-lg" placeholder=" Username" onChange={(event) => {setRegisterUsername(event.target.value)}} />
          </div>

          <div className={styles.input}>
            <img src="/assets/email.png" alt="Email icon" />
            <input type="email" className="rounded-lg" placeholder=" Email" onChange={(event) => {setRegisterEmail(event.target.value);}} />
          </div>

          <div className={styles.input}>
            <img src="/assets/password.png" alt="Password icon" />
            <input
              type="password"
              className="rounded-lg"
              placeholder=" Password"
              onChange={(event) => {setRegisterPassword(event.target.value);}}
            />
          </div>

          <div className={styles.input}>
            <input type="radio" id="student" name="type" value="Student" onChange={(event) => setUserType(event.target.value)} />
            <label htmlFor="student" style={{ color: "white" }}>
              Student
            </label>
            <br />
            <input type="radio" id="tutor" name="type" value="Tutor" onChange={(event) => setUserType(event.target.value)} />
            <label htmlFor="tutor" style={{ color: "white" }}>
              Tutor
            </label>
            <br />
          </div>
        </div>

        <div className={styles.buttons}>
          <div className="submit-container">
            <button className="bg-cyan-950 text-white py-2 px-6 rounded" onClick={register} >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
