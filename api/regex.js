module.exports = {

    // REGEX
    // match name, only match alphabet, apostrophe, and dash
    nameRE: /^[a-z'][a-z\s'-.]+[a-z.]$/i,

    idRE : /^\d{16}$/,


    // messages
    invalidName: {"message":"Invalid name"},
    invalidId: {"message": "Invalid ID"},
    notFound: {"message": "no user found"}
};