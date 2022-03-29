import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

import Myheader from "./Myheader";
import Mybutton from "./Mybutton";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "../App";
import { getStringDate } from "../pages/util/Date";
import { emotionList } from "../pages/util/emotion";

const DiaryEdit = ({isEdit, originData}) => {
    
    const [emotion, setEmotion] = useState(3);
    const [content, setContent] =useState("");
    const contentRef = useRef();

    const [date, setDate] = useState(getStringDate(new Date()));

    const navigate = useNavigate();

    const handleClickEmote = useCallback((emotion) => {
        setEmotion(emotion)
    },[]);

    const {onCreate, onEdit, onRemove} = useContext(DiaryDispatchContext);
    const handleSubmit = () => {
        if(content.length < 1){
            contentRef.current.focus();
            return;
        }

        if(window.confirm(isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?")){
            if(!isEdit){
                onCreate(date, content, emotion);
            }else{
                onEdit(originData.id, date, content, emotion);
            }
        };

        navigate('/',{replace:true})
    }

    const handleRemove = () => {
        if(window.confirm("정말 삭제하시겠습니까?")){
            onRemove(originData.id);
            navigate("/", {replace:true});
        }
    }

    useEffect(()=>{
        if(isEdit){
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setEmotion(originData.emotion);
            setContent(originData.content);
        }
    },[isEdit, originData])

    return (
        <div className="DiaryEdit">
            <Myheader headText={isEdit ? "일기 수정하기" : "새 일기 쓰기"} 
                leftChild={<Mybutton text={"< 뒤로 가기"} onClick={()=>navigate(-1)}/>}
                rightChild={isEdit && <Mybutton text={"삭제하기"} type={"negative"} onClick={handleRemove}/>}
            />
            <div>
                <section>
                    <h4>오늘은 언제인가요?</h4>
                    <div className="input_box">
                        <input className="input_date" type="date" value={date} onChange={(e)=> setDate(e.target.value)}/>
                    </div>
                </section>
                <section>
                    <h4>오늘의 감정</h4>
                    <div className="input_box emotion_list_wrapper">
                        {emotionList.map((it)=> (
                            <EmotionItem key={it.emotion_id} {...it}
                            onClick={handleClickEmote}
                            itselected={it.emotion_id === emotion}
                            />
                        ))}
                    </div>
                </section>
                <section>
                    <h4>오늘의 일기</h4>
                    <div className="input_box text_wrapper">
                        <textarea 
                        placeholder="오늘은 어땠나요?"
                        ref={contentRef} 
                        value={content} 
                        onChange={(e)=>setContent(e.target.value)}/>
                    </div>
                </section>
                <section>
                    <div className="control_box">
                        <Mybutton text={"취소하기"} onClick={()=> navigate(-1)}/>
                        <Mybutton text={"작성 완료"} type={"positive"} onClick={handleSubmit}/>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default DiaryEdit;