import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Messenger.scss";
import {
  faCommentAlt,
  faPaperPlane,
  faTimes,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";

const Messenger = () => {
  return (
    <div className="messenger-container">
      <div className="messenger-header">
        <h3>Meeting Details</h3>
        <FontAwesomeIcon className="icon" icon={faTimes} />
      </div>

      <div className="messenger-header-tabs">
        <div className="tab">
          <FontAwesomeIcon className="icon" icon={faUserFriends} />
          <p>People (1)</p>
        </div>
        <div className="tab active">
          <FontAwesomeIcon className="icon" icon={faCommentAlt} />
          <p>Chat</p>
        </div>
      </div>

      <div className="chat-section">
        <div className="chat-block">
          <div className="sender">
            you<small>10 PM</small>
          </div>
          <p className="msg">Here comes a actual msg</p>
        </div>
      </div>

      <div className="send-msg-section">
        <input placeholder="Send a message to everyone" />
        <FontAwesomeIcon className="icon" icon={faPaperPlane} />
      </div>
    </div>
  );
};

export default Messenger;
