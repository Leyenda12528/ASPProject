using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ASPProject.Models
{
    public class Aplicacion: DbContext
    {
        public DbSet<Rol> Rol { get; set; }
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<Categoria> Categoria { get; set; }
        public DbSet<Curso> Curso { get; set; }
        public DbSet<ContenidoCurso> ContenidoCurso { get; set; }
        public DbSet<Multimedia> Multimedia { get; set; }
        public DbSet<ContenidoCursoMultimedia> ContenidoCursoMultimedia { get; set; }
    }
}