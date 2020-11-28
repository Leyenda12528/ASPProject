new Vue({
    el: '#app',
    data: {
        Registro: {
            nombre: {
                text: 'Nombres',
                placeholder: 'Nombres...',
                value: '',
                max: 100,
                invalido: false,
                error: '',
            },
            apellido: {
                text: 'Apellidos',
                placeholder: 'Apellidos...',
                value: '',
                max: 100,
                invalido: false,
                error: '',
            },
            fecha: {
                text: 'Fecha de Nacimiento',
                placeholder: 'Fecha...',
                value: '',
                invalido: false,
                error: '',
            },
            direccion: {
                text: 'Dirección',
                placeholder: 'Direccion...',
                value: '',
                max: 250,
                invalido: false,
                error: '',
            },
            telefono: {
                text: 'Telefono',
                placeholder: '0000-0000',
                value: '',
                max: 9,
                patron: new RegExp("^([0-9]){4}[-]([0-9]){4}$"),
                invalido: false,
                error: '',
            },
            correo: {
                text: 'Correo Electrónico',
                placeholder: 'Correo...',
                value: '',
                patron: new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$"),
                invalido: false,
                error: '',
            },
            password: {
                text: 'Contraseña',
                placeholder: 'Contraseña...',
                value: '',
                max: 30,
                min: 3,
                invalido: false,
                error: '',
            },
            rol: {
                data: [],
                text: 'Rol',
                placeholder: 'Seleccionar...',
                descripcion: '',
                value: '',
                invalido: false,
                error: ''
            },
            Boton: {
                texto: 'Registrar',
                disabled: false,
            }
        }
    },
    mounted() {
        console.clear();
        this.loadRoles();
    },
    methods: {
        loadRoles: async function () {
            let Elemento = this;
            await axios.get('/Usuarios/Roles')
                .then(function (resp) {
                    resp = resp.data;
                    Elemento.Registro.rol.data = resp;
                    Elemento.Registro.rol.value = resp[0].ID;
                })
                .catch(function (error) {
                    console.log(error)
                });
        },
        registrar: async function () {
            if (this.grupoValido()) {
                let Elemento = this;
                let data = {
                    Nombres: this.Registro.nombre.value,
                    Apellidos: this.Registro.apellido.value,
                    fecha: this.Registro.fecha.value,
                    Direccion: this.Registro.direccion.value,
                    Telefono: this.Registro.telefono.value,
                    CorreoElectronico: this.Registro.correo.value,
                    Password: this.Registro.password.value,
                    RolId: this.Registro.rol.value
                };
                await axios.post('/Usuarios/Create', data)
                    .then(function (resp) {
                        resp = resp.data;
                        if (!resp.valido && resp.tipo == 2) {
                            Elemento.Registro.correo.invalido = true;
                            Elemento.Registro.correo.error = 'Correo ya existente';
                        } else if (resp.valido) {
                            window.open('/Home', '_self');
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            }
            /*console.log(dataInvalida);//*/
        },
        grupoValido: function () {
            let dataInvalida = 0;
            this.validacion(1, this.Registro.nombre.value);
            this.validacion(2, this.Registro.apellido.value);
            this.validacion(3, this.Registro.fecha.value);
            this.validacion(4, this.Registro.direccion.value);
            this.validacion(5, this.Registro.telefono.value);
            this.validacion(6, this.Registro.correo.value);
            this.validacion(7, this.Registro.password.value);
            this.validacion(8, this.Registro.rol.value);
            dataInvalida += ((this.Registro.nombre.invalido) ? 1 : 0);
            dataInvalida += ((this.Registro.apellido.invalido) ? 1 : 0);
            dataInvalida += ((this.Registro.fecha.invalido) ? 1 : 0);
            dataInvalida += ((this.Registro.direccion.invalido) ? 1 : 0);
            dataInvalida += ((this.Registro.telefono.invalido) ? 1 : 0);
            dataInvalida += ((this.Registro.correo.invalido) ? 1 : 0);
            dataInvalida += ((this.Registro.password.invalido) ? 1 : 0);
            dataInvalida += ((this.Registro.rol.invalido) ? 1 : 0);
            return (dataInvalida > 0) ? false : true;
        },
        validacion: function (tipo, data) {
            switch (tipo) {
                case 1:
                    this.Registro.nombre.error = ((data.trim().length > 0) ? '' : 'Nombres es requerido');
                    if (this.Registro.nombre.error.length == 0) this.Registro.nombre.error = ((data.trim().length > this.Registro.nombre.max) ? ('Nombres debe tener menos de ' + this.Registro.nombre.max + ' caracteres') : '');
                    this.Registro.nombre.invalido = (this.Registro.nombre.error.length > 0) ? true : false;
                    break;
                case 2:
                    this.Registro.apellido.error = ((data.trim().length > 0) ? '' : 'Apellidos es requerido');
                    if (this.Registro.apellido.error.length == 0) this.Registro.apellido.error = ((data.trim().length > this.Registro.apellido.max) ? ('Apellidos debe tener menos de ' + this.Registro.apellido.max + ' caracteres') : '');
                    this.Registro.apellido.invalido = (this.Registro.apellido.error.length > 0) ? true : false;
                    break;
                case 3:
                    this.Registro.fecha.error = ((data.trim().length > 0) ? '' : 'Fecha es requerida');
                    this.Registro.fecha.invalido = (this.Registro.fecha.error.length > 0) ? true : false;
                    break;
                case 4:
                    this.Registro.direccion.error = ((data.trim().length > 0) ? '' : 'Direccion es requerida');
                    if (this.Registro.direccion.error.length == 0) this.Registro.direccion.error = ((data.trim().length > this.Registro.direccion.max) ? ('Direccion debe tener menos de ' + this.Registro.direccion.max + ' caracteres') : '');
                    this.Registro.direccion.invalido = (this.Registro.direccion.error.length > 0) ? true : false;
                    break;
                case 5:
                    this.Registro.telefono.error = ((this.Registro.telefono.patron.test(data)) ? '' : 'Telefono debe ser escrito 0000-0000');
                    this.Registro.telefono.invalido = (this.Registro.telefono.error.length > 0) ? true : false;
                    break;
                case 6:
                    this.Registro.correo.error = ((data.trim().length > 0) ? '' : 'Correo es requerido');
                    if (this.Registro.correo.error.length == 0) this.Registro.correo.error = ((this.Registro.correo.patron.test(data)) ? '' : 'Ingrese correo valido');
                    this.Registro.correo.invalido = (this.Registro.correo.error.length > 0) ? true : false;
                    break;
                case 7:
                    this.Registro.password.error = ((data.trim().length > 0) ? '' : 'Contraseña es requerida');
                    if (this.Registro.password.error.length == 0) this.Registro.password.error = (((data.trim().length < this.Registro.password.min) || (data.trim().length > this.Registro.password.max)) ? ('Contraseña debe tener de ' + this.Registro.password.min + ' a ' + this.Registro.password.max + ' caracteres') : '');
                    this.Registro.password.invalido = (this.Registro.password.error.length > 0) ? true : false;
                    break;
                case 8:
                    this.Registro.rol.error = ((data > 0) ? '' : 'Rol es requerido');
                    this.Registro.rol.invalido = (this.Registro.rol.error.length > 0) ? true : false;
                    break;
            }
        }
    },
    watch: {
        'Registro.nombre.value': function (data) {
            this.validacion(1, data);
        },
        'Registro.apellido.value': function (data) {
            this.validacion(2, data);
        },
        'Registro.fecha.value': function (data) {
            this.validacion(3, data);
        },
        'Registro.direccion.value': function (data) {
            this.validacion(4, data);
        },
        'Registro.telefono.value': function (data) {
            this.validacion(5, data);
        },
        'Registro.correo.value': function (data) {
            this.validacion(6, data);
        },
        'Registro.password.value': function (data) {
            this.validacion(7, data);
        },
        'Registro.rol.value': function (data) {
            this.Registro.rol.descripcion = this.Registro.rol.data.find(e => e.ID == data).Descripcion;
            this.validacion(8, data);
        }
    }
})