// Jarvis - English Only Interactive System

// English voice commands library
const englishCommands = {
    "hello": "Good day, sir. Jarvis online and ready to assist.",
    "status": "All systems operational. Power core at 98%, armor integrity at 95%. No threats detected.",
    "power": "Power core functioning at optimal capacity. 98% energy reserves available.",
    "armor": "Armor integrity holding steady at 95%. All plating systems secure.",
    "weapons": "All weapons systems armed and ready. Repulsors online, missile bank loaded, laser targeting system active.",
    "scan": "Initiating full system diagnostic scan. One moment please.",
    "threat": "No immediate threats detected. Threat level: safe.",
    "flight": "Flight systems fully operational. Repulsors ready for liftoff.",
    "temperature": "Internal suit temperature maintaining optimal levels at 45 degrees Celsius.",
    "help": "I can assist with status queries, weapon systems, power management, diagnostics, and general assistance. Try asking about power, armor, weapons, or threat level.",
    "language": "I am configured exclusively for English language operations. All voice recognition systems tuned to English commands.",
    "jarvis": "I am Jarvis, artificial intelligence system. Online and ready to serve.",
    "time": "The current time is displayed on your device chronometer.",
    "location": "Location tracking active. GPS systems fully operational.",
    "ready": "Standing by for your command, sir.",
    "override": "Authorization required for system override. Please provide credentials.",
    "reboot": "System reboot not recommended at this time. All systems functioning nominally.",
    "defense": "Defensive systems online. Shields standing by. Ready to engage if necessary.",
    "deploy": "Deployment protocols available. Please specify target or destination.",
    "activate": "Which system would you like to activate, sir?",
    "deactivate": "Which system would you like to deactivate?",
    "goodbye": "Very good, sir. Standing by for your return. Jarvis disengaging.",
    "thanks": "My pleasure, sir. Always at your service.",
    "yes": "Understood, sir. Proceeding with operation.",
    "no": "Acknowledged, sir. Canceling operation.",
    "mission": "No active mission parameters loaded. Awaiting mission briefing."
};

const randomResponses = [
    "Processing your request, sir.",
    "Understood. Executing command.",
    "Very good, sir.",
    "All systems responding nominally.",
    "Your wish is my command.",
    "Standing by, sir.",
    "Systems engaged.",
    "Calculation complete, sir.",
    "Affirmative, sir.",
    "At your service, sir."
];

// Toggle Voice Input
function toggleVoiceInput() {
    const modal = document.getElementById('voiceModal');
    if (modal.classList.contains('active')) {
        modal.classList.remove('active');
        window.speechSynthesis.cancel();
    } else {
        modal.classList.add('active');
        simulateVoiceInput();
    }
}

// Simulate Voice Input
function simulateVoiceInput() {
    const voiceText = document.getElementById('voiceText');
    
    // Random delay before response
    const delay = Math.random() * 2000 + 1000;
    
    setTimeout(() => {
        const randomPhrase = Object.values(englishCommands)[Math.floor(Math.random() * Object.keys(englishCommands).length)];
        voiceText.textContent = randomPhrase;
        speakText(randomPhrase);
    }, delay);
}

// Text to Speech
function speakText(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1.1;
        utterance.volume = 0.8;
        utterance.lang = 'en-US'; // English only
        
        window.speechSynthesis.speak(utterance);
    }
}

// Toggle Chat Modal
function toggleChat() {
    const modal = document.getElementById('chatModal');
    if (modal.classList.contains('active')) {
        modal.classList.remove('active');
    } else {
        modal.classList.add('active');
        document.getElementById('chatInput').focus();
    }
}

// Handle Chat Input
function handleChatInput(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

// Send Chat Message
function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const userMessage = input.value.trim();
    
    if (!userMessage) return;
    
    const chatDisplay = document.getElementById('chatDisplay');
    
    // Add user message
    const userBubble = document.createElement('div');
    userBubble.className = 'chat-message user';
    userBubble.textContent = userMessage;
    chatDisplay.appendChild(userBubble);
    
    input.value = '';
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
    
    // Generate Jarvis response
    setTimeout(() => {
        let response = getJarvisResponse(userMessage);
        
        const jarvisBubble = document.createElement('div');
        jarvisBubble.className = 'chat-message jarvis';
        jarvisBubble.textContent = response;
        chatDisplay.appendChild(jarvisBubble);
        
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
        
        // Speak response
        speakText(response);
    }, 500);
}

// Get Jarvis Response
function getJarvisResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for direct command match
    for (const [command, response] of Object.entries(englishCommands)) {
        if (lowerMessage.includes(command)) {
            return response;
        }
    }
    
    // Check for partial matches
    if (lowerMessage.includes('power') || lowerMessage.includes('energy')) {
        return englishCommands["power"];
    }
    if (lowerMessage.includes('armor') || lowerMessage.includes('integrity')) {
        return englishCommands["armor"];
    }
    if (lowerMessage.includes('weapon') || lowerMessage.includes('repulsor')) {
        return englishCommands["weapons"];
    }
    if (lowerMessage.includes('scan') || lowerMessage.includes('diagnostic')) {
        return englishCommands["scan"];
    }
    if (lowerMessage.includes('threat') || lowerMessage.includes('danger')) {
        return englishCommands["threat"];
    }
    if (lowerMessage.includes('flight') || lowerMessage.includes('fly')) {
        return englishCommands["flight"];
    }
    if (lowerMessage.includes('temperature') || lowerMessage.includes('temp')) {
        return englishCommands["temperature"];
    }
    if (lowerMessage.includes('defense') || lowerMessage.includes('defend')) {
        return englishCommands["defense"];
    }
    if (lowerMessage.includes('?')) {
        return englishCommands["help"];
    }
    
    // Return random response for unknown commands
    return randomResponses[Math.floor(Math.random() * randomResponses.length)];
}

// Start Scan
function startScan() {
    const scanEffect = document.getElementById('scanEffect');
    scanEffect.classList.remove('active');
    
    // Trigger reflow to restart animation
    void scanEffect.offsetWidth;
    
    scanEffect.classList.add('active');
    
    const message = "Initiating comprehensive system scan. Stand by, sir.";
    speakText(message);
    
    // Show message
    const chatDisplay = document.getElementById('chatDisplay');
    if (chatDisplay && chatDisplay.parentElement.parentElement.classList.contains('active')) {
        const scanBubble = document.createElement('div');
        scanBubble.className = 'chat-message jarvis';
        scanBubble.textContent = message;
        chatDisplay.appendChild(scanBubble);
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    }
}

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Alt+V for Voice
    if (e.altKey && e.key === 'v') {
        e.preventDefault();
        toggleVoiceInput();
    }
    // Alt+C for Chat
    if (e.altKey && e.key === 'c') {
        e.preventDefault();
        toggleChat();
    }
    // Alt+S for Scan
    if (e.altKey && e.key === 's') {
        e.preventDefault();
        startScan();
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Jarvis Online - English Configuration Active');
    
    // Play startup sound/greeting after delay
    setTimeout(() => {
        const greeting = "Jarvis online. Systems nominal. Standing by for commands, sir.";
        speakText(greeting);
    }, 500);
});

// Prevent multiple speech instances
window.addEventListener('beforeunload', () => {
    window.speechSynthesis.cancel();
});