using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ASPProject.Models
{
    public class Rol
    {
        [Key]
        public int RolId { get; set; }

        [Display(Name = "Rol")]
        [Required(ErrorMessage = "El campo Rol es obligatorio")]
        public string NombreRol { get; set; }

        [Display(Name = "Descripción")]
        [StringLength(255, ErrorMessage = "La Descprición debe tener menos de 255 caracteres")]
        public string Descripcion { get; set; }

        public virtual ICollection<Usuario> Usuarios { get; set; }//*/
    }
}