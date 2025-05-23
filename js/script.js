document.addEventListener('DOMContentLoaded', () => {
    // الانتقال السلس عند النقر على روابط التنقل
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // منع السلوك الافتراضي للرابط

            const targetId = this.getAttribute('href');
            // إغلاق قائمة الهامبرغر بعد النقر على الرابط (على الجوال)
            const navLinks = document.querySelector('.nav-links');
            const burgerMenu = document.querySelector('.burger-menu');
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                burgerMenu.classList.remove('toggle');
                // إعادة تعيين أنيميشن العناصر بعد الإغلاق
                document.querySelectorAll('.nav-links li').forEach(item => {
                    item.style.animation = '';
                });
            }

            // التمرير السلس إلى القسم المستهدف
            // إزالة "#" من بداية الـ ID
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // زر "ابدأ التحدي الآن!" ينقل المستخدم إلى قسم التمارين
    const exploreWorkoutsBtn = document.getElementById('exploreWorkouts');
    if (exploreWorkoutsBtn) {
        exploreWorkoutsBtn.addEventListener('click', () => {
            const workoutsSection = document.getElementById('workouts');
            if (workoutsSection) {
                workoutsSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    // وظيفة عرض/إخفاء المودال (النافذة المنبثقة) لتفاصيل التمرين
    const workoutModal = document.getElementById('workoutModal');
    const closeButton = document.querySelector('.modal .close-button'); // تحديد أكثر دقة للزر
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalDuration = document.getElementById('modalDuration');
    const modalLevel = document.getElementById('modalLevel');

    document.querySelectorAll('.view-details-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.workout-card');
            if (card) {
                const title = card.querySelector('h3').textContent;
                const description = card.querySelector('p').textContent;
                // تعديل استخراج النصوص ليتناسب مع هيكل الـ HTML الجديد
                const durationText = card.querySelector('.workout-meta span:nth-child(1)').textContent;
                const levelText = card.querySelector('.workout-meta span:nth-child(2)').textContent;

                // استخراج القيمة النظيفة (مثال: "45 دقيقة" بدلاً من "<i></i> 45 دقيقة")
                const duration = durationText.replace(/.*?(\d+\s*دقيقة)/, '$1'); // يأخذ الرقم والوحدة
                const level = levelText.replace(/.*?(\S+:\s*\S+)/, '$1'); // يأخذ "مستوى: مبتدئ"

                modalTitle.textContent = title;
                modalDescription.textContent = description;
                modalDuration.textContent = duration;
                modalLevel.textContent = level;

                workoutModal.classList.add('show-modal'); // استخدام فئة لإظهار المودال مع أنيميشن
            }
        });
    });

    closeButton.addEventListener('click', () => {
        workoutModal.classList.remove('show-modal'); // إخفاء المودال
    });

    // إغلاق المودال عند النقر خارج المحتوى
    window.addEventListener('click', (event) => {
        if (event.target == workoutModal) {
            workoutModal.classList.remove('show-modal'); // إخفاء المودال
        }
    });

    // وظيفة تصفية التمارين
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workoutCards = document.querySelectorAll('.workout-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            workoutCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex'; // استخدام 'flex' للحفاظ على تخطيط البطاقة
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });


    // --- وظيفة قائمة الهامبرغر ---
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');

    burgerMenu.addEventListener('click', () => {
        // تبديل فئة 'nav-active' لفتح/إغلاق القائمة
        navLinks.classList.toggle('nav-active');

        // أنيميشن ظهور عناصر القائمة (تتتالي)
        navItems.forEach((item, index) => {
            if (item.style.animation) { // إذا كان هناك أنيميشن مطبق، أزله
                item.style.animation = '';
            } else { // وإلا، أضف أنيميشن الظهور
                // تأكد من أن الاتجاه في أنيميشن CSS مناسب لـ RTL
                item.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // أنيميشن تحويل زر الهامبرغر إلى X
        burgerMenu.classList.toggle('toggle');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // الانتقال السلس عند النقر على روابط التنقل
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // زر "ابدأ التحدي الآن!" ينقل المستخدم إلى قسم التمارين
    const exploreWorkoutsBtn = document.getElementById('exploreWorkouts');
    if (exploreWorkoutsBtn) {
        exploreWorkoutsBtn.addEventListener('click', () => {
            document.getElementById('workouts').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // وظيفة عرض/إخفاء المودال (النافذة المنبثقة) لتفاصيل التمرين
    const workoutModal = document.getElementById('workoutModal');
    const closeButton = document.querySelector('.close-button');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalDuration = document.getElementById('modalDuration');
    const modalLevel = document.getElementById('modalLevel');

    document.querySelectorAll('.view-details-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.workout-card');
            const title = card.querySelector('h3').textContent;
            const description = card.querySelector('p').textContent;
            const duration = card.querySelector('.workout-meta span:nth-child(1)').textContent.replace(' 45 دقيقة', ''); // استخراج فقط الرقم
            const level = card.querySelector('.workout-meta span:nth-child(2)').textContent.replace(' مستوى: ', ''); // استخراج فقط النص

            modalTitle.textContent = title;
            modalDescription.textContent = description;
            modalDuration.textContent = duration;
            modalLevel.textContent = level;
            workoutModal.style.display = 'flex'; // استخدام flex لإظهار المودال وتوسيعه
        });
    });

    closeButton.addEventListener('click', () => {
        workoutModal.style.display = 'none';
    });

    // إغلاق المودال عند النقر خارج المحتوى
    window.addEventListener('click', (event) => {
        if (event.target == workoutModal) {
            workoutModal.style.display = 'none';
        }
    });

    // وظيفة تصفية التمارين
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workoutCards = document.querySelectorAll('.workout-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // إزالة فئة 'active' من جميع الأزرار وإضافتها للزر الحالي
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            workoutCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block'; // إظهار البطاقة
                } else {
                    card.style.display = 'none'; // إخفاء البطاقة
                }
            });
        });
    });
});


const menu = document.getElementById("menu")
const action = document.getElementById("actions")

menu.addEventListener("click", ()=>{
    hundleMenu();
})

function hundleMenu(){
menu.classList.toggle("is-active");
action.classList.toggle("is-active");
}




