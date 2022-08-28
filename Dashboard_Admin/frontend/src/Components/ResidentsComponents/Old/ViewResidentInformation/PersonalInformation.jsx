// import { useParams } from "react-router-dom";
// import ProfilePic from "../../ImageFiles/ResidentPic.svg"
// import useFetch from "../../usFetch";

// function PersonalInformation() {
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
//                             <h4>Birthplace</h4>
//                             {resident.birthPlace}
//                             <h4>Address</h4>
//                             {resident.address}
//                         </div>
//                         <div>
//                             <h4>Gender</h4>
//                             {resident.gender}
//                             <h4>Religion</h4>
//                             {resident.religion}
//                             <h4>Email Address</h4>
//                             {resident.email}
//                             <h4>Contact No.</h4>
//                             {resident.phone}
//                         </div>

//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default PersonalInformation;
