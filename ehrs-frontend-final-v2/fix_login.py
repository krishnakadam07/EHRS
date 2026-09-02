import re

with open("src/pages/auth/Login.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# Comment out import
content = re.sub(
    r"import \{ GoogleLogin \} from '@react-oauth/google';", 
    r"// import { GoogleLogin } from '@react-oauth/google';", 
    content
)

# Comment out the component
pattern = re.compile(r'(<div className="relative my-8">.*?</GoogleLogin>\s*</div>)', re.DOTALL)
content = pattern.sub(r'{/* \n\1\n */}', content)

with open("src/pages/auth/Login.jsx", "w", encoding="utf-8") as f:
    f.write(content)
