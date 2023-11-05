let config={
    openid_connect:{
        "redirct_uri":"https://membres.chenal.int:63342/mockup-memebrs/membres.html",
        "url_prefix":"https://accounts.google.com/o/oauth2/v2/auth?",
        "clientid":"697261480006-6onc6cb2jq2un380ein2oh1p4alqqi8s.apps.googleusercontent.com",
        "scope":"openid%20email",
        "certs":'https://www.googleapis.com/oauth2/v3/certs',
        "issuer":'https://accounts.google.com'
},
    api:{
        "api_url":"https://membres.chenal.int:8000/membership/members",
    }
}




export default config