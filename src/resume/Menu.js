import { Link } from "react-router-dom";
import Pdf from "./file/SuminHeo.pdf";
const MENU = {
    ABOUT : 'ABOUT',
    WORKS : 'WORKS',
    RESUME : 'RESUME'
};

function Menu(props){

    const className = {
        about: 'about ',
        works: 'works ',
        resume: 'resume '
    };
    const curr = 'curr ';
    switch(props.curr) {
        case MENU.ABOUT: className.about += curr; break;
        case MENU.WORKS: className.works += curr; break;
        case MENU.RESUME: className.resume += curr; break;
    }

    return(
        <div className='resume resume-menu'>
            <Link to='/resume'>
                <label className={className.about}>ABOUT</label>
            </Link>
            <Link to='/resume/works'>
                <label className={className.works}>WORKS</label>
            </Link>
            <a href={Pdf} target = "_blank">
                <label className={className.resume}>RESUME</label>
            </a>
        </div>
    );
}

function Back() {
    return (
        <Link to='/resume/works' className="back-link">
            <label className="back-label">BACK</label>
        </Link>
    )
}

export {Back, Menu, MENU};