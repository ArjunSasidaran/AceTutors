// Assuming you have the correct path to your CSS module
import styles from './LoginSignUp.module.css';

const LoginSignUp = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.text}>Sign Up</div>
        <div className={styles.underline}></div>
      </div>

      <div className={styles.inputPair}>
        <div className = {styles.input}>
          <img src="/assets/person.png" alt="User icon" />
          <input type="text" placeholder="Username" />
        </div>
        <div className = {styles.input}>
          <img src="/assets/email.png" alt="Email icon" />
          <input type="email" placeholder="Email" />
        </div>
         
        <div className = {styles.input}>
          <img src="/assets/password.png" alt="Password icon" />
          <input type="password" placeholder="Password" />
        </div>
      </div>

      <div className = {styles.buttons}>
          <div className="submit-container">
            <button className="bg-cyan-950 text-white py-2 px-6 rounded">Sign Up</button>
          </div>
      </div>

    </div>
  );
}

export default LoginSignUp;
