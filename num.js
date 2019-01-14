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
    let ans = {
        p:0.0,
        avg:0.0,
        v:0.0
    }
    if (cumulative === true) {
        ans.p = 0

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