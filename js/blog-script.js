// Blog Website JavaScript

class BlogWebsite {
    constructor() {
        this.currentFilter = 'all';
        this.postsPerPage = 6;
        this.currentPage = 1;
        this.allPosts = [];
        
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupSearch();
        this.setupFilters();
        this.generateBlogPosts();
        this.setupNewsletterForm();
        this.setupScrollEffects();
        this.setupBlogPostInteractions();
    }

    setupNavigation() {
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.getElementById('navMenu');

        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                    navMenu.classList.remove('active');
                }
            });

            // Close mobile menu when clicking on nav links
            const navLinks = navMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                });
            });
        }
    }

    setupSearch() {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            let searchTimeout;
            
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.performSearch(e.target.value);
                }, 300);
            });
        }
    }

    performSearch(query) {
        if (!query.trim()) {
            this.displayPosts(this.allPosts);
            return;
        }

        const filteredPosts = this.allPosts.filter(post => 
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );

        this.displayPosts(filteredPosts);
    }

    setupFilters() {
        const filterTabs = document.querySelectorAll('.filter-tab');
        
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Update active tab
                filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Filter posts
                const filter = tab.dataset.filter;
                this.currentFilter = filter;
                this.currentPage = 1;
                this.filterAndDisplayPosts();
            });
        });
    }

    filterAndDisplayPosts() {
        let filteredPosts = this.allPosts;
        
        if (this.currentFilter !== 'all') {
            filteredPosts = this.allPosts.filter(post => 
                post.category.toLowerCase() === this.currentFilter.toLowerCase()
            );
        }
        
        this.displayPosts(filteredPosts);
    }

    generateBlogPosts() {
        // Sample blog posts data
        this.allPosts = [
            {
                id: 1,
                title: "Building Scalable React Applications",
                excerpt: "Learn the best practices for creating React applications that can grow with your business needs.",
                category: "Development",
                author: "John Doe",
                date: "Dec 10, 2024",
                readTime: "7 min read",
                image: "assets/img/placeholder.png",
                tags: ["React", "JavaScript", "Scalability"]
            },
            {
                id: 2,
                title: "The Future of CSS: Container Queries",
                excerpt: "Explore how container queries are revolutionizing responsive design and component-based styling.",
                category: "Design",
                author: "Jane Smith",
                date: "Dec 8, 2024",
                readTime: "5 min read",
                image: "assets/img/placeholder.png",
                tags: ["CSS", "Responsive Design", "Web Design"]
            },
            {
                id: 3,
                title: "Machine Learning in Web Development",
                excerpt: "Discover how to integrate machine learning models into your web applications for enhanced user experiences.",
                category: "Technology",
                author: "Mike Johnson",
                date: "Dec 5, 2024",
                readTime: "10 min read",
                image: "assets/img/placeholder.png",
                tags: ["Machine Learning", "AI", "Web Development"]
            },
            {
                id: 4,
                title: "Optimizing Web Performance",
                excerpt: "Essential techniques for improving your website's loading speed and overall performance.",
                category: "Development",
                author: "Sarah Wilson",
                date: "Dec 3, 2024",
                readTime: "6 min read",
                image: "assets/img/placeholder.png",
                tags: ["Performance", "Optimization", "Web Development"]
            },
            {
                id: 5,
                title: "Design Systems at Scale",
                excerpt: "How to create and maintain design systems that work across large organizations and multiple products.",
                category: "Design",
                author: "Alex Chen",
                date: "Dec 1, 2024",
                readTime: "8 min read",
                image: "assets/img/placeholder.png",
                tags: ["Design Systems", "UI/UX", "Design"]
            },
            {
                id: 6,
                title: "Serverless Architecture Patterns",
                excerpt: "Understanding different serverless patterns and when to use them in your applications.",
                category: "Technology",
                author: "David Brown",
                date: "Nov 28, 2024",
                readTime: "9 min read",
                image: "assets/img/placeholder.png",
                tags: ["Serverless", "Cloud", "Architecture"]
            },
            {
                id: 7,
                title: "Advanced TypeScript Techniques",
                excerpt: "Master advanced TypeScript features to write more robust and maintainable code.",
                category: "Development",
                author: "Emily Davis",
                date: "Nov 25, 2024",
                readTime: "12 min read",
                image: "assets/img/placeholder.png",
                tags: ["TypeScript", "JavaScript", "Programming"]
            },
            {
                id: 8,
                title: "Accessibility in Modern Web Design",
                excerpt: "Creating inclusive web experiences that work for everyone, regardless of their abilities.",
                category: "Design",
                author: "Chris Taylor",
                date: "Nov 22, 2024",
                readTime: "7 min read",
                image: "assets/img/placeholder.png",
                tags: ["Accessibility", "Inclusive Design", "Web Standards"]
            },
            {
                id: 9,
                title: "Blockchain Development Fundamentals",
                excerpt: "Get started with blockchain development and understand the core concepts behind decentralized applications.",
                category: "Technology",
                author: "Lisa Anderson",
                date: "Nov 20, 2024",
                readTime: "15 min read",
                image: "assets/img/placeholder.png",
                tags: ["Blockchain", "Web3", "Cryptocurrency"]
            }
        ];

        this.displayPosts(this.allPosts);
        this.setupLoadMore();
    }

    displayPosts(posts) {
        const blogGrid = document.getElementById('blogGrid');
        if (!blogGrid) return;

        const postsToShow = posts.slice(0, this.currentPage * this.postsPerPage);
        
        blogGrid.innerHTML = postsToShow.map(post => `
            <article class="blog-card" onclick="openBlogPost(${post.id})" data-category="${post.category.toLowerCase()}">
                <div class="blog-image">
                    <img src="${post.image}" alt="${post.title}">
                </div>
                <div class="blog-content">
                    <h3 class="blog-title">${post.title}</h3>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <div class="blog-meta">
                        <div class="author-info">
                            <span class="author-name">${post.author}</span>
                            <span class="publish-date">${post.date}</span>
                        </div>
                        <span class="read-time">${post.readTime}</span>
                    </div>
                    <div class="article-tags">
                        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </article>
        `).join('');

        // Update load more button visibility
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            const hasMorePosts = postsToShow.length < posts.length;
            loadMoreBtn.style.display = hasMorePosts ? 'block' : 'none';
        }
    }

    setupLoadMore() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.currentPage++;
                this.filterAndDisplayPosts();
            });
        }
    }

    setupNewsletterForm() {
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = newsletterForm.querySelector('.newsletter-input').value;
                
                if (email) {
                    // Simulate newsletter signup
                    this.showNotification('Thank you for subscribing!', 'success');
                    newsletterForm.reset();
                }
            });
        }
    }

    setupScrollEffects() {
        // Add scroll-based animations
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

        // Observe blog cards for scroll animations
        document.querySelectorAll('.blog-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    setupBlogPostInteractions() {
        // Setup like buttons, bookmark buttons, etc. for blog post page
        const likeBtn = document.querySelector('.like-btn');
        const bookmarkBtn = document.querySelector('.bookmark-btn');
        const shareBtn = document.querySelector('.share-btn');

        if (likeBtn) {
            likeBtn.addEventListener('click', () => {
                const icon = likeBtn.querySelector('i');
                const count = likeBtn.querySelector('span');
                
                if (icon.classList.contains('far')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    icon.style.color = '#ff6b6b';
                    count.textContent = parseInt(count.textContent) + 1;
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    icon.style.color = '';
                    count.textContent = parseInt(count.textContent) - 1;
                }
            });
        }

        if (bookmarkBtn) {
            bookmarkBtn.addEventListener('click', () => {
                const icon = bookmarkBtn.querySelector('i');
                
                if (icon.classList.contains('far')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    icon.style.color = 'var(--secondary-color-2)';
                    this.showNotification('Article bookmarked!', 'success');
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    icon.style.color = '';
                    this.showNotification('Bookmark removed', 'info');
                }
            });
        }

        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                if (navigator.share) {
                    navigator.share({
                        title: document.title,
                        url: window.location.href
                    });
                } else {
                    // Fallback: copy to clipboard
                    navigator.clipboard.writeText(window.location.href);
                    this.showNotification('Link copied to clipboard!', 'success');
                }
            });
        }

        // Setup copy code functionality
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const codeBlock = btn.closest('.code-block').querySelector('code');
                navigator.clipboard.writeText(codeBlock.textContent);
                this.showNotification('Code copied to clipboard!', 'success');
            });
        });
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            backgroundColor: type === 'success' ? 'var(--secondary-color-1)' : 'var(--card-bg)',
            color: type === 'success' ? 'var(--primary-color)' : 'var(--text-primary)',
            borderRadius: '8px',
            border: `1px solid ${type === 'success' ? 'var(--secondary-color-1)' : 'var(--border-color)'}`,
            zIndex: '9999',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Global function to open blog posts
function openBlogPost(postId) {
    // In a real application, this would navigate to the blog post page
    // For demo purposes, we'll open the blog-post.html page
    if (postId === 'featured' || postId === 1) {
        window.location.href = 'blog-post.html';
    } else {
        // For other posts, you could pass the post ID as a parameter
        window.location.href = `blog-post.html?id=${postId}`;
    }
}

// Initialize the blog website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BlogWebsite();
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll-to-top functionality
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Show/hide scroll to top button
    let scrollTopBtn = document.querySelector('.scroll-top-btn');
    if (!scrollTopBtn && scrollTop > 500) {
        scrollTopBtn = document.createElement('button');
        scrollTopBtn.className = 'scroll-top-btn';
        scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        
        Object.assign(scrollTopBtn.style, {
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'var(--gradient-primary)',
            color: 'var(--primary-color)',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.25rem',
            zIndex: '1000',
            transition: 'all 0.3s ease',
            opacity: '0',
            transform: 'translateY(20px)'
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        document.body.appendChild(scrollTopBtn);
        
        setTimeout(() => {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.transform = 'translateY(0)';
        }, 100);
    } else if (scrollTopBtn && scrollTop <= 500) {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.transform = 'translateY(20px)';
        setTimeout(() => {
            if (scrollTopBtn.parentNode) {
                scrollTopBtn.parentNode.removeChild(scrollTopBtn);
            }
        }, 300);
    }
});

// Add reading progress bar for blog posts
if (document.querySelector('.blog-post')) {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    
    Object.assign(progressBar.style, {
        position: 'fixed',
        top: '70px',
        left: '0',
        width: '0%',
        height: '3px',
        background: 'var(--gradient-primary)',
        zIndex: '1001',
        transition: 'width 0.1s ease'
    });

    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = Math.min(scrollPercent, 100) + '%';
    });
}