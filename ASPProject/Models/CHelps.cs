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
    public class GCursos1
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Descripcion { get; set; }
        public string Imagen { get; set; }
        public int IDCategoria { get; set; }
        public string TCategoria { get; set; }
    }
    public class Simple
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }
}