new Vue({
    el: '#app',
    data: {
        Datos: [],
        Modal: {
            Tipo: 0,
            dato: {
                ID: null,
                Nombre: {
                    text: 'Nombre del Curso',
                    placeholder: 'Nombre...',
                    value: '',
                    max: 100,
                    invalido: false,
                    error: '',
                },
                Descripcion: {
                    text: 'Descripcion',
                    placeholder: 'Descripcion...',
                    value: '',
                    max: 250,
                    invalido: false,
                    error: ''
                },
                categoria: {
                    data: [],
                    text: 'Categoria',
                    placeholder: 'Seleccionar...',
                    descripcion: '',
                    value: '',
                    invalido: false,
                    error: ''
                },
                imagen: {
                    text1: 'Arrastrar y Soltar',
                    text2: 'Presionar para Examinar...',
                    ext: '.png, .jpg, .jpeg',
                    filehover: false,
                    src: null,
                    max: 3000,
                    valor: null,
                    error: true,
                    nombre: '',
                }
            },
            Titulo: '',
            Boton: {
                texto: '',
                disabled: false
            }
        },
        Rutas: {
            cursos: '/Cursos/GCursos',
            crear: '/Cursos/CreateMy',
            editar: '/Cursos/EditMy',
            Categorias: '/Categorias/GCategorias',
        }
    },
    mounted() {
        console.clear();
        this.loadCursos();
        $('#ModalC').on('hidden.bs.modal', this.Mhide);
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
        loadCategorias: async function () {
            let Elemento = this;
            await axios.get(this.Rutas.Categorias)
                .then(function (resp) {
                    resp = resp.data;
                    Elemento.Modal.dato.categoria.data = resp.datos;
                })
                .catch(function (error) {
                    console.log(error)
                });
        },
        Mhide: function () {
            this.Modal = {
                Tipo: 0,
                dato: {
                    ID: null,
                    Nombre: {
                        text: 'Nombre del Curso',
                        placeholder: 'Nombre...',
                        value: '',
                        max: 100,
                        invalido: false,
                        error: '',
                    },
                    Descripcion: {
                        text: 'Descripcion',
                        placeholder: 'Descripcion...',
                        value: '',
                        max: 250,
                        invalido: false,
                        erro: ''
                    },
                    categoria: {
                        data: [],
                        text: 'Categoria',
                        placeholder: 'Seleccionar...',
                        descripcion: '',
                        value: '',
                        invalido: false,
                        error: ''
                    },
                    imagen: {
                        text1: 'Arrastrar y Soltar',
                        text2: 'Presionar para Examinar...',
                        ext: '.png, .jpg, .jpeg',
                        filehover: false,
                        src: null,
                        max: 900,
                        valor: null,
                        error: true,
                        nombre: '',
                    }
                },
                Titulo: '',
                Boton: {
                    texto: '',
                    disabled: false
                }
            };
        },
        modal: function (tipo, valor = null) {
            this.loadCategorias();
            this.Modal.Tipo = tipo;
            this.Modal.Titulo = (tipo == 1) ? 'Añadir Curso' : 'Modificar Curso';
            this.Modal.Boton.texto = (tipo == 1) ? 'Agregar' : 'Modificar'
            if (tipo == 2) {
                this.Modal.dato.ID = valor.ID;
                this.Modal.dato.Nombre.value = valor.Name;
                this.Modal.dato.Descripcion.value = valor.Descripcion;
                this.Modal.dato.categoria.value = valor.IDCategoria;
                this.Modal.dato.imagen.src = valor.Imagen;
            }
        },
        agregar: async function () {
            if (this.grupoValido()) {
                this.Modal.Boton.disabled = true;
                let Elemento = this;
                let Data = new FormData();
                Data.append("Titulo", this.Modal.dato.Nombre.value);
                Data.append("Descripcion", this.Modal.dato.Descripcion.value);
                Data.append("upload", this.Modal.dato.imagen.valor);
                Data.append("CategoriaId", this.Modal.dato.categoria.value);
                if (this.Modal.Tipo == 2) Data.append("CursoId", this.Modal.dato.ID);
                let ruta = (this.Modal.Tipo == 1) ? this.Rutas.crear : this.Rutas.editar;
                await axios.post(ruta, Data)
                    .then(function (resp) {
                        resp = resp.data;
                        if (resp.valido) {
                            Elemento.Datos = resp.datos;
                            $('#ModalC').modal('hide');
                        } else {
                            switch (resp.tipo) {
                                case 1:
                                    break;
                                case 2:
                                    Elemento.Modal.dato.Nombre.invalido = true;
                                    Elemento.Modal.dato.Nombre.error = 'Nombre de curso ya existente';
                                    Elemento.Modal.Boton.disabled = false;
                                    break;
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            }
        },
        grupoValido: function () {
            let dataInvalida = 0;
            this.validacion(1, this.Modal.dato.Nombre.value);
            this.validacion(2, this.Modal.dato.Descripcion.value);
            this.validacion(3, this.Modal.dato.categoria.value);
            dataInvalida += ((this.Modal.dato.Nombre.invalido) ? 1 : 0);
            dataInvalida += ((this.Modal.dato.Descripcion.invalido) ? 1 : 0);
            dataInvalida += ((this.Modal.dato.categoria.invalido) ? 1 : 0);
            return (dataInvalida > 0) ? false : true;
        },
        validacion: function (tipo, data) {
            switch (tipo) {
                case 1:
                    this.Modal.dato.Nombre.error = ((data.trim().length > 0) ? '' : 'Nombre es requerido');
                    if (this.Modal.dato.Nombre.error.length == 0) this.Modal.dato.Nombre.error = ((data.trim().length > this.Modal.dato.Nombre.max) ? ('Nombre debe tener menos de ' + this.Modal.dato.Nombre.max + ' caracteres') : '');
                    this.Modal.dato.Nombre.invalido = (this.Modal.dato.Nombre.error.length > 0) ? true : false;
                    break;
                case 2:
                    this.Modal.dato.Descripcion.error = ((data.trim().length > 0) ? '' : 'Descripcion es requerida');
                    if (this.Modal.dato.Descripcion.error.length == 0) this.Modal.dato.Descripcion.error = ((data.trim().length > this.Modal.dato.Descripcion.max) ? ('Descripcion debe tener menos de ' + this.Modal.dato.Descripcion.max + ' caracteres') : '');
                    this.Modal.dato.Descripcion.invalido = (this.Modal.dato.Descripcion.error.length > 0) ? true : false;
                    break;
                case 3:
                    this.Modal.dato.categoria.error = ((data > 0) ? '' : 'Categoria es requerida');
                    this.Modal.dato.categoria.invalido = (this.Modal.dato.categoria.error.length > 0) ? true : false;
                    break;
            }
        },

        preimage: function (file, tipo) {
            //e.target.files || e.dataTransfer.files;
            let valor = (tipo != null) ? file.target.files[0] : file.dataTransfer.files[0];
            console.log(valor)
            if ((valor.size / 1024) < this.Modal.dato.imagen.max) {
                this.Modal.dato.imagen.src = URL.createObjectURL(valor);
                this.Modal.dato.imagen.valor = valor;
                this.Modal.dato.imagen.error = false;
            }
            //else toastA("Imagen demasiado pesada. Tamaño máx. " + this.Set.Modal.values.imagen.max + " KB", "error");
        },
        sobres: function (tipo) {
            // 1 - sobre
            // 2 - leave
            this.Modal.dato.imagen.filehover = (tipo == 1) ? true : false;
        },
        soltar: function (event) {
            if (event.dataTransfer.files.length == 1) {
                this.preimage(event, null)
            }
        },
        errorImagen: function () {
            this.Modal.dato.imagen.src == null;
            this.Modal.dato.imagen.error = true;
        }
    },
    watch: {
        'Modal.dato.Nombre.value': function (data) {
            this.validacion(1, data);
        },
        'Modal.dato.Descripcion.value': function (data) {
            this.validacion(2, data);
        },
        'Modal.dato.categoria.value': function (data) {
            this.validacion(3, data);
        }
    }
});