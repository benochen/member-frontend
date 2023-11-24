import './styles/main.css'
import './styles/theme.scss'
import { compile } from 'handlebars'
import template_header from './html/header.handlebars'
import template_members from './html/members.handlebars'
import template_footer from './html/footer.handlebars'
import template_login from './html/login.handlebars'

import {display_members} from "./members";

import {check_authenticated, add_openidconnect_button_event, add_logout_button_event} from "./service_authentication";
import {get_all_members} from "./services_membres";
import 'bootstrap'
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import 'material-icons/iconfont/material-icons.css';

import $ from 'jquery'
import 'bootstrap'
import {hide_menu, load_app} from "./utils";
import {start_auth} from "./openidconnect";

console.log("compile ")
$("#header").html(compile(template_header));


console.log("AUTHENTICATED="+check_authenticated())
$("#header").append("<div id='body'></div>")
if (await check_authenticated()){

    $("#body").html(compile(template_members));
    load_app("body_container", "menu_content", "container_login", "table_members", "alert_container")
    display_members()
    add_logout_button_event()
}else{
    console.log("Load login")


    $("#body").html(compile(template_login));
    hide_menu("menu_content" )
add_openidconnect_button_event()

}


//$("#footer").html(compile(template_footer));


