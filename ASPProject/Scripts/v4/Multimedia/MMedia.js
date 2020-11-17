new Vue({
    el: '#app',
    data: {
        Encabezados: ['Codigo', 'Nombre', 'Extension', 'Tamaño Maximo'],
        Datos: [],
        Media: {
            Tipo: 0,
            Registro: {
                ID: null,
                Nombre: {
                    text: 'Nombre de Multimedia',
                    placeholder: 'Nombre...',
                    value: '',
                    max: 100,
                    invalido: false,
                    error: '',
                },
                Extension: {
                    text: 'Extension de Multimedia',
                    placeholder: 'pdf, jpg....',
                    value: '',
                    invalido: false,
                    error: '',
                },
                Tamaño: {
                    text: 'Tamaño',
                    placeholder: '',
                    value: 10000,
                    min: 1,
                    invalido: false,
                    error: '',
                },
            },
            Titulo: '',
            Boton: {
                texto: '',
                disabled: false,
            },
        },
        Rutas: {
            loadMedias: '/Multimedias/Medias',
            add: '/Multimedias/Create',
            edit: '/Multimedias/Edit'
        }
    },
    mounted() {
        console.clear();
        this.loadMultimedias();
        $('#ModalC').on('hidden.bs.modal', this.Mhide);
    },
    methods: {
        loadMultimedias: async function () {
            let Elemento = this;
            await axios.get(this.Rutas.loadMedias)
                .then(function (resp) {
                    resp = resp.data;
                    Elemento.Datos = resp.datos;
                })
                .catch(function (error) {
                    console.log(error)
                });
        },
        Mhide: function () {
            this.Media = {
                Tipo: 0,
                Registro: {
                    ID: null,
                    Nombre: {
                        text: 'Nombre de Multimedia',
                        placeholder: 'Nombre...',
                        value: '',
                        max: 100,
                        invalido: false,
                        error: '',
                    },
                    Extension: {
                        text: 'Extension de Multimedia',
                        placeholder: 'pdf, jpg....',
                        value: '',
                        invalido: false,
                        error: '',
                    },
                    Tamaño: {
                        text: 'Tamaño',
                        placeholder: '',
                        value: 10000,
                        min: 1,
                        invalido: false,
                        error: '',
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
            this.Media.Tipo = tipo;
            this.Media.Titulo = (tipo == 1) ? 'Añadir Multimea' : 'Modificar Multimedia';
            this.Media.Boton.texto = (tipo == 1) ? 'Agregar' : 'Modificar';
            if (tipo == 2) {
                this.Media.Registro.ID = valor.ID;
                this.Media.Registro.Nombre.value = valor.Name;
                this.Media.Registro.Extension.value = valor.Extension;
                this.Media.Registro.Tamaño.value = valor.Size;
            }
        },
        agregar: async function () {
            if (this.grupoValido()) {
                this.Media.Boton.disabled = true;
                let Elemento = this;
                let data = {
                    Nombre: this.Media.Registro.Nombre.value,
                    Extension: this.Media.Registro.Extension.value,
                    TamanioMaximo: this.Media.Registro.Tamaño.value
                };
                if (this.Media.Tipo == 2) data.MultiMediaId = this.Media.Registro.ID;
                let ruta = (this.Media.Tipo == 1) ? this.Rutas.add : this.Rutas.edit;
                await axios.post(ruta, data)
                    .then(function (resp) {
                        resp = resp.data;
                        if (resp.valido) {
                            Elemento.Datos = resp.datos;
                            $('#ModalC').modal('hide');
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
            }
        },
        grupoValido: function () {
            let dataInvalida = 0;
            this.validacion(1, this.Media.Registro.Nombre.value);
            this.validacion(2, this.Media.Registro.Extension.value);
            this.validacion(3, this.Media.Registro.Tamaño.value);
            dataInvalida += ((this.Media.Registro.Nombre.invalido) ? 1 : 0);
            dataInvalida += ((this.Media.Registro.Extension.invalido) ? 1 : 0);
            dataInvalida += ((this.Media.Registro.Tamaño.invalido) ? 1 : 0);
            return (dataInvalida > 0) ? false : true;
        },
        validacion: function (tipo, data) {
            switch (tipo) {
                case 1:
                    this.Media.Registro.Nombre.error = ((data.trim().length > 0) ? '' : 'Nombre es requerido');
                    if (this.Media.Registro.Nombre.error.length == 0) this.Media.Registro.Nombre.error = ((data.trim().length > this.Media.Registro.Nombre.max) ? ('Nombre debe tener menos de ' + this.Media.Registro.Nombre.max + ' caracteres') : '');
                    this.Media.Registro.Nombre.invalido = (this.Media.Registro.Nombre.error.length > 0) ? true : false;
                    break;
                case 2:
                    this.Media.Registro.Extension.error = ((data.trim().length > 0) ? '' : 'Extension es requerida');
                    this.Media.Registro.Extension.invalido = (this.Media.Registro.Extension.error.length > 0) ? true : false;
                    break;
                case 3:
                    this.Media.Registro.Tamaño.error = ((data > 0) ? '' : 'Tamaño es requerido');
                    this.Media.Registro.Tamaño.invalido = (this.Media.Registro.Tamaño.error.length > 0) ? true : false;
                    break;
            }
        }
    },
    watch: {
        'Media.Registro.Nombre.value': function (data) {
            this.validacion(1, data);
        },
        'Media.Registro.Extension.value': function (data) {
            this.validacion(2, data);
        },
        'Media.Registro.Tamaño.value': function (data) {
            this.validacion(3, data);
        }
    }
});