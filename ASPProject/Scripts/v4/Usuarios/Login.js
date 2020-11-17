new Vue({
    el: '#app',
    data: {
        Registro: {
            Correo: {
                text: 'Correo Electronico',
                placeholder: 'Correo...',
                value: '',
                invalido: false,
                patron: new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$"),
                error: ''
            },
            Contra: {
                text: 'Contraseña',
                placeholder: '',
                value: '',
                max: 30,
                min: 3,
                invalido: false,
                error: ''
            }
        },
        Boton: {
            texto: 'Iniciar Sesión',
            disabled: false,
        }
    },
    methods: {
        DataValida: function (e) {
            e.preventDefault();
            if (this.grupoValido()) {
                this.$refs.form.submit()
            }
        },
        grupoValido: function () {
            let dataInvalida = 0;
            this.validacion(1);
            this.validacion(2);
            dataInvalida += (this.Registro.Correo.invalido) ? 1 : 0;
            dataInvalida += (this.Registro.Contra.invalido) ? 1 : 0;
            return (dataInvalida > 0) ? false : true;
        },
        validacion: function (tipo) {
            switch (tipo) {
                case 1:
                    this.Registro.Correo.error = ((this.Registro.Correo.value.trim().length > 0) ? '' : 'Correo es requerido');
                    if (this.Registro.Correo.error.length == 0) this.Registro.Correo.error = ((this.Registro.Correo.patron.test(this.Registro.Correo.value)) ? '' : 'Ingrese correo valido');
                    this.Registro.Correo.invalido = (this.Registro.Correo.error.length > 0) ? true : false;
                    break;
                case 2:
                    this.Registro.Contra.error = ((this.Registro.Contra.value.trim().length > 0) ? '' : 'Contraseña es requerida');
                    if (this.Registro.Contra.error.length == 0) this.Registro.Contra.error = (((this.Registro.Contra.value.trim().length < this.Registro.Contra.min) || (this.Registro.Contra.value.trim().length > this.Registro.Contra.max)) ? ('Contraseña debe tener de ' + this.Registro.Correo.min + ' a ' + this.Registro.Contra.max + ' caracteres') : '');
                    this.Registro.Contra.invalido = (this.Registro.Contra.error.length > 0) ? true : false;
                    break;
            }
        }
    },
    watch: {
        'Registro.Correo.value': function (data) {
            this.validacion(1);
        },
        'Registro.Contra.value': function (data) {
            this.validacion(2);
        }
    }
});