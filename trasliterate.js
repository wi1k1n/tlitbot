module.exports = {
    lat2rus: function(txt) {
        return _lat2rus(txt);
    },
    rus2lat: function(txt) {
        return _rus2lat(txt);
    }
};

const rusChars = ['Й','Ц','У','К','Е','Н','Г','Ш','Щ','З','Ф','Ы','В','А','П','Р','О','Л','Д','Я','Ч','С','М','И','Т','Ь','й','ц','у','к','е','н','г','ш','щ','з','ф','ы','в','а','п','р','о','л','д','я','ч','с','м','и','т','ь','Ж',':','Ё','ё','Х','х','Ъ','ъ','Э','э','Б','б','Ю','ю','ж',',','.','?','"','№',';'];
const engChars = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m',':','\^','~','`','\{','\[','\}','\]','"',"'",'<',',','>','\.',';','\?','\/','&','@','#','\$'];
const corrER = Object.fromEntries(engChars.map((e, i) => [e, rusChars[i]]));
const corrRE = Object.fromEntries(rusChars.map((r, i) => [r, engChars[i]]));

function _lat2rus(txt) {
    let ret = '', c = '';
    for (let i = 0; i < txt.length; i++) {
        c = txt[i];
        ret += c in corrER ? corrER[c] : c;
    }
    return ret;
}

function _rus2lat(txt) {
    let ret = '', c = '';
    for (let i = 0; i < txt.length; i++) {
        c = txt[i];
        ret += c in corrRE ? corrRE[c] : c;
    }
    return ret;
}