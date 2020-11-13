using ASPProject.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ASPProject.Controllers
{
    public class CategoriasController : Controller
    {
        private Aplicacion App = new Aplicacion();
        // GET: Categorias
        public ActionResult Index()
        {
            Usuario usuario = (Usuario)Session["login"];
            return View();
        }

        [ActionName("GCategorias")]
        public ActionResult GetCategorias()
        {
            Usuario usuario = (Usuario)Session["login"];
            var result = new { valido = false, tipo = 0, datos = new List<Simple>() };
            var Datos = App.Categoria.ToList()
                    .Select(n =>
                       new Simple
                       {
                           ID = n.CategoriaId,
                           Name = n.Nombre
                       });
            result = new { valido = true, tipo = 0, datos = Datos.ToList() };
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        // POST: Categorias/Create
        [HttpPost]
        public ActionResult Create([Bind(Include = "CategoriaId,Nombre")] Categoria categoria)
        {
            Usuario usuario = (Usuario)Session["login"];

            var result = new { valido = false, tipo = 0, datos = new List<Simple>() };
            if (ModelState.IsValid)
            {
                Categoria dato = App.Categoria.Where(n => n.Nombre.Equals(categoria.Nombre)).FirstOrDefault();
                if (dato == null)
                {
                    App.Categoria.Add(categoria);
                    App.SaveChanges();
                    var Datos = App.Categoria.ToList()
                        .Select(n =>
                           new Simple
                           {
                               ID = n.CategoriaId,
                               Name = n.Nombre
                           });
                    result = new { valido = true, tipo = 0, datos = Datos.ToList() };
                } else result = new { valido = false, tipo = 2, datos = new List<Simple>() };
            } else result = new { valido = false, tipo = 1, datos = new List<Simple>() };
            return Json(result);
        }

        // POST: Categorias/Edit/5
        [HttpPost]
        public ActionResult Edit([Bind(Include = "CategoriaId,Nombre")] Categoria categoria)
        {
            Usuario usuario = (Usuario)Session["login"];
            var result = new { valido = false, tipo = 0, datos = new List<Simple>() };
            if (ModelState.IsValid)
            {
                
                Categoria dato = App.Categoria.Where(n => n.Nombre.Equals(categoria.Nombre) && n.CategoriaId != categoria.CategoriaId).FirstOrDefault();
                if (dato == null)
                {
                    App.Entry(categoria).State = EntityState.Modified;
                    App.SaveChanges();
                    var Datos = App.Categoria.ToList()
                        .Select(n =>
                           new Simple
                           {
                               ID = n.CategoriaId,
                               Name = n.Nombre
                           });
                    result = new { valido = true, tipo = 0, datos = Datos.ToList() };
                }
                else result = new { valido = false, tipo = 2, datos = new List<Simple>() };
            }
            else result = new { valido = false, tipo = 1, datos = new List<Simple>() };
            return Json(result);
        }
        
    }
}
