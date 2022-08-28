import React from 'react';
import { NavLink } from "react-router-dom";

const Residents = ({ residents }) => {
    return (
        residents.map(residents => {
            return (
                <tr>
                    <td>{residents.name.lastName}</td>
                    <td>{residents.name.firstName}</td>
                    <td>{residents.email}</td>
                    <td>{residents.phone}</td>
                    <td className='buttons'>
                        <div>
                            <NavLink to={`resident_information/personal_information/${residents.id}`}>
                                <button>VIEW</button>
                            </NavLink>
                            <button>UPDATE</button>
                            <button>DELETE</button>
                        </div>
                    </td>
                </tr>
            );
        }
        )
    );
};

export default Residents;