import { compile } from 'handlebars'
import template from './html/home.handlebars'

export default (ctx, next) => {
    let user = 'Jonh'
    $('#app').html(compile(template)({
        user,
    }))
}