export const ReverseString = (str) => {
    let makeArray = str.split(" ")

    let container = ""

    for(let i = 0; i < makeArray.length; i++){
        container = container + (makeArray[i]).substr(0,1);
    }

    return container;
}