new Vue({
    el: '#app',
    data: {
        Dato: {
            ID: valID,
            Nombre: '',
            Descripcion: '',
            Imagen: '',
            IDCategoria: null,
            Categoria: '',
            Temas: [],
            TemaTemporal: {},
            TemaActual: {
                selected: false,
                data: {},
                Archivos: []
            },
        },
        Rutas: {
            GDetalle: '/Cursos/GDetalleAll',
            GMultimediaMy: '/Cursos/GMultimediaMy',
            GMultis: '/Cursos/GMultimedias',
        }
    },
    mounted() {
        console.clear();
        this.loadData();
    },
    methods: {
        loadData: async function () {
            let Elemento = this;
            await axios.get(this.Rutas.GDetalle, {
                params: {
                    id: this.Dato.ID
                }
            }).then(function (resp) {
                resp = resp.data;
                if (resp.valido) {
                    Elemento.Dato = {
                        ID: Elemento.Dato.ID,
                        Nombre: resp.datos.Name,
                        Descripcion: resp.datos.Descripcion,
                        Imagen: resp.datos.Imagen,
                        IDCategoria: resp.datos.IDCategoria,
                        Categoria: resp.datos.TCategoria,
                        Temas: resp.datos.Temas,
                        TemaActual: {
                            selected: false,
                            data: {}
                        }
                    };
                    /*console.log(Elemento.Dato);
                    Elemento.Dato.Nombre = resp.datos.Name;
                    Elemento.Dato.Descripcion = resp.datos.Descripcion;
                    Elemento.Dato.IDCategoria = resp.datos.IDCategoria;
                    Elemento.Dato.Categoria = resp.datos.TCategoria;
                    Elemento.Dato.Temas = resp.datos.Temas;//*/
                } else {
                    switch (resp.tipo) {
                        case -1:
                            break;
                        case 1:
                            break;
                        case 2:
                            break;
                    }
                }
            })
                .catch(function (error) {
                    console.log(error)
                });
        },
        loadMultimedia: async function () {
            let Elemento = this;
            await axios.get(this.Rutas.GMultimediaMy, {
                params: {
                    id: this.Dato.TemaActual.data.ID
                }
            })
                .then(function (resp) {
                    resp = resp.data;
                    Elemento.Dato.TemaActual.Archivos = resp.datos;
                })
                .catch(function (error) {
                    console.log(error)
                });
        },
        loadMultimedias: async function () {
            let Elemento = this;
            await axios.get(this.Rutas.GMultis)
                .then(function (resp) {
                    resp = resp.data;
                    Elemento.Multi.Multimedia.data = resp.datos;
                })
                .catch(function (error) {
                    console.log(error)
                });
        },
        selectContenido: function (dato) {
            this.Dato.TemaActual.Archivos = dato.Archivos;
            this.Dato.TemaActual.selected = true;
            this.Dato.Temas.forEach(element => {
                element.activo = (element.ID == dato.ID) ? true : false;
            });
            this.Dato.TemaActual.data = dato;
            this.Dato.TemaTemporal = dato;
            //this.loadMultimedia();
            //console.log(this.Dato.TemaActual)
        },
    }
});