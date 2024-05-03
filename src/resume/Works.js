import { Link } from "react-router-dom";
import { MENU, Menu } from "./Menu";

function Works () {
    return(
        <div className='resume resume-works'>
            <Menu curr={MENU.WORKS}/>
            <div className="title">Work Experience</div>
            <Link to='/resume/works/experience'>
                <label className='work-experience'>
                    Puzzle Data, Seoul, Korea<br />
                    2021.04 - 2023.05<br />
                    Full-Stack Web Developer
                </label>
            </Link>
            <div className="title">Project</div>
            <Link to='/resume/works/project'>
                <label className='project'>
                    Sumin In Canada<br />
                    2023.09 - <br />
                    Personal Project
                </label>
            </Link>
        </div>
    );
}

export default Works;