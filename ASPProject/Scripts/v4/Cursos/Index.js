new Vue({
    el: '#app',
    data: {
        Datos: [],
        Rutas: {
            cursos: '/Cursos/GCursosAll'
        }
    },
    mounted() {
        console.clear();
        this.loadCursos();
    },
    methods: {
        loadCursos: async function () {
            let Elemento = this;
            await axios.post(this.Rutas.cursos, {})
                .then(function (resp) {
                    resp = resp.data;
                    if (resp.valido) {
                        Elemento.Datos = resp.datos;
                    }
                })
                .catch(function (error) {
                    console.log(error)
                });
        },
        verDetalle: function (dato) {
            window.open('/Cursos/Detalle/' + dato.ID, '_self');
        },
    }
});