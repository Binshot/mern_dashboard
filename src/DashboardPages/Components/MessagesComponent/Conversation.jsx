import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function Conversation() {
    return (
        <div className="conversation">
            <div className='concernSnackBar'>
                <ErrorOutlineIcon
                    sx={{ color: "#0C1096" }}
                />
                <p style={{ marginLeft: "10px" }}>
                    The concern is
                    <span> [Concern].</span>
                </p>
            </div>
            {/* <div className='dateSnackBar'>

            </div> */}
            <div className='user'>
                <div className='message'>
                    Message
                </div>
                <div className='time'>
                    12:00 PM
                </div>
            </div>

            <div style={{alignSelf: "flex-end"}} className='admin'>
                <div className='message'>
                    Message
                </div>
                <div className='time' style={{textAlign: "right"}}>
                    12:02 PM
                </div>
            </div>
        </div>
    )
}