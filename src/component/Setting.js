import {useEffect} from 'react';
import language from "../util/LanguageUtil";
import { useSelector, useDispatch } from 'react-redux';
import { languageActions } from '../store/languageSlice';

function Setting(props) {
    // 라벨을 반대로.
    // 현재 영어면 kor을 보여주고
    // 현재 kor이면 eng를 보여줘야 함.

    const dispatch = useDispatch();
    const lang = useSelector(state => state.language.lang);

    const getLabel = (cur) => {
        if(cur == language.eng) return language.getLangObj(language.eng);
        return language.getLangObj(language.kor);
    }
    const _changeLang = () => {
        console.log('changeLang', lang, 'to ', getLabel(lang).label);
        // props.setLang(getLabel(props.lang));
        // language.changeLang(getLabel(props.lang), props.setLang);
        dispatch(languageActions.changeLang(getLabel(lang).label));
    }

    useEffect(() => {
        console.log('setting useEffect', props.lang);
        // let result = getLang(language.getCurLeng());
        // console.log('mount');
        // if(!result) result = ENG;
        // setLanguage(result);
    }, ([]));

    

    return (
        <div className='main-setting' onClick={_changeLang}>
            <span className='lang'>{getLabel(lang).label}</span>
        </div>
    );
}

export default Setting;