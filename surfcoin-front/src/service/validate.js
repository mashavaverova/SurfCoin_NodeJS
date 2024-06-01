

export const validateString = ( string ) =>  {
    if(string.trim().length < 3) 
        return 'String needs to be longer that 3 characters...'
    if(string.trim().length > 20) 
        return 'String needs to be no longer that 20 characters...'
    else return true
}

export const validateNum = ( num ) =>  {
    if(typeof +num !== "number") 
        return 'Amount is not a number...'
    if(num < 1) 
        return 'Amount has to be more than 0 ...'
    else return true
}