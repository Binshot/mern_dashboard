import React, { useState } from 'react';
import NextPage from '@mui/icons-material/ArrowForwardIos';
import PrevPage from '@mui/icons-material/ArrowBackIos';

function ProjectsPageNumber({ projectsPerPage, totalProjects, paginate }) {
    const [currentPage, setCurrentPage] = useState(1);
    
    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / 3) * 3;
        return new Array(3).fill().map((_, idx) => start + idx + 1);
    };
    if (projectsPerPage < totalProjects) {
        const nextPage = () => {
            let num = currentPage;
            num++;
            setCurrentPage(num)
            paginate(num);
        }
        const prevPage = () => {
            let num = currentPage;
            num--;
            setCurrentPage(num)
            paginate(num);
        }
        if (Math.ceil(totalProjects / projectsPerPage) === 1) {
            return "";
        } else {
            return (
                <nav className='paginationButtons flex-row'>
                    <PrevPage
                        style={1 === currentPage ? { fill: "#D0D1FB" } : { fill: "#0C1096", cursor: "pointer" }}
                        onClick={1 === currentPage ? null : prevPage}
                        className="prevButton"
                    />
                    {getPaginationGroup().map((item, index) => (
                        (item <= Math.ceil(totalProjects / projectsPerPage)) && (
                            <button
                                key={index}
                                className={currentPage === item ? 'pageNumber activeNumber' : 'pageNumber'}
                            >
                                <span>{item}</span>
                            </button>
                        )
                    ))}
                    <NextPage
                        style={currentPage === Math.ceil(totalProjects / projectsPerPage) ? { fill: "#D0D1FB" } : { fill: "#0C1096", cursor: "pointer" }}
                        onClick={currentPage === Math.ceil(totalProjects / projectsPerPage) ? null : nextPage}
                        className="nextButton"
                    />
                </nav>
            );
        }
    } else {
        paginate(1);
    }
};

export default ProjectsPageNumber;
