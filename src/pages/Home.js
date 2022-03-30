import { useContext, useEffect, useState } from "react";
import Myheader from './../components/Myheader';
import Mybutton from './../components/Mybutton';
import { DiaryStateContext } from "../App";
import DiaryList from './../components/DiaryList';

const Home = () => {
    
    const diaryList = useContext(DiaryStateContext);
    const [data, setData] = useState([]);

    const [curDate, setCurDate] = useState(new Date());
    const HeadText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`
    
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

    // 다음 날짜로 이동
    const increaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth()+1, curDate.getDate())
        );
    };

    // 전 날짜로 이동
    const deCreaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth()-1, curDate.getDate())
        );
    };


    return (
        <div>
            <Myheader 
                headText={HeadText}
                leftChild = {<Mybutton text={'<'} onClick={deCreaseMonth}/>}
                rightChild = {<Mybutton text={'>'} onClick={increaseMonth}/>}
            />
            <DiaryList diaryList={data}/>
        </div>
    )
}

export default Home;