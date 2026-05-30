# Create directory if it doesn't exist
$logoDir = "c:\Users\singh\OneDrive\Desktop\gaurav new portfolio\public\logos"
if (!(Test-Path -Path $logoDir)) {
    New-Item -ItemType Directory -Force -Path $logoDir
}

# Mapping of brand names to Simple Icons colored CDN URLs
$coloredLogos = @{
    # Tech Stack
    "python"      = "https://cdn.simpleicons.org/python"
    "java"        = "https://cdn.simpleicons.org/openjdk"
    "springboot"  = "https://cdn.simpleicons.org/springboot"
    "spring"      = "https://cdn.simpleicons.org/spring"
    "flutter"     = "https://cdn.simpleicons.org/flutter"
    "dart"        = "https://cdn.simpleicons.org/dart"
    "react"       = "https://cdn.simpleicons.org/react"
    "nextjs"      = "https://cdn.simpleicons.org/nextdotjs/ffffff" # Force white next.js logo
    "nodejs"      = "https://cdn.simpleicons.org/nodedotjs"
    "javascript"  = "https://cdn.simpleicons.org/javascript"
    "typescript"  = "https://cdn.simpleicons.org/typescript"
    "firebase"    = "https://cdn.simpleicons.org/firebase"
    "mongodb"     = "https://cdn.simpleicons.org/mongodb"
    "mysql"       = "https://cdn.simpleicons.org/mysql"
    "tailwindcss" = "https://cdn.simpleicons.org/tailwindcss"
    "git"         = "https://cdn.simpleicons.org/git"
    "github"      = "https://cdn.simpleicons.org/github/ffffff" # Force white github logo
    
    # AI platforms
    "cursor"      = "https://cdn.simpleicons.org/cursor/ffffff" # Force white cursor logo
    "chatgpt"     = "https://cdn.simpleicons.org/openai/ffffff" # Force white chatgpt/openai logo
    "claude"      = "https://cdn.simpleicons.org/anthropic"
    "copilot"     = "https://cdn.simpleicons.org/githubcopilot"
    "gemini"      = "https://cdn.simpleicons.org/googlegemini"
    "bolt"        = "https://cdn.simpleicons.org/stackblitz"
    "replit"      = "https://cdn.simpleicons.org/replit"
    "v0"          = "https://cdn.simpleicons.org/vercel/ffffff" # Force white vercel logo
    "windsurf"    = "https://cdn.simpleicons.org/codeium"
}

# Download and patch SVGs
foreach ($logoName in $coloredLogos.Keys) {
    $url = $coloredLogos[$logoName]
    $destFile = Join-Path $logoDir "$logoName.svg"
    Write-Host "Downloading brand-colored ${logoName} logo from $url..."
    
    try {
        # Fetch SVG content
        $webClient = New-Object System.Net.WebClient
        $svgContent = $webClient.DownloadString($url)
        
        # Inject width and height to ensure WebGL/TextureLoader compatibility
        if ($svgContent -notlike "*width=*") {
            $svgContent = $svgContent -replace "<svg", "<svg width=`"128`" height=`"128`""
        }
        
        # Save locally
        [System.IO.File]::WriteAllText($destFile, $svgContent)
        Write-Host "Successfully saved colorful SVG to $destFile"
    } catch {
        Write-Warning "Failed to download colorful ${logoName}: $_"
    }
}

# Custom Lovable pink heart SVG
$lovableSvg = @"
<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" fill="none" stroke="#fb7185" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0a2.17 2.17 0 0 0 3.08 0L15 8" opacity="0.3"/>
</svg>
"@
[System.IO.File]::WriteAllText((Join-Path $logoDir "lovable.svg"), $lovableSvg)
Write-Host "Successfully recreated colorful Lovable SVG"
