import React from 'react';

const EmotionItem = ({
    emotion_id, 
    emotion_img, 
    emotion_descript, 
    onClick, 
    itselected
    }) => {
    return (
        <div onClick={()=> onClick(emotion_id)} 
            className={["EmotionItem", itselected ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off`].join(" ")
            
            }>
            <img src={emotion_img}/>
            <span>{emotion_descript}</span>
        </div>
    )
}

export default React.memo(EmotionItem);