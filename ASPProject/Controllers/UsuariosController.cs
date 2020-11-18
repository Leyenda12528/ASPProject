using ASPProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ASPProject.Controllers
{
    public class UsuariosController : Controller
    {
        private Aplicacion App = new Aplicacion();
        // GET: Usuarios
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(string correo, string contra)
        {
            //return Json(true);
            Usuario user = App.Usuario.ToList()
                .Where(n => n.CorreoElectronico.Equals(correo) && n.Password.Equals(contra)).FirstOrDefault();
            if (user == null)
            {
                ViewBag.Message = "Usuario o contraseña Invalido";
                return View();
            } else {
                Session["login"] = user;
                //  ALUMNOS
                if (user.RolId == 1)
                {
                    return RedirectToAction("Index", "Cursos");
                }
                //  DOCENTES
                else if (user.RolId == 2)
                {
                    return RedirectToAction("MyCursos", "Cursos");
                }
                //  ADMINISTRADOR
                else return RedirectToAction("Index", "Home");   
            }//*/
        }
        public ActionResult Logout()
        {
            Session["login"] = null;
            return RedirectToAction("Index", "Home");
        }

        //  GET: Register
        [ActionName("Registrar")]
        public ActionResult Register()
        {
            return View();
        }
        //  GET: Get Roles 
        [ActionName("Roles")]
        public  ActionResult Roles()
        {
            var Roles = App.Rol.ToList()
                .Where(n => n.RolId != 3)
                .Select( n  =>
                new {
                    ID = n.RolId,
                    Name = n.NombreRol,
                    Descripcion = n.Descripcion
                });
            //Roles.
            return Json(Roles, JsonRequestBehavior.AllowGet);
        }
        // POST: Usuarios/Create
        [HttpPost]
        [ActionName("Create")]
        public ActionResult SetUsuario([Bind(Include = "UsuarioId,Nombres,Apellidos,FechaNacimiento,Direccion,Telefono,CorreoElectronico,Password,Estado,RolId")] Usuario usuario, String fecha)
        {
            usuario.Estado = 1;
            usuario.FechaNacimiento = DateTime.Parse(fecha);
            var result = new { valido = true, tipo = 0 };
            if (ModelState.IsValid)
            {
                Usuario dato = App.Usuario.Where(n => n.CorreoElectronico.Equals(usuario.CorreoElectronico)).FirstOrDefault();
                if (dato == null)
                {
                    App.Usuario.Add(usuario);
                    App.SaveChanges();
                    Session["login"] = usuario;
                    return RedirectToAction("Index", "Home");
                    //result = new { valido = true, tipo = 0 };
                } else result = new { valido = false, tipo = 2 };
            } else result = new { valido = false, tipo = 1 };
            return Json(result);
        }

        //--------------------------------------   MANTENIMIENTO DE USUARIOS
        //  GET: Usuarios
        [ActionName("Listar")]
        public ActionResult SUsuarios()
        {
            return View();
        }

        //  GET: Usuarios
        [ActionName("GUsers")]
        public ActionResult GUsuarios()
        {
            Usuario usuario = (Usuario)Session["login"];
            if (usuario != null)
            {
                if (usuario.RolId == 3)
                {

                }
                else { }
            }
            //*/
            var result = new { valido = false, tipo = 0, datos = new List<UserEstructura>() };
            List<UserEstructura> Datos = App.Usuario.ToList()
                .Select(n =>
                    new UserEstructura
                    {
                        ID = n.UsuarioId,
                        Nombres = n.Nombres,
                        Apellidos = n.Apellidos,
                        Fecha = n.FechaNacimiento.ToString(),
                        Direccion = n.Direccion,
                        Telefono = n.Telefono,
                        Correo = n.CorreoElectronico,
                        IDRol = n.RolId,
                        Rol = App.Rol.Find(n.RolId).NombreRol
                    }).ToList();
            result = new { valido = true, tipo = 0, datos = Datos };
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        // POST: Usuarios/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
