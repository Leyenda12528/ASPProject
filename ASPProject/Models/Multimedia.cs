using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ASPProject.Models
{
    public class Multimedia
    {
        [Key]
        public int MultimediaId { get; set; }

        [Required]
        [StringLength(100)]
        public string Nombre { get; set; }

        [StringLength(15)]
        public string Extension { get; set; }


        public int TamanioMaximo { get; set; }

        public virtual ICollection<ContenidoCursoMultimedia> ContenidoCursoMultimedias { get; set; }

    }
}