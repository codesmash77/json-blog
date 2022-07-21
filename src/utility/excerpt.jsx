export const excerpt = (str) =>{
    if(str.length > 50){
        str = str.substring(0,50) + " ... ";
    }
    return str;
}