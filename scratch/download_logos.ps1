# Create directory if it doesn't exist
$logoDir = "c:\Users\singh\OneDrive\Desktop\gaurav new portfolio\public\logos"
if (!(Test-Path -Path $logoDir)) {
    New-Item -ItemType Directory -Force -Path $logoDir
}

# Array of tech logos to download from Simple Icons
$techLogos = @{
    "python"      = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/python.svg"
    "java"        = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/openjdk.svg"
    "springboot"  = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/springboot.svg"
    "spring"      = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/spring.svg"
    "flutter"     = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/flutter.svg"
    "dart"        = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/dart.svg"
    "react"       = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/react.svg"
    "nextjs"      = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/nextdotjs.svg"
    "nodejs"      = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/nodedotjs.svg"
    "javascript"  = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/javascript.svg"
    "typescript"  = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/typescript.svg"
    "firebase"    = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/firebase.svg"
    "mongodb"     = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/mongodb.svg"
    "mysql"       = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/mysql.svg"
    "tailwindcss" = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/tailwindcss.svg"
    "git"         = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/git.svg"
    "github"      = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/github.svg"
    
    # AI tools for Vibe Coding
    "cursor"      = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/cursor.svg"
    "chatgpt"     = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/openai.svg"
    "claude"      = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/anthropic.svg"
    "copilot"     = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/githubcopilot.svg"
    "gemini"      = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/googlegemini.svg"
    "bolt"        = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/stackblitz.svg"
    "replit"      = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/replit.svg"
    "v0"          = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/vercel.svg"
    "windsurf"    = "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/codeium.svg"
}

# Download each logo
foreach ($logoName in $techLogos.Keys) {
    $url = $techLogos[$logoName]
    $destFile = Join-Path $logoDir "$logoName.svg"
    Write-Host "Downloading $logoName logo from $url..."
    
    try {
        Invoke-WebRequest -Uri $url -OutFile $destFile -ErrorAction Stop
        Write-Host "Successfully saved to $destFile"
    } catch {
        Write-Warning "Failed to download ${logoName}: $_"
    }
}

# Special custom SVG for Lovable (since simple-icons might not have a specific lovable logo, we create a beautiful vector pink heart/sparkle logo)
$lovableSvg = @"
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fb7185" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0a2.17 2.17 0 0 0 3.08 0L15 8" opacity="0.3"/>
</svg>
"@

$lovablePath = Join-Path $logoDir "lovable.svg"
Set-Content -Path $lovablePath -Value $lovableSvg
Write-Host "Successfully created custom Lovable logo at $lovablePath"
