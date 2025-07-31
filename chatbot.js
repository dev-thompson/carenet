// Enhanced Doctor Chatbot Functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatbot = {
        elements: {
            avatar: document.querySelector('.doctor-avatar'),
            container: document.querySelector('.chatbot-container'),
            messages: document.querySelector('.chatbot-messages'),
            input: document.querySelector('.chatbot-input input'),
            sendBtn: document.querySelector('.btn-send'),
            closeBtn: document.querySelector('.btn-close-chat')
        },
        state: {
            open: false,
            currentLanguage: 'English'
        },
        data: {
            greetings: {
                English: "Hello! I'm Dr. Adebayo, your CareNet health assistant. How can I help you today?",
                Igbo: "Ndewo! Abụ m Dr. Adebayo, onye enyemaka ahụike gị na CareNet. Kedu ka m ga-esi nyere gị aka taa?"
            },
            responses: {
                malaria: {
                    English: `<p><strong>Malaria Prevention:</strong></p>
                             <img src="images/faq/mosquito-net.jpg" alt="Mosquito net" class="img-fluid rounded mb-2">
                             <ul>
                                <li>Use insecticide-treated nets (ITNs)</li>
                                <li>Apply mosquito repellent at dusk</li>
                                <li>Wear long sleeves in the evening</li>
                                <li>Eliminate standing water near homes</li>
                             </ul>
                             <p><strong>Symptoms:</strong> Fever, chills, headache, body aches (appear 10-15 days after bite)</p>`,
                    Igbo: `<p><strong>Mgbochi Ịba:</strong></p>
                          <ul>
                            <li>Jiri ụgbụ anwụnta (ITNs)</li>
                            <li>ṅara ọgwụ mgbochi anwụnta</li>
                            <li>Yikwasị uwe ogologo aka na mgbede</li>
                            <li>Kpochapụ mmiri na-akwụghị n'ụlọ</li>
                          </ul>
                          <p><strong>Mgbaàmà:</strong> Ahụ ọkụ, ịma jijiji, isi ọwụwa, mgbu ahụ (pụtara ụbọchị 10-15 ka anwụnta tachara)</p>`
                },
                pregnancy: {
                    English: `<p><strong>Prenatal Care Essentials:</strong></p>
                             <img src="images/faq/prenatal-visit.jpg" alt="Prenatal visit" class="img-fluid rounded mb-2">
                             <ul>
                                <li>At least 4 antenatal visits</li>
                                <li>Take iron and folic acid supplements</li>
                                <li>Get tested for HIV and malaria</li>
                                <li>Learn danger signs (severe headache, bleeding)</li>
                             </ul>`,
                    Igbo: `<p><strong>Ihe dị mkpa tupu ịmụ nwa:</strong></p>
                           <ul>
                             <li>Opekempe nleta 4 tupu ịmụ nwa</li>
                             <li>ṅara ígwè na folic acid ọgwụ</li>
                             <li>Nwalee maka HIV na ịba</li>
                             <li>Mụta ihe ịrịba ama dị ize ndụ (isi ọwụwa siri ike, ọbara ọgbụgba)</li>
                           </ul>`
                },
                nutrition: {
                    English: `<p><strong>Child Nutrition Tips:</strong></p>
                             <img src="images/faq/child-eating.jpg" alt="Child eating" class="img-fluid rounded mb-2">
                             <ul>
                                <li>Exclusive breastfeeding for 6 months</li>
                                <li>Introduce diverse foods at 6 months</li>
                                <li>Include protein sources (beans, eggs, fish)</li>
                                <li>Add vitamin A-rich foods (mango, pumpkin)</li>
                             </ul>`,
                    Igbo: `<p><strong>Ndụmọdụ nri ụmụaka:</strong></p>
                          <ul>
                            <li>Ịṅụ ara naanị ruo ọnwa isii</li>
                            <li>Malite nri dị iche iche na ọnwa isii</li>
                            <li>Gụnyere protein (agwa, àkwá, azụ)</li>
                            <li>Tinye nri nwere vitamin A (mango, ugu)</li>
                          </ul>`
                }
            },
            defaultResponse: {
                English: "I can provide information about malaria prevention, pregnancy care, child nutrition, and other health topics. Please ask about one of these or type 'help' for more options.",
                Igbo: "Enwere m ike ịnye ozi gbasara mgbochi ịba, nlekọta afọ ime, nri ụmụaka, na isiokwu ahụike ndị ọzọ. Jụọ maka otu n'ime ndị a ma ọ bụ pịa 'enyemaka' maka nhọrọ ndị ọzọ."
            }
        },
        init: function() {
            this.elements.avatar.addEventListener('click', () => this.toggleChat());
            this.elements.closeBtn.addEventListener('click', () => this.toggleChat());
            this.elements.sendBtn.addEventListener('click', () => this.sendMessage());
            this.elements.input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });
            
            // Quick action buttons
            document.querySelectorAll('.btn-quick-action').forEach(btn => {
                btn.addEventListener('click', () => {
                    const action = btn.getAttribute('data-action');
                    this.sendBotResponse(action);
                });
            });
        },
        toggleChat: function() {
            this.state.open = !this.state.open;
            if (this.state.open) {
                this.elements.container.style.display = 'flex';
                setTimeout(() => {
                    this.elements.container.style.transform = 'translateY(0)';
                    this.elements.container.style.opacity = '1';
                }, 10);
                this.elements.input.focus();
            } else {
                this.elements.container.style.transform = 'translateY(20px)';
                this.elements.container.style.opacity = '0';
                setTimeout(() => {
                    this.elements.container.style.display = 'none';
                }, 300);
            }
        },
        sendMessage: function() {
            const message = this.elements.input.value.trim();
            if (message === '') return;
            
            this.addMessage(message, 'user');
            this.processUserMessage(message);
            this.elements.input.value = '';
        },
        addMessage: function(content, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', `${sender}-message`);
            
            const contentDiv = document.createElement('div');
            contentDiv.classList.add('message-content');
            contentDiv.innerHTML = content;
            
            messageDiv.appendChild(contentDiv);
            this.elements.messages.appendChild(messageDiv);
            
            // Scroll to bottom
            this.elements.messages.scrollTop = this.elements.messages.scrollHeight;
        },
        processUserMessage: function(message) {
            // Simulate typing indicator
            const typingIndicator = this.addTypingIndicator();
            
            setTimeout(() => {
                // Remove typing indicator
                typingIndicator.remove();
                
                // Process message
                let response = this.data.defaultResponse[this.state.currentLanguage];
                const lowerMessage = message.toLowerCase();
                
                if (lowerMessage.includes('malaria')) {
                    response = this.data.responses.malaria[this.state.currentLanguage];
                } else if (lowerMessage.includes('preg') || lowerMessage.includes('matern')) {
                    response = this.data.responses.pregnancy[this.state.currentLanguage];
                } else if (lowerMessage.includes('nutrit') || lowerMessage.includes('food')) {
                    response = this.data.responses.nutrition[this.state.currentLanguage];
                } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
                    response = this.data.greetings[this.state.currentLanguage];
                } else if (lowerMessage.includes('language') || lowerMessage.includes('asụsụ')) {
                    response = `Current language: <strong>${this.state.currentLanguage}</strong>. Type "English" or "Igbo" to switch.`;
                } else if (lowerMessage.includes('english')) {
                    this.state.currentLanguage = 'English';
                    response = "Language switched to English. How can I help you?";
                } else if (lowerMessage.includes('igbo')) {
                    this.state.currentLanguage = 'Igbo';
                    response = "Asụsụ gbanwere na Igbo. Kedu ka m ga-esi nyere gị aka?";
                }
                
                this.addMessage(response, 'doctor');
            }, 1500);
        },
        sendBotResponse: function(action) {
            const typingIndicator = this.addTypingIndicator();
            
            setTimeout(() => {
                typingIndicator.remove();
                
                if (this.data.responses[action]) {
                    const response = this.data.responses[action][this.state.currentLanguage];
                    this.addMessage(response, 'doctor');
                }
            }, 1000);
        },
        addTypingIndicator: function() {
            const typingDiv = document.createElement('div');
            typingDiv.classList.add('message', 'doctor-message');
            typingDiv.innerHTML = `
                <div class="message-content">
                    <div class="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            `;
            this.elements.messages.appendChild(typingDiv);
            this.elements.messages.scrollTop = this.elements.messages.scrollHeight;
            return typingDiv;
        }
    };

    chatbot.init();
});