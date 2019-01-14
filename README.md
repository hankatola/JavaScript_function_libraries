# JavaScript_function_libraries

Contains math algorithms from my python work ported to JavaScript.

Functions include:
    round(n,p)
        works like ms excel & python round()
    factorial(n)
        returns n!
    primes(n,all=true)
        a prime number generator
    nCr(n,r)
        returns combinations of size r from population n
    nPr(n,r)
        returns permuations of size r from population n
    binomial(n,k,p,cumulative=false,get=false,precision=false)
        returns prob of choosing 'k' out of 'n' population where prob of 'k' is p
        cumulative available. Returns object unless get === ('p' || 'v' || 'avg')
        precision defaults to 6 decimal places unless overriden.