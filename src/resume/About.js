import { useEffect, useRef, useState } from "react";
import {Default, Info, Skills} from "./AboutComp";
import { MENU, Menu } from "./Menu";
import ScrollComp from "./ScrollComp";

const CLICKED = 'clicked';
let currTarget = null;
const DEFAULT_LEFT = 0;
const BUTTONS = ['HELLO', 'SKILLS', 'INFO'];
let width = null;
let deltaYCor = null;
let deltaY = DEFAULT_LEFT;
function About() {
    // const [content, setContent] = useState(Default);
    const buttons = useRef();
    const content = useRef();
    let flag = [null, null, null];
    const switchFlag = (index, _flag) => {
        flag[index] = _flag;
        console.log('flag : ', flag);
    }
    const setDeltaY = (index) => {
        deltaY = deltaYCor[index];
    }
    const handleWheel = (e) => {
        if(flag[0] == 'noScroll' && currTarget == buttons.current.childNodes[0] && e.deltaY > 0) {
            const to = buttons.current.childNodes[BUTTONS.indexOf(currTarget.textContent)+1];
            setClicked(to);
        } else if(flag[1] == 'noScroll' && currTarget == buttons.current.childNodes[1]) {
            if(e.deltaY > 0) {
                const to = buttons.current.childNodes[BUTTONS.indexOf(currTarget.textContent)+1];
                setClicked(to);
            } else {
                const to = buttons.current.childNodes[BUTTONS.indexOf(currTarget.textContent)-1];
                setClicked(to);
            }
        } else if(flag[2] == 'noScroll' && currTarget == buttons.current.childNodes[2] && e.deltaY < 0) {
            const to = buttons.current.childNodes[BUTTONS.indexOf(currTarget.textContent)-1];
            setClicked(to);
        } else {
            // 1(default)
            if(flag[0]==true && currTarget == buttons.current.childNodes[0]) {
                deltaY -= e.deltaY;
                // 초기값보다 작아야만 움직이도록.
                if(deltaY < -DEFAULT_LEFT){
                    if(deltaY < deltaYCor[0] && deltaY > deltaYCor[1]*0.3) {
                        content.current.classList.remove('smooth');
                        content.current.style.transform = `translateX(${deltaY}px)`;
                    } else {
                        const to = buttons.current.childNodes[BUTTONS.indexOf(currTarget.textContent)+1];
                        setClicked(to);
                    }
                }
            // 2(Skills)
            } else if(flag[1]==true && currTarget == buttons.current.childNodes[1]) {
                deltaY -= e.deltaY;
                // 오른쪽으로 이동
                if(deltaY < deltaYCor[1]) {
                    if(deltaY > deltaYCor[1]*1.3) {
                        content.current.classList.remove('smooth');
                        content.current.style.transform = `translateX(${deltaY}px)`;
                    } else {
                        const to = buttons.current.childNodes[BUTTONS.indexOf(currTarget.textContent)+1];
                        setClicked(to);
                    }
                // 왼쪽으로 이동
                } else if(deltaY > deltaYCor[1]) {
                    if(deltaY < deltaYCor[1]*0.7) {
                        content.current.classList.remove('smooth');
                        content.current.style.transform = `translateX(${deltaY}px)`;
                    } else {
                        const to = buttons.current.childNodes[BUTTONS.indexOf(currTarget.textContent)-1];
                        setClicked(to);
                    }
                }
            // 3(Info)
            } else if(flag[2]==true && currTarget == buttons.current.childNodes[2]){
                deltaY -= e.deltaY;
                if(deltaY > deltaYCor[2] && deltaY < -DEFAULT_LEFT-(width*1.7)) {
                    content.current.classList.remove('smooth');
                    content.current.style.transform = `translateX(${deltaY}px)`;
                } else {
                    const to = buttons.current.childNodes[BUTTONS.indexOf(currTarget.textContent)-1];
                    setClicked(to);
                }
            }
            // if(!flag && deltaY < -DEFAULT_LEFT-content.current.offsetWidth/2) {
                // switchFlag(true);
                // const to = buttons.current.childNodes[BUTTONS.indexOf(currTarget.textContent)+1];
                // setClicked(to);
            // }
        }
    }
    useEffect(()=> {
        width = content.current.offsetWidth;
        deltaYCor = [-DEFAULT_LEFT, -DEFAULT_LEFT-width, -DEFAULT_LEFT-(width*2)];
        setClicked(buttons.current.childNodes[0]);
        content.current.addEventListener('wheel', handleWheel);
    }, []);

    const moveTo = (to) => {
        content.current.classList.add('smooth');
        content.current.style.transform = `translateX(${to*-100}%)`;
    }

    const setClicked = (target, _content = null) => {
        if(currTarget && currTarget.classList.contains(CLICKED)) {
            currTarget.classList.remove(CLICKED);
            if(target != currTarget) {
                target.classList.add(CLICKED);
            } else {
                setClicked(buttons.current.childNodes[0]);
                return;
            }
        } else if(currTarget && !currTarget.classList.contains(CLICKED)) {
            target.classList.add(CLICKED);
        } else if(!currTarget) {
            target.classList.add(CLICKED);
        }
        if(currTarget) {
            const tar = BUTTONS.indexOf(target.textContent);
            const _flag = flag;
            switchFlag(tar, false);
            if(_flag == 'noScroll') {
                //2초 후 noScroll로 다시 바꾸기
                //일단 보류
            }
            setDeltaY(tar);
            moveTo(tar);
        }
        // setContent(_content);
        currTarget = target;
    }
    const clickInfo = (e) => {
        setClicked(e.target);
    };

    const clickSkills = (e) => {
        setClicked(e.target);
    };

    const clickHi = (e) => {
        setClicked(e.target);
    }
    return (
        <div className='resume resume-about'>
            <Menu curr={MENU.ABOUT} />
            <div className='resume-left'>
                {/* <div className='character'>place for pic</div> */}
                <div className='title'>
                    <label className="name">SUMIN HEO</label>
                    <label className="job">Junior Web Developer</label>
                </div>
                <div className="buttons">
                    <div className="first-line-btns" ref={buttons} >
                        <button className="greeting-btn" onMouseDown={clickHi} >{BUTTONS[0]}</button>
                        <button className="skills-btn" onMouseDown={clickSkills}>{BUTTONS[1]}</button>
                        <button className="info-btn" onMouseDown={clickInfo}>{BUTTONS[2]}</button>
                    </div>
                </div>
            </div>
            {/* <div className='resume-right'>
                <div className="info-board">
                    <ScrollComp content={content} />
                </div>
            </div> */}
            <div ref={content} className='resume-right'>
                {[<Default key='1' switchFlag={switchFlag}/>, <Skills key='2' switchFlag={switchFlag}/>, <Info key='3' switchFlag={switchFlag}/>]}
            </div>
        </div>
    );
}

export default About;