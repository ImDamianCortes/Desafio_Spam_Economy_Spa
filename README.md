# Desafio_Spam_Economy_Spa

###Modulo 6

##Descripcion

La  empresa  Spam  Economy  Spa  se  dedica  a  ofrecer  el  servicio  de  notificaciones  de  los 
indicadores  económicos  y  está  abriendo  una  sucursal  en  Chile,  por  lo  que  necesita  un 
desarrollador  que  programe  un  servidor  que  reciba una lista de correos electrónicos, a los cuales se
les enviará periódicamente correos electrónicos personalizados  con  los 
indicadores del dólar, euro, uf y utm. 

Deberás desarrollar un servidor que al ser consultado devuelva un sitio web que encontrarás 
en  el  Apoyo  Desafío  -  Spam  Economy  Spa.  En  la  siguiente  imagen  verás  el  formulario 
disponible  en  el  HTML  de  apoyo,  el  cual  cuenta  con  3  campos:  Correos  destino, asunto y 
mensaje.

El  objetivo  del  desafío  es  lograr  enviarle  un  correo  electrónico  a  diferentes  direcciones 
separadas por “,” en el campo “correos” del formulario. Además de concatenarle al mensaje 
escrito los indicadores económicos mencionados al inicio de la descripción de este desafío. 
La siguiente imagen es una referencia de cómo debería quedar el correo final. 

##Requerimientos 
 
 
1.   Usar el paquete nodemailer para el envío de correos electrónicos.  
2.   Crear  una  función  que  reciba  la  lista  de  correos,  asunto  y  contenido  a enviar. Esta 
función debe retornar una promesa.  
3. Realizar una petición a la api de mindicador.cl y preparar un template que incluya los 
valores  del  dólar,  euro,  uf  y  utm.  Este  template  debe  ser  concatenado  al  mensaje 
descrito por el usuario en el formulario HTML. 
4. Enviar un mensaje de éxito o error por cada intento de envío de correos electrónicos.  
5.   Cada  correo  debe  ser  almacenado  como  un  archivo  con  un  nombre  identificador 
único en una carpeta “correos”. Usar el paquete UUID para esto.

