$(document).ready(function() {
    $('#alertClave').hide();
    $("#alertClave2").hide();
    $('#alertCorreo').hide();
    $('#alertNombre').hide();
    $('#alertApellido').hide();
    $('#alertLegajo').hide();
    $('#alertFoto').hide();
    $('#confirm').hide();

    $('#registroForm').bootstrapValidator({
        message: 'El valor no es válido',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            email: {
                validators: {
                    notEmpty: {
                        message: "*Campo vacio!, por favor complete el campo correo",
                    },
                    emailAddress: {
                        message: 'No es un formato E-Mail'
                    }
                    
                    
                }
            },
            legajo:{
               validators:{
                notEmpty: {
                    message: $('#alertLegajo').show(),
                },
                numeric: {
                    message: "El legajo debe ser un numero"
                    
                },
                stringLength: {
                    min: 3,
                    max: 6,
                    message: 'El legajo debe tener entre 3 y 6 digitos'
                }
               }
            },
            clave: {
                validators: {
                    notEmpty: {
                        message: "*Campo vacio!, por favor complete el campo clave",
                    },
                    stringLength: {
                        min: 4,
                        max: 8,
                        message: 'Por favor, ingrese entre 4 y 8 caracteres!!!'
                    },
                    identical: {
                        field: 'confirmClave',
                        message: 'La contrase&ntilde;a y su confirmación no coinciden!'
                    }
                }
            },
            confirmClave:{
                validators: {
                    notEmpty: {
                        message: "*Campo vacio!, por favor complete el campo confirmar clave",
                    },
                    stringLength: {
                        min: 4,
                        max: 8,
                        message: 'Por favor, ingrese entre 4 y 8 caracteres!!!'
                    },
                    identical: {
                        field: 'clave',
                        message: 'La contrase&ntilde;a y su confirmaci&oacute;n no coinciden!'
                    }
                }
            },
            apellido:{
                validators: {
                    notEmpty: {
                        message: "*Campo vacio!, por favor complete el campo apellido",
                    },
                    stringLength: {
                        
                        max: 15,
                        message: 'El m&aacuteximo del campo apellido es de 15 caracteres!'
                    },
                
                     
                }
            },
            nombre:{
                validators: {
                    notEmpty: {
                        message: "*Campo vacio!, por favor complete el campo nombre",
                    },
                    stringLength: {
                        max: 10,
                        message: 'El m&aacuteximo del campo apellido es de 10 caracteres!'
                    },
                
                     
                }
            },
            imgFoto:{
                validators: {
                    notEmpty: {
                        message: "*Campo vacio!, por favor complete el campo foto",
                    },
                    file: {
                        extension: 'jpg,png',
                        type: 'image/jpeg,image/png',
                        message: 'El archivo seleccionado no es v&aacute;lido!'
                    }
                }
            },
            perfil:{
                validators:{
                    notEmpty:{
                        message : "Por favor seleccione un tipo de perfil",
                    }
                }
            }   
    }
 });
});