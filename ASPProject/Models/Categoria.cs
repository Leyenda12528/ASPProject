using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ASPProject.Models
{
    public class Categoria
    {
        [Key]
        public int CategoriaId { get; set; }

        [Required]
        [StringLength(30), MinLength(3)]
        public string Nombre { get; set; }

        public virtual ICollection<Curso> Cursos { get; set; }
    }
}