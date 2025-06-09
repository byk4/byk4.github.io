const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Configure marked
marked.setOptions({
  gfm: true,
  breaks: true,
  pedantic: false,
  smartLists: true,
  smartypants: true
});

// Ensure blogs directory exists
const blogsDir = path.join(__dirname, '../blogs');
if (!fs.existsSync(blogsDir)) {
  fs.mkdirSync(blogsDir, { recursive: true });
}

// Get all markdown files from the markdown directory
const markdownDir = path.join(__dirname, '../markdown');
const markdownFiles = fs.readdirSync(markdownDir).filter(file => file.endsWith('.md'));

// Process each markdown file
markdownFiles.forEach(markdownFile => {
  try {
    // Read the markdown file
    const markdownPath = path.join(markdownDir, markdownFile);
    const markdown = fs.readFileSync(markdownPath, 'utf8');

    // Convert to HTML
    const html = marked.parse(markdown);

    // Create HTML filename (same name but with .html extension)
    const htmlFileName = `${path.parse(markdownFile).name}.html`;
    const htmlFilePath = path.join(blogsDir, htmlFileName);

// Create a complete HTML document with your custom CSS
const htmlDocument = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
  <style>

  
    /* Hide scrollbar for Chrome, Safari and Opera */
    ::-webkit-scrollbar {
      display: none;
    }
    
    /* Hide scrollbar for IE, Edge and Firefox */
    * {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }

    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

    ::-moz-selection { /* Code for Firefox */
        background :#832d62;
    }

    ::selection {
        background :#832d62;
    }


    .icon {
        text-decoration: none;
        color: #fff
    }

    .icon:hover {
        text-decoration: none;
        color:#FF5DC2;
    }

    .navbar-left {
        font-size: 2rem;
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }

    .navbar-right a {
        color: #ffff;
        text-decoration: none;
        margin-left: 1rem;
    }

    .navbar-right a:hover {
        color:#FF5DC2;
    }

    .navbar {
        background-color: #222;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 1rem;
        position: sticky;
        top: 0;
        border-bottom: 1px solid #FF5DC2;
    }

    body {
        margin: 0;
        background-color: #111;
        color: #fff;
        font-family: "Montserrat", sans-serif;
    }
    
    p {
      font-size: large;
      line-height: 1.8;
    }



    .container {
        display: flex;
        width: 100%;
    }

    .remaining {
        width: 15%;
    }

    .blog {
        margin-top: 1rem;
        width: 70%;
        background-color: #222;
        text-align: justify;
        line-height: auto;
        padding: 0px 90px 0px 90px;
    }

    .blog img {
        display: block;
        margin: auto;
        width: fit-content;
        border: 1px solid #FF5DC2;
    }

    .blog p {
        padding-top: 1rem;
        padding-bottom: 1rem;
    }

    code
    {
      font-size: large ;
    }

    .blog pre {
        background-color: #333;
        border: 1px solid #Fff;
        padding: 1rem;
    }
    
    .blog pre:hover {
        background-color: #111;
        border: 1px solid #FF5DC2;
        color: #ffb0e1;
    }

    /* Additional styles for markdown elements */
    a {
        color: #FF5DC2;
        text-decoration: none;
    }

    blockquote {
        border-left: 3px solid #FF5DC2;
        padding-left: 1em;
        margin-left: 0;
        color: #ccc;
    }

    table {
        border-collapse: collapse;
        width: 100%;
        margin: 1em 0;
    }

    th, td {
        border: 1px solid #444;
        padding: 8px;
    }

    th {
        background-color: #333;
    }

    tr:nth-child(even) {
        background-color: #3a3a3a;
    }
  </style>
</head>
<body>
  <!-- Optional navbar - you can customize this -->

  <header class="navbar">
    <div class="navbar-left"> 
        <a class="icon" href="../index.html">YASH GOSAVI</a>
    </div>
    <div class="navbar-right">
      <a href="https://discord.com/users/1294295669107982407">Discord</a>
      <a href="mailto:yashcgosavi@gmail.com">Email</a>
      <a href="https://www.linkedin.com/in/yashcgosavi/" target="_blank">LinkedIn</a>
      <a href="https://github.com/byk4" target="_blank">GitHub</a>
    </div>
  </header>

  <div class="container">
    <div class="remaining"></div>
    <div class="blog">
      ${html}
    </div>
    <div class="remaining"></div>
  </div>
</body>
</html>`;

    // Save the HTML file
    fs.writeFileSync(htmlFilePath, htmlDocument);
    console.log(`Converted ${markdownFile} to ${htmlFileName}`);
    
  } catch (error) {
    console.error(`Error processing ${markdownFile}:`, error);
  }
});

console.log('All markdown files converted to HTML');