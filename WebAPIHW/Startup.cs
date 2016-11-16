using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(WebAPIHW.Startup))]
namespace WebAPIHW
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
