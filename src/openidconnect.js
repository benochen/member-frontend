import {v4 as uuid} from "uuid";
import * as jose from 'jose'

import config from './config'
const client_id=config.openid_connect.clientid
export function start_auth() {

    console.log("start openid auth")
    let app_prefix="ECREADYS%20MEMBER%20"
    let nonce=uuid()
    let state=app_prefix+uuid()
    sessionStorage.setItem("state",state);
    let response_type="token id_token"
    let scope=config.openid_connect.scope
    console.log(scope)
    let redirect_uri=config.openid_connect.redirct_uri
    let url_prefix=config.openid_connect.url_prefix
    let complete_url=url_prefix+"response_type="+response_type+"&client_id="+client_id+"&scope="+scope+"&redirect_uri="+redirect_uri+"&state="+state+"&nonce="+nonce
    console.log(complete_url)
    window.location.href = complete_url
}

export function check_identity_server_response(){
    console.log("start check_identity")
    let authenticated={
        "authenticated": false,
        "message":""
    }
    console.log("authenticated define")
    let url_search_param=window.location.href.split('#')
    const searchParams = new URLSearchParams(url_search_param[1]);

    if( (!searchParams.has("state") ||  (!searchParams.has("access_token"))  || (!searchParams.has("id_token")))){
        console.log("some parameter is missing")
        authenticated.authenticated=false;
        authenticated.message="Authentication parameter is missing"
        return authenticated
    }
    console.log("start check state");
    authenticated=check_state(searchParams.get("state"))

    if (authenticated.authenticated===false && authenticated.message === ""){
        return authenticated
    }

    console.log("state successfully checked")

    authenticated=check_id_token(searchParams.get("id_token"))
    sessionStorage.setItem("id_token",searchParams.get("id_token"))
    sessionStorage.setItem("access_token",searchParams.get("access_token"))
    return authenticated


}

function check_id_token(id_token){
    let authenticated={
        "authenticated":false,
        "message":""
    }
    console.log("start check id_token")
    console.log(id_token)
    authenticated=verify_token(id_token)
    console.log(authenticated)
    return authenticated
}

async function verify_token(id_token){
    const JWKS = jose.createRemoteJWKSet(new URL(config.openid_connect.certs));
    let authenticated={
        "authenticated":false,
        "message":""
    }
    try {
        const {payload, protectedHeader} = await jose.jwtVerify(id_token, JWKS, {
            issuer: config.openid_connect.issuer,
            audience: config.openid_connect.clientid
        })
        console.log(protectedHeader)
        console.log(payload)
        authenticated.authenticated=true
        return authenticated
    }catch(e){
        authenticated.message=e.message
        return authenticated
    }
}

function check_state(state){

    if  ( !sessionStorage.getItem("state")===null){

        return {"authenticated":false,"message":"No state in session storage"}
    }
    console.log("session_storage('state')="+sessionStorage.getItem("state"))
    console.log("state="+encodeURI(state))
    if (sessionStorage.getItem("state")!=encodeURI(state)){
        return {"authenticated":false,"message":"State in the URL differs from register state"}
    }else{
        return {"authenticated":true,"message":""}
    }







}


