new Vue({
    el: '#app',
    data: {
        Encabezados: ['Codigo', 'Nombre Completo', 'Telefono', 'Correo', 'Rol'],
        Datos: [],
        User: {
            Tipo: 0,
            Registro: {
            },
            Titulo: '',
            Boton: {
                texto: '',
                disabled: false,
            },
        },
        Rutas: {
            loadUsers: '/Usuarios/GUsers',
            add: '/Usurios/Create',
            edit: '/Usuarios/Edit'
        }
    },
    mounted() {
        console.clear();
        this.loadDatos();
        //$('#ModalC').on('hidden.bs.modal', this.Mhide);
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
        Mhide: function () {
        },
        modal: function (tipo, valor = null) {
            this.User.Tipo = tipo;
            this.User.Titulo = (tipo == 1) ? 'Añadir Usuario' : 'Modificar Usuario';
            this.User.Boton.texto = (tipo == 1) ? 'Agregar' : 'Modificar';
            if (tipo == 2) {

            }
        },
    },
    watch: {}
});