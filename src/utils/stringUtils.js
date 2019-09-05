const doArraysContainArrays = function (patterns, containers) {
    let accepted = true;
    for (let i=0; i<patterns.length; i++){
        let founded = false;
        for (let j=0; j<containers.length; j++) {
            if (containers[j].indexOf(patterns[i]) > -1){
                founded = true;
            }
        }
        if (!founded) {
           accepted = false;
        }
    }
    return accepted;
};


const divideTextToLines = function (text, maxLines, maxLength) {
    let strings = text.split(" ");
    let lines = [];

    let stringNumber = 0;
    for (let lineNumber=0; lineNumber<maxLines-1 && stringNumber<strings.length; lineNumber++){
        if (strings[stringNumber].length < maxLength) {
            let len = 0;
            let firstStringInLine = stringNumber;
            for (;stringNumber < strings.length; stringNumber++) {
                if (len + strings[stringNumber].length > maxLength)
                    break;
                else{
                    len += strings[stringNumber].length;
                }
            }
            lines.push(strings.slice(firstStringInLine, stringNumber).join(' '));
            text = text.substring(lines[lineNumber].length+1, text.length+1);
        }else{
            lines.push(text.substring(0, maxLength));
            text = text.substring(lines[lineNumber].length+1, text.length+1);
        }
    }

    if (text.length > 0 && text.length <= maxLength)
        lines.push(text);
    else if (text.length > 0 && text.length > maxLength)
        lines.push(text.substring(0, maxLength-2) + '..');

    return lines;
};


const SearchTimeout = class {
    constructor(method){
        this.method = method;
        this.searchTimeout1 = undefined;
        this.searchTimeout2 = undefined;
    }
    reset() {
        // send request after 0.3 seconds if there is no changes in the string
        // send request every 0.8 seconds while typing

        let timeoutLoad = function () {
            clearTimeout(this.searchTimeout1);
            clearTimeout(this.searchTimeout2);
            this.searchTimeout2 = undefined;
            this.method();
        }.bind(this);

        clearTimeout(this.searchTimeout1);
        this.searchTimeout1 = setTimeout(timeoutLoad, 300);
        if (this.searchTimeout2 === undefined)
            this.searchTimeout2 = setTimeout(timeoutLoad, 800);
    };
};


export { doArraysContainArrays, divideTextToLines, SearchTimeout }