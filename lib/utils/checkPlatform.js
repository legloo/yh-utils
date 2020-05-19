export const getPlatform = () => {
    var userAgent = navigator.userAgent.toLowerCase()
    var name = 'Unknown'
    if (userAgent.indexOf('win') > -1) {
        name = 'Windows'
    } else if (userAgent.indexOf('iphone') > -1) {
        name = 'Ios'
    } else if (userAgent.indexOf('mac') > -1) {
        name = 'Mac'
    } else if (userAgent.indexOf('x11') > -1 || userAgent.indexOf('unix') > -1 || userAgent.indexOf('sunname') > -1 || userAgent.indexOf('bsd') > -1) {
        name = 'Unix'
    } else if (userAgent.indexOf('linux') > -1) {
        if (userAgent.indexOf('android') > -1) {
            name = 'Android'
        } else {
            name = 'Linux'
        }
    } else {
        name = 'Unknown'
    }
    return name
}