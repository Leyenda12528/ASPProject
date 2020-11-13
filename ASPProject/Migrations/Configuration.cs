namespace ASPProject.Migrations
{
    using ASPProject.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<ASPProject.Models.Aplicacion>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(ASPProject.Models.Aplicacion context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method
            //  to avoid creating duplicate seed data.
            context.Rol.AddOrUpdate(
                i => i.NombreRol,
                new Rol {
                    RolId =  1,
                    NombreRol = "Estudiante",
                    Descripcion = "Puede ver y subscribirse a cursos"
                },
                new Rol
                {
                    RolId = 2,
                    NombreRol = "Docente",
                    Descripcion = "Crea cursos"
                },
                new Rol
                {
                    RolId = 3,
                    NombreRol = "Administrador",
                    Descripcion = "Registra usuarios, categorias y más"
                }
            );
        }
    }
}
