export function populate_edit_form(entries,form_name){


    for (const[key,value] of Object.entries(entries)) {
        if ($("form[name='" + form_name + "'] input[name='"+key+"'").length) {
            $("form[name='" + form_name + "'] input[name='" + key + "'").val(entries[key]);
        }

        if( key.startsWith("authorized_")   ){
            let selector="form[name='" + form_name + "']"
            console.log('#form_modal #'+key+' option[value="'+value+'"]')
            var l=$('#form_modal #'+key+' option[value="'+value+'"]')
            // var l=$('#f'+form_name+' #'+key+' option[value="'+value+'"')
            console.log("key="+key)
            console.log("debut dump l")
            console.log(l)
            console.log("fin dump l")
            console.log("debupt demon [0] selected")

            console.log("fin demon [0] selected")
            console.log(l.length)
            if (l.length > 0) {
                console.log(l)
                $(l[0]).attr('selected',true)
            }
        }


    }




}

export async function authenticate(){
    alert("start auth")
    let auth=new Promise((resolve, reject) => {
        setTimeout(() => resolve(true), 2000)
    });
    return auth
}

export function hide_menu(menu_id){
    console.log("hiding menuuuu")
    $('.'+menu_id).css('display','none');
    $('.menu_container').css('background-color','#FFFFFF');
    $('#logout').css('display','none')
}
export function load_app(member_container,menu_container,login_container,table_selector,error_box_selector){
    $('#'+login_container).css('display','none');
    $('#'+member_container).css('display','block');
    $('.'+menu_container).css('display','grid');
    $("#logout_button").css("display","block")
    $("#table_members").css("display",'none')
    $("#alert_container").css('display',"none")
}

export function display_error(message,error_box_selector) {
    $("#alert_container").css('display',"block")
    console.log(message)
    $("#alert_container span").text(message)
}
export function load_table_members(members,table_selector){
    $("#table_members").css("display","block")
    console.log("start fill table with members")
    console.log(members.data)
    let i=1;
    members.data.forEach((member)=>{
        let line="<tr>"
        let icon=member.first_name.substring(0,1)+member.last_name.substring(0,1)
        line+="<td>"+icon+"</td>"
        line+="<td>"+member.last_name+"</td>"
        line+="<td>"+member.first_name+"</td>"
        line+="<td>"+member.phone+"</td>"
        line+="<td>"+member.mail+"</td>"
        line+="<td>"+member.adresse+"</td>"
        line+="<td>"+member.ville+"</td>"
        line+="<td>"+member.zip+"</td>"
        line+="<td>"+member.authorized_rs+"</td>"
        line+="<td>"+member.authorized_web+"</td>"
        line+="<td>"+member.authorized_press+"</td>"
        line+="<td>"+member.cotisation+"</td>"
        line+='<td>       <span class="action_column">\n' +
            '                    <a id="edit_'+i+'" class="btn-floating btn-small waves-effect waves-light red edit_'+i+'"><i class="material-icons">edit</i></a>\n' +
            '                    <a class="btn-floating btn-small waves-effect waves-light red remove_'+i+'"><i class="material-icons">remove</i></a>\n' +
            '                       </span>\n' +
            '                </td></td></tr>'
        console.log(line)
        $("#"+table_selector+" tbody:last").append(line)
        i++


    })

}




export function init_token(){
    let token={
        "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        "status":"INVALID"
    }
    localStorage.setItem("token",JSON.stringify(token))
}