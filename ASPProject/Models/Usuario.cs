using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ASPProject.Models
{
    public class Usuario
    {
        [Key]
        public int UsuarioId { get; set; }

        [Display(Name = "Nombres")]
        [Required(ErrorMessage = "El campo Nombres es obligatorio")]
        [StringLength(100, ErrorMessage = "El campo acepta menos de 100 caracteres")]
        public string Nombres { get; set; }

        [Display(Name = "Apellidos")]
        [Required(ErrorMessage = "El campo Apellidos es obligatorio")]
        [StringLength(100, ErrorMessage = "El campo acepta menos de 100 caracteres")]
        public string Apellidos { get; set; }

        [Display(Name = "Fecha de nacimiento")]
        [Required(ErrorMessage = "El campo Fecha de nacimiento es obligatorio")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime FechaNacimiento { get; set; }

        [Display(Name = "Dirección")]
        [Required(ErrorMessage = "El campo Dirección es obligatorio")]
        [StringLength(250, ErrorMessage = "El campo acepta menos de 250 caracteres")]
        public string Direccion { get; set; }

        [Display(Name = "Teléfono")]
        [RegularExpression("^\\d{4}-\\d{4}$")]

        public string Telefono { get; set; }

        [Display(Name = "Correo electrónico")]
        [Required(ErrorMessage = "El campo Correo electrónico es obligatorio")]
        [DataType(DataType.EmailAddress)]
        public string CorreoElectronico { get; set; }

        [Display(Name = "Contraseña")]
        [Required(ErrorMessage = "El campo Contraseña es obligatorio")]
        [StringLength(30), MinLength(3, ErrorMessage = "Debe contener al menos 3 caracteres a 30")]
        public string Password { get; set; }

        [Required(ErrorMessage = "El campo Estado es obligatorio")]
        public int Estado { get; set; }

        [Display(Name = "Rol")]
        public int RolId { get; set; }

        public Rol Rol { get; set; }
        public ICollection<Curso> Cursos { get; set; }
    }
}