/**
 * Blog Renderer for Hyperliquid Vietnam
 * This script handles fetching and rendering blog posts from the CMS content
 * It includes Markdown to HTML conversion for client-side rendering
 */

// First, let's include the Markdown parser (Marked.js)
document.addEventListener('DOMContentLoaded', function() {
    // Load Marked.js for Markdown parsing if it's not already loaded
    if (typeof marked === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/marked@4.0.0/marked.min.js';
        script.onload = initBlogSystem;
        document.head.appendChild(script);
    } else {
        initBlogSystem();
    }

    // Initialize the blog system once dependencies are loaded
    function initBlogSystem() {
        // Check if we're on the blog listing page
        const isBlogPage = document.querySelector('.blog-page-grid');
        // Check if we're on a single blog post page
        const isBlogPostPage = document.querySelector('.blog-post-section');
        // Check if we're on a dynamic blog post page (URL contains /blog/ and a slug)
        const isDynamicPostPage = window.location.pathname.includes('/blog/') && 
                                !window.location.pathname.endsWith('/blog/');
        
        if (isBlogPage) {
            loadBlogPosts();
        } else if (isBlogPostPage && isDynamicPostPage) {
            loadSinglePost();
        } else if (isDynamicPostPage) {
            // We're on a dynamic blog URL but the page isn't loaded yet
            loadDynamicBlogPost();
        }
    }
    
    /**
     * Load all blog posts for the blog listing page
     */
    async function loadBlogPosts() {
        try {
            console.log('Loading blog posts...');
            
            // Fetch the list of blog posts from the content directory
            const posts = await fetchBlogPosts();
            
            if (posts && posts.length > 0) {
                const blogGrid = document.querySelector('.blog-page-grid');
                if (blogGrid) {
                    renderBlogGrid(posts, blogGrid);
                }
            }
        } catch (error) {
            console.error('Error loading blog posts:', error);
        }
    }
    
    /**
     * Load a single blog post based on the URL slug
     */
    async function loadSinglePost() {
        try {
            // Get the slug from the URL
            const slug = getSlugFromUrl();
            console.log('Loading blog post with slug:', slug);
            
            // Fetch the post data
            const post = await fetchBlogPost(slug);
            
            if (post) {
                // Update the page with the post content
                updatePostContent(post);
            }
        } catch (error) {
            console.error('Error loading blog post:', error);
        }
    }
    
    /**
     * Load a dynamic blog post when navigating directly to a blog URL
     */
    async function loadDynamicBlogPost() {
        try {
            // Get the slug from the URL
            const slug = getSlugFromUrl();
            console.log('Loading dynamic blog post with slug:', slug);
            
            // Fetch the post data
            const post = await fetchBlogPost(slug);
            
            if (post) {
                // Fetch the blog template
                const template = await fetchTemplate();
                
                if (template) {
                    // Render the post using the template
                    const html = renderBlogPost(post, template);
                    
                    // Replace the entire document with the rendered HTML
                    document.open();
                    document.write(html);
                    document.close();
                    
                    // Re-initialize scripts
                    const scripts = Array.from(document.getElementsByTagName('script'));
                    scripts.forEach(oldScript => {
                        const newScript = document.createElement('script');
                        Array.from(oldScript.attributes).forEach(attr => {
                            newScript.setAttribute(attr.name, attr.value);
                        });
                        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                        oldScript.parentNode.replaceChild(newScript, oldScript);
                    });
                }
            } else {
                // Post not found, redirect to blog listing
                window.location.href = '/blog.html';
            }
        } catch (error) {
            console.error('Error loading dynamic blog post:', error);
            // Redirect to blog listing on error
            window.location.href = '/blog.html';
        }
    }
    
    /**
     * Fetch all blog posts
     */
    async function fetchBlogPosts() {
        try {
            // In a real implementation, this would fetch from your GitHub repo
            // For now, we'll use a mock implementation that fetches from the content directory
            
            // This is a simplified example - in a real app, you'd need to handle GitHub API authentication
            // and pagination for larger repositories
            
            // For demo purposes, we'll use a local file that lists the blog posts
            const response = await fetch('/content/blog-index.json');
            
            // If the file doesn't exist yet, we'll create a mock response
            if (!response.ok) {
                console.log('Blog index not found, using mock data');
                
                // Mock data based on the sample post we created
                return [
                    {
                        slug: '2025-05-25-gioi-thieu-hyperliquid',
                        title: 'Giới Thiệu Hyperliquid',
                        date: '2025-05-25T08:00:00.000Z',
                        tags: ['kien-thuc', 'huong-dan'],
                        excerpt: 'Tìm hiểu về sàn giao dịch Hyperliquid, các tính năng nổi bật và cách thức hoạt động của nền tảng.',
                        path: '/content/blog/2025-05-25-gioi-thieu-hyperliquid.md'
                    },
                    {
                        slug: '2025-05-25-nap-tien-hyperliquid',
                        title: 'Nạp Tiền Hyperliquid',
                        date: '2025-05-25T10:00:00.000Z',
                        tags: ['huong-dan'],
                        excerpt: 'Hướng dẫn chi tiết cách nạp tiền vào Hyperliquid từ nhiều blockchain khác nhau và các lưu ý quan trọng.',
                        path: '/content/blog/2025-05-25-nap-tien-hyperliquid.md'
                    },
                    {
                        slug: '2025-05-25-co-che-thanh-ly',
                        title: 'Cơ Chế Thanh Lý',
                        date: '2025-05-25T12:00:00.000Z',
                        tags: ['kien-thuc'],
                        excerpt: 'Tìm hiểu cơ chế thanh lý vị thế trên Hyperliquid và cách quản lý rủi ro hiệu quả khi giao dịch.',
                        path: '/content/blog/2025-05-25-co-che-thanh-ly.md'
                    }
                ];
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching blog posts:', error);
            return [];
        }
    }
    
    /**
     * Fetch a single blog post by slug
     */
    async function fetchBlogPost(slug) {
        try {
            // In a real implementation, this would fetch from your GitHub repo
            // For now, we'll use a simplified approach that fetches the Markdown file directly
            
            // First, determine the file path based on the slug
            // In our case, the slug format is YYYY-MM-DD-title
            const filePath = `/content/blog/${slug}.md`;
            
            // Fetch the Markdown file
            const response = await fetch(filePath);
            
            if (!response.ok) {
                // If the real file doesn't exist, check if it's our sample post
                if (slug === '2025-05-25-gioi-thieu-hyperliquid') {
                    // Use the sample post we created
                    const sampleResponse = await fetch('/content/blog/2025-05-25-gioi-thieu-hyperliquid.md');
                    if (sampleResponse.ok) {
                        const markdown = await sampleResponse.text();
                        return parseMarkdownFrontMatter(markdown);
                    }
                }
                
                console.error('Blog post not found:', slug);
                return null;
            }
            
            const markdown = await response.text();
            return parseMarkdownFrontMatter(markdown);
        } catch (error) {
            console.error('Error fetching blog post:', error);
            return null;
        }
    }
    
    /**
     * Fetch the blog post template
     */
    async function fetchTemplate() {
        try {
            const response = await fetch('/blog-template.html');
            
            if (!response.ok) {
                console.error('Blog template not found');
                return null;
            }
            
            return await response.text();
        } catch (error) {
            console.error('Error fetching blog template:', error);
            return null;
        }
    }
    
    /**
     * Parse Markdown front matter and content
     */
    function parseMarkdownFrontMatter(markdown) {
        // Extract front matter (between --- and ---)
        const frontMatterRegex = /^---[\r\n]([\s\S]*?)[\r\n]---/;
        const match = markdown.match(frontMatterRegex);
        
        if (!match) {
            console.error('No front matter found in Markdown');
            return null;
        }
        
        const frontMatter = match[1];
        const content = markdown.replace(frontMatterRegex, '').trim();
        
        // Parse front matter (simple key-value pairs)
        const post = {};
        const lines = frontMatter.split('\n');
        
        lines.forEach(line => {
            const parts = line.split(':');
            if (parts.length >= 2) {
                const key = parts[0].trim();
                const value = parts.slice(1).join(':').trim();
                
                // Handle special cases
                if (key === 'tags') {
                    // Parse YAML-style list
                    const tagsMatch = value.match(/\[([^\]]*)\]|\n\s*-\s*(.+)/g);
                    if (tagsMatch) {
                        post.tags = tagsMatch[0]
                            .replace('[', '')
                            .replace(']', '')
                            .split(',')
                            .map(tag => tag.trim().replace(/'/g, '').replace(/"/g, ''));
                    } else {
                        post.tags = [];
                    }
                } else {
                    post[key] = value.replace(/^['"]|['"]$/g, ''); // Remove quotes if present
                }
            }
        });
        
        // Add the content and convert Markdown to HTML
        post.content = marked.parse(content);
        post.excerpt = extractExcerpt(content);
        post.formattedDate = formatDate(post.date);
        
        return post;
    }
    
    /**
     * Extract an excerpt from Markdown content
     */
    function extractExcerpt(markdown, maxLength = 150) {
        // Remove Markdown formatting and extract first paragraph
        const text = markdown
            .replace(/#+\s+([^\n]+)/g, '$1') // Remove headings
            .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
            .replace(/\*([^*]+)\*/g, '$1') // Remove italic
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
            .replace(/^>\s*(.+)/gm, '$1') // Remove blockquotes
            .replace(/^\s*[\-\*]\s+(.+)/gm, '$1') // Remove list items
            .trim();
        
        // Get the first paragraph
        const firstParagraph = text.split('\n\n')[0];
        
        // Truncate if necessary
        if (firstParagraph.length <= maxLength) {
            return firstParagraph;
        }
        
        return firstParagraph.substring(0, maxLength) + '...';
    }
    
    /**
     * Render the blog grid with posts
     */
    function renderBlogGrid(posts, container) {
        // Clear existing content
        container.innerHTML = '';
        
        // Sort posts by date (newest first)
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Create the featured post (first post)
        if (posts.length > 0) {
            const featuredPost = posts[0];
            const featuredElement = createFeaturedPostElement(featuredPost);
            container.appendChild(featuredElement);
        }
        
        // Create the rest of the posts
        for (let i = 1; i < posts.length; i++) {
            const post = posts[i];
            const postElement = createPostElement(post);
            container.appendChild(postElement);
        }
    }
    
    /**
     * Create a featured post element
     */
    function createFeaturedPostElement(post) {
        const element = document.createElement('div');
        element.className = 'blog-post featured-post';
        element.setAttribute('data-category', post.tags[0] || '');
        
        element.innerHTML = `
            <div class="blog-image">
                <img src="${post.featured_image || 'images/blog/blog-featured.png'}" alt="${post.title}">
            </div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span class="blog-date">${formatDate(post.date)}</span>
                    <span class="blog-category">${post.tags[0] || 'Blog'}</span>
                </div>
                <h2>${post.title}</h2>
                <p>${post.excerpt}</p>
                <a href="/blog/${post.slug}.html" class="read-more success-text">Đọc tiếp <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        
        return element;
    }
    
    /**
     * Create a regular post element
     */
    function createPostElement(post) {
        const element = document.createElement('div');
        element.className = 'blog-post';
        element.setAttribute('data-category', post.tags[0] || '');
        
        element.innerHTML = `
            <div class="blog-image">
                <img src="${post.featured_image || `images/blog/blog-${Math.floor(Math.random() * 6) + 1}.png`}" alt="${post.title}">
            </div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span class="blog-date">${formatDate(post.date)}</span>
                    <span class="blog-category">${post.tags[0] || 'Blog'}</span>
                </div>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <a href="/blog/${post.slug}.html" class="read-more success-text">Đọc tiếp <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        
        return element;
    }
    
    /**
     * Update the content of an existing blog post page
     */
    function updatePostContent(post) {
        // Update the title
        document.title = `${post.title} - Hyperliquid Vietnam`;
        
        // Update the header
        const header = document.querySelector('.blog-post-header h1');
        if (header) header.textContent = post.title;
        
        // Update the meta information
        const dateElement = document.querySelector('.blog-date');
        if (dateElement) dateElement.textContent = formatDate(post.date);
        
        const categoryElement = document.querySelector('.blog-category');
        if (categoryElement && post.tags && post.tags.length > 0) {
            categoryElement.textContent = post.tags[0];
        }
        
        // Update the content
        const contentElement = document.querySelector('.blog-content');
        if (contentElement) contentElement.innerHTML = post.content;
        
        // Update the tags
        const tagsContainer = document.querySelector('.blog-tags');
        if (tagsContainer && post.tags) {
            tagsContainer.innerHTML = '';
            post.tags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'tag';
                tagElement.textContent = `#${tag}`;
                tagsContainer.appendChild(tagElement);
            });
        }
    }
    
    /**
     * Render a blog post from the template and data
     */
    function renderBlogPost(post, template) {
        // Replace template variables with actual data
        let html = template;
        
        // Replace basic variables
        html = html.replace(/{{title}}/g, post.title);
        html = html.replace(/{{date}}/g, formatDate(post.date));
        html = html.replace(/{{content}}/g, post.content);
        html = html.replace(/{{featured_image}}/g, post.featured_image || 'images/blog/blog-featured.png');
        
        // Handle tags
        if (post.tags && Array.isArray(post.tags)) {
            let tagsHtml = '';
            post.tags.forEach(tag => {
                tagsHtml += `<span class="tag">#${tag}</span>`;
            });
            html = html.replace(/{{#each tags}}[\s\S]*?{{\/each}}/g, tagsHtml);
        }
        
        return html;
    }
    
    /**
     * Get the slug from the current URL
     */
    function getSlugFromUrl() {
        const path = window.location.pathname;
        const parts = path.split('/blog/');
        
        if (parts.length < 2) return null;
        
        return parts[1].replace('.html', '');
    }
    
    /**
     * Format a date string
     */
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }
});
