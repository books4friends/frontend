export function doArraysContainArrays(patterns, containers) {
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
}