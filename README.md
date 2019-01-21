# JavaScript_function_libraries

Contains math algorithms from my python work ported to JavaScript. All are pure js and have no external dependencies

Functions include:

    sum(a,b=0) {}
        returns summation of array or two numbers. Handles fraction class

    subtract(a,b=0) {}
        same as sum, but for subtraction. Necessary for fraction class math.

    multiply(a,b=1) {}
        see sum & subtract

    divide(a,b=1) {}
        see sum, subtract, & multiply

    power(a,b=1) {}
        same as Math.pow, but handles fraction objects

    round(n,p) {}
        works like ms excel & python round(), handles fraction objects

    fraction(n,d=1) {}
        creates fraction objects

    factorial(n) {}
        returns n!

    primes(n,all=true) {}
        a prime number generator

    primeFactors(n) {}
        returns an array of the prime factors of n

    nCr(n,r) {}
        returns combinations of size r from population n

    nPr(n,r) {}
        returns permuations of size r from population n

    binomial(n,k,p,cumulative=false,get=false,precision=false) {}
        returns prob of choosing 'k' out of 'n' population where prob of 'k' is p
        cumulative available. Returns object unless get === ('p' || 'v' || 'avg')
        precision defaults to 6 decimal places unless overriden.

    negative_binomial(r,k,p,cumulative=false,get=false,precision=false) {}
        returns prob of 'k' failures before 'r'th success when p(success) = 'p'
        Cumulative available. Precision defaults to 6 decimal places.
        Returns object unless get == ('p' || 'v' || 'avg')

    hypergeometric(N,n,r,k,cumulative=false,get=false,precision=false) {}
        Choose 'n' from a population of 'N', seeking 'k' target items when target
        population is 'r'.
        Cumulative available. Precision defaults to 6 decimal places.
        Returns object unless get == ('p' || 'v' || 'avg')

    poisson(rate_lambda,k,cumulative=false,precision=false) {}
        returns probability of 'k' events given mean & variance of 'rate_lambda'
        Cumulative available. Precision defaults to 6 decimal places.
        Does not return object since mean === variance === rate_lambda

    fibonacci(n,position=false) {}
        returns the n'th fibonacci number OR the position of the given fibonacci number
        if position === true

    bernoulli(n,entireRow=false) {}
        generates bernoulli numbers via the faulhaber triangle. See
            https://www.research-collection.ethz.ch/bitstream/handle/20.500.11850/69248/eth-4937-01.pdf?sequence=1&isAllowed=y
        for description of process.
        Returns the entire last row of the triangle if entireRow === true
