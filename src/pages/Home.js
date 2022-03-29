import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

import Mybutton from "../components/Mybutton";
import MyHeader from "../components/Myheader";
import DiartList from "../components/DiaryList";

const Home= () => {

    const diaryList = useContext(DiaryStateContext);
    const [data, setData] = useState([]);

    const [curDate, setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`

    useEffect(()=>{
        if(diaryList.length >= 1){
            const firstDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1
            ).getTime();
    
            const lastDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth() + 1,
                0,
                23,
                59,
                59
            ).getTime();
    
            setData(diaryList.filter((it)=> firstDay <= it.date && it.date <= lastDay))
        };
    },[diaryList, curDate]);

    const deCreaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth()-1, curDate.getDate())
        );
    };

    const increaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth()+1, curDate.getDate())
        );
    };

    return (
        <div>
            <MyHeader
                headText={headText}
                leftChild={<Mybutton text={"<"} onClick={deCreaseMonth}/>}
                rightChild={<Mybutton text={">"} onClick={increaseMonth}/>}
            />
            <DiartList diaryList={data}/>
        </div>
    );

}

export default Home;