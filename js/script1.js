document.addEventListener('DOMContentLoaded', () => {
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('result');

    // دالة لمسح فئات النتائج السابقة
    const clearResultClasses = () => {
        resultDiv.className = 'result'; // إعادة تعيين الفئة الأساسية
        resultDiv.classList.remove('visible'); // إخفاء النتيجة
    };

    calculateBtn.addEventListener('click', () => {
        clearResultClasses(); // مسح النتائج والفئات السابقة قبل الحساب
        resultDiv.innerHTML = '... جاري الحساب ...'; // رسالة تحميل
        resultDiv.classList.add('visible'); // إظهار رسالة التحميل

        // تأخير بسيط لمحاكاة "التحميل" وجعلها أكثر تفاعلية
        setTimeout(() => {
            const heightCm = parseFloat(heightInput.value);
            const weightKg = parseFloat(weightInput.value);

            // التحقق من صحة المدخلات
            if (isNaN(heightCm) || heightCm <= 0 || isNaN(weightKg) || weightKg <= 0) {
                resultDiv.innerHTML = "<span>خطأ:</span> <br> الرجاء إدخال قيم صحيحة وموجبة للطول والوزن.";
                resultDiv.className = 'result'; // إعادة تعيين الفئات
                resultDiv.classList.add('overweight', 'visible'); // استخدام لون تحذيري
                return;
            }

            // تحويل الطول من سنتيمتر إلى متر
            const heightMeters = heightCm / 100;

            // حساب مؤشر كتلة الجسم (BMI)
            const bmi = weightKg / (heightMeters * heightMeters);
            const roundedBmi = bmi.toFixed(2); // تقريب الرقم إلى منزلتين عشريتين

            let category = '';
            let message = '';
            let className = ''; // الفئة لـ CSS

            if (bmi < 18.5) {
                category = 'نقص في الوزن';
                message = 'أنت تعاني من نقص في الوزن.';
                className = 'underweight';
            } else if (bmi >= 18.5 && bmi < 25) {
                category = 'وزن طبيعي وصحي';
                message = 'تهانينا! وزنك طبيعي وصحي.';
                className = 'normal';
            } else if (bmi >= 25 && bmi < 30) {
                category = 'زيادة في الوزن';
                message = 'أنت تعاني من زيادة في الوزن.';
                className = 'overweight';
            } else { // bmi >= 30
                category = 'سمنة';
                // بناءً على طلبك السابق، يمكن استخدام "مريض" ولكن "سمنة" أكثر دقة وشيوعًا في هذا السياق
                message = 'أنت تعاني من السمنة. يرجى استشارة أخصائي صحي.';
                className = 'obese';
            }

            // عرض النتائج
            resultDiv.innerHTML = `
                <span>مؤشر كتلة الجسم (BMI): <span class="bmi-value">${roundedBmi}</span></span>
                <span>التصنيف: ${category}</span>
                <span>${message}</span>
            `;
            resultDiv.className = `result ${className} visible`; // إضافة الفئة لتغيير اللون وإظهار النتيجة

            // تفريغ حقول الإدخال لجعلها جاهزة لإدخال جديد
            heightInput.value = '';
            weightInput.value = '';

            // إعادة التركيز على حقل الطول لسهولة الاستخدام
            heightInput.focus();

        }, 500); // تأخير 500 ملي ثانية (نصف ثانية)
    });
});