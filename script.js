document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Smooth Scrolling for Navigation Links (retained, as it's a good user experience)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const navbarHeight = document.querySelector('.navbar').offsetHeight; // Get dynamic navbar height

            if (targetElement) {
                // Calculate position to scroll to, accounting for fixed navbar
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Background on Scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Scroll to Top Button
    const scrollTopButton = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopButton.classList.add('show');
        } else {
            scrollTopButton.classList.remove('show');
        }
    });

    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Code Rain Effect (Adjusted parameters for more subtle, continuous effect)
    const codeRainContainer = document.querySelector('.code-rain-container');
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:,.<>/?`~';
    const numColumns = 60; // Increased for denser rain effect, adjust as needed

    function getRandomChar() {
        return characters[Math.floor(Math.random() * characters.length)];
    }

    function generateCodeString(length) {
        let code = '';
        for (let i = 0; i < length; i++) {
            code += getRandomChar();
        }
        return code;
    }

    // Create columns and fill with code
    // Ensure this runs only if the container exists
    if (codeRainContainer) {
        for (let i = 0; i < numColumns; i++) {
            const column = document.createElement('div');
            column.classList.add('code-column');
            // Make a very long string of code to ensure continuous scrolling
            column.textContent = generateCodeString(2500); // Increased length for smoother continuous flow
            column.style.animationDelay = `${Math.random() * -30}s`; // Wider range for random start delay
            column.style.left = `${(i / numColumns) * 100}%`; // Distribute columns horizontally
            column.style.opacity = `${0.1 + Math.random() * 0.25}`; // Slightly adjusted opacity range

            // Randomize animation duration slightly more for better effect
            const baseDuration = 10; // seconds, slightly faster base duration
            column.style.animationDuration = `${baseDuration + Math.random() * 20}s`; // Wider range for duration

            codeRainContainer.appendChild(column);
        }
    }


    // Current year for footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Calculate and display age
    function calculateAndDisplayAge() {
        const birthDate = new Date('2000-01-01');
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        const ageElement = document.getElementById('age-display');
        if (ageElement) {
            ageElement.textContent = `Age: ${age}`;
        }
    }
    calculateAndDisplayAge();

    // Active Navigation Link Highlighting (Consolidated and improved logic)
    function setActiveNavLink() {
        let currentSectionId = '';
        const navbarHeight = document.querySelector('.navbar').offsetHeight;

        // Determine which section is currently in view
        sections.forEach(section => {
            // Adjust sectionTop to account for the fixed navbar
            const sectionTop = section.offsetTop - navbarHeight - 50; // Added extra offset for better UX
            const sectionHeight = section.clientHeight;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Add 'active' class to the corresponding navigation link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section'); // Define sections for setActiveNavLink

    window.addEventListener('scroll', setActiveNavLink);
    setActiveNavLink(); // Call once on load to set initial active link

    // Typing animation for hero subtitle
    // Consolidated this function and call it correctly
    function typeWriter(element, text, speed = 80) { // Default speed 80ms
        let i = 0;
        element.innerHTML = ''; // Clear content before typing

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        setTimeout(type, 1000); // Delay before starting typing
    }

    const subtitle = document.querySelector('.hero .subtitle');
    if (subtitle) {
        // Get the original text from a data attribute to preserve it
        const originalText = subtitle.getAttribute('data-original-text');
        if (originalText) {
            typeWriter(subtitle, originalText, 80); // Start typing
        }
    }

    // Parallax effect for hero background (Applied to the container, not the entire hero section)
    // Removed the previous translateY on .hero which affected content.
    // This is optional if you want a subtle parallax on the code rain itself.
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        // Apply parallax to the code rain container itself
        if (codeRainContainer) {
            codeRainContainer.style.transform = `translateY(${scrolled * 0.15}px)`; // Move background slower
        }
    });

    // Add hover effect to portfolio items (retained)
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('mouseenter', function () {
            // Apply scale effect directly to the image or icon container within portfolio-item
            const portfolioImage = this.querySelector('.portfolio-image');
            if (portfolioImage) {
                portfolioImage.style.transform = 'scale(1.05)';
                portfolioImage.style.transition = 'transform 0.3s ease'; // Ensure smooth transition
            }
        });

        item.addEventListener('mouseleave', function () {
            const portfolioImage = this.querySelector('.portfolio-image');
            if (portfolioImage) {
                portfolioImage.style.transform = 'scale(1)';
            }
        });
    });

    // Intersection Observer for Animations (fade-in-up)
    const observerOptions = {
        threshold: 0.1, // Element is 10% visible
        rootMargin: '0px 0px -50px 0px' // Reduce bottom margin slightly to trigger earlier
    };

    // Fade-in-up animation for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, {}); // <-- 將 sectionObserverOptions 修改為 {}

    // Observe sections for animation
    document.querySelectorAll('.section').forEach(section => {
        sectionObserver.observe(section);
    });

    // Contact Form Handler (mailto link)
    document.getElementById('contactForm').addEventListener('submit', function (e) {
        console.log('表單提交事件被觸發了！'); // <-- 新增這一行
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        const formMessage = document.getElementById('formMessage'); // 取得訊息容器元素

        // 清除舊訊息和樣式
        formMessage.classList.remove('show', 'success', 'error');
        formMessage.textContent = '';

        // Basic validation
        if (!name || !email || !subject || !message) {
            formMessage.classList.add('show', 'error'); // 顯示錯誤訊息
            formMessage.textContent = '請填寫所有欄位！';
            return;
        }

        // 顯示成功訊息
        formMessage.classList.add('show', 'success');
        formMessage.textContent = '謝謝您的訊息！郵件客戶端將會開啟。';

        // 建立 mailto 連結
        const mailtoLink = `mailto:alex.hsu@email.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`姓名: ${name}\nEmail: ${email}\n\n訊息:\n${message}`)}`;

        // 延遲開啟郵件客戶端，確保使用者能看到網頁上的訊息
        // 大約 2 秒後再觸發 mailto 連結，給用戶足夠時間閱讀訊息
        setTimeout(() => {
            window.location.href = mailtoLink;
        }, 1000); // 延遲 2000 毫秒 (2 秒)

        // 重設表單 (可以在這裡重設，或者在 mailto 連結觸發後重設，取決於需求)
        this.reset();

        // 選擇性：在一段時間後隱藏成功訊息
        setTimeout(() => {
            formMessage.classList.remove('show');
        }, 3000); // 訊息顯示 5 秒後隱藏
    });

    // Removed `animateSkillBars` and `animateCounters` as they are not used with the current skill display
    // If you plan to add numerical percentages to skills later, these functions can be re-integrated with appropriate HTML.

    // Removed the `window.addEventListener('load', () => { document.body.style.opacity = '0'; ... });`
    // This kind of body opacity manipulation can lead to flicker or initial hidden content.
    // It's generally better to control initial visibility and transitions via CSS classes.
});