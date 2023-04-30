function FormateDate(date){
    const hr = date.getHours();
    const min = date.getMinutes();
    const dd = date.getDate();
    const mm = date.getMonth()+1;
    const yy = date.getFullYear();

    return(`${dd}/${mm}/${yy}|${hr}:${min}`)
 }

 function TimeFormatter(time1,time2) {
    const distance = time1 - time2
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    const min =  Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const hr = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const day = Math.floor(distance / (1000 * 60 * 60 * 24));
    const time =  {
        days: (day === 0) ? '' : `${day}d`,
        hour:(day===0 && hr ===0) ? '':`${hr}h`,
        min: (day === 0 && hr ===0 && min ===0) ? '' : `${min}m`,
        sec:`${seconds}s`
        
    }

    return `${time.days} ${time.hour} ${time.min} ${time.sec}`.trim();
}
 export {FormateDate,TimeFormatter}