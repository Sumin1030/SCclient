import React, { useState, useRef, useEffect } from 'react';
import axios from "../util/axiosUtil";
import DateUtil from '../util/DateUtil';
import Setting from '../component/Setting';
import { useTranslator } from '../util/LanguageUtil';
// info: 회원가입 시 정보 저장 위함.
//       정보 가입할 때 마다 함수 실행하기 때문에 전역변수로 설정.
// loginPw: 로그인 시 아이디 정보 불러오는 시점에 미리 비밀번호 저장하기 위함.
// loginId: 로그인 성공 시 방문자 수 기록하기 위함.
// loginName: 로그인 성공 시 세션에 name 저장하기 위함.
let info = {}, loginId, loginPw, loginName;
let enterFlag = false;
function Login(props) {

    const sayHi = useTranslator("login.sayHi");
    const signUpTxt = useTranslator("login.signUp");
    const ID = useTranslator("login.id");
    const PW = useTranslator("login.pw");
    const NAME = useTranslator("login.name");
    const MSG = useTranslator("login.msg");
    const ANSWER = useTranslator("login.answer");
    const rewritePW = useTranslator("login.rewritePW");
    const wrognPW =  useTranslator("login.wrongPW");
    const allSet = useTranslator("login.allSet");
    const noID = useTranslator("login.noID");
    const rewriteID = useTranslator("login.rewriteID");
    const _rewriteAnsr = useTranslator("login.rewriteAnswer");
    const yes = useTranslator("login.yes");
    const rewrite = useTranslator("login.rewrite");
    const typeLogin = useTranslator("login.login");
    const typeOption = `Y: ${yes}, R: ${rewrite}, L: ${typeLogin}`;
    const rewriteAnsr = `\n${_rewriteAnsr}\n${typeOption}`;
    const completeSignUp = useTranslator("login.completeSignUp");
    const failSignUp = useTranslator("login.failSignUp");
    
    const currentText = useRef(sayHi);
    const isSignUp = useRef(false);
    const textBox = useRef(null);
    const [fixedText, setFixedText] = useState(currentText.current);
    const [title, setTitle] = useState(ID);
    
    // fixedText 수정
    const changeCurrentText = (txt, includeTitle = true) =>{
        let _title = "";
        if(includeTitle) _title = title;
        currentText.current += `\n${_title + txt}`;
        setFixedText(currentText.current);
    }

    // 입력된 텍스트 확인
    const inputText = (txt) => {
        changeCurrentText(txt);
        if(isSignUp.current) {
            signUp(txt);
        } else if(title == ID) {
            login(txt);
        } else if(title == PW) {
            isValid(txt)
        }
    }

    // 방문자 수 올리기
    const addVisit = (info) => {
        axios.post(`/api/addVisit`, info).then((res)=>{
            if(res.data.result) {
                console.log("addVisit 성공 : ", res.data.result);
            } else {
                console.log("addVisit 실패 ");
            }
        });
    }

    // 로그인 
    const signIn = (info, isEnter = false) => {
        const result = isEnter? 'enter' : true;
        axios.post(`/api/signIn`, info).then((res) => {
            console.log('login.js에서 변경', result, res);
            props.changeState(result);
        });
    }
    
    const signUp = (txt) => {
        if(title == ID) {
            if(txt.length <= 5) {
                changeCurrentText(rewriteID, false);
            } else {
                info.id = txt;
                setTitle(PW);
            }
        } else if(title == PW) {
            if(txt.length <= 8) {
                changeCurrentText(rewritePW, false);
            } else {
                info.pw = txt;
                setTitle(NAME);
            }
        } else if(title == NAME) {
            setTitle(MSG);
            info.name = txt;
        } else if (title == MSG) {
            setTitle(ANSWER);
            info.msg = txt;
            changeCurrentText(`
****************************
****************************

'  ${ID} ${info.id}      
'  ${PW} ${info.pw}
'  ${NAME} ${info.name}  
'  ${MSG} ${info.msg}

****************************
****************************

${typeOption}`,
             false);
        } else if (title == ANSWER) {
            if(txt == "L") {
                isSignUp.current = false;
                setTitle(ID);
            } else if (txt == "R") {
                setTitle(ID);
            } else if (txt == "Y") {
                const currTime = new Date();
                const date = DateUtil.getDate(new Date(currTime.getTime() + (currTime.getTimezoneOffset() * 60 * 1000)), "desc");
                info.date = date;
                axios.post(`/api/signUp`, info).then((res)=>{
                    if(res.data.result) {
                        isSignUp.current = false;
                        changeCurrentText(completeSignUp, false);
                    } else {
                        changeCurrentText(failSignUp, false);
                    }
                    setTitle(ID);
                    
                });
            } else {
                changeCurrentText(rewriteAnsr, false);
            }

        }
    }

    // Y 입력하면 회원가입, 아니면 PW 확인
    const login = (txt) => {
        if(txt == "Y" || txt == "y") {
            isSignUp.current = true;
            changeCurrentText(signUpTxt, false);
            setTitle(ID);
        } else {
            if(title == ID){
                if(txt.length > 5) {
                    loginId = txt;
                    axios.get(`/api/getId?id=${loginId}`).then((res)=>{
                        if (res.data.result.length > 0) {
                            setTitle(PW);
                            loginPw = res.data.result[0].PW;
                            loginName = res.data.result[0].NAME;
                        } else {
                            changeCurrentText(noID, false);
                        }   
                    });
                } else {
                    changeCurrentText(rewriteID, false);
                }
            }
        }
    }

    // 비밀번호 확인
    const isValid = (txt) => {
        if(txt != null && txt.length > 8) {
            if(txt == loginPw) {
                const currTime = new Date();
                const date = DateUtil.getDate(new Date(currTime.getTime() + (currTime.getTimezoneOffset() * 60 * 1000)), "desc");
                const info = {
                    id: loginId,
                    date: date
                }
                addVisit(info);
                setFixedText(`${fixedText} \n${allSet}`);
                signIn({...info, pw: loginPw, name: loginName});
            } else {
                changeCurrentText(wrognPW, false);
            }
        } else {
            changeCurrentText(rewritePW, false);
        }
    }

    // 엔터 눌렸는지 확인
    const handleOnKeyPress = (e) => {
        const val = e.currentTarget.value;
        if(e.key == 'Enter') {
            console.log('enter', enterFlag, val);
            if(enterFlag || !val || val == "") {
                enterFlag = false;
                e.currentTarget.value = "";
                return;
            }
            if(val.charCodeAt(val.length-1) > 122) enterFlag = true;
            inputText(val);
            e.currentTarget.value = "";
        }
    }

    // 둘러보기 버튼 클릭
    const clickEnter = (e) => {
        const isEnter = true;
        signIn({enter: true}, isEnter);
    }

    useEffect(() => {
        // 스크롤이 생겼을 때 사용자가 새로운 값을 입력하면 스크롤을 맨 아래로 내림.
        if(textBox.current) {
            textBox.current.scrollTop = textBox.current.scrollHeight;
        }
    }, [fixedText]);
    

    return(
        <div className="login">
            {/* <Setting/> */}
            <div className="login-prompt">
                <div className="login-top-bar">
                    <div className="login-top-bar-buttons">
                        <div className="red-button"></div>
                        <div className="yellow-button"></div>
                        <div className="green-button"></div>
                    </div>
                    <div className="login-top-bar-text">
                        &#127968; {useTranslator('login.top')}
                    </div>
                </div>
                <div className="login-text-box" ref={textBox}>
                    <div className="written-text">
                        {fixedText}
                    </div>
                    <div className="input-field">
                        <span className="title">
                            {title}
                        </span>
                        <input type="text" className="input-text login-input" onKeyDown={handleOnKeyPress} autoFocus></input>
                    </div>
                </div>
            </div>
            <div className="enter-btn" onClick={clickEnter}>{useTranslator("login.magicPass")}</div>
        </div>
    );
}

export default Login;