import React from 'react';
import { useNavigate } from "react-router-dom";
import Mybutton from "./Mybutton";

const DiaryItem = ({id, emotion, content, date}) => {

    const env = process.env;
    env.PUBLIC_URL = env.PUBLIC_URL || "";

    const strDate = new Date(parseInt(date)).toLocaleDateString();

    const navigate = useNavigate();

    const goDetail = () => {
        navigate(`/diary/${id}`);
    };

    const goEdit = () => {
        navigate(`/edit/${id}`);

    };
    
    return ( 
    <div className="DiaryItem">
        <div 
        onClick={goDetail}
        className={["emotion_img_wrapper",`emotion_img_wrapper_${emotion}`].join(" ")}>
        <img src={process.env.PUBLIC_URL + `/assets/emotion${emotion}.png`}/>
        </div>
        <div 
        onClick={goDetail}
        className="info_wrapper">
            <div className="diary_date">{strDate}</div>
            <div className="diary_content_preview">{content.slice(0,25)}</div>
        </div>
        <div 
        onClick={goEdit}
        className="btn_wrapper">
            <Mybutton text={"수정하기"}/>
        </div>
    </div>
    )
}

export default React.memo(DiaryItem);