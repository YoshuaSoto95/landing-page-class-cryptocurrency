// Variables globales
let currentTestimonial = 0;
let currentStep = 1;
const totalSteps = 3;

// Fade-in animation
document.addEventListener('DOMContentLoaded', function () {
    const fadeElements = document.querySelectorAll('.fade-in');

    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);

            if (isVisible) {
                element.classList.add('visible');
            }
        });
    }

    // Check on load
    checkFade();

    // Check on scroll
    window.addEventListener('scroll', checkFade);
});


// Modal de formulario
const modal = document.getElementById('formModal');
const thankYouModal = document.getElementById('thankYouModal');
const openModalButtons = document.querySelectorAll('.open-modal');
const closeModalButton = document.getElementById('closeModal');
const closeThankYouButton = document.getElementById('closeThankYou');
const form = document.getElementById('ticketForm');
const progressBar = document.getElementById('progressBar');

// Abrir modal
openModalButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Cerrar modal
closeModalButton.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    resetForm();
});

// Cerrar modal de agradecimiento
closeThankYouButton.addEventListener('click', () => {
    thankYouModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Navegación entre pasos del formulario
const nextStepButtons = document.querySelectorAll('.next-step');
const prevStepButtons = document.querySelectorAll('.prev-step');

nextStepButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (validateStep(currentStep)) {
            goToStep(currentStep + 1);
        }
    });
});

prevStepButtons.forEach(button => {
    button.addEventListener('click', () => {
        goToStep(currentStep - 1);
    });
});

// Enviar formulario
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
        // Simular envío exitoso
        setTimeout(() => {
            modal.classList.remove('active');
            thankYouModal.classList.add('active');

            // Aquí podríamos activar una animación más elaborada de fuegos artificiales
            // Por simplicidad, mostramos el modal de agradecimiento
        }, 1000);
    }
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


// Validar paso actual del formulario
function validateStep(step) {
    let isValid = true;
    const currentStepElement = document.getElementById(`step${step}`);
    const inputs = currentStepElement.querySelectorAll('input[required], select[required]');

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'var(--primary)';
        } else {
            input.style.borderColor = '';
        }
    });

    return isValid;
}

// Navegar entre pasos del formulario
function goToStep(step) {
    // Ocultar paso actual
    document.getElementById(`step${currentStep}`).classList.remove('active');

    // Mostrar nuevo paso
    document.getElementById(`step${step}`).classList.add('active');

    // Actualizar barra de progreso
    progressBar.style.width = `${(step / totalSteps) * 100}%`;

    // Actualizar paso actual
    currentStep = step;
}

// Resetear formulario
function resetForm() {
    document.getElementById('ticketForm').reset();
    goToStep(1);
    progressBar.style.width = '0%';
}