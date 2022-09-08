import Header from "../ProjectComponents/Header"
import Table from "../ProjectComponents/Table"
import ProjectList from "../dummyDB/Projects"
function Projects() {
    return (
        <div className="content">
            <Header />
            <Table list={ProjectList} />
        </div>
    );
}

export default Projects;