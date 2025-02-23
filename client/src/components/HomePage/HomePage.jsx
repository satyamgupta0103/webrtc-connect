import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../UI/Header/Header";
import "./HomePage.scss";
import { faKeyboard, faVideo } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <div className="body">
        <div className="left-side">
          <div className="content">
            <h2>Video calls and meeting for everyone</h2>
            <p>
              Connect, collaborate, and celebrate from anywhere with Google Meet
            </p>
            <div className="action-btn">
              <button className="btn green">
                <FontAwesomeIcon className="icon-block" icon={faVideo} />
                New Meeting
              </button>
              <div className="input-block">
                <div className="input-section">
                  <FontAwesomeIcon className="icon-block" icon={faKeyboard} />
                  <input placeholder="Enter a code or link" />
                </div>
                <button className="btn no-bg">Join</button>
              </div>
            </div>
          </div>
          <div className="help-text">
            <a href="">Learn more</a> about Google Meet
          </div>
        </div>
        <div className="right-side">
          <div className="content">
            <img src="https://lh3.googleusercontent.com/37quIKq6jnL-6eXLEuCWygEWF2kZT5AufL6YLneambiiJUO1bRtdXtBzFX6dlysWVWAjQ4-NCDqEgyz-PeeADUahiFpdW8HoXbAW=e365-pa-nu-rw-w1416" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
