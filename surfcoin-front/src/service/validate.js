export const validateString = ( string ) =>  {
    if(string.trim().length < 3) return 'String needs to be longer that 3 characters...'
    if(string.trim().length > 20) return 'String needs to be no longer that 20 characters...'
    else return true
}