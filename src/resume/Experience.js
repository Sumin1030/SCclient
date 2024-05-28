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
                B2B solution start-up company.<br />
                Offering a process analysis solution that uses process mining techniques to analyze customer behavior patterns and uncover insights.
            </div>
            <div className="summary">
                <div className='summary-content'>
                    <span className="dot">•</span>
                    <span className="content">Contributed to the development of APIs for visualizing analytical tools in the back-end.</span>
                </div>
                <div className='summary-content'>
                    <span className="dot">•</span>
                    <span className="content">Took a significant role in front-end development by developing a real-time dashboard, while also contributing to the development of two visualizing analytical tools as a member of the team.</span>
                </div>
            </div>
            <div className="detail">
                <div className="detail-title">
                    RealTime Analysis Dashboard
                </div>
                <img className="work-image 1" src={pz1}></img>
                <div className="explanation">
                    Dashboard 전체를 구현함. 표준모델을 설정하여, 실시간 분석을 했을 때 표준값에서 벗어나는 사항들을 실시간으로 확인할 수 있음.
                    설정한 시간마다 분석 결과를 새롭게 보여주며, 서버에서 데이터를 불러오는 간격, 화면이 새로 refresh 되는 간격을 설정할 수 있음.
                </div>
            </div>
            <div className="detail">
                <div className="detail-title">
                    Comparison Frequency Map
                </div>
                <img className="work-image 2" src={pz2}></img>
                <div className="explanation">
                    이미 구현되어 있는 Map 코드를 부모로 해서 Comparison Frequency Map을 구현.
                    사용자가 보기 편하도록 Map이 그려지는 로직을 재구성하였음.
                </div>
            </div>
            <div className="detail">
                <div className="detail-title">
                KPI analysis tools
                </div>
                <img className="work-image 3" src={pz3}></img>
                <div className="explanation">
                    KPI 분석 api 구현.
                    케이스 수, 이벤트 수, 케이스 리드타임, working time 등의 합계, 평균, 중앙값 등을 다양한 옵션을 적용하여 구할 수 있도록 구현하였다.
                    옵션 : 특정 범위에 한하게 하거나, 특정 이벤트를 포함/비포함 시킨 결과만 구한다던가 등등.
                </div>
            </div>
        </div>
    );
}

export default Experience;