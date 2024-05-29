import { Back } from "./Menu";
import pz1 from "./file/puzzledata.gif";
import pz2 from "./file/pz2map.gif";
import pz3 from "./file/pz3kpi.gif";

function Experience () {
    return(
        <div className='resume works resume-experience'>
            <Back />
            <div className="title">Puzzle Data</div>
            <div className="company-description">
                A B2B solution start-up company specializing in process analysis solutions leveraging process mining techniques to analyze customer behavior patterns and uncover insights.
            </div>
            <div className="summary">
                <div className="summary-title">
                    Technologies Used
                </div>
                <div className='summary-content'>
                    <span className="dot">•</span>
                    <span className="content">JavaScript: Utilized an in-house framework with Redux for front-end development.</span>
                </div>
                <div className='summary-content'>
                    <span className="dot">•</span>
                    <span className="content">Java: Employed Spring and Mybatis frameworks with PostgreSQL for back-end development.</span>
                </div>
            </div>
            <div className="summary">
                <div className="summary-title">
                    Role
                </div>
                <div className='summary-content'>
                    <span className="dot">•</span>
                    <span className="content">Contributed to the development of APIs for visualizing analytical tools in the back-end.</span>
                </div>
                <div className='summary-content'>
                    <span className="dot">•</span>
                    <span className="content">
                        Played a significant role in front-end development, creating a real-time dashboard, and contributing to the development of two visualizing analytical tools as a team member.
                    </span>
                </div>
            </div>
            <div className="detail">
                <div className="detail-title">
                    RealTime Analysis Dashboard
                </div>
                <img className="work-image 1" src={pz1}></img>
                <div className="explanation">
                    Developed the entire real-time dashboard in the front-end. Enabled real-time monitoring of events that fall outside predefined ranges based on a standard model.<br />
                    Implemented features to customize interval time for data retrieval from the server and monitor refresh time.
                </div>
            </div>
            <div className="detail">
                <div className="detail-title">
                    Comparison Frequency Map
                </div>
                <img className="work-image 2" src={pz2}></img>
                <div className="explanation">
                    Developed the Comparison Frequency Map Analysis based on Map analysis.<br />
                    Rewrote the logic for drawing maps specific to this tool.
                </div>
            </div>
            <div className="detail">
                <div className="detail-title">
                KPI analysis tools
                </div>
                <img className="work-image 3" src={pz3}></img>
                <div className="explanation">
                    Developed APIs for KPI analysis tools.<br />
                    Enabled users to analyze key performance indicators such as the number of cases or events, and calculate metrics like sum, average, and median of lead time or working time.<br />
                    Implemented various options for customization, including setting limitations on ranges and including/excluding specific events or workers.
                </div>
            </div>
        </div>
    );
}

export default Experience;