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
            Temas:[]
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
        Rutas: {
            GDetalle: '/Cursos/GDetalleMy',
            CreateC: '/Cursos/CreateC',
            EditarC: '/Cursos/EditC',
        }
    },
    mounted() {
        this.loadData();
        $('#ModalC').on('hidden.bs.modal', this.MChide);
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
                            Temas: resp.datos.Temas
                        };
                        console.log(Elemento.Dato);
                        /*Elemento.Dato.Nombre = resp.datos.Name;
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
        agregarContenido: async function () {
            if (this.grupoValido(1)) {
                this.Contenido.Boton.disabled = true;
                let Elemento = this;
                let data = {
                    IDcurso: this.Dato.ID,
                    Nombre: this.Contenido.Nombre.value
                };
                //if (this.Modal.Tipo == 2) data.CategoriaId = this.Modal.Registro.ID;
                let ruta = (this.Modal.Tipo == 1) ? this.Rutas.CreateC : this.Rutas.EditarC;
                await axios.post(ruta, data)
                    .then(function (resp) {
                        resp = resp.data;
                        if (resp.valido) {
                            //Elemento.Datos = resp.datos;
                            //$('#ModalC').modal('hide');
                            Elemento.Dato.Temas = resp.datos;
                        } else {
                            switch (resp.tipo) {
                                case -1:
                                    break;
                                case 1:
                                    break;
                                case 2:
                                    Elemento.Contenido.Nombre.invalido = true;
                                    Elemento.Contenido.Nombre.error = 'Categoria ya existente';
                                    Elemento.Contenido.Boton.disabled = false;
                                    break;
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            }
        },
        //  MODALS
        modalC: function (tipo, valor = null) {
            this.Contenido.Tipo = tipo;
            this.Contenido.Titulo = (tipo == 1) ? 'Añadir Contenido' : 'Modificar Contenido';
            this.Contenido.Boton.texto = (tipo == 1) ? 'Agregar' : 'Modificar';
            if (tipo == 2) {
                this.Contenido.ID = valor.ID;
                this.Contenido.Nombre.value = valor.Name;
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
        //----------------- VALIDACION
        grupoValido: function (tipoModal) {
            let dataInvalida = 0;
            if (tipoModal == 1) {
                this.validacion(1, this.Contenido.Nombre.value);
                this.validacion(2, this.Contenido.Descripcion.value);
            } else {
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
    }
});