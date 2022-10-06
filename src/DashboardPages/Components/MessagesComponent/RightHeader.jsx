import Avatar from "../NewImageFiles/Resident/Avatar.svg"
import View from "../NewImageFiles/ActionButton/View.svg"

export default function RightHeader() {
    return (
        <div className="header">
            <img className="msgAvatar" src={Avatar} />
            <div className="center">
                <h3 style={{fontSize: "16px", lineHeight: "150%"}}>Resident</h3>
                <p style={{fontSize: "12px", color: "#9C9C9C"}}>Email</p>
            </div>
            <button className="solidButton squareButton buttonGreen">
                <img src={View} alt="" />
            </button>
        </div>
    )
}