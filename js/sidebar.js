// Reusable Sidebar Component

class Sidebar {
    constructor() {
        this.sidebarHTML = `
            <aside class="sidebar">
                <nav class="nav">
                    <div class="nav-section">
                        <h3 class="nav-title">Getting Started</h3>
                        <ul class="nav-list">
                            <li class="nav-item">
                                <a href="index.html" class="nav-link" data-page="index">
                                    <i class="fas fa-book-open"></i>
                                    Introduction
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div class="nav-section">
                        <h3 class="nav-title">Software Development</h3>
                        <ul class="nav-list">
                            <li class="nav-item">
                                <a href="/software-development/software-development.html#web-dev" class="nav-link" data-page="software-development" data-section="web-dev">
                                    <i class="fas fa-code"></i>
                                    Web Development
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="/software-development/software-development.html#mobile-dev" class="nav-link" data-page="software-development" data-section="mobile-dev">
                                    <i class="fas fa-mobile-alt"></i>
                                    Mobile Development
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="/software-development/software-development.html#backend" class="nav-link" data-page="software-development" data-section="backend">
                                    <i class="fas fa-server"></i>
                                    Backend Development
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="/software-development/software-development.html#devops" class="nav-link" data-page="software-development" data-section="devops">
                                    <i class="fas fa-infinity"></i>
                                    DevOps
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div class="nav-section">
                        <h3 class="nav-title">Robotics</h3>
                        <ul class="nav-list">
                            <li class="nav-item">
                                <a href="/robotics/robotics.html#robot-basics" class="nav-link" data-page="robotics" data-section="robot-basics">
                                    <i class="fas fa-robot"></i>
                                    Robotics Basics
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="/robotics/robotics.html#ros" class="nav-link" data-page="robotics" data-section="ros">
                                    <i class="fas fa-cogs"></i>
                                    ROS Programming
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="/robotics/robotics.html#computer-vision" class="nav-link" data-page="robotics" data-section="computer-vision">
                                    <i class="fas fa-eye"></i>
                                    Computer Vision
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="/robotics/robotics.html#ai-robotics" class="nav-link" data-page="robotics" data-section="ai-robotics">
                                    <i class="fas fa-brain"></i>
                                    AI in Robotics
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div class="nav-section">
                        <h3 class="nav-title">Electronics</h3>
                        <ul class="nav-list">
                            <li class="nav-item">
                                <a href="/electronics/electronics.html#circuits" class="nav-link" data-page="electronics" data-section="circuits">
                                    <i class="fas fa-microchip"></i>
                                    Circuit Design
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="/electronics/electronics.html#arduino" class="nav-link" data-page="electronics" data-section="arduino">
                                    <i class="fas fa-memory"></i>
                                    Arduino Projects
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="/electronics/electronics.html#raspberry-pi" class="nav-link" data-page="electronics" data-section="raspberry-pi">
                                    <i class="fas fa-dice"></i>
                                    Raspberry Pi
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="/electronics/electronics.html#iot" class="nav-link" data-page="electronics" data-section="iot">
                                    <i class="fas fa-network-wired"></i>
                                    IoT Development
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </aside>
        `;
    }

    // Method to inject sidebar into the page
    inject(targetElement = '.container') {
        // Get the target element where sidebar should be injected
        const target = document.querySelector(targetElement);
        
        if (!target) {
            console.error('Target element not found for sidebar injection');
            return;
        }
        
        // Create a container for the sidebar
        const sidebarContainer = document.createElement('div');
        sidebarContainer.innerHTML = this.sidebarHTML;
        
        // Insert sidebar at the beginning of the target element
        target.insertBefore(sidebarContainer.firstElementChild, target.firstChild);

        // Setup event listeners
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Get all nav links
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Only handle if it's an internal link
                const href = link.getAttribute('href');
                const isInternalLink = href.startsWith('#') || 
                                     href.includes('.html#') || 
                                     href === 'index.html';
                
                if (isInternalLink) {
                    const page = link.getAttribute('data-page');
                    const section = link.getAttribute('data-section');
                    
                    // If we're already on the correct page, just scroll to section
                    if (page && section && window.location.pathname.includes(page)) {
                        e.preventDefault();
                        const targetSection = document.getElementById(section);
                        if (targetSection) {
                            targetSection.scrollIntoView({ behavior: 'smooth' });
                            this.updateActiveState(link);
                        }
                    }
                }
            });
        });

        // Setup mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const sidebar = document.querySelector('.sidebar');
        
        if (mobileMenuToggle && sidebar) {
            mobileMenuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('active');
                mobileMenuToggle.classList.toggle('active');
            });
        }

        // Initial active state
        this.highlightCurrentSection();
    }

    updateActiveState(activeLink) {
        // Remove active class from all items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to current item
        activeLink.parentElement.classList.add('active');
    }

    highlightCurrentSection() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const currentHash = window.location.hash;

        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || 
                (currentPage + currentHash === href) ||
                (currentHash && href.endsWith(currentHash))) {
                this.updateActiveState(link);
            }
        });

        // If we have a hash on page load, scroll to it
        if (currentHash) {
            const targetSection = document.querySelector(currentHash);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
}

// Initialize sidebar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = new Sidebar();
    sidebar.inject();
});