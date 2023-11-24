import {check_identity_server_response,start_auth} from "./openidconnect";
import{hide_menu} from "./utils";
import $ from "jquery";

export function check_authenticated(){

    let result=false
    if (sessionStorage.getItem("access_token") == undefined ){
        console.log("access token not found in session storage")
        console.log("Check token  in the URL fragment")
        return check_token_in_url_fragment()
    }else{
        return true;
    }
}


export async function check_token_in_url_fragment(){

    if(window.location.hash){
        console.log("A fragment is present in the url")
        let authenticated_obj={}
        authenticated_obj=await check_identity_server_response()
        return authenticated_obj.authenticated
    }else{
        console.log("No fragment present")
        return false;
    }

}
export function logout(){
    console.log("Start logout")
    sessionStorage.clear();
    if (window.location.href.includes("#")){
        window.location.href=window.location.href.split("#")[0]
    }
    window.location.href=window.location.href

}



export function add_openidconnect_button_event(){
    $('#openid').click(() => {
        console.log("Start auth on google")

        start_auth()
    })
}

export function add_logout_button_event(){
    $("#logout,#logout_menu").click(() => {
        console.log("logout")
        logout()
    })
}
