import { Link } from "react-router-dom";
import { Back } from "./Menu";

function Project () {
    return(
        <div className='resume works resume-experience'>
            <Back />
            <div className="title">Project</div>
            <label className='project'>
                Sumin In Canada<br />
                2023.09 - <br />
                Personal Project
            </label>
            <Link to='/'>Web Project</Link>
        </div>
    );
}

export default Project;