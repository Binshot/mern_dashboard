import React, { useState } from 'react';

function ResidentsPageNumber({ residentsPerPage, totalResidents, paginate }) {
    const [currentPage, setCurrentPage] = useState(1);

    if (residentsPerPage < totalResidents) {
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
        if (Math.ceil(totalResidents / residentsPerPage) == 1) {
            return "";
        } else if (1 == currentPage) {
            return (
                <nav>
                    <button onClick={nextPage}>
                        {">"}
                    </button>
                    <button onClick={prevPage} disabled>
                        {"<"}
                    </button>
                </nav>
            );
        } else if (currentPage == Math.ceil(totalResidents / residentsPerPage)) {
            return (
                <nav>
                    <button onClick={nextPage} disabled>
                        {">"}
                    </button>
                    <button onClick={prevPage}>
                        {"<"}
                    </button>
                </nav>
            );
        } else {
            return (
                <nav>
                    <button onClick={nextPage}>
                        {">"}
                    </button>
                    <button onClick={prevPage}>
                        {"<"}
                    </button>
                </nav>
            );
        }
    }else{
        paginate(1);
    }
};

export default ResidentsPageNumber;
