import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

export = { transport: `smtp://admin:admin@localhost:2500`,
        defaults: {
          from:'"pawulon123@my.com" ',
        },
        template: {
            dir: __dirname + '/templates',
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            }, 
        }  
        
        
    }
   