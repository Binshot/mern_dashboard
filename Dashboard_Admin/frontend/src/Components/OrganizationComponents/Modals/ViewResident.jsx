import React from 'react'

function ViewResident() {
    return (
        <Modal
            shown={modalShown}
            close={() => {
                toggleModal(false);
            }}>
            <div>
                <div className="modalheader">
                    <label className='label'>Detailed Information</label><br />
                </div>
                <div>
                    <img src={Avatar} alt="" className="modalAvatar" />
                    <h3>{nameOfMember}</h3>
                    <div className="marginTop8">
                        <h6 >{position}</h6>
                    </div>
                </div>
                <div className="details topAlign">
                    <div className="flex-row marginBottom marginTop">
                        <h4>Details</h4>
                    </div>
                    <div className="flex-row borderBottom1 paddingBottom">
                        <h4 style={{ width: "45%", textAlign: "left" }}>Age:</h4>
                        <p style={{ textAlign: "left" }}>{age} Years Old</p>
                    </div>
                    <div className="flex-row borderBottom1 marginTop paddingBottom">
                        <h4 style={{ width: "45%", textAlign: "left" }}>Address:</h4>
                        <p style={{ width: "55%", textAlign: "left" }}>{address}</p>
                    </div>
                    <div className="flex-row borderBottom1 marginTop paddingBottom">
                        <h4 style={{ width: "45%", textAlign: "left" }}>Email:</h4>
                        <p style={{ textAlign: "left" }}>{email}</p>
                    </div>
                    <div className="flex-row marginTop paddingBottom">
                        <h4 style={{ width: "45%", textAlign: "left" }}>Phone No.:</h4>
                        <p style={{ textAlign: "left" }}>{phone}</p>
                    </div>
                </div>
                <button type="submit" onClick={() => toggleModal(false)} className='exit marginTop'>EXIT</button>
            </div>
        </Modal>
    )
}

export default ViewResident
