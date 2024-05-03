import { useState } from "react";
import { Default, Info, Skills } from "./AboutComp";
import { MENU, Menu } from "./Menu";

const CLICKED = 'clicked';
let currTarget = null;

function About() {
    const [content, setContent] = useState(Default);
    const setClicked = (target, _content) => {
        if(currTarget && currTarget.classList.contains(CLICKED)) {
            currTarget.classList.remove(CLICKED);
            if(target != currTarget) {
                target.classList.add(CLICKED);
            } else {
                setContent(Default);
                return;
            }
        } else if(currTarget && !currTarget.classList.contains(CLICKED)) {
            target.classList.add(CLICKED);
        } else if(!currTarget) {
            target.classList.add(CLICKED);
        }
        setContent(_content);
        currTarget = target;
    }
    const clickInfo = (e) => {
        setClicked(e.target, Info);
    };

    const clickSkills = (e) => {
        setClicked(e.target, Skills);
    };
    return (
        <div className='resume resume-about'>
            <Menu curr={MENU.ABOUT} />
            <div className='resume-left'>
                <div className='character'>place for pic</div>
                <div className='title'>
                    <label className="name">SUMIN HEO</label>
                    <label className="job">Junior Web Developer</label>
                </div>
            </div>
            <div className='resume-right'>
                <div className="info-board">
                    {content}
                </div>
                <div className="buttons">
                    <div className="first-line-btns">
                        <button className="skills-btn" onClick={clickSkills}>SKILLS</button>
                        <button className="info-btn" onClick={clickInfo}>INFO</button>
                    </div>
                    <div className="second-line-btns">
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;