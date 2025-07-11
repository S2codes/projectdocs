// Documentation Website JavaScript

class DocumentationSite {
    constructor() {
        this.currentSection = '';
        this.searchInput = document.querySelector('.search-input');
        this.mobileMenuToggle = document.getElementById('mobileMenuToggle');
        this.sidebar = document.querySelector('.sidebar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.contentSections = document.querySelectorAll('.content-section');
        
        this.init();
    }

    init() {
        this.setupSearch();
        this.setupScrollSpy();
        this.highlightCurrentSection();
    }

    highlightCurrentSection() {
        const currentHash = window.location.hash;
        if (currentHash) {
            const targetSection = document.querySelector(currentHash);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    setupSearch() {
        if (!this.searchInput) return;
        
        let searchTimeout;
        
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.performSearch(e.target.value);
            }, 300);
        });

        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.performSearch(e.target.value);
            }
        });
    }

    performSearch(query) {
        if (!query.trim()) {
            this.clearSearchResults();
            return;
        }

        const results = this.searchContent(query.toLowerCase());
        this.displaySearchResults(results, query);
    }

    searchContent(query) {
        const searchableContent = [
            { id: 'introduction', title: 'Introduction', content: 'welcome techdocs documentation guide building modern web applications template provides everything need create professional documentation websites' },
            { id: 'components', title: 'Components', content: 'navigation sidebar search real-time functionality content cards flexible containers code blocks syntax highlighted examples' },
            { id: 'installation', title: 'Installation', content: 'quick easy installation guide prerequisites modern web browser text editor basic knowledge html css javascript' },
            { id: 'vercel', title: 'Vercel Deployment', content: 'deploy vercel platform best deploying documentation site zero configuration instant deployments edge network' },
            { id: 'local', title: 'Local Development', content: 'local development environment nodejs npm git version control development server' },
            { id: 'docker', title: 'Docker Setup', content: 'docker consistent development deployment environments dockerfile build run container' }
        ];

        return searchableContent.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.content.includes(query)
        );
    }

    displaySearchResults(results, query) {
        this.clearSearchResults();

        if (results.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'search-no-results';
            noResults.textContent = 'No results found';
            document.body.appendChild(noResults);
            return;
        }

        const overlay = document.createElement('div');
        overlay.className = 'search-results-overlay';
        
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results-container';
        
        results.forEach(result => {
            const resultItem = document.createElement('a');
            resultItem.className = 'search-result-item';
            resultItem.href = `#${result.id}`;
            
            const title = document.createElement('h3');
            title.textContent = result.title;
            
            const content = document.createElement('p');
            content.innerHTML = this.highlightSearchTerm(result.content, query);
            
            resultItem.appendChild(title);
            resultItem.appendChild(content);
            resultsContainer.appendChild(resultItem);
        });
        
        overlay.appendChild(resultsContainer);
        document.body.appendChild(overlay);
        
        this.setupSearchResultsEvents(overlay);
    }

    highlightSearchTerm(text, term) {
        const regex = new RegExp(`(${term})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    setupSearchResultsEvents(overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.clearSearchResults();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.clearSearchResults();
            }
        });
    }

    clearSearchResults() {
        const existingOverlay = document.querySelector('.search-results-overlay');
        if (existingOverlay) {
            existingOverlay.remove();
        }
        const noResults = document.querySelector('.search-no-results');
        if (noResults) {
            noResults.remove();
        }
    }

    setupScrollSpy() {
        if ('IntersectionObserver' in window) {
            const sections = document.querySelectorAll('[id]');
            const options = {
                rootMargin: '0px',
                threshold: 0.5
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        history.replaceState(null, null, `#${id}`);
                    }
                });
            }, options);

            sections.forEach(section => observer.observe(section));
        }
    }
}

// Initialize the documentation site
document.addEventListener('DOMContentLoaded', () => {
    new DocumentationSite();
});