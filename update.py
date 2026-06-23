import os
import re

directory = r"C:\Users\SWETHA\Desktop\Wildlife"
html_files = [
    "index.html", "about.html", "portfolio.html", "gallery.html", 
    "expeditions.html", "blog.html", "contact.html"
]

nav_replace_old = """        <div class="nav-actions">
            <a href="login.html" class="btn btn-outline hover-target">Login</a>
            <a href="dashboard.html" class="btn btn-primary hover-target">Dashboard</a>
        </div>"""

nav_replace_new = """        <div class="nav-actions">
            <a href="login.html" class="btn btn-primary hover-target">Login</a>
        </div>"""

footer_new = """    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <a href="index.html" class="footer-brand">
                        <img src="lo1.webp" alt="Stackly Logo">
                    </a>
                    <p class="footer-desc">Premium wildlife photography capturing the untamed beauty of nature.</p>
                </div>
                <div class="footer-col">
                    <h4 class="footer-title">Explore</h4>
                    <ul class="footer-links">
                        <li><a href="portfolio.html">Portfolio</a></li>
                        <li><a href="gallery.html">Gallery</a></li>
                        <li><a href="expeditions.html">Expeditions</a></li>
                        <li><a href="blog.html">Blog</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4 class="footer-title">Connect</h4>
                    <ul class="footer-links">
                        <li><a href="contact.html">Contact Us</a></li>
                        <li><a href="404.html">Instagram 📸</a></li>
                        <li><a href="404.html">Twitter 🐦</a></li>
                        <li><a href="404.html">Facebook 📘</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4 class="footer-title">Our Office</h4>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127641.52766869687!2d36.73973347076216!3d-1.303193375753086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" width="100%" height="120" style="border:0; border-radius: 8px; filter: invert(90%) hue-rotate(180deg);" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 Stackly Wildlife Photography. All Rights Reserved.</p>
                <div style="display: flex; gap: 16px;">
                    <a href="404.html">Privacy Policy</a>
                    <a href="404.html">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>"""

for file in html_files:
    filepath = os.path.join(directory, file)
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Replace nav
    content = content.replace(nav_replace_old, nav_replace_new)
    
    # Replace footer using regex to catch the whole footer block
    content = re.sub(r'<!-- Footer -->.*?</footer>', footer_new, content, flags=re.DOTALL)
    
    # Replace empty hrefs with 404.html globally in these files
    content = content.replace('href="#"', 'href="404.html"')
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

print("Update complete!")
