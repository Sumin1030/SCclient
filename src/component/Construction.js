import { useTranslator } from "../util/LanguageUtil";
function Construction() {

    return (
        <div className="construction-outer">
            <div className="construction-inner">
                <div>{useTranslator('construction.underConstruction')}</div>
                <br/>
                <div>{useTranslator('construction.commingSoon')}</div>
            </div>
        </div>
    );
}

export default Construction;