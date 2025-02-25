import CallPageFooter from "../UI/CallPageFooter/CallPageFooter";
import CallPageHeader from "../UI/CallPageHeader/CallPageHeader";
import MeetingInfo from "../UI/MeetingInfo/MeetingInfo";
import Messenger from "../UI/Messenger/Messenger";

import "./CallPage.scss";

const CallPage = () => {
  return (
    <div className="callpage-container">
      <video className="video-container" src="" controls></video>
      <CallPageHeader />
      <CallPageFooter />
      <MeetingInfo />
    </div>
  );
};

export default CallPage;
