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
        Contenido: {
            ID: null,
            Tipo: 0,
            Nombre: {
                Nombre: '',
                max: 200,
                text: 'Nombre del Contenido',
                placeholder: 'Nombre',
                invalido: false,
                value: '',
                error: ''
            },
            Descripcion: {
                Nombre: '',
                max: 255,
                text: 'Descripcion del Contenido',
                placeholder: 'Descripcion',
                invalido: false,
                value: '',
                error: ''
            },
            Contenido: {
                Nombre: '',
                text: 'Contenido',
                placeholder: '...',
                invalido: false,
                value: '',
                error: ''
            },
            Boton: {
                texto: '',
                disabled: false
            }
        },
        Multi: {
            ID: null,
            Tipo: 0,
            Nombre: {
                Nombre: '',
                max: 200,
                text: 'Nombre Multimedia',
                placeholder: 'Nombre',
                invalido: false,
                value: '',
                error: ''
            },
            Multimedia: {
                data: [],
                text: 'Tipo de Multimedia',
                placeholder: 'Seleccionar...',
                descripcion: '',
                value: 0,
                invalido: false,
                error: ''
            },
            Archivo: {
                text: 'Archivo Multimedia',
                ext: '.png, .jpg, .jpeg',
                filehover: false,
                src: null,
                max: 900,
                value: null,
                error: '',
                nombre: '',
            },
            Boton: {
                texto: '',
                disabled: false
            }
        },
        Rutas: {
            GDetalle: '/Cursos/GDetalleMy',
            CreateC: '/Cursos/CreateC',
            EditarC: '/Cursos/EditC',
            GMultimediaMy: '/Cursos/GMultimediaMy',
            GMultis: '/Cursos/GMultimedias',
            CreateMulti: '/Cursos/AddCMultimedia',
            DelMulti: '/Cursos/DelCMultimedia'
        }
    },
    mounted() {
        console.clear();
        this.loadData();
        $('#ModalC').on('hidden.bs.modal', this.MChide);
        $('#ModalMulti').on('hidden.bs.modal', this.MMultihide);
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
        agregarContenido: async function () {
            if (this.grupoValido(1)) {
                this.Contenido.Boton.disabled = true;
                let Elemento = this;
                let data = {
                    CursoId: this.Dato.ID,
                    Nombre: this.Contenido.Nombre.value,
                    Descripcion: this.Contenido.Descripcion.value,
                    Contenido: this.Contenido.Contenido.value
                };
                if (this.Contenido.Tipo == 2) data.ContenidoCursoId = this.Contenido.ID;
                let ruta = (this.Contenido.Tipo == 1) ? this.Rutas.CreateC : this.Rutas.EditarC;
                await axios.post(ruta, data)
                    .then(function (resp) {
                        resp = resp.data;
                        if (resp.valido) {
                            Elemento.Dato.Temas = resp.datos;
                            let dato = null;
                            if (Elemento.Contenido.Tipo == 2) {
                                dato = Elemento.Dato.Temas.find(e => e.ID == Elemento.Contenido.ID);
                            }
                            else {
                                dato = Elemento.Dato.Temas.find(e => e.ID == Elemento.Dato.Temas[Elemento.Dato.Temas.length - 1].ID);
                            }
                            if (dato != undefined && dato != null) Elemento.selectContenido(dato);
                            $('#ModalC').modal('hide');
                        } else {
                            switch (resp.tipo) {
                                case 1:
                                    break;
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            }
        },
        agregarMultimedia: async function () {
            if (this.grupoValido(2)) {
                this.Multi.Boton.disabled = true;
                let Elemento = this;
                let Data = new FormData();
                Data.append("Nombre", this.Multi.Nombre.value);
                Data.append("ContenidoCursoIdA", this.Dato.TemaActual.data.ID);
                Data.append("MultimediaIdA", this.Multi.Multimedia.value);
                Data.append("upload", this.Multi.Archivo.value);
                Data.append("Archivo", "----");
                await axios.post(this.Rutas.CreateMulti, Data)
                    .then(function (resp) {
                        resp = resp.data;
                        if (resp.valido) {
                            //Elemento.Dato.TemaActual.selected = true;
                            Elemento.Dato.TemaActual.Archivos = resp.datos;
                            $('#ModalMulti').modal('hide');
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            }
        },
        byeMulti: async function (dato) {
            let Elemento = this;
            let data = {
                ID: dato.ID,
                IDTema: dato.IDContenido
            };
            await axios.post(this.Rutas.DelMulti, data)
                .then(function (resp) {
                    resp = resp.data;
                    if (resp.valido) {
                        //Elemento.Dato.TemaActual.Archivos = resp.datos;
                        //Elemento.Dato.TemaActual.Archivos = resp.datos;
                        let temporal = {
                            selected: true,
                            data: Elemento.Dato.TemaTemporal,
                            Archivos: resp.datos
                        };
                        Elemento.Dato.TemaActual = temporal;
                    }
                })
                .catch(function (error) {
                    console.log(error)
                });
        },
        //  MODALS
        modalC: function (tipo, valor = null) {
            this.Contenido.Tipo = tipo;
            this.Contenido.Titulo = (tipo == 1) ? 'Añadir Contenido' : 'Modificar Contenido';
            this.Contenido.Boton.texto = (tipo == 1) ? 'Agregar' : 'Modificar';
            if (tipo == 2) {
                this.Contenido.ID = valor.ID;
                this.Contenido.Nombre.value = valor.Name;
                this.Contenido.Descripcion.value = valor.Descripcion;
                this.Contenido.Contenido.value = valor.Contenido;
            }
        },
        modalMulti: function (tipo, valor = null) {
            if (this.Dato.TemaActual.selected) {
                $('#ModalMulti').modal('show');
                this.loadMultimedias();
                this.Multi.Tipo = tipo;
                this.Multi.Titulo = (tipo == 1) ? 'Añadir Multimedia' : 'Modificar Multimedia';
                this.Multi.Boton.texto = (tipo == 1) ? 'Agregar' : 'Modificar';
                if (tipo == 2) {
                    this.Multi.ID = valor.ID;
                }
            }
        },
        previewFiles: function (event) {
            //console.log(event);
            if (this.Multi.Multimedia.value > 0) {
                //console.log(event.target.files[0]);
                //console.log(event.target.files[0].type.split('/'));
                //this.Multi.Archivo.value = event.target.files[0];
                let extension = event.target.files[0].type.split('/')[1].toLowerCase();
                let extensionSelected = this.Multi.Multimedia.data.find(a => a.ID == this.Multi.Multimedia.value).Extension.toLowerCase();
                /*console.log({
                    file: extension,
                    sel: extensionSelected
                });//*/
                if (extension == extensionSelected) {
                    this.Multi.Archivo.value = event.target.files[0];
                    this.Multi.Archivo.error = '';
                    //console.log(this.Multi.Archivo.value)
                } else {
                    this.$refs.inputFile.value = null;
                    this.Multi.Archivo.error = 'Elija Tipo de Multimedia acorde al archivo a subir (Ext. del archivo ' + extension + ')';
                }
            } else {
                this.$refs.inputFile.value = null;
                this.Multi.Archivo.error = 'Elija tipo de Multimedia primero';
            }
        },
        MChide: function () {
            this.Contenido = {
                ID: null,
                Tipo: 0,
                Nombre: {
                    Nombre: '',
                    max: 200,
                    text: 'Nombre del Contenido',
                    placeholder: 'Nombre',
                    invalido: false,
                    value: '',
                    error: ''
                },
                Descripcion: {
                    Nombre: '',
                    max: 255,
                    text: 'Descripcion del Contenido',
                    placeholder: 'Descripcion',
                    invalido: false,
                    value: '',
                    error: ''
                },
                Contenido: {
                    Nombre: '',
                    text: 'Contenido',
                    placeholder: '...',
                    invalido: false,
                    value: '',
                    error: ''
                },
                Boton: {
                    texto: '',
                    disabled: false
                }
            };
        },
        MMultihide: function () {
            this.$refs.inputFile.value = null;
            //.value = null;
            this.Multi = {
                ID: null,
                Tipo: 0,
                Nombre: {
                    Nombre: '',
                    max: 200,
                    text: 'Nombre Multimedia',
                    placeholder: 'Nombre',
                    invalido: false,
                    value: '',
                    error: ''
                },
                Multimedia: {
                    data: [],
                    text: 'Tipo de Multimedia',
                    placeholder: 'Seleccionar...',
                    descripcion: '',
                    value: 0,
                    invalido: false,
                    error: ''
                },
                Archivo: {
                    text: 'Archivo Multimedia',
                    ext: '.png, .jpg, .jpeg',
                    filehover: false,
                    src: null,
                    max: 900,
                    value: null,
                    error: '',
                    nombre: '',
                },
                Boton: {
                    texto: '',
                    disabled: false
                }
            };
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
        //----------------- VALIDACION
        grupoValido: function (tipoModal) {
            let dataInvalida = 0;
            if (tipoModal == 1) {
                this.validacion(1, this.Contenido.Nombre.value);
                this.validacion(2, this.Contenido.Descripcion.value);
                dataInvalida += ((this.Contenido.Nombre.invalido) ? 1 : 0);
                dataInvalida += ((this.Contenido.Descripcion.invalido) ? 1 : 0);
            } else {
                this.validacion(3, this.Multi.Nombre.value);
                this.validacion(4, this.Multi.Multimedia.value);
                this.validacion(5, this.Multi.Archivo.value);
                dataInvalida += ((this.Multi.Nombre.invalido) ? 1 : 0);
                dataInvalida += ((this.Multi.Multimedia.invalido) ? 1 : 0);
            }
            return (dataInvalida > 0) ? false : true;
        },
        validacion: function (tipo, data) {
            switch (tipo) {
                case 1:
                    this.Contenido.Nombre.error = ((data.trim().length > 0) ? '' : 'Nombre es requerido');
                    if (this.Contenido.Nombre.error.length == 0) this.Contenido.Nombre.error = ((data.trim().length > this.Contenido.Nombre.max) ? ('Nombre debe tener menos de ' + this.Contenido.Nombre.max + ' caracteres') : '');
                    this.Contenido.Nombre.invalido = (this.Contenido.Nombre.error.length > 0) ? true : false;
                    break;
                case 2:
                    this.Contenido.Descripcion.error = ((data.trim().length > 0) ? '' : 'Descripción es requerida');
                    if (this.Contenido.Descripcion.error.length == 0) this.Contenido.Descripcion.error = ((data.trim().length > this.Contenido.Descripcion.max) ? ('Descipción debe tener menos de ' + this.Contenido.Descripcion.max + ' caracteres') : '');
                    this.Contenido.Descripcion.invalido = (this.Contenido.Descripcion.error.length > 0) ? true : false;
                    break;
                case 3:
                    this.Multi.Nombre.error = ((data.trim().length > 0) ? '' : 'Nombre es requerido');
                    if (this.Multi.Nombre.error.length == 0) this.Multi.Nombre.error = ((data.trim().length > this.Multi.Nombre.max) ? ('Nombre debe tener menos de ' + this.Multi.Nombre.max + ' caracteres') : '');
                    this.Multi.Nombre.invalido = (this.Multi.Nombre.error.length > 0) ? true : false;
                    break;
                case 4:
                    this.Multi.Multimedia.error = ((data > 0) ? '' : 'Campo es requerido');
                    this.Multi.Multimedia.invalido = (this.Multi.Multimedia.error.length > 0) ? true : false;
                    break;
                case 5:
                    //console.log(data);
                    this.Multi.Archivo.error = ((data != null) ? '' : 'Archivo Multimedia es requerido');
                    this.Multi.Archivo.invalido = (this.Multi.Archivo.error.length > 0) ? true : false;
                    //console.log(this.Multi.Archivo.error)
                    break;
            }
        },
    },
    watch: {
        'Contenido.Nombre.value': function (data) {
            this.validacion(1, data);
        },
        'Contenido.Descripcion.value': function (data) {
            this.validacion(2, data);
        },
        'Multi.Nombre.value': function (data) {
            this.validacion(3, data);
        },
        'Multi.Multimedia.value': function (data) {
            this.validacion(4, data);
        },
    }
});