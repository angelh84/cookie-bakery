/* --------------- COOKIE BAKERY CLASS ------------------ */

const cookieBakery = (function () {

    // Create cookie
    let bake = function (cookie, expiryDays) {
        let dateFunc = new Date();
        dateFunc.setTime(dateFunc.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + dateFunc.toUTCString();
        document.cookie = cookie + ";" + expires + ";path=/";
    };

    // Delete cookie
    let eat = function (cookie) {
        let expires = "expires=Thu, 01 Jan 1970 00:00:00 UTC";
        document.cookie = cookie + "=;" + expires + ";path=/";
    };

    // Check for present cookie
    let check = function (name) {
        let cookie = document.cookie;
        let prefix = name + "=";
        let begin = cookie.indexOf("; " + prefix);
        if (begin == -1) {
            begin = cookie.indexOf(prefix);
            if (begin != 0) return null;
        } else {
            begin += 2;
            let end = document.cookie.indexOf(";", begin);
            if (end == -1) {
                end = cookie.length;
            }
        }
        return unescape(cookie.substring(begin + prefix.length, end));
    } 

    // Get specific cookie value
    let getCookieVal = function (cookieName) {
        let cookieJar = [];
        let temp = document.cookie.split(";");
        let key = "";
        let val = "";
        for (i = 0; i < temp.length; i++) {
            key = temp[i].split("=")[0].trim();
            val = temp[i].split("=")[1];
            cookieJar[key] = val;
        }
        return cookieJar[cookieName];
    };

    return {
        bake: bake,
        eat: eat,
        check: check,
        getCookieVal: getCookieVal
    }

})();
