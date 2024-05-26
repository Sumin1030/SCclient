import { Link } from "react-router-dom";
import { Back } from "./Menu";

function Project () {
    return(
        <div className='resume works resume-experience'>
            <Back />
            <div className="title">Sumin In Canada</div>
            <div>
                한국에 있는 가족과 친구들과 소통하기 위한 개인 웹사이트.
                시차가 커서 연락하기 어렵기 때문에 언제든지 방문하여 안부를 확인할 수 있음.
                개인적인 사이트라서 비밀스러운, 개발자의 웹사이트의 느낌이 나도록 만들었음.
                기획, 디자인 등까지 모두 혼자 경험해본 프로젝트.
                계속해서 수정, develop 중.
            </div>

            <div>
                앞으로 더 넣고 싶은 것들
                - 공지사항 기능
                - 쪽지 또는 실시간 채팅 기능
                - 실시간 로그인 한 사용자 수 보여주는 기능
                - 나중에는 이용자의 본인 사이트를 만들 수 있는 서비스를 제공하는 사이트로 만드는 것이 목표
            </div>
            <Link to='/'>Web Project</Link>
        </div>
    );
}

export default Project;