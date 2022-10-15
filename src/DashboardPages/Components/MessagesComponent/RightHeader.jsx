import Avatar from "../NewImageFiles/Resident/Avatar.svg"
import View from "../NewImageFiles/ActionButton/View.svg"

export default function RightHeader(props) {
    const { conversation } = props;
    return (
        <div className="header">
            <img className="msgAvatar"
                src={conversation.accountImage ?  `https://drims-demo.herokuapp.com/api/uploads/${conversation.accountImage}` : Avatar} />
            <div className="center">
                <h3 style={{ fontSize: "16px", lineHeight: "150%" }}>{conversation.resident_name}</h3>
                <p style={{ fontSize: "12px", color: "#9C9C9C" }}>{conversation.email}</p>
            </div>
            <button className="solidButton squareButton buttonGreen">
                <img src={View} alt="" />
                {/* conversation.resident_id */}
            </button>
        </div>
    )
}