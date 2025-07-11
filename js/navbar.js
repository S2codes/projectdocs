// Reusable Navbar Component

class Navbar {
    constructor() {
        this.navbarHTML = `
            <header class="header">
                <div class="header-content">
                    <div class="logo">
                        S2 
                        <span>TechDocs</span>
                    </div>
                    <div class="search-container">
                        <i class="fas fa-search search-icon"></i>
                        <input type="text" class="search-input" placeholder="Search documentation...">
                    </div>
                </div>
            </header>
        `;
    }

    // Method to inject navbar into the page
    inject(targetElement = 'body') {
        // Get the target element where navbar should be injected
        const target = document.querySelector(targetElement);
        
        // Create a container for the navbar
        const navbarContainer = document.createElement('div');
        navbarContainer.innerHTML = this.navbarHTML;
        
        // Insert navbar at the beginning of the target element
        target.insertBefore(navbarContainer.firstElementChild, target.firstChild);
    }
}

// Initialize navbar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const navbar = new Navbar();
    navbar.inject(); // By default injects at the start of body
}); 