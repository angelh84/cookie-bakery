/* --------------- COOKIE BAKERY CLASS ------------------ */

var cookieBakery = (function () {

    // Create cookie
    var bake = function (cookie, expiryDays) {
        var dateFunc = new Date();
        dateFunc.setTime(dateFunc.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + dateFunc.toUTCString();
        document.cookie = cookie + ";" + expires + ";path=/";
    };

    // Delete cookie
    var eat = function (cookie) {
        var expires = "expires=Thu, 01 Jan 1970 00:00:00 UTC";
        document.cookie = cookie + "=;" + expires + ";path=/";
    };

    // Check for present cookie
    var check = function (name) {
        var cookie = document.cookie;
        var prefix = name + "=";
        var begin = cookie.indexOf("; " + prefix);
        if (begin == -1) {
            begin = cookie.indexOf(prefix);
            if (begin != 0) return null;
        } else {
            begin += 2;
            var end = document.cookie.indexOf(";", begin);
            if (end == -1) {
                end = cookie.length;
            }
        }
        return unescape(cookie.substring(begin + prefix.length, end));
    } 

    // Get specific cookie value
    var getCookieVal = function (cookieName) {
        var cookieJar = [];
        var temp = document.cookie.split(";");
        var key = "";
        var val = "";
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
