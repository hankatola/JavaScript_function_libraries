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

    function get(x,get=0) {
        // git can be y, m, d, ym, or md
        // for example, x = 20181231
        if (get === 'd') {                          // return 31
            return x%100
        } else if (get === 'md') {                  // return 1231
            return x%10000
        } else if (get === 'm') {                   // return 12
            return Math.floor(get(x,'md') / 100)
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
        return year(a) * 1000 + month(a) * 100 + day(a)
    }

    function difMo(a,b) {
        /*
            md_a => 'month & day', d => 'day', m => 'month'
            ex. a = 20180228, b = 20171129
            ΦαΞΩΨδγηλμπρτσφωψ϶!ƶɸ×ƒΛΔΓβµ
        */
        let mths, yrs = difYr(a,b)
        md_a = get(a,'md')                          // a = 0228
        md_b = get(b,'md')                          // b = 1129
        d_a = get(a,'d')                            // x = 28
        d_b = get(b,'d')                            // y = 29
        m_a = get(a,'m')                            // mth_a = 02
        m_b = get(b,'m')                            // mth_b = 11

        /*
            Protect for last day of month a < day of month b and
            Feb having 29 days during leap years
        */
        let lstDayMnth
        if (get(a,'y') % 4 === 0 && m_a === 2) {    // it's feb in a leap year ∴
            lstDayMnth = 29                         // last day of month is day 29
        } else {
            lstDayMnth = days[m_a - 1]              // normal last day of month
        }
        if (d_a < d_b && d_a === lstDayMnth) {
           md_a = get(a,'m') * 100 + d_b
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
        return yrs * 12 + mths
    }

    function difMoExact(t,c) {

    }

    function difYr(a,b) {
        if (exact === true) {
            return difYrExact(a,b)
        } else {
        return Math.floor( (a-b) / 10000 )
        }
    }

    function difYrExact(t,c) {

    }

    function difDays(a,b) {
        if (exact === true) {
            return difDaysExact(a,b)
        } else {
        return Math.floor(difDaysExact(a,b))
        }
    }

    function difDaysExact(a,b) {
        a = date(a)
        b = date(b)
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

    let days = [31,28,31,30,31,30,31,31,30,31,30,31]
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
    } else if (period === 'y') {
        return difYr(a,b)
    } else if (period === 'w') {
        return difWk(a,b)
    } else {
        return difDays(a,b)
    }
}

function year(d=false) {return date(d).getFullYear()}

function month(d=false) {return date(d).getMonth() + 1}

function day(d=false) {return date(d).getDay()}

function hour(d=false) {return date(d).getHours()}

function minute(d=false) {return date(d).getMinutes()}

function second(d=false) {return date(d).getSeconds()}

function ms(d=false) {return date(d).getMilliseconds()}
