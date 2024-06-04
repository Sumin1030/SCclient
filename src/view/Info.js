import Calander from '../component/Calendar';
import DateTime from '../component/DateTime';
import DateUtil from '../util/DateUtil';
import { useEffect } from 'react';
import Plotly from "plotly.js-dist";
import axios from "../util/axiosUtil";
import { useTranslator } from "../util/LanguageUtil";

function Info(props) {
    useEffect(()=>{
        let curr = new Date();
        const todayDate = new Date(DateUtil.getUtc(curr) - (DateUtil.TORONTO_OFFSET * DateUtil.MINUTES_TO_MILLISECONDS));
        const x = [];
        for(let i = 0; i < 5; i++) {
            x[i] = DateUtil.getFixedDate(todayDate);
            todayDate.setDate(todayDate.getDate() - 1);
        }
        console.log(x);
        let trace1 = {
            x: x,
            y: [0, 0, 0, 0, 0],
            // mode: "lines",
            type: 'scatter',
            marker: {
                color: "rgb(80, 234, 155)"
            }
        };
        // 로그인 시 utc 기준으로 로그 쌓음
        // 현재 날짜의 00시를 utc기준으롤 바꾸어 파라미터 구성
        const _t = DateUtil.getUtc(`${curr.getFullYear()}-${curr.getMonth()+1}-${curr.getDate()} ${curr.getHours()}:${curr.getMinutes()}`);
        const today = DateUtil.getDate(_t, "desc");
        axios.get(`/api/getVisits?today=${today}`).then((res)=>{
            const result = res.data.result;
            if(result) {
                let min = 0, max = 0;
                for(let i = 0; i < 5; i++) {
                    // y축 범위 test
                    // trace1.y[i] = i*100;
                    if(result[i]) trace1.y[i] = result[i].cnt;
                    if(min > trace1.y[i]) min = trace1.y[i];
                    if(max < trace1.y[i]) max = trace1.y[i];
                }
                const dtick = Math.ceil((max-min)/4);
                if(dtick > 1) layout.yaxis.dtick = dtick;
            } else {
                console.log("getVisits: ", "결과 없음");
            }
            const data = [trace1];
            Plotly.newPlot('myDiv', data, layout, option);
            window.addEventListener('resize', redrawPlotly);
        });

        return () => {
            window.removeEventListener('resize', redrawPlotly);
        }

    }, []);

    const redrawPlotly = (e) => {
        Plotly.relayout('myDiv', {});
    }

    const layout = {
        xaxis: {
            title: {
                text: useTranslator("info.date"),
                font: {
                    color: "rgb(118, 118, 118)"
                }
            },
            automargin: 'height'
        },
        yaxis: {
            title: {
                text: useTranslator('info.visitor'),
                font: {
                    color: "rgb(118, 118, 118)"
                }
            },
            rangemode: 'nonnegative',
            // tickformat: `,d`,
            dtick: 1
        },
        paper_bgcolor: "black",
        plot_bgcolor: "black",
        showlegend: false,
        margin: {
            t: 50,
            b: 70,
            l: 60,
            r: 30,
            pad: 10
        },
        autosize: true,
        legend: {
            title: {
                font: {
                    color: "white"
                }
            }
        }
    };

    const option = {
        staticPlot: true
    };

    return(
        <div className="info">
            <label className='info-title'>{useTranslator('mainPage.information')}</label>
            <DateTime />
            <div className="visitor" id="myDiv" >
            </div>
            <div className="grass">
                <Calander />
            </div>
        </div>
    )
}

export default Info;