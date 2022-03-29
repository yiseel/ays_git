import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEdit from "../components/DiaryEdit";

const Edit = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const dirayList = useContext(DiaryStateContext);

    const [originData, setOriginData] = useState();

    useEffect(()=>{
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = `감정 일기장 - ${id}번째 일기 수정`;
    },[]);

    useEffect(()=>{
        if(dirayList.length >= 1){
            const targetDiary = dirayList.find((it)=> parseInt(it.id) === parseInt(id));

            if(targetDiary){
                setOriginData(targetDiary);
            }else{
                alert("없는 일기입니다");
                navigate("/", { replace: true});
            };
        };
        
    },[id, dirayList]);

    return (
        <div>
            {originData && <DiaryEdit isEdit={true} originData={originData} />}
        </div>
    )
}

export default Edit;