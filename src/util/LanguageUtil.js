import kor from './kor.json';
import eng from './eng.json';
import { useSelector } from 'react-redux';

function useTranslator(msg, _lang) {
    const lang = useSelector(state => state.language.lang);
    if(!_lang) _lang = lang;
    const msgArr = msg.split('.');
    let result;
    const cur = language.langData(_lang);
    let _cur = cur;
    msgArr.forEach((key) => {
        _cur = _cur[key];
    })
    result = _cur;
    return result;
}

const language = {
    get kor() {
        return "KOR"
    },
    get eng() {
        return "영어"
    },
    get eng_obj() {
        return {
            val: this.eng,
            label: this.kor
        }
    },
    get kor_obj() {
        return {
            val: this.kor,
            label: this.eng
        }
    },
    getLangObj(val) {
        if(val == this.kor || val?.val == this.kor) return this.kor_obj;
        else if (val == this.eng || val?.val == this.eng) return this.eng_obj;
    },
    langData(lang) {
        if (lang == this.kor || lang?.val == this.kor) {
            return kor
        } else return eng;
    }
    // getCurLeng(callback, lang) {
    //     if(!lang) {
    //         axios.get('/api/getLanguage').then((res) => {
    //             console.log('lang 불러 옴', res.data);
    //             lang = res.data;
    //             callback(lang);
    //         });
    //     } else {
    //         console.log('현재 lang : ', lang);
    //         callback(lang);
    //     }
    // },
    // async getLanguage() {
    //     axios.get('/api/getLanguage').then((res) => {
    //         console.log('lang 불러 옴', res.data);
    //         return res.data;
    //     })
    // },
    // changeLang(_lang, callback) {
    //     axios.post('/api/setLanguage', {lang: _lang}).then((res) => {
    //         // if(typeof res.data == 'object') lang = res.data.val;
    //         callback(this.getLangObj(res.data));
    //     });
    // }
}

export {useTranslator};
export default language;