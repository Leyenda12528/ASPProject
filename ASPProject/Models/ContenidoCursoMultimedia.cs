using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ASPProject.Models
{
    public class ContenidoCursoMultimedia
    {
        [Key]
        public int ContenidoCursoMultimediaId { get; set; }

        [Required]
        public string Nombre { get; set; }

        [Display(Name = "Contenido Multimedia")]
        public int ContenidoCursoId { get; set; }
        public ContenidoCurso ContenidoCurso { get; set; }

        [Display(Name = "Multimedia")]
        public int MultimediaId { get; set; }
        public Multimedia Multimedia { get; set; }

        [Display(Name = "Archivo")]
        [Required]
        public string Archivo { get; set; }
    }
}