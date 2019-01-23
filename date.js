function parseDate(d) {

}

function date(y=false,m=false,d=false) {

    function parseNum(x) {
        let y,m,d
        x = x.toString()
        y = x.substring(0,4)
        m = x.substring(4,6)
        d = x.substring(6,8)
        if (x.length < 8) {d = '01'}
        return y + '/' + m + '/' + d
    }
    let date
    if (y === false && m === false && d === false) {
        date = new Date()
    } else if (y.toString().length > 4 && m === false & d === false) {
        if (Number(y)%1 === 0) {
            y = parseNum(y)
            date = new Date(y)
        } else {
            date = new Date(y)
        }
    } else if (y.toString().length === 4 & m === false & d ===false) {
        date = new Date(y + '/1/1')
    } else if (m !== false && d === false) {
        date = new Date(y + '/' + m + '/1')
    } else {
        date = new Date(y + '/' + m + '/' + d)
    }
    return date
}

function dateDif(a,b=false,p='m',exact=false) {

    function getDate(x,get=0) {
        // git can be y, m, d, ym, or md
        // for example, x = 20181231
        if (get === 'd') {                          // return 31
            return x%100
        } else if (get === 'md') {                  // return 1231
            return x%10000
        } else if (get === 'm') {                   // return 12
            return Math.floor(getDate(x,'md') / 100)
        } else if (get === 'ym') {                  // return 201812
            return Math.floor(x/100)
        } else {                                    // return 2018
            return Math.floor(x/10000)
        }
    }

    function getPeriod(p) {
        p = p.toString().toLowerCase()
        q = p[0]
        if (q === 'm' || p === '2' || p === '12') {
            return 'm'
        } else if (p === '1' || q === 'y' || q === 'a') {
            return 'y'
        } else if (p === '3' || p === '52' || q === 'w') {
            return 'w'
        } else {
            return 'd'
        }

    }

    function yyyymmdd(a) {
        return year(a) * 10000 + month(a) * 100 + day(a)
    }

    function difMo(a,b) {
        /*
            md_a -> 'month & day', d -> 'day', m -> 'month'
            ex. a = 20180228, b = 20171129
        */
        let mths, yrs = difYr(a,b,true)
        md_a = getDate(a,'md')                          // a = 0228
        md_b = getDate(b,'md')                          // b = 1129
        d_a = getDate(a,'d')                            // x = 28
        d_b = getDate(b,'d')                            // y = 29
        m_a = getDate(a,'m')                            // mth_a = 02
        m_b = getDate(b,'m')                            // mth_b = 11

        /*
            Protect for last day of month a < day of month b
        */
        let lstDayMnth = lastDayOfMonth(m_a,getDate(a,'y'))
        if (d_a < d_b && d_a === lstDayMnth) {
            md_a = getDate(a,'m') * 100 + d_b
            d_a = d_b
        }

        /*
            Algorithm
        */
        if (md_a - md_b < 0) {
            mths = Math.floor((1200 + md_a - md_b)/100)
        } else {
            mths = Math.floor((md_a - md_b)/100)
        }
        mths += yrs * 12

        /*
            Exact, if called
        */
        if (exact === true) {
            mths = difMoExact(a,b,mths,m_a,m_b,d_a,d_b)
        }
        return mths
    }

    function difMoExact(a,b,mths,m_a,m_b,d_a,d_b) {
        let y, y_b = getDate(b,'y'), y_a = getDate(a,'y')
        m_b += mths
        if (m_b > 12) {
            y = Math.floor(m_b/12)
            m_b -= 12 * y
        }
        y_b += y
        b = y_b * 10000 + m_b * 100 + d_b
        m_b = getDate(b,'m')
        /*
            m_a === m_b ==> mth += (d_a - d_b) / max(i ∈ [m_a])
            m_a !== m_b ==> mth += (max(i ∈ [m_b]) - d_b) / max(i ∈ [m_b]) + d_a / max(i ∈ [m_a])

        */
        if (m_a === m_b) {                                      // easy
            mths += (d_a - d_b) / lastDayOfMonth(m_a,y_a)
        } else {                                                // harder
            let ldm_b = lastDayOfMonth(m_b,y_b)
            mths += ( (ldm_b - d_b) / ldm_b ) + ( d_a / lastDayOfMonth(m_a,y_a) )
        }
        return mths
    }

    function difYr(a,b,ignoreExact=false) {
        if (exact === true && ignoreExact === false) {
            return difYrExact(a,b)
        } else {
        return Math.floor( (a-b) / 10000 )
        }
    }

    function difYrExact(t,c) {

    }

    function difDays(a,b) {
        a = date(a)
        b = date(b)
        if (exact === true) {
            return difDaysExact(a,b)
        } else {
        return Math.floor(difDaysExact(a,b))
        }
    }

    function difDaysExact(a,b) {
        return (a - b) / (1000 * 60 * 60 * 24)
    }

    function  difWk(t,c) {
        if (exact === true) {
            return difWkExact(a,b)
        } else {
        return Math.floor(difWkExact(t,c))
        }
    }

    function difWkExact(t,c) {
        return difDaysExact(t,c) / 7
    }

    if (!a.valueOf()) {a = date(a)}
    if (!b.valueOf()) {b = date(b)}
    a = yyyymmdd(a)
    b = yyyymmdd(b)
    let aa = a, bb = b
    a = Math.max(aa,bb)
    b = Math.min(aa,bb)
    p = getPeriod(p)
    if (p === 'm') {
        return difMo(a,b)
    } else if (p === 'y') {
        return difYr(a,b)
    } else if (p === 'w') {
        return difWk(a,b)
    } else {
        return difDays(a,b)
    }
}

function year(d=false) {return date(d).getFullYear()}

function month(d=false) {return date(d).getMonth() + 1}

function day(d=false) {return date(d).getDate()}

function hour(d=false) {return date(d).getHours()}

function minute(d=false) {return date(d).getMinutes()}

function second(d=false) {return date(d).getSeconds()}

function ms(d=false) {return date(d).getMilliseconds()}

function lastDayOfMonth(m,y=1) {
    let days = [31,28,31,30,31,30,31,31,30,31,30,31]
    if (y % 4 === 0 && m === 2) {return 29} // ∵ it's february in a leap year
    return days[m - 1]                      // standard
}