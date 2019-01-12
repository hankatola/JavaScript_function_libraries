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
