import Header from "../ProjectComponents/Header"
import Table from "../ProjectComponents/Table"
import ProjectList from "../dummyDB/Projects"
import React from "react";
function Projects() {
    return (
        <div id="mainContentBlur" className="content">
            <Table list={ProjectList} />
        </div>
    );
}

export default Projects;