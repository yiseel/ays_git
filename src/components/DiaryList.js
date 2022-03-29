import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from './../components/Mybutton';
import DiaryItem from "./DiaryItem";

const sortOptionList = [
    {value: "latest", name:"최신순"},
    {value: "oldest", name:"오래된 순"},
]

const filterOptionList = [
    {value: "all", name: "전부"},
    {value: "good", name: "좋은 감정"},
    {value: "bad", name: "안좋은 감정"}
]

// 상단 메뉴
const ControlMenu = React.memo(({value, onChange, optionList}) => {
    return ( 
        <select className="ControlMenu" value={value} onChange={(e)=> onChange(e.target.value)}>
            {optionList.map((it,idx)=> ( 
                <option value={it.value} key={idx}>
                 {it.name}
                </option>
            ))}
        </select>
    )
});

const DiaryList = ({diaryList}) => {
    const navigate = useNavigate();

    const [sortType, setSortType] = useState('latest');
    const [filter, setFilter] = useState("all");

    // 일기 정렬하기
    const getProcessedDiaryList = () => {
        
        const fliterCollBack = (item) => {
            if(filter === 'good'){
                return parseInt(item.emotion) <= 3;
            }else{
                return parseInt(item.emotion) > 3;
            }
        }
        const compare = (a,b) => { //비교함수를 만들어 정렬
            if(sortType === 'latest'){//최신순
                return parseInt(b.date) - parseInt(a.date);
            }else{ //오래된 순
                return parseInt(a.date) - parseInt(b.date);
            }
        }
        const copyList = JSON.parse(JSON.stringify(diaryList)) 
        // 일기 리스트 카피

        const filteredList = filter === 'all' ?  copyList : copyList.filter((it)=>fliterCollBack(it));
        
        const sortedList = filteredList.sort(compare);
        return sortedList;
    }

    return (
        <div className="DiaryList">

            <div className="menu_wrapper">
                <div className="left_col">
                    <ControlMenu 
                        value={sortType} 
                        onChange={setSortType}  
                        optionList={sortOptionList}
                    />
                    <ControlMenu
                        value={filter}
                        onChange={setFilter}
                        optionList={filterOptionList}
                    />

                </div>
                <div className="right_col">
                    <MyButton type="positive" text={"새 일기 쓰기"} onClick={()=>navigate('/new')}/>
                </div>
            </div>
            {getProcessedDiaryList().map((it)=>
                <DiaryItem key={it.id} {...it}/>
                // <div key={it.id}>{it.content} {it.emotion}</div>
            )}
        </div>
    );
};

DiaryList.defaultProps = {
    diaryList : [],
};

export default DiaryList;