// import React, { useState, useEffect } from 'react';
// import Residents from './ManageResidents';
// import PageNumber from './ResidentsPageNumber';
// import Filter from '../ImageFiles/Filter.svg';
// import useFetch from "../usFetch";

// const Table = () => {
//     const { data: residentsList, error, isPending } = useFetch("http://localhost:9000/Residents");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [residentsPerPage, setResidentsPerPage] = useState(10);
//     if (residentsList) {

//         const residents = residentsList
        
//         const pagea = (num) => {
//             setResidentsPerPage(num.target.value);
//         }
//         // Get current residents
//         let indexOfLastResident = currentPage * residentsPerPage;
//         let indexOfFirstResident = indexOfLastResident - residentsPerPage;
//         let currentResidents;
//         currentResidents = residents.slice(indexOfFirstResident, indexOfLastResident);

//         // Change page
//         const paginate = pageNumber => setCurrentPage(pageNumber);

//         let lastIndex;
//         if (indexOfLastResident > residents.length) {
//             lastIndex = residents.length;
//         } else {
//             lastIndex = indexOfLastResident;
//         }
//         return (
//             <div>
//                 {isPending && <div>Loading...</div>}
//                 {error && <div>{error}</div>}
//                 <table className='Residents_table'>
//                     <thead>
//                         <tr>
//                             <td colSpan={5}>
//                                 <div>
//                                     <div className="filter">
//                                         <img src={Filter} alt="" className="center" />
//                                         <p>Filter</p>
//                                     </div>
//                                     <input type="text" placeholder="&#61442; Residents, Official, Accounts, Events..." />

//                                 </div>
//                             </td>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <th>LAST NAME</th>
//                             <th>FIRST NAME</th>
//                             <th>EMAIL</th>
//                             <th>CONTACT NO.</th>
//                             <th>ACTION</th>
//                         </tr>
//                         <Residents residents={currentResidents} />
//                     </tbody>
//                     <tfoot>
//                         <tr>
//                             <td colSpan={5}>
//                                 <div>
//                                     <PageNumber
//                                         residentsPerPage={residentsPerPage}//ResidentPerPage
//                                         totalResidents={residents.length}
//                                         paginate={paginate}
//                                     />
//                                 </div>
//                                 <div>
//                                     {indexOfFirstResident + 1} - {lastIndex} of {residents.length}
//                                 </div>
//                                 <div>
//                                     <label for="cars">Rows per page:</label>
//                                     <select name="cars" onChange={pagea}>
//                                         <option>5</option>
//                                         <option selected>10</option>
//                                         <option>15</option>
//                                         <option>20</option>
//                                     </select>
//                                 </div>
//                             </td>
//                         </tr>
//                     </tfoot>

//                 </table>
//             </div>
//         );
//     }
// };

// export default Table;