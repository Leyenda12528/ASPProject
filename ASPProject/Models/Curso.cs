using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ASPProject.Models
{
    public class Curso
    {
        [Key]
        public int CursoId { get; set; }

        [Display(Name = "Título")]
        [Required]
        [StringLength(100)]
        public string Titulo { get; set; }

        [Display(Name = "Descripción")]
        [Required]
        [StringLength(255)]
        public string Descripcion { get; set; }

        [Display(Name = "Imagen")]
        [StringLength(255)]
        [DataType(DataType.ImageUrl)]
        public string Imagen { get; set; }

        [Display(Name = "Categoría")]
        public int CategoriaId { get; set; }
        public Categoria Categoria { get; set; }

        [Display(Name = "Creador")]
        public int UsuarioId { get; set; }

        public Usuario Usuario { get; set; }

        public virtual ICollection<ContenidoCurso> ContenidoCursos { get; set; }

    }
}