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
        [ActionName("Login")]
        public ActionResult Index()
        {
            return View();
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

        // GET: Usuarios/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
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

        // GET: Usuarios/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Usuarios/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
