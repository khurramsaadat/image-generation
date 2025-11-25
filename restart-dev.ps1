# PowerShell script to cleanly restart Next.js dev server
Write-Host "🔄 Cleaning up Next.js processes..." -ForegroundColor Yellow

# Stop all node processes
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Remove lock file
Remove-Item -Path ".next\dev\lock" -Force -ErrorAction SilentlyContinue

# Wait a moment
Start-Sleep -Seconds 2

Write-Host "✅ Cleanup complete. Starting dev server..." -ForegroundColor Green

# Start dev server
npm run dev
