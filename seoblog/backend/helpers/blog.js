exports.smartTrim = (str, length, delim, appendix) =>{
    
        if (str.length <= length){

            return str;
        } 
        let trimmeStr = str.substr(0, length + delim.length)
        let lastDelimIndex = trimmeStr.lastIndexOf(delim)
        if(lastDelimIndex >= 0) trimmeStr = trimmeStr.substr(0, lastDelimIndex)
        
        if(trimmeStr) trimmeStr += appendix
        
        return trimmeStr

 };