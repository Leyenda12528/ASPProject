using ASPProject.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ASPProject.Controllers
{
    public class CursosController : Controller
    {
        private Aplicacion App = new Aplicacion();
        // GET: Cursos
        [ActionName("MyCursos")]
        public ActionResult MCursos()
        {
            Usuario usuario = (Usuario)Session["login"];
            return View();
        }

        //  GET: Get Roles 
        [ActionName("GCursos")]
        public ActionResult getCursos()
        {
            Usuario usuario = (Usuario)Session["login"];
            var result = new { valido = false, tipo = 0, datos = new List<GCursos1>() };
            if (usuario != null)
            {
                var Datos = App.Curso.ToList()
                    .Where(n => n.UsuarioId == usuario.UsuarioId)
                    .Select(n =>
                       new GCursos1 {
                           ID = n.CursoId,
                           Name = n.Titulo,
                           Descripcion = n.Descripcion,
                           Imagen = (n.Imagen != null) ? n.Imagen : "/Imagenes/sinFoto.png",
                           IDCategoria = n.CategoriaId,
                           TCategoria = App.Categoria.Find(n.CategoriaId).Nombre
                       });
                result = new { valido = true, tipo = 0, datos = Datos.ToList() };
            } else result = new { valido = false, tipo = -1, datos = new List<GCursos1>() };
            //-
            var Datos2 = App.Curso.ToList()
                    .Where(n => n.UsuarioId == 1)
                    .Select(n =>
                       new GCursos1
                       {
                           ID = n.CursoId,
                           Name = n.Titulo,
                           Descripcion = n.Descripcion,
                           Imagen = (n.Imagen != null) ? n.Imagen : "/Imagenes/sinFoto.png",
                           IDCategoria = n.CategoriaId,
                           TCategoria = App.Categoria.Find(n.CategoriaId).Nombre
                       });
            result = new { valido = true, tipo = 0, datos = Datos2.ToList() };
            //-
            return Json(result, JsonRequestBehavior.AllowGet);//*/
        }

        // POST: Cursos/Create
        [ActionName("CreateMy")]
        [HttpPost]
        public ActionResult Create([Bind(Include = "CursoId,Titulo,Descripcion,Imagen,CategoriaId", Exclude = "UsuarioId")] Curso curso, HttpPostedFileBase upload)
        {
            Usuario usuario = (Usuario)Session["login"];
            var result = new { valido = false, tipo = 0, datos = new List<GCursos1>() };
            if (ModelState.IsValid) {
                //Categoria dato = App.Categoria.Where(n => n.Nombre.Equals(categoria.Nombre)).FirstOrDefault();
                Curso dato = App.Curso.Where(n => n.Titulo.Equals(curso.Titulo)).FirstOrDefault();
                if (dato == null)
                {
                    if (upload != null)
                    {
                        var fileName = Path.GetFileName(upload.FileName);
                        fileName = upload.ContentType;

                        string[] partes = fileName.Split('/');
                        string extension = partes[1];
                        fileName = DateTimeOffset.UtcNow.ToUnixTimeSeconds() + "_" + 1 + "." + extension;
                        var path = Path.Combine(Server.MapPath("~/Imagenes"), fileName);
                        upload.SaveAs(path);

                        string ruta = "http://" + Request.Url.Authority + "/Imagenes/" + fileName;
                        curso.Imagen = ruta;
                    }
                    //curso.UsuarioId = usuario.UsuarioId;
                    curso.UsuarioId = 1;
                    App.Curso.Add(curso);
                    App.SaveChanges();

                    var Datos = App.Curso.ToList()
                        .Select(n =>
                           new GCursos1
                           {
                               ID = n.CursoId,
                               Name = n.Titulo,
                               Descripcion = n.Descripcion,
                               Imagen = (n.Imagen != null) ? n.Imagen : "/Imagenes/sinFoto.png",
                               IDCategoria = n.CategoriaId,
                               TCategoria = App.Categoria.Find(n.CategoriaId).Nombre
                           });
                    result = new { valido = true, tipo = 0, datos = Datos.ToList() };
                } else result = new { valido = false, tipo = 2, datos = new List<GCursos1>() };
            } else result = new { valido = false, tipo = 1, datos = new List<GCursos1>()};
            return Json(result);
        }

        // POST: Cursos/Edit/5
        [ActionName("EditMy")]
        [HttpPost]
        public ActionResult Edit([Bind(Include = "CursoId,Titulo,Descripcion,Imagen,CategoriaId", Exclude = "UsuarioId")] Curso curso, HttpPostedFileBase upload)
        {
            Usuario usuario = (Usuario)Session["login"];
            var result = new { valido = false, tipo = 0, datos = new List<GCursos1>() };
            if (ModelState.IsValid)
            {
                Curso dato = App.Curso.Where(n => n.Titulo.Equals(curso.Titulo) && n.CategoriaId != curso.CategoriaId).FirstOrDefault();
                if (dato == null)
                {
                    if (upload != null)
                    {
                        var fileName = Path.GetFileName(upload.FileName);
                        fileName = upload.ContentType;

                        string[] partes = fileName.Split('/');
                        string extension = partes[1];
                        fileName = DateTimeOffset.UtcNow.ToUnixTimeSeconds() + "_" + 1 + "." + extension;
                        var path = Path.Combine(Server.MapPath("~/Imagenes"), fileName);
                        upload.SaveAs(path);

                        string ruta = "http://" + Request.Url.Authority + "/Imagenes/" + fileName;
                        curso.Imagen = ruta;
                    } else
                    {
                        Curso cursoOld = App.Curso.AsNoTracking().Where(c => c.CursoId == curso.CursoId).FirstOrDefault();
                        curso.Imagen = cursoOld.Imagen;
                    }
                    curso.UsuarioId = 1;
                    App.Entry(curso).State = EntityState.Modified;
                    App.SaveChanges();

                    var Datos = App.Curso.ToList()
                        .Select(n =>
                           new GCursos1
                           {
                               ID = n.CursoId,
                               Name = n.Titulo,
                               Descripcion = n.Descripcion,
                               Imagen = (n.Imagen != null) ? n.Imagen : "/Imagenes/sinFoto.png",
                               IDCategoria = n.CategoriaId,
                               TCategoria = App.Categoria.Find(n.CategoriaId).Nombre
                           });
                    result = new { valido = true, tipo = 0, datos = Datos.ToList() };
                } else result = new { valido = false, tipo = 2, datos = new List<GCursos1>() };
            } else result = new { valido = false, tipo = 1, datos = new List<GCursos1>() };
            return Json(result);
        }









        // GET: Cursos/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }
        
        
        // POST: Cursos/Delete/5
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
