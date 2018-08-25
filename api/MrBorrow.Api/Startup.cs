using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace MrBorrow.Api
{
    public class Startup
    {
    private string _swaggerVersion = "v0.8";
    private string _swaggerApiName = "MrBorrow Client API";

    public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

      services.AddCors();


          services.AddSwaggerGen(c =>
          {
            c.SwaggerDoc(_swaggerVersion, new Swashbuckle.AspNetCore.Swagger.Info { Title = _swaggerApiName, Version = _swaggerVersion });
          });
        }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

      app.UseCors(builder =>
          builder.WithOrigins("*")
                 .AllowAnyHeader()
                 .AllowAnyMethod()
          );

      app.UseSwagger();
      app.UseSwaggerUI(c =>
      {
        c.SwaggerEndpoint($"/swagger/{_swaggerVersion}/swagger.json", $"{_swaggerApiName} {_swaggerVersion}");
      });

      app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
