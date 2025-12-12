// Landing Page Interactive JavaScript

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.getElementById('nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = mobileMenuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Hero Button Functionality
const getStartedBtn = document.getElementById('get-started-btn');
const learnMoreBtn = document.getElementById('learn-more-btn');

getStartedBtn.addEventListener('click', () => {
    document.querySelector('#contact').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

learnMoreBtn.addEventListener('click', () => {
    document.querySelector('#features').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// Product Card Button Interactions
document.querySelectorAll('.product-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const planName = productCard.querySelector('h3').textContent;
        
        // Scroll to contact form and show success message
        document.querySelector('#contact').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Pre-fill the contact form
        setTimeout(() => {
            document.getElementById('subject').value = `Interested in ${planName}`;
            document.getElementById('name').focus();
        }, 500);
    });
});

// Contact Form Validation and Submission
const contactForm = document.getElementById('contact-form');
const formFields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    subject: document.getElementById('subject'),
    message: document.getElementById('message')
};

const errorMessages = {
    name: document.getElementById('name-error'),
    email: document.getElementById('email-error'),
    subject: document.getElementById('subject-error'),
    message: document.getElementById('message-error')
};

const formSuccess = document.getElementById('form-success');

// Real-time validation
Object.keys(formFields).forEach(field => {
    formFields[field].addEventListener('blur', () => {
        validateField(field);
    });

    formFields[field].addEventListener('input', () => {
        // Clear error when user starts typing
        if (errorMessages[field].textContent) {
            errorMessages[field].textContent = '';
            formFields[field].style.borderColor = '#e0e0e0';
        }
    });
});

function validateField(fieldName) {
    const field = formFields[fieldName];
    const error = errorMessages[fieldName];
    let isValid = true;
    let errorText = '';

    // Remove previous error styling
    field.style.borderColor = '#e0e0e0';

    // Validate based on field type
    switch(fieldName) {
        case 'name':
            if (field.value.trim().length < 2) {
                errorText = 'Name must be at least 2 characters long';
                isValid = false;
            }
            break;
        
        case 'email':
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(field.value)) {
                errorText = 'Please enter a valid email address';
                isValid = false;
            }
            break;
        
        case 'subject':
            if (field.value.trim().length < 5) {
                errorText = 'Subject must be at least 5 characters long';
                isValid = false;
            }
            break;
        
        case 'message':
            if (field.value.trim().length < 10) {
                errorText = 'Message must be at least 10 characters long';
                isValid = false;
            }
            break;
    }

    // Display error if validation fails
    if (!isValid) {
        error.textContent = errorText;
        field.style.borderColor = '#e74c3c';
    } else {
        error.textContent = '';
        field.style.borderColor = '#27ae60';
    }

    return isValid;
}

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    let isFormValid = true;
    Object.keys(formFields).forEach(field => {
        if (!validateField(field)) {
            isFormValid = false;
        }
    });

    if (isFormValid) {
        // Simulate form submission
        const formData = {
            name: formFields.name.value,
            email: formFields.email.value,
            subject: formFields.subject.value,
            message: formFields.message.value
        };

        // Show success message
        formSuccess.textContent = `Thank you, ${formData.name}! Your message has been sent successfully. We'll get back to you soon.`;
        formSuccess.classList.add('show');

        // Reset form
        contactForm.reset();
        Object.keys(errorMessages).forEach(field => {
            errorMessages[field].textContent = '';
            formFields[field].style.borderColor = '#e0e0e0';
        });

        // Scroll to success message
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Hide success message after 5 seconds
        setTimeout(() => {
            formSuccess.classList.remove('show');
        }, 5000);

        // In a real application, you would send the data to a server here
        console.log('Form submitted:', formData);
    } else {
        // Scroll to first error
        const firstError = Object.values(errorMessages).find(msg => msg.textContent);
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards and testimonial cards
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .testimonial-card, .product-card');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// Add click animation to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

