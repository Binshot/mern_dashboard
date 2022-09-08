import React, { useState } from 'react';

function PageNumber({ MembersDataPerPage, totalMembers, paginate }) {
    const [currentPage, setCurrentPage] = useState(1);

    if (MembersDataPerPage < totalMembers) {
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
        if (Math.ceil(totalMembers / MembersDataPerPage) == 1) {
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
        } else if (currentPage == Math.ceil(totalMembers / MembersDataPerPage)) {
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

export default PageNumber;
