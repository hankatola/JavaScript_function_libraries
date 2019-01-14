function round(n,p) {
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
        to ensure we move through 'z' correctly.
    */
    let c = 0                                       // c is the counter and ensures we move through the list 'l' correctly
    for (let i in l) {
        for (let j=l[i]+c; j in l; j=j+l[i]) {
            z[j] = 1
        }
        c++
    }
    for (let i in z) {                              // create list of primes from l using z to indicate primeness
        if (z[i] === 0) {p.push(l[i])}
    }
    if (n >= 2) {                                   // add 2 to the list if it's big enough
        p.unshift(2)
    }
    if (all===false) {
        p = p[p.length - 1]
    }
    return p
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

