import {useEffect, useState, useRef} from 'react';

function ScrollComp(props) {
    let isVertical = false;
    const [className, setClassName] = useState('scroll '+ props.className);
    let scrollHeight;
    const thisComp = useRef();
    
    if(props.className && props.className.indexOf('vertical') > 0) isVertical = true;
    // if(props.className) {
    //     setClassName(className+props.className);
    //     console.log('set');
    // }

    let curr = null;
    let _curr = curr;
    const handleScroll = (e) => {
        scrollHeight = thisComp.current.scrollHeight - thisComp.current.offsetHeight;
        if(scrollHeight && scrollHeight - thisComp.current.scrollTop < 1) {
            // console.log('끝!!!!!!!!!!');
            _curr = 'end';
        } else if(isVertical && thisComp.current.scrollTop == 0) {
            // console.log('시작!!!!!');
            _curr = 'start';
        } else if(isVertical) {
            _curr = 'middle';
            // if(props.switchFlag) props.switchFlag(false);
        // } else if(!isVertical) {
        //     const width = thisComp.current.clientWidth;
        //     const currLeft = thisComp.current.scrollLeft;
        //     const currTop = thisComp.current.scrollTop;
        //     if(currTop > 0) {
        //         console.log('currTop', currTop);
        //     }
        //     if(1 > thisComp.current.scrollWidth - width - currLeft) {
        //         console.log('가로 끝');
        //     } else if(!scrollFlags[1] && currLeft < width*2 && currLeft > width*1.2) {
        //         console.log('셋째 넘어가야 함.')
        //         scrollFlags[1] = true;
        //         thisComp.current.scrollTo({
        //             top: 0,
        //             left: width*2,
        //             behavior: "smooth",
        //         });
        //     } else if(!scrollFlags[0] && currLeft < width && currLeft > width/3) {
        //         console.log('둘째 넘어가야 함', currLeft, width, thisComp.current.scrollWidth);
        //         scrollFlags[0] = true;
        //         thisComp.current.scrollTo({
        //             top: 0,
        //             left: width,
        //             behavior: "smooth",
        //         });
        //     }
        } else {
            // console.log('암 것도 아님');
        }
        if(props.switchFlag) {
            console.log(curr, _curr);
            if(curr != _curr) {
                curr = _curr;
                props.switchFlag(curr);
            }
        }
    }

    useEffect(()=> {
        const _scrollHeight = thisComp.current.scrollHeight - thisComp.current.offsetHeight;
        scrollHeight = _scrollHeight;
        if(props.className && scrollHeight == 0 && props.className.indexOf('visible') > 0) {
            setClassName(className.replace('visible', ''));
            console.log('setClassName');
            props.switchFlag('noScroll');
        }
        thisComp.current.addEventListener('scroll', handleScroll);
        return(() => {
            if(thisComp.current) thisComp.current.removeEventListener('scroll', handleScroll);
        });
    }, []);

    return (
        <div ref={thisComp} className={className}>
            {props.content? props.content : ''}
            {props.children? props.children: ''}
        </div>
    );
}

export default ScrollComp;