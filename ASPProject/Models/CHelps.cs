using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ASPProject.Models
{
    public class CHelps
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Descripcion { get; set; }
    }
    //  ESTRUCTURA DE UN CURSO PARA EL AUTOR
    public class GCursos1
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Descripcion { get; set; }
        public string Imagen { get; set; }
        public int IDCategoria { get; set; }
        public string TCategoria { get; set; }
    }
    //  ESTRUCTURA DE MULTIMEDIA
    public class GMultiM
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Extension { get; set; }
        public int Size { get; set; }
    }
    //  ESTRUCTURA DE CURSO CON SUS TEMAS PARA EL AUTOR
    public class CCurso
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Descripcion { get; set; }
        public string Contenido { get; set; }
        public bool activo { get; set; }
    }
    public class GCursoD1
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Descripcion { get; set; }
        public string Imagen { get; set; }
        public int IDCategoria { get; set; }
        public string TCategoria { get; set; }
        public List<CCurso> Temas { get; set; }
    }
    //  ESTRUCTURA SIMPLE DE ID Y NOMBRE
    public class Simple
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }
    //  ESTRUCTURA DE USUARIO
    public class UserEstructura
    {
        public int ID { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Fecha { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }
        public string Correo { get; set; }
        public int IDRol { get; set; }
        public string Rol { get; set; }
    }
    public class RolEstructura {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Descripcion { get; set; }
    }
}