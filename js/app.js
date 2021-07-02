// Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

// Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;




eventListeners()
function eventListeners(){
     // Cuando la app arranca
     document.addEventListener('DOMContentLoaded',iniciarApp);


     // Campos del formulario
     email.addEventListener('change',validarFormulario);
     asunto.addEventListener('change',validarFormulario);
     mensaje.addEventListener('change',validarFormulario);

     // btn enviar email
     btnEnviar.addEventListener('click',enviarEmail);;

     // btn reset form
     btnReset.addEventListener('click',resetearForm);
}



// Funciones
function iniciarApp(){
     btnEnviar.disabled = true;
     btnEnviar.classList.add('cursor-not-allowed','opacity-50');
}


// Valida el formulario

function validarFormulario(e){
     if(e.target.value.length > 0){
          // eliminar los errores
          const error = document.querySelector('p.error');
          if(error){
               error.remove();
          }
          e.target.classList.remove('border','border-red-500');
          e.target.classList.add('border','border-green-500');
     }else{
          e.target.classList.remove('border','border-green-500');
          e.target.classList.add('border','border-red-500');
          mostrarError('Todos los campos son obligatorios');
     }


     // Validar email
     if(e.target.type === 'email'){
          if(er.test( e.target.value )){
               // eliminar los errores
               const error = document.querySelector('p.error');
               if(error){
                    error.remove();
               }    
     
               e.target.classList.remove('border','border-red-500');
               e.target.classList.add('border','border-green-500');
          }else{
               e.target.classList.remove('border','border-green-500');
               e.target.classList.add('border','border-red-500');
               mostrarError('Email no valido');
          }
     }


     // Validar todas
     if(er.test( email.value ) && asunto.value !== '' && mensaje.value !== ''){
          btnEnviar.classList.remove('cursor-not-allowed','opacity-50');
          btnEnviar.disabled=false;
     }else{
          iniciarApp();
     }
}

function mostrarError(mensaje){
     const mensajeError = document.createElement('p');

     mensajeError.textContent = mensaje;
     mensajeError.classList.add('border','border-red-500','background-red-100','text-red-500','p-3','mt-5','text-center','error');

     const errores = document.querySelectorAll('.error');
     if(errores.length === 0){
          formulario.appendChild(mensajeError);
     }
     
}


// Enviar Email
function enviarEmail(e){
     e.preventDefault()
     const spinner = document.querySelector('#spinner');
     const mensajeEnviado = document.createElement('p')
     mensajeEnviado.textContent= 'Tu mensaje fue enviado con Exito!'
     mensajeEnviado.classList.add('background-green-100','text-green-500','p-3','mt-5','text-center','mb-5','validate');
     spinner.style.display='flex';


     // Despues de 3 segundos ocultar el spinner y el mensaje
     setTimeout(() => {
          spinner.style.display='none';
          formulario.insertBefore(mensajeEnviado,spinner);
          setTimeout(() => {
               const borrarValidate = document.querySelector('p.validate');
               if(borrarValidate){
                    borrarValidate.remove()
                    resetearForm(e);
               }
          }, 3000);
     }, 3000);

}


function resetearForm(e){
     e.preventDefault();
     formulario.reset();
     email.classList.remove('border','border-green-500');
     asunto.classList.remove('border','border-green-500');
     mensaje.classList.remove('border','border-green-500');
     iniciarApp();
     // eliminar los errores
     const error = document.querySelector('p.error');
     if(error){
          error.remove();
     }  
}