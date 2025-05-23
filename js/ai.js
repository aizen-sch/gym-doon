document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const chatArea = document.getElementById('chat-area');

    function appendMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
        messageDiv.textContent = text;
        chatArea.appendChild(messageDiv);
        chatArea.scrollTop = chatArea.scrollHeight; 
    }

    async function sendQueryToAI() {
        const query = userInput.value.trim();
        if (query === '') return;

        appendMessage('user', query);
        userInput.value = ''; 

        
        const aiResponse = await simulateAIResponse(query);
        appendMessage('ai', aiResponse);

    
    }


    function simulateAIResponse(query) {
        return new Promise(resolve => {
            setTimeout(() => {
                const lowerQuery = query.toLowerCase();
                if (lowerQuery.includes('مرحبا') || lowerQuery.includes('كيف حالك')) {
                    resolve('أهلاً بك! أنا بخير، شكراً لك. كيف يمكنني خدمتك؟');
                } else if (lowerQuery.includes('اسمك')) {
                    resolve('ليس لدي اسم، أنا نموذج لغوي كبير.');
                    } else if (lowerQuery.includes('ماهي افضل تمارين لتقوية عضلات بطن')) {
                    resolve('تمرين الكرانش تمرين رفع الساقين , تمرين لمس الكعب ,');
                    } else if (lowerQuery.includes('ckon')) {
                    resolve('ali 7wak');
                    } else if (lowerQuery.includes('ماهي افضل تمارين لتقوية عضلات صدر')) {
                    resolve(' تمارين الصدر بالبار (Barbell) أو الدمبل (Dumbbell) - الأوزان الحرة'+'  تمارين العزل (Isolation Exercises) - لتحديد وتشكيل العضلات'+"تمارين وزن الجسم (Bodyweight Exercises) - فعالة في أي مكان");
                    } else if (lowerQuery.includes('ماهي افضل تمارين لتقوية عضلات الظهر')) {
                    resolve('تمارين السحب العمودي'+" تمرين السحب الأمامي للآلة "+" تمارين السحب الأفقي"+ " تمرين التجديف بالدمبل بيد واحدة "+" تمارين أسفل الظهر"+" تمرين الرفعة الميتة"+" تمرين تمديد الظهر");
                    } else if (lowerQuery.includes('ckon')) {
                    resolve('ali 7wak');
                } else if (lowerQuery.includes('الوقت')) {
                    const now = new Date();
                    resolve(`الوقت الحالي هو ${now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}`);
                } else if (lowerQuery.includes('من انت')) {
                    resolve('أنا مساعد افتراضي، تم تطويري بواسطة ايزن سوسكي.');
                } else {
                    resolve('أنا أبحث عن معلومات حول "' + query + '". يرجى الانتظار...');
                }
            }, 1000); 
        });
    }

    sendButton.addEventListener('click', sendQueryToAI);

    userInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendQueryToAI();
        }
    });
});