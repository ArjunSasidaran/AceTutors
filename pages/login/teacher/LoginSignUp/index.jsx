// Assuming you have the correct path to your CSS module
import styles from 'pages/login/LoginSignUp.module.css';

const LoginSignUp = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        
      </div>


      <div className={styles.box}>
      <div className={styles.text}>Sign Up</div>
        <div className={styles.inputPair}>
          <div className = {styles.input}>
            <img src="/assets/person.png" alt="User icon" />
            <input type="text" className="rounded-lg" placeholder=" Username" />
          </div>
          <div className = {styles.input}>
            <img src="/assets/email.png" alt="Email icon" />
            <input type="email" className="rounded-lg" placeholder=" Email" />
          </div>
          
          <div className = {styles.input}>
            <img src="/assets/password.png" alt="Password icon" />
            <input type="password" className="rounded-lg" placeholder=" Password"/> {/* Example with medium roundness */}
          </div>
        </div>

        <div className = {styles.buttons}>
            <div className="submit-container">
              <button className="bg-cyan-950 text-white py-2 px-6 rounded">Create Account</button>
            </div>
        </div>
    </div>
    </div>
  );
}

export default LoginSignUp;
