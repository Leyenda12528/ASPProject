new Vue({
    el: '#app',
    data: {
        Encabezados: ['Codigo', 'Nombre de Categoria'],
        Datos: [],
        Modal: {
            Tipo: 0,
            Titulo: '',
            Boton: {
                texto: '',
                disabled: false,
            },
            Registro: {
                ID: null,
                Nombre: '',
                max: 30,
                text: 'Nombre de Categoria',
                placeholder: 'Nombre',
                invalido: false,
                error: ''
            },
        },
        Rutas: {
            crear: '/Categorias/Create',
            editar: '/Categorias/Edit'
        }
    },
    mounted() {
        console.clear();
        this.loadCategorias();
        $('#ModalC').on('hidden.bs.modal', this.Mhide);
    },
    methods: {
        loadCategorias: async function () {
            let Elemento = this;
            await axios.get('/Categorias/GCategorias')
                .then(function (resp) {
                    resp = resp.data;
                    Elemento.Datos = resp.datos;
                })
                .catch(function (error) {
                    console.log(error)
                });
        },
        Mhide: function () {
            this.Modal = {
                Tipo: 0,
                Titulo: '',
                Boton: {
                    texto: '',
                    disabled: false,
                },
                Registro: {
                    ID: null,
                    Nombre: '',
                    max: 30,
                    text: 'Nombre de Categoria',
                    placeholder: 'Nombre',
                    invalido: false,
                    error: ''
                },
            };
        },
        modal: function (tipo, valor = null) {
            this.Modal.Tipo = tipo;
            this.Modal.Titulo = (tipo == 1) ? 'Añadir Categoria' : 'Modificar Categoria';
            this.Modal.Boton.texto = (tipo == 1) ? 'Agregar' : 'Modificar';
            if (tipo == 2) {
                this.Modal.Registro.ID = valor.ID;
                this.Modal.Registro.Nombre = valor.Name;
            }
        },
        agregar: async function () {
            if (this.grupoValido()) {
                this.Modal.Boton.disabled = true;
                let Elemento = this;
                let data = { Nombre: this.Modal.Registro.Nombre };
                if (this.Modal.Tipo == 2) data.CategoriaId = this.Modal.Registro.ID;
                let ruta = (this.Modal.Tipo == 1) ? this.Rutas.crear : this.Rutas.editar;
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
                                case 2:
                                    Elemento.Modal.Registro.invalido = true;
                                    Elemento.Modal.Registro.error = 'Categoria ya existente';
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
            this.validacion(this.Modal.Registro.Nombre);
            dataInvalida += ((this.Modal.Registro.invalido) ? 1 : 0);
            return (dataInvalida > 0) ? false : true;
        },
        validacion: function (data) {
            this.Modal.Registro.error = ((data.trim().length > 0) ? '' : 'Camnpo es requerido');
            if (this.Modal.Registro.error.length == 0) this.Modal.Registro.error = ((data.trim().length > this.Modal.Registro.max) ? ('Debe tener menos de ' + this.Modal.Registro.max + ' caracteres') : '');
            this.Modal.Registro.invalido = (this.Modal.Registro.error.length > 0) ? true : false;
        }
    },
    watch: {
        'Modal.Registro.Nombre': function (data) {
            this.validacion(data);
        }
    }
});