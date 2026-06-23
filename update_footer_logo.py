import os
import glob

# SVG Icons
INSTAGRAM_SVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>'
TWITTER_SVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>'
FACEBOOK_SVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>'

NEW_SOCIAL = f"""                        <li><a href="404.html" style="display:flex; align-items:center; gap:8px;">{INSTAGRAM_SVG} Instagram</a></li>
                        <li><a href="404.html" style="display:flex; align-items:center; gap:8px;">{TWITTER_SVG} Twitter</a></li>
                        <li><a href="404.html" style="display:flex; align-items:center; gap:8px;">{FACEBOOK_SVG} Facebook</a></li>"""

OLD_SOCIAL_1 = """                        <li><a href="404.html">Instagram 📸</a></li>
                        <li><a href="404.html">Twitter 🐦</a></li>
                        <li><a href="404.html">Facebook 📘</a></li>"""

OLD_SOCIAL_2 = """                        <li><a href="404.html">Instagram 📸</a></li>
                        <li><a href="404.html">Twitter 🐦</a></li>
                        <li><a href="404.html">Facebook 📘</a></li>"""

html_files = glob.glob("*.html")

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Replace logo
    content = content.replace('lo1.webp', 'stackly-logo.webp')
    
    # Replace social links
    if OLD_SOCIAL_1 in content:
        content = content.replace(OLD_SOCIAL_1, NEW_SOCIAL)
        
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Updates applied successfully.")
