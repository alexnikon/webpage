document.addEventListener('DOMContentLoaded', () => {
    // Create and show the loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    
    const loadingContent = document.createElement('div');
    loadingContent.className = 'loading-content linux-boot';
    
    const bootLogs = [
        'Starting nikonOS v1.0.0...',
        'Initializing hardware detection...',
        '[OK] CPU detected: Intel Core i7',
        '[OK] Memory: 16GB RAM available',
        '[OK] Storage: 512GB SSD detected',
        '[OK] Display adapter: Intel Iris Graphics',
        'Mounting filesystems...',
        '[OK] /root mounted successfully',
        '[OK] /home mounted successfully',
        '[OK] /var mounted successfully',
        '[OK] All filesystems mounted',
        'Starting system services...',
        '[OK] Started Network Time Synchronization',
        '[OK] Started System Logger',
        '[OK] Started Security Services',
        '[OK] Started Device Manager',
        '[OK] Started Power Management',
        '[OK] Reached target System Initialization',
        'Starting terminal services...',
        '[OK] Started terminal services',
        'Starting desktop manager...',
        '[OK] Started desktop manager',
        'Checking file system...',
        '[OK] File system check complete',
        'Loading kernel modules...',
        '[OK] Loaded kernel module: network',
        '[OK] Loaded kernel module: audio',
        '[OK] Loaded kernel module: bluetooth',
        '[OK] Loaded kernel module: graphics',
        '[OK] All kernel modules loaded',
        'Starting network services...',
        '[OK] Started DHCP client',
        '[OK] Network interfaces configured',
        '[OK] Firewall services started',
        '[OK] Network connection established',
        '[OK] Started network services',
        'Starting user interface services...',
        '[OK] Started UI compositor',
        '[OK] Started window manager',
        '[OK] Started user interface services',
        'Initializing terminal...',
        '[OK] Terminal initialized',
        'nikonOS version 1.0.0 starting...',
        'Welcome to nikonOS!',
        'Login: admin',
        'Password: ********',
        '[OK] Login successful',
        'Loading user profile...',
        '[OK] User configuration loaded',
        '[OK] User preferences applied',
        '[OK] User profile loaded',
        'Starting terminal interface...',
        '[OK] System ready.'
    ];
    
    loadingContent.innerHTML = '';
    
    // Function to add log lines one by one
    function addLogLine(index) {
        if (index >= bootLogs.length) return;
        
        const line = bootLogs[index];
        const logLine = document.createElement('div');
        logLine.className = 'linux-log-line';
        
        // Add OK/FAIL formatting
        if (line.includes('[OK]')) {
            logLine.innerHTML = line.replace('[OK]', '<span class="log-ok">[OK]</span>');
        } else if (line.includes('[FAIL]')) {
            logLine.innerHTML = line.replace('[FAIL]', '<span class="log-fail">[FAIL]</span>');
        } else {
            logLine.textContent = line;
        }
        
        loadingContent.appendChild(logLine);
        loadingContent.scrollTop = loadingContent.scrollHeight;
        
        // Schedule next line
        setTimeout(() => addLogLine(index + 1), Math.random() * 100 + 100);
    }
    
    loadingScreen.appendChild(loadingContent);
    document.body.appendChild(loadingScreen);
    
    // Start adding log lines
    setTimeout(() => addLogLine(0), 300);
    
    // Hide main interface until loading completes
    const mainInterface = document.querySelector('.main-interface');
    if (mainInterface) {
        mainInterface.style.opacity = '0';
        mainInterface.style.visibility = 'hidden';
    }
    
    // Remove loading screen after animation completes and trigger old PC rendering
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.1s';
        
        setTimeout(() => {
            loadingScreen.remove();
            
            // Trigger the old PC render animation
            const mainInterface = document.querySelector('.main-interface');
            if (mainInterface) {
                console.log("Showing main interface");
                // Add a small delay before starting the render animation
                setTimeout(() => {
                    mainInterface.classList.add('show');
                    mainInterface.style.opacity = '1';
                    mainInterface.style.visibility = 'visible';
                    console.log("Interface should be visible now");
                }, 200);
            }
        }, 500);
    }, 5000); // Extended time for longer boot sequence
    
    const terminalContainer = document.getElementById('terminal-container');
    const inputLine = document.getElementById('terminal-input-line');
    const commandInput = document.getElementById('command-input');
    const commandDisplay = document.getElementById('command-display');
    const prompt = document.getElementById('prompt');
    
    // Command history functionality
    let commandHistory = [];
    let historyIndex = -1;
    
    // Available commands
    const commands = {
        help: () => {
            return `Available commands:
- help: Show this help message
- clear: Clear the terminal
- about: Show information about this website
- ls: List available sections
- social: Show social links
- github: Open GitHub profile
- twitter: Open Twitter profile
- mastodon: Open Mastodon profile
- echo [text]: Display the given text
- date: Show current date and time
- theme [dark|light|system]: Change the theme`;
        },
        
        clear: () => {
            // Clear all output lines, leaving only the input line
            const outputs = document.querySelectorAll('.output-line');
            outputs.forEach(output => output.remove());
            return '';
        },
        
        about: () => {
            return `nikonOS - A terminal-like interface for my personal website.
Created by Alex Nikonov.`;
        },
        
        ls: () => {
            return `about  projects  skills  contact`;
        },
        
        social: () => {
            return `Social links:
- github: GitHub profile (https://github.com/alexnikon)
- twitter: Twitter profile (https://twitter.com/alexn1k0n)
- mastodon: Mastodon profile (https://mastodon.social/@alexnik)

Type the name of the social network to open the link.`;
        },
        
        github: () => {
            window.open('https://github.com/alexnikon', '_blank');
            return 'Opening GitHub profile...';
        },
        
        twitter: () => {
            window.open('https://twitter.com/alexn1k0n', '_blank');
            return 'Opening Twitter profile...';
        },
        
        mastodon: () => {
            window.open('https://mastodon.social/@alexnik', '_blank');
            return 'Opening Mastodon profile...';
        },
        
        echo: (args) => {
            return args.join(' ');
        },
        
        date: () => {
            return new Date().toString();
        },
        
        theme: (args) => {
            if (args.length === 0) {
                return 'Current theme is based on system preference. Use "theme dark" or "theme light" to change.';
            }
            
            const theme = args[0].toLowerCase();
            
            if (theme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                return 'Theme set to dark mode.';
            } else if (theme === 'light') {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                return 'Theme set to light mode.';
            } else if (theme === 'system') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.removeItem('theme');
                return 'Theme set to follow system preference.';
            } else {
                return 'Invalid theme. Use "dark", "light", or "system".';
            }
        }
    };
    
    // Apply saved theme on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    
    // Focus the input field when the terminal container is clicked
    terminalContainer.addEventListener('click', () => {
        commandInput.focus();
    });
    
    // Update command display as user types
    commandInput.addEventListener('input', () => {
        commandDisplay.textContent = commandInput.value;
    });
    
    // Handle command execution
    function executeCommand(command) {
        const cmdParts = command.trim().split(' ');
        const cmd = cmdParts[0].toLowerCase();
        const args = cmdParts.slice(1);
        
        // Add command to history
        if (command.trim()) {
            commandHistory.push(command);
            historyIndex = commandHistory.length;
        }
        
        // Create output element for the command
        const outputLine = document.createElement('div');
        outputLine.className = 'output-line';
        outputLine.innerHTML = `<span style="color: var(--prompt-color)">➜</span> ~ <span class="command">${escapeHtml(command)}</span>`;
        
        // Insert the output line before the input line
        terminalContainer.insertBefore(outputLine, inputLine);
        
        // Process command and show result
        let output = '';
        if (cmd) {
            if (cmd in commands) {
                output = commands[cmd](args);
            } else {
                output = `Command not found: ${cmd}. Type 'help' for available commands.`;
            }
        }
        
        // Display output if there is any
        if (output) {
            const resultElement = document.createElement('div');
            resultElement.className = 'output-line result';
            resultElement.innerHTML = output.replace(/\n/g, '<br>');
            terminalContainer.insertBefore(resultElement, inputLine);
        }
        
        // Reset command display
        commandDisplay.textContent = '';
        
        // Scroll to bottom
        terminalContainer.scrollTop = terminalContainer.scrollHeight;
    }
    
    // Handle input keydown events
    commandInput.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'Enter':
                const command = commandInput.value;
                commandInput.value = '';
                executeCommand(command);
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    commandInput.value = commandHistory[historyIndex];
                    commandDisplay.textContent = commandInput.value;
                }
                break;
                
            case 'ArrowDown':
                e.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    commandInput.value = commandHistory[historyIndex];
                    commandDisplay.textContent = commandInput.value;
                } else {
                    historyIndex = commandHistory.length;
                    commandInput.value = '';
                    commandDisplay.textContent = '';
                }
                break;
                
            case 'Tab':
                e.preventDefault();
                // Simple tab completion could be added here
                break;
        }
    });
    
    // Escape HTML to prevent XSS
    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
    
    // Start with clear command display and focus on input
    commandDisplay.textContent = '';
    commandInput.value = '';
    commandInput.focus();
}); 