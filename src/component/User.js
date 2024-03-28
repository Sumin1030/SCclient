import DateUtil from "../util/DateUtil";
import { useTranslator } from '../util/LanguageUtil';
function User(props) {
    /*
        const info = {
            date: user.SIGNUP_DATE,
            id: user.ID,
            name: user.NAME,
            confirmed: user.CONFIRMED
        }   
    */
    let className = '';
    let date = useTranslator("users.date");
    let name = useTranslator("users.name");
    let message = useTranslator("users.message");
    if (!props.info.title) {
        className += Number(props.info.confirmed) == 1? "confirmed" : "unconfirmed";
        date = DateUtil.getDate(new Date(props.info.date).getTime() - new Date(props.info.date).getTimezoneOffset()*DateUtil.MINUTES_TO_MILLISECONDS, "desc", true);
        name = props.info.name;
        message = props.info.message;
    } else className += 'user-title'
    if(props.info.name == 'MASTER') className += ' master';
    return (
        <div className={`user ${className}`} onClick={props.info.onClick} >
            <div className="user-date">
                {date}
            </div>
            <div className="user-name">
                {name}
            </div>
            <div className="user-message">
                {message}
            </div>
        </div>
    );
}

export default User;