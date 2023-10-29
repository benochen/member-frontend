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

const router = new Navigo()

router
    .on('/', HomePage)
    .on('/about', AboutPage)
    .resolve()




let authenticated=false;

function add_member(){

    let first_name=$("input[name=first_name]").val()
    let last_name=$("input[name=last_name]").val()
    let phone=$("input[name=phone]").val()
    console.log(phone)
    let mail=$("input[name=mail]").val()
    let adress=$("input[name=adress]").val()
    let zip=$("input[name=code_postal]").val()
    let authorization_rs=$("#authorized_rs option:selected").text()
    console.log(authorization_rs)
    let authorization_web=$("#authorized_web option:selected").text()
    let authorization_press= $("#authorized_press option:selected").text()
    let cotisation= $("input[name=cotisation]").val()
    let action_col="<td className='action_column'> <span class='action_column'> <a id='button_edit_10' href='#modal1' class='btn-floating btn-small btn-modal waves-effect waves-light red edit_10'><i class='material-icons'>edit</i></a> <a class='btn-floating btn-small waves-effect waves-light red remove_10'><i class='material-icons'>remove</i></a></span> </td></tr>"
    let line_html="<tr><td>bc</td><td>"+first_name +"</td><td>"+last_name+"</td><td>"+phone+"</td><td>"+mail+"</td><td>"+adress+"</td><td>"+zip+"</td><td>"+authorization_rs+"</td><td>"+authorization_web+"</td><td>"+authorization_press+"</td><td>"+cotisation+"</td>"
    let line=line_html+action_col
    console.log(line_html+action_col)
    $("#table_members > tbody:last-child").append(line)

}

function hide_form(){
    $(form_add).hide();

}

function show_form(){
    $(form_add).hide();

}




$(document).ready(function(){
    $('select').formSelect();
});
$(document).ready(async ()=>{
    console.log("check authenticated")
    $(".menu_content").css("display","none")
    $("#body_container").css("display","none")
    $("#logout_button").css("display","none")
    init_token()
    let authenticated=check_authenticated();
    let authenticated_obj={}
    console.log(authenticated)
    if (authenticated){
        load_app("body_container","menu_content","container_login","table_members","alert_container")

    }else{
        if (window.location.hash) {
            console.log("authenticated hash")
            authenticated_obj = await check_identity_server_response()
            console.log(authenticated_obj)
            if (authenticated_obj.authenticated){
                load_app("body_container","menu_content","container_login")
                let api_response=await get_all_members()
                if (api_response.status === 200){
                    console.log("On affiche les membres")
                    load_table_members(api_response,"table_members")
                }else{
                    console.log("On affiche erreur")
                    display_error(api_response.data,"alert_container")
                }


            }else{
                console.log("Not authenticated")
                $("#container_login").css("display","grid")
            }
        }




    }

    $('#login').click( async ()=> {
        let auth_success = await authenticate();

        if(auth_success){
            console.log("auth success")
            load_app("body_container","menu_content","container_login","table_members","alert_container")
        }else{
            alert("AUTH FAILED");
        }

    });

    $('#openid').click(()=>{
        console.log("Start auth on google")

        start_auth()
    })

    $("#logout,#logout_menu").click(()=>{
        console.log("logout")
        logout()
    })

    $("[id^=edit_]").click(function(){
        console.log("click edit")
        const current=$(this)
        console.log(current)
        const name=$(this).attr("id");
        console.log(name)
        $("#modal1").modal('open')
        const line_number=name.split("_")[1]

        let entries=new Object();
        entries["last_name"]= $("#table_members").find("tr:eq("+line_number+") td:eq(1)").text();
        entries["first_name"]= $("#table_members").find("tr:eq("+line_number+") td:eq(2)").text();
        entries["mail"]= $("#table_members").find("tr:eq("+line_number+") td:eq(4)").text();
        entries["phone"]= $("#table_members").find("tr:eq("+line_number+") td:eq(3)").text();
        entries["adress"]= $("#table_members").find("tr:eq("+line_number+") td:eq(5)").text();
        entries["code_postal"]= $("#table_members").find("tr:eq("+line_number+") td:eq(6)").text();
        entries["authorized_web"]= $("#table_members").find("tr:eq("+line_number+") td:eq(7)").text();
        entries["authorized_toto"]= $("#table_members").find("tr:eq("+line_number+") td:eq(8)").text();
        entries["authorized_press"]= $("#table_members").find("tr:eq("+line_number+") td:eq(9)").text();
        console.log(entries)
        populate_edit_form(entries,"form_modal")
    })


    $('.select').formSelect();
    //  $(add).click(function(){
    //$(form_add).show(500);


//});


    $(document).ready(function(){
        $('.modal1').modal();
    });

    $(valid).click(function(){
        add_member();
    });

    $("[id^=button_edit]").click(function(){
        const name=$(this).attr("id");

        const line_number=name.split("_")[2];

        let entries=new Object();
        entries["last_name"]= $("#table_members").find("tr:eq("+line_number+") td:eq(1)").text();
        entries["first_name"]= $("#table_members").find("tr:eq("+line_number+") td:eq(2)").text();
        entries["mail"]= $("#table_members").find("tr:eq("+line_number+") td:eq(4)").text();
        entries["phone"]= $("#table_members").find("tr:eq("+line_number+") td:eq(3)").text();
        entries["adress"]= $("#table_members").find("tr:eq("+line_number+") td:eq(5)").text();
        entries["code_postal"]= $("#table_members").find("tr:eq("+line_number+") td:eq(6)").text();
        entries["authorized_web"]= $("#table_members").find("tr:eq("+line_number+") td:eq(7)").text();
        entries["authorized_toto"]= $("#table_members").find("tr:eq("+line_number+") td:eq(8)").text();
        entries["authorized_press"]= $("#table_members").find("tr:eq("+line_number+") td:eq(9)").text();
        console.log(entries)
        populate_edit_form(entries,"form_modal")


    });
});
$(window).on('load', () => {
    $('#app').html('<h1>We are ready!</h1> <span class="material-icons">pie_chart</span> <a class="waves-effect waves-light btn"><i class="material-icons left">file_download</i>export</a>     ')
    $('.tooltipped').tooltip();
    $(document).on('click', '[data-path]', (e) => {
        e.preventDefault()
        router.navigate($(e.target).attr('href'))
    })
})