using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebAPIHW.Models;

namespace WebAPIHW.Controllers
{
    public class HomeController : Controller
    {
        ApplicationDbContext db = new ApplicationDbContext();
        public ActionResult Index()
        {
            var books = db.Books.ToList();
            return View();
        }

        public ActionResult Add()
        {    
            return View();
        }
        public ActionResult Edit()
        {
            return View();
        }
        public ActionResult Delete()
        {
            return View();
        }

        public ActionResult Books()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}