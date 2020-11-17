new Vue({
    el: '#app',
    data: {
        Encabezados: ['Codigo', 'Nombre', 'Extension', 'Tamaño Maximo'],
        Datos: [],
        UserM: {
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
    mounted() { },
    methods: {},
    watch: {}
});