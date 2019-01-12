function primes(n,all=true) {
    let l = []
    let z = []
    let p = []
    for (let i=3; i<=n; i=i+2) {
        l.push(i)
        z.push(0)
    }
    let c = 0
    for (let i in l) {
        for (let j=l[i]+c; j in l; j=j+l[i]) {
            z[j] = 1
        }
        c++
    }
    for (let i in z) {
        if (z[i] === 0) {p.push(l[i])}
    }
    if (n >= 2) {
        p.unshift(2)
    }
    if (all===false) {
        p = p[p.length - 1]
    }
    return p
}
