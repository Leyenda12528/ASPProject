using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ASPProject.Models
{
    public class ContenidoCurso
    {
        [Key]
        public int ContenidoCursoId { get; set; }

        [Required]
        [StringLength(200)]
        public string Nombre { get; set; }

        [Required]
        [StringLength(255)]
        public string Descripcion { get; set; }

        [DataType(DataType.MultilineText)]
        public string Contenido { get; set; }

        [Display(Name = "Curso")]
        public int CursoId { get; set; }
        public Curso Curso { get; set; }

        public virtual ICollection<ContenidoCursoMultimedia> ContenidoCursoMultimedias { get; set; }

    }
}