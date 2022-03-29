import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import Mybutton from "../components/Mybutton";
import Myheader from "../components/Myheader";

import { getStringDate } from "./util/Date";
import { emotionList } from "./util/emotion";

const Diary = () => {
    const {id} = useParams();
    const dirayList = useContext(DiaryStateContext);
    const navigate = useNavigate();
    const [data, setData] = useState();

    useEffect(()=>{
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = `감정 일기장 - ${id}번째 일기`;
    },[]);

    useEffect(()=>{
        if(dirayList.length >= 1){
            const targetDiary = dirayList.find((it)=> parseInt(it.id) === parseInt(id));

            if(targetDiary){
                setData(targetDiary);
            }else{
                alert("없는 일기입니다");
                navigate("/", {replace: true});
            }
        };
    },[id, dirayList]);

    if(!data){
        return <div className="DiaryPage">로딩중입니다...</div>
    
    }else{

        const currentEmotion = emotionList.find((it)=> parseInt(it.emotion_id) === parseInt(data.emotion));
        
        return (
            <div className="DiaryPage">
                <Myheader
                    headText={`${getStringDate(new Date(data.date))} 기록`}
                    leftChild={<Mybutton text={'< 뒤로 가기'} onClick={()=>navigate(-1)}/>}
                    rigthChild={<Mybutton text={'수정하기'} onClick={()=> navigate(`/edit/${data.id}`)}/>}
            />
            <article>
                <section>
                    <h4>오늘의 감정</h4>
                    <div className={["diary_img_wrapper", `diary_img_wrapper_${data.emotion}`].join(" ")}>
                        <img src={currentEmotion.emotion_img}/>
                        <div className="emotion_Descript">
                                {currentEmotion.emotion_descript}
                        </div>
                    </div>
                </section>
                <seciton>
                    <h4>오늘의 일기</h4>
                    <div className="diary_content_wrapper">
                                <p>{data.content}</p>
                            </div>
                </seciton>
            </article>
            </div>
        )
    }
}

export default Diary;