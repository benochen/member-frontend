import './styles/main.css'
import './styles/theme.scss'
import { compile } from 'handlebars'
import template from './html/header.handlebars'

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

console.log("compile")
$("#header").html(compile(template));
