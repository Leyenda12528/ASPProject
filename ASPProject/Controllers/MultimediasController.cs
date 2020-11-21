using ASPProject.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ASPProject.Controllers
{
    public class MultimediasController : Controller
    {
        private Aplicacion App = new Aplicacion();
        // GET: Multimedias
        public ActionResult Index()
        {
            Usuario usuario = (Usuario)Session["login"];
            if (usuario != null)
            {
                if (usuario.RolId == 3) return View();
                else return RedirectToAction("Index403", "Home");
            } else return RedirectToAction("Login", "Usuarios");
        }

        [ActionName("Medias")]
        public ActionResult GMultiMedia()
        {
            Usuario usuario = (Usuario)Session["login"];
            var result = new { valido = false, tipo = 0, datos = new List<GMultiM>() };
            if (usuario != null)
            {
                var Datos = App.Multimedia.ToList()
                        .Select(n =>
                           new GMultiM
                           {
                               ID = n.MultimediaId,
                               Name = n.Nombre,
                               Extension = n.Extension,
                               Size = n.TamanioMaximo
                           }).ToList();
                result = new { valido = true, tipo = 0, datos = Datos };
            } else result = new { valido = false, tipo = -1, datos = new List<GMultiM>() };
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        // POST: Multimedias/Create
        [HttpPost]
        public ActionResult Create([Bind(Include = "MultimediaId,Nombre,Extension,TamanioMaximo")] Multimedia multimedia)
        {
            Usuario usuario = (Usuario)Session["login"];
            var result = new { valido = false, tipo = 0, datos = new List<GMultiM>() };
            if (ModelState.IsValid) {
                App.Multimedia.Add(multimedia);
                App.SaveChanges();
                List<GMultiM> Datos = App.Multimedia.ToList()
                    .Select(n =>
                       new GMultiM
                       {
                           ID = n.MultimediaId,
                           Name = n.Nombre,
                           Extension = n.Extension,
                           Size = n.TamanioMaximo
                       }).ToList();
                result = new { valido = true, tipo = 0, datos = Datos };
            } else result = new { valido = false, tipo = 1, datos = new List<GMultiM>() };
            return Json(result);
        }

        // POST: Multimedias/Edit/5
        [HttpPost]
        public ActionResult Edit([Bind(Include = "MultimediaId,Nombre,Extension,TamanioMaximo")] Multimedia multimedia)
        {
            Usuario usuario = (Usuario)Session["login"];
            var result = new { valido = false, tipo = 0, datos = new List<GMultiM>() };
            if (ModelState.IsValid)
            {
                App.Entry(multimedia).State = EntityState.Modified;
                App.SaveChanges();
                List<GMultiM> Datos = App.Multimedia.ToList()
                    .Select(n =>
                       new GMultiM
                       {
                           ID = n.MultimediaId,
                           Name = n.Nombre,
                           Extension = n.Extension,
                           Size = n.TamanioMaximo
                       }).ToList();
                result = new { valido = true, tipo = 0, datos = Datos };
            } else result = new { valido = false, tipo = 1, datos = new List<GMultiM>() };
            return Json(result);
        }
    }
}
