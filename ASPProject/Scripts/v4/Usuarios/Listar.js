new Vue({
    el: '#app',
    data: {
        Encabezados: ['Codigo', 'Nombre Completo', 'Telefono', 'Correo', 'Rol'],
        Datos: [],
        User: {
            Tipo: 0,
            Registro: {
                ID: null,
                Nombre: {
                    text: 'Nombres',
                    placeholder: 'Nombres...',
                    value: '',
                    max: 100,
                    invalido: false,
                    error: '',
                },
                Apellido: {
                    text: 'Apellidos',
                    placeholder: 'Apellidos...',
                    value: '',
                    max: 100,
                    invalido: false,
                    error: '',
                },
                Fecha: {
                    text: 'Fecha de Nacimiento',
                    placeholder: 'Fecha...',
                    value: '',
                    invalido: false,
                    error: '',
                },
                Direccion: {
                    text: 'Dirección',
                    placeholder: 'Direccion...',
                    value: '',
                    max: 250,
                    invalido: false,
                    error: '',
                },
                Telefono: {
                    text: 'Telefono',
                    placeholder: '0000-0000',
                    value: '',
                    max: 9,
                    patron: new RegExp("^([0-9]){4}[-]([0-9]){4}$"),
                    invalido: false,
                    error: '',
                },
                Correo: {
                    text: 'Correo Electrónico',
                    placeholder: 'Correo...',
                    value: '',
                    patron: new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$"),
                    invalido: false,
                    error: '',
                },
                Password: {
                    text: 'Contraseña',
                    placeholder: 'Contraseña...',
                    value: '',
                    max: 30,
                    min: 3,
                    invalido: false,
                    error: '',
                },
                Rol: {
                    data: [],
                    text: 'Rol',
                    placeholder: 'Seleccionar...',
                    descripcion: '',
                    value: '',
                    invalido: false,
                    error: ''
                },
            },
            Titulo: '',
            Boton: {
                texto: '',
                disabled: false,
            },
        },
        Rutas: {
            loadUsers: '/Usuarios/GUsers',
            loadRoles: '/Usuarios/GRoles',
            add: '/Usurios/Create',
            edit: '/Usuarios/Edit'
        }
    },
    mounted() {
        console.clear();
        this.loadDatos();
        $('#ModalC').on('hidden.bs.modal', this.Mhide);
    },
    methods: {
        loadDatos: async function () {
            let Elemento = this;
            await axios.get(this.Rutas.loadUsers)
                .then(function (resp) {
                    resp = resp.data;
                    if (resp.valido) {
                        Elemento.Datos = resp.datos;
                    } else {
                        switch (resp.tipo) {
                            // no inicio sesion
                            case -1:
                                break;
                            case 1:
                                break;
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error)
                });
        },
        loadRoles: async function () {
            let Elemento = this;
            await axios.get(this.Rutas.loadRoles)
                .then(function (resp) {
                    resp = resp.data;
                    if (resp.valido) {
                        Elemento.User.Registro.Rol.data = resp.datos;
                        Elemento.User.Registro.Rol.value = resp.datos[0].ID;
                    } else {
                        switch (tipo) {
                            // no inicio sesion
                            case -1:
                            break;
                            // sin permiso
                            case 3:
                            break;
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error)
                });
        },
        Mhide: function () {
            this.User = {
                Tipo: 0,
                Registro: {
                    ID: null,
                    Nombre: {
                        text: 'Nombres',
                        placeholder: 'Nombres...',
                        value: '',
                        max: 100,
                        invalido: false,
                        error: '',
                    },
                    Apellido: {
                        text: 'Apellidos',
                        placeholder: 'Apellidos...',
                        value: '',
                        max: 100,
                        invalido: false,
                        error: '',
                    },
                    Fecha: {
                        text: 'Fecha de Nacimiento',
                        placeholder: 'Fecha...',
                        value: '',
                        invalido: false,
                        error: '',
                    },
                    Direccion: {
                        text: 'Dirección',
                        placeholder: 'Direccion...',
                        value: '',
                        max: 250,
                        invalido: false,
                        error: '',
                    },
                    Telefono: {
                        text: 'Telefono',
                        placeholder: '0000-0000',
                        value: '',
                        max: 9,
                        patron: new RegExp("^([0-9]){4}[-]([0-9]){4}$"),
                        invalido: false,
                        error: '',
                    },
                    Correo: {
                        text: 'Correo Electrónico',
                        placeholder: 'Correo...',
                        value: '',
                        patron: new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$"),
                        invalido: false,
                        error: '',
                    },
                    Password: {
                        text: 'Contraseña',
                        placeholder: 'Contraseña...',
                        value: '',
                        max: 30,
                        min: 3,
                        invalido: false,
                        error: '',
                    },
                    Rol: {
                        data: [],
                        text: 'Rol',
                        placeholder: 'Seleccionar...',
                        descripcion: '',
                        value: '',
                        invalido: false,
                        error: ''
                    },
                },
                Titulo: '',
                Boton: {
                    texto: '',
                    disabled: false,
                },
            };
        },
        modal: function (tipo, valor = null) {
            this.loadRoles();
            this.User.Tipo = tipo;
            this.User.Titulo = (tipo == 1) ? 'Añadir Usuario' : 'Modificar Usuario';
            this.User.Boton.texto = (tipo == 1) ? 'Agregar' : 'Modificar';
            if (tipo == 2) 0{
                this.User.Registro.ID = valor.ID;
                this.User.Registro.Nombre.value = valor.Nombres;
                this.User.Registro.Apellido.value = valor.Apellidos;
                this.User.Registro.Fecha.value = valor.Fecha;
                this.User.Registro.Direccion.value = valor.Direccion;
                this.User.Registro.Telefono.value = valor.Telefono;
                this.User.Registro.Correo.value = valor.Correo;
                this.User.Registro.Rol.value = valor.IDRol;
            }
        },
        agregar: function () {
            if (this.grupoValido()) {

            }
        },
        grupoValido: function () {
            let dataInvalida = 0;
            this.validacion(1, this.User.Registro.Nombre.value);
            this.validacion(2, this.User.Registro.Apellido.value);
            this.validacion(3, this.User.Registro.Fecha.value);
            this.validacion(4, this.User.Registro.Direccion.value);
            this.validacion(5, this.User.Registro.Telefono.value);
            this.validacion(6, this.User.Registro.Correo.value);
            this.validacion(7, this.User.Registro.Password.value);
            this.validacion(8, this.User.Registro.Rol.value);
            dataInvalida += ((this.User.Registro.Nombre.invalido) ? 1 : 0);
            dataInvalida += ((this.User.Registro.Apellido.invalido) ? 1 : 0);
            dataInvalida += ((this.User.Registro.Fecha.invalido) ? 1 : 0);
            dataInvalida += ((this.User.Registro.Direccion.invalido) ? 1 : 0);
            dataInvalida += ((this.User.Registro.Telefono.invalido) ? 1 : 0);
            dataInvalida += ((this.User.Registro.Correo.invalido) ? 1 : 0);
            dataInvalida += ((this.User.Registro.Password.invalido) ? 1 : 0);
            dataInvalida += ((this.User.Registro.Rol.invalido) ? 1 : 0);
            return (dataInvalida > 0) ? false : true;
        },
        validacion: function (tipo, data) {
            switch (tipo) {
                case 1:
                    this.User.Registro.Nombre.error = ((data.trim().length > 0) ? '' : 'Nombres es requerido');
                    if (this.User.Registro.Nombre.error.length == 0) this.User.Registro.Nombre.error = ((data.trim().length > this.User.Registro.Nombre.max) ? ('Nombres debe tener menos de ' + this.User.Registro.Nombre.max + ' caracteres') : '');
                    this.User.Registro.Nombre.invalido = (this.User.Registro.Nombre.error.length > 0) ? true : false;
                    break;
                case 2:
                    this.User.Registro.Apellido.error = ((data.trim().length > 0) ? '' : 'Apellidos es requerido');
                    if (this.User.Registro.Apellido.error.length == 0) this.User.Registro.Apellido.error = ((data.trim().length > this.User.Registro.Apellido.max) ? ('Apellidos debe tener menos de ' + this.User.Registro.Apellido.max + ' caracteres') : '');
                    this.User.Registro.Apellido.invalido = (this.User.Registro.Apellido.error.length > 0) ? true : false;
                    break;
                case 3:
                    this.User.Registro.Fecha.error = ((data.trim().length > 0) ? '' : 'Fecha es requerida');
                    this.User.Registro.Fecha.invalido = (this.User.Registro.Fecha.error.length > 0) ? true : false;
                    break;
                case 4:
                    this.User.Registro.Direccion.error = ((data.trim().length > 0) ? '' : 'Direccion es requerida');
                    if (this.User.Registro.Direccion.error.length == 0) this.User.Registro.Direccion.error = ((data.trim().length > this.User.Registro.Direccion.max) ? ('Direccion debe tener menos de ' + this.User.Registro.Direccion.max + ' caracteres') : '');
                    this.User.Registro.Direccion.invalido = (this.User.Registro.Direccion.error.length > 0) ? true : false;
                    break;
                case 5:
                    this.User.Registro.Telefono.error = ((this.User.Registro.Telefono.patron.test(data)) ? '' : 'Telefono debe ser escrito 0000-0000');
                    this.User.Registro.Telefono.invalido = (this.User.Registro.Telefono.error.length > 0) ? true : false;
                    break;
                case 6:
                    this.User.Registro.Correo.error = ((data.trim().length > 0) ? '' : 'Correo es requerido');
                    if (this.User.Registro.Correo.error.length == 0) this.User.Registro.Correo.error = ((this.User.Registro.Correo.patron.test(data)) ? '' : 'Ingrese correo valido');
                    this.User.Registro.Correo.invalido = (this.User.Registro.Correo.error.length > 0) ? true : false;
                    break;
                case 7:
                    this.User.Registro.Password.error = ((data.trim().length > 0) ? '' : 'Contraseña es requerida');
                    if (this.User.Registro.Password.error.length == 0) this.User.Registro.Password.error = (((data.trim().length < this.User.Registro.Password.min) || (data.trim().length > this.User.Registro.Password.max)) ? ('Contraseña debe tener de ' + this.User.Registro.Password.min + ' a ' + this.User.Registro.Password.max + ' caracteres') : '');
                    this.User.Registro.Password.invalido = (this.User.Registro.Password.error.length > 0) ? true : false;
                case 8:
                    this.User.Registro.Rol.error = ((data > 0) ? '' : 'Rol es requerido');
                    this.User.Registro.Rol.invalido = (this.User.Registro.Rol.error.length > 0) ? true : false;
                    break;
            }
        }
    },
    watch: {
        'User.Registro.Rol.value': function (data) {
            this.User.Registro.Rol.descripcion = this.User.Registro.Rol.data.find(e => e.ID == data).Descripcion;
            //this.validacion(8, data);
        }
    }
});