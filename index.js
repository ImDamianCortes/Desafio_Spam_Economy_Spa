
//1.   Usar el paquete nodemailer para el envío de correos electrónicos. 
const enviar = require('./mailer')

//Importacion de paquetes
const url = require('url')
const http = require('http')
const axios = require('axios')
const { v4: uuidv4 } = require('uuid'); //identificador unico
const fs = require('fs')
const chalk = require('chalk')

//Settings
const hostname = 'localhost';
const port = 3000;


http
    .createServer(function (req, res) {
        //recepcion de informacion desde el formulario
        let { correos, asunto, contenido } = url.parse(req.url, true).query

        if (req.url == '/') {
            res.setHeader('content-type', 'text/html')
            fs.readFile('index.html', 'utf8', (err, data) => {
                res.end(data)
            })
        }
        
        if (req.url.startsWith('/mailing')) {
            //3. Realizar una petición a la api de mindicador.cl y preparar un template que incluya los 
            //   valores  del  dólar,  euro,  uf  y  utm.  Este  template  debe  ser  concatenado  al  mensaje 
            //   descrito por el usuario en el formulario HTML. 
            axios.get('https://mindicador.cl/api')
                .then(function (response) {

                    // Indicadores
                    const dolar = response.data.dolar.codigo
                    const dolarValue = response.data.dolar.valor

                    const euro = response.data.euro.codigo
                    const euroValue = response.data.euro.valor

                    const uf = response.data.uf.codigo
                    const ufValue = response.data.uf.valor

                    const utm = response.data.utm.codigo
                    const utmValue = response.data.utm.valor


                    //template indicadores
                    const templateIndicadores = `
    El valor del ${dolar} el dia de hoy es: ${dolarValue}\n
    El valor del ${euro} el dia de hoy es: ${euroValue}\n
    El valor del ${uf} el dia de hoy es: ${ufValue}\n
    El valor del ${utm} el dia de hoy es: ${utmValue}
    `
                    //template mail
                    let fullContent = `${contenido}\n${templateIndicadores}`

                    //llamado a la funcion para envio de correos
                    //importada desde mailer.js
                    enviar(correos, asunto, fullContent).then((data) => {

                        //identificador unico
                        let idUnico = uuidv4().slice(0, 6)
                        //ruta almacenamiento de correos
                        let ruta = '/correos/'
                        //nonbre de archivo
                        let nombreArchivo = `${idUnico}-${correos}.txt`
                        //template para mail
                        let templateTxt = `mail: ${correos}\nasunto: ${asunto}\n\n${fullContent}`

                        //5.   Cada  correo  debe  ser  almacenado  como  un  archivo  con  un  nombre  identificador 
                        //      único en una carpeta “correos”. Usar el paquete UUID para esto.  
                        fs.writeFile(`${ruta}${nombreArchivo}`, templateTxt, 'utf8', () => {
                            // 4. Enviar un mensaje de éxito o error por cada intento de envío de correos electrónicos.  
                            res.setHeader('content-type', 'text/html')
                            console.log(chalk.blue.bold('Enviado exitosamente !!!'))
                            res.write('<h1>Enviado exitosamente !!!</h1>')
                            res.end()
                        })
                    })
                })
                .catch(function (error) {
                    console.log(chalk.red.bold(error));
                    res.write(error)
                    res.end()
                })
        }
    })
    .listen(`${port}`, console.log(`Servidor encendido, http://${hostname}:${port}`))