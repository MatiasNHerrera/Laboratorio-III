$(document).ready(function(){
    $("#loginForm").bootstrapValidator({
        message: 'El valor no es válido',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            mail: {
                validators: {
                    notEmpty: {
                        message: "*Campo vacio!, por favor complete el campo correo",
                    },
                    emailAddress: {
                        message: 'No es un formato E-Mail'
                    }
                    
                    
                }
            },
            clave: {
                validators: {
                    notEmpty: {
                       message : "*Campo vacio!, por favor complete el campo clave",
                       
                       
                    },
                    stringLength: {
                        min: 4,
                        max: 8,
                        message: 'Por favor, ingrese entre 4 y 8 caracteres!!!'
                    }
                }
            }
            
        }
    })
});