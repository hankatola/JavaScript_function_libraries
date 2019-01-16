function add(a,b=0) {
    // handles fractions
    if (a.type === 'fraction') {
        if (b.type !== 'fraction') {b = fraction(b)}
        let n = a.n * b.d + b.n * a.d
        let d = a.d * b.d
        return fraction(n,d)
    }
    // returns summation of an array or two numbers
    function addArray(x) {
        let z = 0
        for (let i in x) {z += x[i]}
        return z
    }
    if (typeof(a) === 'object') {a = addArray(a)}
    if (typeof(b) === 'object') {b = addArray(b)}
    return a + b
}

function subtract(a,b=0) {
    // fraction handler
    if (a.type === 'fraction') {
        if (b.type !== 'fraction') {b = fraction(b)}
        let n = a.n * b.d - b.n * a.d
        let d = a.d * b.d
        return fraction(n,d)
    }
    function subtractArray(x) {
        let z = 0
        for (let i in x) {z += x[i]}
        return z
    }
    if (typeof(a) === 'object') {a = subtractArray(a)}
    if (typeof(b) === 'object') {b = subtractArray(b)}
    return a - b
}

function multiply(a,b=1) {
    // fraction handler
    if (a.type === 'fraction') {
        if (b.type !== 'fraction') {b = fraction(b)}
        let n = a.n * b.n
        let d = a.d * b.d
        return fraction(n,d)
    }
    function gammaArray(x) {
        let a = 1
        for (let i in x) {a *= x[i]}
        return a
    }
    if (typeof(a) === 'object') {a = gammaArray(a)}
    if (typeof(b) === 'object') {b = gammaArray(b)}
    return a * b
}

function divide(a,b=1) {
    // fraction handler
    if (a.type === 'fraction') {
        if (b.type !== 'fraction') {b = fraction(b)}
        let n = a.n * b.d
        let d = a.d * b.n
        return fraction(n,d)
    }
    function divideArray(x) {
        let a = 1
        for (let i in x) {a /= x[i]}
        return a
    }
    if (typeof(a) === 'object') {a = divideArray(a)}
    if (typeof(b) === 'object') {b = divideArray(b)}
    return a / b
}

function power(a,b=1) {
    if (a.type === 'fraction') {
        if (b.type !== 'fraction') {b = fraction(b)}
        let n = Math.pow(Math.pow(a.n, b.n), 1/b.d)
        let d = Math.pow(Math.pow(a.d, b.n), 1/b.d)
        /*  if n or d are floats, evaluate float over float and return float result
            rounded to 12 decimal places. This is because one of our roots was not
            an integer, and so we can't simplify it accurately. The best thing we
            can do is to do the division and then hopefully round the error off the end
        */
        if (n%1 !== 0 || d%1 !== 0) {
            return round(n / d, 12)
        }
        return fraction(n,d)
    }
    return Math.pow(a,b)
}

function round(n,p=0) {
    // like ms excel round
    return Math.round(n * Math.pow(10,p)) / Math.pow(10,p)
}

function factorial(n) {
    // factorial function
    let x = 1
    for (let i = 2; i <= n; i++) {
        x = x * i
    }
    return x
}

function primes(n,all=true) {
    /*
        uses the Sieve of Eratosthenes to generate a list of prime numbers up to 'n', inclusive
    */
    let l = []
    let z = []
    let p = []
    for (let i=3; i<=n; i=i+2) {                    // creates list of odd integers beginning with 3
        l.push(i)
        z.push(0)
    }
    /*  loop through and record the multiples of the primes. For each number 'i' in
        list 'l', move in steps of 'i' through list 'z' and indicate that l[i]
        is composite. Each time we go through we must start at position i + c
        to ensure we move through 'z' correctly. We can stop when l[i] > max(l) / 3
        b/c of the way the algorithm works, and we can skip any number that is marked
        as composite via z[i] === 1.
    */
    let c = 0                                       // c is the counter and ensures we move through the list 'l' correctly
    for (let i = 0; i < Math.floor(l[l.length-1] / 3); i++) {
        if (z[i] === 0) {
            for (let j = l[i] + c; j in l; j = j + l[i]) {
                z[j] = 1
            }
        }
        c++
    }
    for (let i in z) {                              // create list of primes from l using z to indicate primeness
        if (z[i] === 0) {p.push(l[i])}
    }
    if (n >= 2) {                                   // add 2 to the list if it's big enough
        p.unshift(2)
    }
    if (all === false) {
        p = p[p.length - 1]
    }
    return p
}

function primeFactors(n) {
    // can ignore any number > sqrt(n)
    let p = primes(Math.floor(Math.sqrt(Math.abs(n))))
    let f = []
    // add 1 or -1 to the list
    if (n < 0) {
        f.push(-1)
        n = -n
    } else {f.push(1)
    }
    for (let i in p) {              // loop through prime list
        while (n % p[i] === 0) {    // while evenly divisible by prime 'p[i]'
            f.push(p[i])            // push p[i] to list &
            n /= p[i]               // make n smaller
        }
    }
    if (n > 1) {f.push(n)}          // push whatever we're left with - it's prime
    return f
}

function nCr(n,r) {
    // returns # of combinattions of size 'r' from population 'n'
    return factorial(n) / (factorial(r) * factorial(n-r))
}

function nPr(n,r) {
    // returns permutations of size r from population n
    return factorial(n) / factorial(n-r)
}

function binomial(n,k,p,cumulative=false,get=false,precision=false) {
    // choose k with probability p from population n
    // precision defaults to 10^-6. Cumulative available
    let q = 1 - p
    let ans = {p:0,avg:0,v:0}
    if (cumulative === true) {
        for (let i = 0; i < k + 1; i++) {
            ans.p += nCr(n,i) * Math.pow(p,i) * Math.pow(q, n-i)
        }
    }
    else {
        ans.p = nCr(n,k) * Math.pow(p,k) * Math.pow(q,n-k)
    }
    ans.avg = p * n
    ans.v = ans.avg * q
    if (precision === false) {precision = 6}
    ans.p = round(ans.p,precision)
    ans.avg = round(ans.avg,precision)
    ans.v = round(ans.v,precision)
    if (get) {ans = ans[get]}
    return ans
}

function negative_binomial(r,k,p,cumulative=false,get=false,precision=false) {
    // returns p of k failures before the 'r'th success where p(success) = 'p'.
    // Cumulative available, precision defaults to 6 decimal places
    let q = 1 - p
    let x = r + k - 1
    let y = r - 1
    let ans = {p:0,avg:0,v:0}
    if (cumulative===true) {
        for (let i = 0; i < k + 1; i++) {
            x = r + i - 1
            ans.p += nCr(x,y) * Math.pow(p,r) * Math.pow(q,i)
        }
    } else {
        ans.p = nCr(x,y) * Math.pow(p,r) * Math.pow(q,k)
    }
    ans.avg = q / p
    ans.v = ans.avg / p
    if (precision===false) {precision=6}
    ans.p = round(ans.p,precision)
    ans.avg = round(ans.avg,precision)
    ans.v = round(ans.v,precision)
    if (get) {ans = ans['get']}
    return ans
}

function hypergeometric(N,n,r,k,cumulative=false,get=false,precision=false) {
    // Choosing 'n' out of a total population of 'N', returns the probability of
    // returning 'k' targets when target population is 'r'. Precision defaults to 6
    // decimal places. Cumulative available.
    let N_minus_r = N - r
    let n_minus_k = n - k
    let ans = {p:0,avg:0,v:0}
    if (cumulative===true) {
        for (let i = 0; i < k + 1; i++) {
            n_minus_k = n - i
            ans.p += (nCr(r,i) * nCr(N_minus_r,n_minus_k)) / nCr(N,n)
        }
    } else {
        ans.p = (nCr(r,k) * nCr(N_minus_r,n_minus_k)) / nCr(N,n)
    }
    ans.avg = n * r / N
    ans.v = ans.avg * (1 - r / N) * ((N - n) / (N - 1))
    if (precision===false) {precision=6}
    ans.p = round(ans.p,precision)
    ans.avg = round(ans.avg,precision)
    ans.v = round(ans.v,precision)
    if (get) {ans = ans['get']}
    return ans
}

function poisson(rate_lambda,k,cumulative=false,precision=false) {
    // returns probability of 'k' events given mean & variance of 'rate_lambda'.
    // precision defaults to 6 decimals, cumulative available.
    // does not return object since avg = var = rate_lambda
    let p = 0
    if (cumulative===true) {
        for (let i = 0; i < k + 1; i++) {
            p += (Math.pow(rate_lambda,i) * Math.pow(Math.E,-rate_lambda)) / factorial(i)
        }
    } else {
        p = (Math.pow(rate_lambda,k) * Math.pow(Math.E,-rate_lambda)) / factorial(k)
    }
    if (precision===false) {precision=6}
    return round(p,precision)
}

function fibonacci(n,position=false) {
    // returns the n'th fibonacci number or the position of fibonacci number 'n'
    // if position === true
    let x = (1 + Math.sqrt(5)) / 2
    let y = (1 - Math.sqrt(5)) / 2
    let ans = 0
    if (position===false) {
        n++
        ans = (Math.pow(x,n) - Math.pow(y,n)) / Math.sqrt(5)
        ans = Math.round(ans)
    } else {
        ans = Math.log(n * Math.sqrt(5)) / Math.log(x)
        ans = Math.floor(ans) - 1
    }
    return ans
}

function bernoulli(n,entireRow=false) {
//  Academic paper describing process can be found at:
//      https://www.research-collection.ethz.ch/bitstream/handle/20.500.11850/69248/eth-4937-01.pdf?sequence=1&isAllowed=y
//  For the purposes of the algorithm, the triangle (here 't') has been flipped on the x-axis so that the bernoulli number
//  ends up in the last column of the row, rather than the first. This switch means that the faulhaber coefficient in
//  [row(x),column(y)] = [x-1,y] * [x,y], rather than [x-1,y-1] * [x,y] as described in the paper. Also it makes more sense
//  to me.
    function sum(a) {
        // returns summation of array 'a' using math.add & math.fraction
        function add(a,b) {
            return math.add(math.fraction(a), math.fraction(b))
        }
        return a.reduce(add,0)
    }
    let t = []
    for (let i = 0; i < n + 1; i++) {
        t.push(0)
    }
    // creates faulhaber triangle row by row
    for (let row = 0; row < n + 1; row++) {
        let i = 0
        for (let column = row + 1; column >= 1; column--) {
            t[i] = math.multiply(math.fraction(t[i]), math.fraction(row,column))
            i++
        }
        t[row] = math.add(math.fraction(1), -math.fraction(sum(t)))
    }
    if (entireRow === false) {t = t[t.length-1]}
    return t
}

function summation(n,x=1) {
    // Returns the summation of the first 'n' numbers to the 'x'th power (if entered)
    // using Bernoulli's formula. See https://en.wikipedia.org/wiki/Faulhaber%27s_formula
    // for a description.
    let Bn = bernoulli(x,true)
    let r = Bn.length
    let i = 0
    x = 0
    for (let j = 0; j < r; j++) {
        x += math.multiply(math.fraction(Bn[j]),math.fraction(math.pow(n, r - i)))
        i += 1
    }
    return round(x)
}

function fraction(n,d=1) {
    /*
        Capabilities:
            Returns fractions from integers, floats, or strings.
            However, will return rounding errors if repeating decimals
            are passed - i.e. 1/7.
    */
    function clean(x) {
        let powOfTen = 0, type = ''
        if (x.type === 'fraction') {return x}
        if (typeof(x) === 'string') {x = eval(x)}
        if (x%1 !== 0) {        // x is a float
            x = x.toString()
            powOfTen = x.length - x.indexOf('.') - 1
            x = parseFloat(x) * Math.pow(10, powOfTen)
            type = 'int'
        }
        else if (x%1 === 0) {        // x is an integer
            // it's an integer
            type = 'int'
        } else {                                                // x is an invalid value
            type = 'error'
        }
        x = {'x':x,'type':type,'powOfTen':powOfTen}
        return x
    }

    function simplify(n,d) {
        // returns simplified fraction object
        n = primeFactors(n)                     // numerator
        d = primeFactors(d)                     // denominator
        for (let i = 0; i < n.length; i++) {    // simplifies n & d
            if (d.indexOf(n[i]) != -1) {
                d.splice(d.indexOf(n[i]),1)
                n.splice(i,1)
                i--
            }
        }
        n = multiply(n)
        d = multiply(d)
        return {'n':n,'d':d,'print':n.toString() + ' / ' + d.toString(),'type':'fraction'}
    }

    function makeFraction(n,d) {
        if (n.powOfTen !== d.powOfTen) {
            // adjust n or d
            if (n.powOfTen > d.powOfTen) {          // adjust d
                d.x = d.x * Math.pow(10, n.powOfTen - d.powOfTen)
            } else {                                // adjust n
                n.x = n.x * Math.pow(10, d.powOfTen - n.powOfTen)
            }
        }
        return simplify(n.x,d.x)
    }
    n = clean(n)
    d = clean(d)
    if (n.type === 'error' || d.type === 'error') {return 'error - invalid data type'}
    return makeFraction(n,d)
}