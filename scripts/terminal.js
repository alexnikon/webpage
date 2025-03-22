document.addEventListener('DOMContentLoaded', () => {
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
- date: Show current date and time`;
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
        }
    };
    
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