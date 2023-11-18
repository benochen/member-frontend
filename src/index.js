import './styles/main.css'
import './styles/theme.scss'

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
import Navigo from 'navigo'

import HomePage from './home'
import AboutPage from './about'
import Members from './members'
const router = new Navigo()

$("#header").load("./html/partials/header.ejs");

router
        .on('members', Members)
        .on('home', HomePage)
        .resolve()
