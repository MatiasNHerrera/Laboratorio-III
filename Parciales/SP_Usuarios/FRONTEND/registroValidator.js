$(document).ready(function(){
    $("#registroForm").bootstrapValidator({
        message: 'El valor no es válido',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            mail:{
                validators:{
                    notEmpty:{
                        message:'La clave no debe estar vacia'
                    },

                    emailAddress:{
                        message:'El formato no es valido'
                    }
                }
            },
            nombre:{
                validators:{

                    notEmpty:{
                        message:'La clave no debe estar vacia'
                    },

                    stringLength:{
                        max:10,
                        message:'El nombre debe contener maximo 10 caracteres'
                    }
                }
            },

            apellido:{
                validators:{

                    notEmpty:{
                        message:'La clave no debe estar vacia'
                    },

                    stringLength:{
                        max:15,
                        message:'El apellido debe contener maximo 15 caracteres'
                    }
                }
            },

            legajo: {

                validators:{

                    notEmpty:{
                        message:'La clave no debe estar vacia'
                    },

                    stringLength:{

                        max: 6,
                        min: 3,
                        message: "El legajo debe contener entre 3 y 6 digitos"
                    },

                    integer: {
                        message: 'El legajo debe ser numerico'
                    }
                
                }

            },

            clave:{
                validators:{
                    notEmpty:{
                        message:'La clave no debe estar vacia'
                    },

                    stringLength:{
                        min:4,
                        max:8,
                        message:'La clave debe contener entre 4 y 8 caracteres'
                    },

                    identical:{

                        field : "claveDuplicada",
                        message : "La clave no coincide con la ingresada anteriormente"

                    }
                }
            },

            claveDuplicada:{

                validators:{

                    notEmpty:{
                        message:'La clave no debe estar vacia'
                    },

                    stringLength:{
                        min:4,
                        max:8,
                        message:'La clave debe contener entre 4 y 8 caracteres'
                    },

                    identical:{

                        field : "clave",
                        message : "La clave no coincide con la ingresada anteriormente"

                    }
                }
            },

            foto:{

                validators:{

                    file: {
                        extension: 'jpg,png,jpeg',
                        type: 'image/jpg,image/png,image/jpeg',
                        message: 'La extension no es valida'
                    }
                }

            }

            
        }
    })
});