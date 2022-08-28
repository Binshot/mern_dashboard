// import { useParams } from "react-router-dom";
// import ProfilePic from "../../ImageFiles/ResidentPic.svg"
// import useFetch from "../../usFetch";

// function BackgroundInformation() {
//     const { id } = useParams();
//     const { data: resident } = useFetch("http://localhost:9000/Residents/" + id);
//     return (
//         <div>
//             {resident && (
//                 <div>
//                     <h1 className="center-image">
//                         <div>
//                             <img src={ProfilePic} alt="" />
//                             <div>
//                                 {resident.name.firstName} {resident.name.lastName}
//                             </div>
//                         </div>
//                     </h1>
//                     <div className="residents-information">
//                         <div>
//                             <h4>Birthdate</h4>
//                             {resident.birthday}
//                             <h4>SSS Member? <span className="govermentMembership">{resident.govermentMemberships.sss}</span></h4>
//                             <h4>GSIS Member? <span className="govermentMembership">{resident.govermentMemberships.gsis}</span></h4>
//                             <h4>PAG-IBIG Member? <span className="govermentMembership">{resident.govermentMemberships.pagibig}</span></h4>
//                         </div>
//                         <div>
//                             <h4>Educanal Attainment</h4>
//                             {resident.educationAttainment}
//                             <h4>Occupation</h4>
//                             {resident.occupation}
//                             <h4>Monthly Income</h4>
//                             Php {resident.monthlyIncome}
//                         </div>

//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default BackgroundInformation
