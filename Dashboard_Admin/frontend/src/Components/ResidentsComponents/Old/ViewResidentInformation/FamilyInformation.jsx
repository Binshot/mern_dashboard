// import { useParams } from "react-router-dom";
// import ProfilePic from "../../ImageFiles/ResidentPic.svg"
// import useFetch from "../../usFetch";

// function FamilyInformation() {
//     const { id } = useParams();
//     const { data: resident } = useFetch("http://localhost:9000/Residents");
//     if (resident) {
//         return (
//             <div>
//                 <h2 className="center-image">
//                     <div className="family-box">
//                         <img src={ProfilePic} alt="" /> <br />
//                         <p>{resident[id].name.firstName} {resident[id].name.lastName} <br /> <span className="relation">Spouse</span></p>
//                     </div>
//                     {resident[id].familyMembers.map((member) => {
//                         if (member.relation == "Spouse") {
//                             return (
//                                 <div className="family-box">
//                                     <div>
//                                         <img src={ProfilePic} alt="" /> <br />
//                                         <p>{member.name} <br /><span className="relation"> {member.relation}</span></p>
//                                     </div>
//                                 </div>
//                             );
//                         }
//                     })
//                     }
//                 </h2>
//                 <h2 className="center-image noBorder">
//                     {resident[id].familyMembers.map((member) => {
//                         if (member.relation != "Spouse") {
//                             return (
//                                 <div className="family-box">
//                                     <div>
//                                         <img src={ProfilePic} alt="" /> <br />
//                                         <p>{member.name} <br /><span className="relation"> {member.relation}</span></p>
//                                     </div>
//                                 </div>
//                             );
//                         }
//                     })}
//                 </h2>

//             </div>
//         )
//     }
// }


// export default FamilyInformation
