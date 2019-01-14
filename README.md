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
    negative_binomial(r,k,p,cumulative=false,get=false,precision=false)
        returns prob of 'k' failures before 'r'th success when p(success) = 'p'
        Cumulative available. Precision defaults to 6 decimal places.
        Returns object unless get == ('p' || 'v' || 'avg')
    hypergeometric(N,n,r,k,cumulative=false,get=false,precision=false)
        Choose 'n' from a population of 'N', seeking 'k' target items when target
        population is 'r'.
        Cumulative available. Precision defaults to 6 decimal places.
        Returns object unless get == ('p' || 'v' || 'avg')
    poisson(rate_lambda,k,cumulative=false,precision=false)
        returns probability of 'k' events given mean & variance of 'rate_lambda'
        Cumulative available. Precision defaults to 6 decimal places.
        Does not return object since mean === variance === rate_lambda
    fibonacci(n,position=false)
        returns the n'th fibonacci number OR the position of the given fibonacci number
        if position === true