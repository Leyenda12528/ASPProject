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
        public ActionResult Index() {
            Usuario usuario = (Usuario)Session["login"];
            if (usuario == null) return RedirectToAction("Login", "Usuarios");
            else return View();
        }

        //---------------------------------------------------------------------------------------------------------
        //---------------------------------------------------MANTENIMIENTO DE CURSOS
        // GET: Cursos
        [ActionName("MyCursos")]
        public ActionResult MCursos()
        {
            Usuario usuario = (Usuario)Session["login"];
            if (usuario == null) return RedirectToAction("Login", "Usuarios");
            else {
                if ((usuario.RolId == 2) || (usuario.RolId == 3)) return View();
                else return RedirectToAction("Index403", "Home");
            }
        }

        //  GET: Get Roles 
        [ActionName("GCursos")]
        public ActionResult GetCursos()
        {
            var result = new { valido = false, tipo = 0, datos = new List<GCursos1>() };
            Usuario usuario = (Usuario)Session["login"];
            var Datos2 = App.Curso.ToList()
                    .Where(n => n.UsuarioId == usuario.UsuarioId)
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
                    curso.UsuarioId = usuario.UsuarioId;
                    //curso.UsuarioId = 1;
                    App.Curso.Add(curso);
                    App.SaveChanges();

                    var Datos = App.Curso.ToList()
                        .Where(n => n.UsuarioId == usuario.UsuarioId)
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
                    curso.UsuarioId = usuario.UsuarioId;
                    //curso.UsuarioId = 1;
                    App.Entry(curso).State = EntityState.Modified;
                    App.SaveChanges();

                    var Datos = App.Curso.ToList()
                        .Where(n => n.UsuarioId == usuario.UsuarioId)
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
        
        //-----------------------------------------------------------------------------
        // --------------------------------------------------     CURSOS DETALLE
        // GET: Cursos/Details/ -   VISTA
        [ActionName("DetalleMy")]
        public ActionResult Details(int id)
        {
            Usuario usuario = (Usuario)Session["login"];
            if (usuario != null) {
                if ((usuario.RolId == 2) || (usuario.RolId == 3))
                {
                    ViewBag.ID = id;
                    return View();
                } else return RedirectToAction("Index403", "Home");
            } else return RedirectToAction("Login", "Usuarios");
        }
        //  GET: Cursos/Detalle -   DATOS
        [ActionName("GDetalleMy")]
        public ActionResult GDetails(int id)
        {
            Usuario usuario = (Usuario)Session["login"];
            var result = new { valido = false, tipo = 0, datos = new GCursoD1() };
            //  GET DATOS GENERALES DE CURSO
            var Dato = App.Curso.ToList()
                    .Where(n => n.CursoId == id && n.UsuarioId == usuario.UsuarioId)
                    .Select(n =>
                       new GCursoD1
                       {
                           ID = n.CursoId,
                           Name = n.Titulo,
                           Descripcion = n.Descripcion,
                           Imagen = (n.Imagen != null) ? n.Imagen : "/Imagenes/sinFoto.png",
                           IDCategoria = n.CategoriaId,
                           TCategoria = App.Categoria.Find(n.CategoriaId).Nombre,
                           Temas = App.ContenidoCurso.ToList()
                                    .Where(a => a.CursoId == id)
                                    .Select(a => new CCurso {
                                        ID = a.ContenidoCursoId,
                                        Name = a.Nombre,
                                        Descripcion = a.Descripcion,
                                        Contenido = (a.Contenido != null) ? a.Contenido : "",
                                        activo = false
                                    })
                                    .ToList(),
                       }).First();
            //  GET CONTENIDO DE CURSO
            result = new { valido = true, tipo = 0, datos = Dato };
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        //-----------------------------------------------------------------------------
        //      CONTENIDO DE CURSOS 
        // POST: Cursos/CreateC/
        [ActionName("CreateC")]
        [HttpPost]
        public  ActionResult CrearContenido([Bind(Include = "ContenidoCursoId,Nombre,Descripcion,Contenido,CursoId")] ContenidoCurso tema)
        {
            Usuario usuario = (Usuario)Session["login"];
            var result = new { valido = false, tipo = 0, datos = new List<CCurso>() };
            if (ModelState.IsValid)
            {
                App.ContenidoCurso.Add(tema);
                App.SaveChanges();
                var Datos = App.ContenidoCurso.ToList()
                            .Where(a => a.CursoId == tema.CursoId)
                            .Select(a => new CCurso
                            {
                                ID = a.ContenidoCursoId,
                                Name = a.Nombre,
                                Descripcion = a.Descripcion,
                                Contenido = (a.Contenido != null) ? a.Contenido : "",
                                activo = false
                            }).ToList();
                result = new { valido = true, tipo = 0, datos = Datos };
            } else result = new { valido = false, tipo = 1, datos = new List<CCurso>() };
            return Json(result);
        }

        // POST: Cursos/CreateC/
        [ActionName("EditC")]
        [HttpPost]
        public ActionResult EditarContenido([Bind(Include = "ContenidoCursoId,Nombre,Descripcion,Contenido,CursoId")] ContenidoCurso tema)
        {
            var result = new { valido = false, tipo = 0, datos = new List<CCurso>() };
            if (ModelState.IsValid)
            {
                App.Entry(tema).State = EntityState.Modified;
                App.SaveChanges();
                var Datos = App.ContenidoCurso.ToList()
                            .Where(a => a.CursoId == tema.CursoId)
                            .Select(a => new CCurso
                            {
                                ID = a.ContenidoCursoId,
                                Name = a.Nombre,
                                Descripcion = a.Descripcion,
                                Contenido = (a.Contenido != null) ? a.Contenido : "",
                                activo = false
                            }).ToList();
                result = new { valido = true, tipo = 0, datos = Datos };
            } else result = new { valido = false, tipo = 1, datos = new List<CCurso>() };
            return Json(result);
        }
        //-----------------------------------------------------------------------------
        //      MULTIMEDIA DE CONTENIDOS
        [ActionName("GMultimediaMy")]
        public ActionResult GMultimediasMy (int id)
        {
            Usuario usuario = (Usuario)Session["login"];
            var result = new { valido = false, tipo = 0, datos = new List<MyNultiEstructura>() };
            List<MyNultiEstructura> Datos = App.ContenidoCursoMultimedia.ToList()
                            .Where(n => n.ContenidoCursoId == id)
                            .Select(n => new MyNultiEstructura {
                                    ID = n.ContenidoCursoMultimediaId,
                                    Nombre = n.Nombre,
                                    IDContenido = n.ContenidoCursoId,
                                    IDMulti = n.MultimediaId,
                                    Multimedia = App.Multimedia.Find(n.MultimediaId).Nombre
                            }).ToList();
            result = new { valido = true, tipo = 0, datos = Datos };
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}
