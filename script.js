// Pegando os elementos do DOM que vou usar várias vezes
// DOM Elements
const header = document.querySelector('.header');
const mobileMenu = document.getElementById('mobileMenu');
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
const toast = document.getElementById('toast');
const contactForm = document.getElementById('contactForm');
const currentYearSpan = document.getElementById('currentYear');

// Atualizo o ano no rodapé automaticamente
// Set current year in footer
if (currentYearSpan) {
  currentYearSpan.textContent = new Date().getFullYear();
}

// Adiciona efeitos ao rolar a página
// Handle scroll events
window.addEventListener('scroll', () => {
    // Se rolar mais que 20px, o header ganha uma classe pra mudar o estilo
  // Add/remove scrolled class to header
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Mostra ou esconde o botão de "voltar pro topo"
  // Show/hide scroll to top button
  if (scrollToTopBtn) {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add('active');
  } else {
    scrollToTopBtn.classList.remove('active');
  }
}
  
  // Chama animações quando os elementos entram na tela
  // Check for elements to animate on scroll
  animateOnScroll();
});

// Mostra ou esconde o menu mobile
// Toggle mobile menu
function toggleMobileMenu() {
  mobileMenu.classList.toggle('active');
}

// Função pra rolar até uma seção específica da página
// Scroll to section
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    // Se o menu mobile estiver aberto, fecha
    // Close mobile menu if open
    mobileMenu.classList.remove('active');
    
    // Calcula a posição certinha pra rolar (descontando o header fixo)
    // Calculate position with offset for header
    const headerHeight = header.offsetHeight;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
    
    // Scroll to section
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// Botão de voltar pro topo (scroll suave)
// Scroll to top
if (scrollToTopBtn) {
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Envio do formulário de contato
// Contact form submission
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Cancela o comportamento padrão
    
    // Validate form
    if (validateForm()) {
        // Pega os dados do formulário
      // Simulate form submission
      const formData = new FormData(contactForm);
      const formObject = {};
      
      formData.forEach((value, key) => {
        formObject[key] = value;
      });
      
      console.log('Form Data:', formObject); // Só pra ver no console
      
      // Mostra mensagem de sucesso
      // Show success toast
      showToast('success', 'Message Sent!', 'Thank you for your message. I\'ll get back to you soon.');
      
      // Reset form
      contactForm.reset(); // Limpa o formulário
    }
  });
}

// Validação do formulário (nome, email, etc.)
// Form validation
function validateForm() {
  let isValid = true;
  
  // Pega os campos do formulário
  // Get form fields
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const subject = document.getElementById('subject');
  const message = document.getElementById('message');
  
  // Clear previous error messages
  clearErrors(); // Limpa erros anteriores
  
  // Validate name
  if (name.value.trim() === '' || name.value.trim().length < 2) {
    showError('nameError', 'Name must be at least 2 characters');
    isValid = false;
  }
  
  // Validate email
  if (!isValidEmail(email.value)) {
    showError('emailError', 'Please enter a valid email address');
    isValid = false;
  }
  
  // Validate subject
  if (subject.value.trim() === '' || subject.value.trim().length < 2) {
    showError('subjectError', 'Subject must be at least 2 characters');
    isValid = false;
  }
  
  // Validate message
  if (message.value.trim() === '' || message.value.trim().length < 10) {
    showError('messageError', 'Message must be at least 10 characters');
    isValid = false;
  }
  
  return isValid;
}

// Exibe a mensagem de erro
// Show error message
function showError(id, message) {
  const errorElement = document.getElementById(id);
  errorElement.textContent = message;
  errorElement.classList.add('active');
}

// Limpa todos os erros da tela
// Clear all error messages
function clearErrors() {
  const errorElements = document.querySelectorAll('.error-message');
  errorElements.forEach(element => {
    element.textContent = '';
    element.classList.remove('active');
  });
}

// Valida o formato do email
// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Mostra aquele "toast" de mensagem que aparece no canto da tela
// Show toast notification
// Função para exibir uma mensagem toast na tela
function showToast(type, title, message) {

  // Seleciona o container principal do toast
  const toast = document.getElementById('toast');

  // Seleciona os elementos internos (texto)
  const toastTitle = document.querySelector('.toast-title');
  const toastMessage = document.querySelector('.toast-message');

  // Se o toast não existir, evita erro no sistema
  if (!toast) return;

  // Define o título e a mensagem dinamicamente
  toastTitle.textContent = title;
  toastMessage.textContent = message;

  // Adiciona a classe que faz o toast aparecer
  toast.classList.add('active');

  // Remove automaticamente depois de 3 segundos
  setTimeout(() => {
    toast.classList.remove('active');
  }, 3000);
}

// Close toast notification
// Função para fechar o toast manualmente
function closeToast() {
  const toast = document.getElementById('toast');

  // Remove a classe ativa (esconde o toast)
  if (toast) {
    toast.classList.remove('active');
  }
}

// Animação quando o elemento entra na área visível
// Animate elements when they come into view
function animateOnScroll() {
  const animateItems = document.querySelectorAll('.animate-item');
  
  animateItems.forEach(item => {
    const itemPosition = item.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;
    
    if (itemPosition < screenPosition) {
      item.classList.add('animate-visible');
    }
  });
}

// Ao carregar a página
// Initialize page
window.addEventListener('DOMContentLoaded', () => {
  // Animate items initially visible on page load
  animateOnScroll(); // já anima o que estiver visível
  
  // Links externos abrem em nova aba
  // Add event listeners for any external links
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
});

/* ===== ANIMAÇÃO AO SCROLL ===== */

// Seleciona todos elementos animáveis
const animatedElements = document.querySelectorAll(
  '.animate-left, .animate-right, .animate-item'
);

// Função que ativa animação quando aparece na tela
function handleScrollAnimation() {
  const triggerBottom = window.innerHeight * 0.85;

  animatedElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < triggerBottom) {
      el.classList.add('active');
    }
  });
}

// Executa ao rolar
window.addEventListener('scroll', handleScrollAnimation);

// Executa ao carregar
window.addEventListener('load', handleScrollAnimation);

/* ===== NAVBAR AO ROLAR ===== */
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

/* ===== ANO AUTOMÁTICO ===== */

// Seleciona elemento do ano
const currentYear = document.getElementById('currentYear');

// Insere ano atual automaticamente
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}