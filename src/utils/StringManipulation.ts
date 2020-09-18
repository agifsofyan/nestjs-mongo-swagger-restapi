export const ReverseString = (str) => {
    let makeArray = str.split(" ")

    let container = ""

    for(let i = 0; i < makeArray.length; i++){
		if (/^([a-zA-Z]{1,})$/.test(makeArray[i]) ) {
	        container += (makeArray[i]).substr(0,1);
		}else{
			container += (makeArray[i]).substr(0, (makeArray[i]).length);
    	}
    }

    return container.toUpperCase();
}

export const Slugify = (str) => {
    return str
        .toString()                     // Cast to string
        .toLowerCase()                  // Convert the string to lowercase letters
        .normalize('NFD')       // The normalize() method returns the Unicode Normalization Form of a given string.
        .trim()                         // Remove whitespace from both sides of a string
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}

export const RandomStr = () => {
	return Math.random().toString(36).substring(7);
}

export const ForceToCode = (str) => {
 	if (! /^([A-Z0-9-]{1,})$/.test(str)) {
 		return str + '-1'
 	} else {
 		var dashIndex = str.indexOf("-")

		var afterDash = str.substr(dashIndex);

 		if (/^([0-9]{1,})$/.test(afterDash)) {
 			var toNumber = Number(afterDash) + 1
 			return str + '-' + toNumber
 		}else{
 			return str + '-2'
 		}

 		return afterDash
 	}
}
