import { Link } from "react-router-dom";
import { Back } from "./Menu";
import blog from "./file/pj_blog.png";
import calendar from "./file/calendar.gif";
import guestbook from "./file/guestbook.gif";
import language from "./file/language.gif";
import login from "./file/login.gif";
import main from "./file/pj_main.png";

function Project () {
    return(
        <div className='resume works resume-experience'>
            <Back />
            <div className="title">Sumin In Canada</div>
            <div className="project-summary">
                This website facilitates communication with my family and friends in Korea, overcoming the 11-hour time difference.<br />
                It allows us to check on each other's well-being at any time.<br />
                To enhance privacy, I designed it with a hacker's monitor theme.
            </div>
            <div className="summary">
                <div className="summary-title">
                    Technologies Used
                </div>
                    Javascript, React, Redux, NodeJS, Express, Mysql
            </div>
            <div className="summary">
                <div className="summary-title">
                    Deployment
                </div>
                <div className='summary-content'>
                    <span className="dot">•</span>
                    <span className="content">FrontEnd : Deployed on GitHub Pages, leveraging its static site hosting capabilities for easy and reliable deployment.</span>
                </div>
                <div className='summary-content'>
                    <span className="dot">•</span>
                    <span className="content">Back-End : Deployed on an AWS EC2 instance without a web server, leveraging the free tier.</span>
                </div>
            </div>
            <div className="summary">
                <div className="summary-title">
                    Key Features
                </div>
                <div className='summary-content'>
                    <span className="dot">•</span>
                    <span className="content">Exclusive Upload Access: Only the owner can upload photos and texts, ensuring privacy and control over shared content.</span>
                </div>
                <div className='summary-content'>
                    <span className="dot">•</span>
                    <span className="content">Guestbook: Guests can leave comments and messages to interact with the owner and each other, fostering a sense of community.</span>
                </div>
                <div className='summary-content'>
                    <span className="dot">•</span>
                    <span className="content">Multilingual Support: Offering support for both Korean and English languages to accommodate users from different language backgrounds.</span>
                </div>
            </div>
            <div className="summary">
                <div className="summary-title">
                    Future Plans
                </div>
                <div className='summary-content'>
                    <span className="dot">•</span>
                    <span className="content">Implement real-time chat functionality to facilitate instant communication.</span>
                </div>
                <div className='summary-content'>
                    <span className="dot">•</span>
                    <span className="content">Improve the speed and efficiency of the photo uploading feature.</span>
                </div>
                <div className='summary-content'>
                    <span className="dot">•</span>
                    <span className="content">Develop user customization options, allowing users to personalize their part with custom messages, names, and colors.</span>
                </div>
                <div className='summary-content'>
                    <span className="dot">•</span>
                    <span className="content">Expand the scope of the website to transform it into a platform where users can create their own websites.</span>
                </div>
            </div>
            <div className="detail">
                <div className="detail-title">
                    Login Page
                </div>
                <img className="project_img" src={login} />
                <div className="explanation">
                    Designed to resemble macOS's terminal for a private and secretive atmosphere.
                </div>
            </div>
            <div className="detail">
                <div className="detail-title">
                    Main Page
                </div>
                <img className="project_img" src={language} />
                <div className="explanation">
                    Features language support, real-time clock functionality, and a count-up from the first day.
                </div>
            </div>
            <div className="detail">
                <div className="detail-title">
                    GuestBook
                </div>
                <img className="project_img" src={guestbook} />
                <div className="explanation">
                    Allows users to communicate with each other with unlimited depth.
                </div>
            </div>
            <div className="detail">
                <div className="detail-title">
                    Contribution Calendar
                </div>
                <img className="project_img" src={calendar} />
                <div className="explanation">
                    Styled after GitHub's contribution calendar, showing the host's login activity per day.<br />
                    Future plans to convey other contributions on the site, such as posting activity and other user login activities.
                </div>
            </div>
            <div className="detail">
                <div className="detail-title">
                    Blog Page
                </div>
                <img className="project_img" src={blog} />
                <div className="explanation">
                    A platform for sharing personal experiences or writing letters to users, with the ability for users to leave comments.
                </div>
            </div>
            <div className="project-link" >
                <Link to='/' target="_blank">Link to this Project!</Link>
            </div>
        </div>
    );
}

export default Project;