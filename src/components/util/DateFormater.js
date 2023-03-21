function FormateDate(date){
    const hr = date.getHours();
    const min = date.getMinutes();
    const dd = date.getDate();
    const mm = date.getMonth()+1;
    const yy = date.getFullYear();

    return(`${dd}/${mm}/${yy}|${hr}:${min}`)
 }

 export {FormateDate}