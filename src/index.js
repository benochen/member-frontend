import './styles/main.css'
import './styles/theme.scss'
import { compile } from 'handlebars'
import template_header from './html/header.handlebars'
import template_members from './html/members.handlebars'
import template_footer from './html/footer.handlebars'
import template_login from './html/login.handlebars'

import Members from "./members";
import {
    populate_edit_form,
    authenticate,
    load_table_members,
    load_app,
    check_authenticated,
    init_token,
    display_error
} from "./utils.js";
import {check_identity_server_response, logout, start_auth} from "./openidconnect";
import {get_all_members} from "./services_membres";
import 'bootstrap'
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import 'material-icons/iconfont/material-icons.css';

import $ from 'jquery'
import 'bootstrap'

console.log("compile ")
$("#header").html(compile(template_header));

Members()
if (check_authenticated()){
$("#body").html(compile(template_members));
}else{
$("#body").html(compile(template_login));
}
//$("#footer").html(compile(template_footer));


