import React, { useState, useEffect } from 'react';
import Posts from './Officials';
import PageNumber from './PageNumber';
import Filter from '../../ImageFiles/Filter.svg';
import useFetch from "../../../usFetch";
import Modal from "../Modals/AddOfficials"


const Table = () => {
    const { data: officialList } = useFetch("http://localhost:8000/MembersData");
    const [currentPage, setCurrentPage] = useState(1);
    const [MembersDataPerPage, setPostPerPage] = useState(10);

    //for modals
    const [position, setPosition] = useState("");
    const [name, SetName] = useState("");
    const [id, setId] = useState("");
    const [modalShown, toggleModal] = useState(false);

    if (officialList) {
        const MembersData = officialList

        const pagea = (num) => {
            setPostPerPage(num.target.value);
        }
        // Get current posts
        let indexOfLastPost = currentPage * MembersDataPerPage;
        let indexOfFirstPost = indexOfLastPost - MembersDataPerPage;
        let currentPosts = MembersData.slice(indexOfFirstPost, indexOfLastPost);

        // Change page
        const paginate = pageNumber => setCurrentPage(pageNumber);
        //modals
        const memberId = setMemberId => setId(setMemberId);
        const memberName = setMemberName => SetName(setMemberName);
        const memberPosition = setMemberPosition => setPosition(setMemberPosition);
        const modalFlag = modal => toggleModal(modal);

        let lastIndex;
        if (indexOfLastPost > MembersData.length) {
            lastIndex = MembersData.length;
        } else {
            lastIndex = indexOfLastPost;
        }
        return (
            <div>
                <Modal
                    shown={modalShown}
                    close={() => {
                        toggleModal(false);
                    }}>
                    <div className="officials">
                        <h4>UPDATE OFFICIAL</h4>
                        <div>
                            <label className='label'>MEMBER'S NAME</label><br />
                            <input type="text" value={name} disabled={true} />
                        </div>
                        <div>
                            <label>POSITION</label><br />
                            <select name="position" defaultValue={position}>
                                <option value="Chairman">Chairman</option>
                                <option value="Chairperson">Chairperson</option>
                                <option value="Kagawad">Kagawad</option>
                                <option value="SB Member">SB Member</option>
                                <option value="Member">Member</option>
                            </select>
                        </div>
                        <div className='buttons'>
                            <button type="submit" onClick={()=>toggleModal(false)}>UPDATE</button>
                            <button type="submit" onClick={()=>toggleModal(false)}>CANCEL</button>
                        </div>
                    </div>
                </Modal>
                <table>
                    <thead>
                        <tr>
                            <td colSpan={3}>
                                <div>
                                    <div className="filter">
                                        <img src={Filter} alt="" className="center" />
                                        <p>Filter</p>
                                    </div>
                                    <input type="text" placeholder="&#61442; Residents, Official, Accounts, Events..." />

                                </div>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>RESIDENT'S NAME</th>
                            <th>POSITION</th>
                            <th>ACTION</th>
                        </tr>
                        <Posts
                            posts={currentPosts}
                            id={memberId}
                            name={memberName}
                            position={memberPosition}
                            flag={modalFlag}
                        />
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={5}>
                                <div>
                                    <PageNumber
                                        MembersDataPerPage={MembersDataPerPage}//postPerPage
                                        totalMembers={MembersData.length}
                                        paginate={paginate}
                                    />
                                </div>
                                <div>
                                    {indexOfFirstPost + 1} - {lastIndex} of {MembersData.length}
                                </div>
                                <div>
                                    <label htmlFor="cars">Rows per page:</label>
                                    <select name="cars" onChange={pagea}>
                                        <option>5</option>
                                        <option selected>10</option>
                                        <option>15</option>
                                        <option>20</option>
                                    </select>
                                </div>


                            </td>
                        </tr>
                    </tfoot>

                </table>
            </div>
        );
    }
};

export default Table;