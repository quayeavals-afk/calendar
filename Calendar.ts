// Ждем загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
    const currentDate: Date = new Date(); // Текущая дата
    let thisYear = currentDate.getFullYear(); // Текущий год
    let thisMonth = currentDate.getMonth(); // Текущий месяц (0-11)
    monthloader(thisYear, thisMonth); // Загружаем календарь для текущего месяца и года


    const leftButton = document.querySelector('.block .left') as HTMLButtonElement;
    const rightButton = document.querySelector('.block .right') as HTMLButtonElement;

    leftButton.addEventListener('click', () => {
        const days = document.querySelector('.block .content .days');
        if (days) {
            days.innerHTML = ''; // Очищаем контейнер с днями перед загрузкой нового месяца
        }
        if (thisMonth === 0) {
            monthloader(thisYear - 1, 11); // Показать декабрь предыдущего года
            thisYear--; // Обновляем текущий год
            thisMonth = 11; // Обновляем текущий месяц на декабрь
        } else {
            monthloader(thisYear, thisMonth - 1); // Показать предыдущий месяц
            thisMonth--; // Обновляем текущий месяц
        }
    });

    rightButton.addEventListener('click', () => {
        const days = document.querySelector('.block .content .days');
        if (days) {
            days.innerHTML = ''; // Очищаем контейнер с днями перед загрузкой нового месяца
        }
        if (thisMonth === 11) {
            monthloader(thisYear + 1, 0); // Показать январь следующего года
            thisYear++; // Обновляем текущий год
            thisMonth = 0; // Обновляем текущий месяц на январь
        } else {
            monthloader(thisYear, thisMonth + 1); // Показать следующий месяц
            thisMonth++; // Обновляем текущий месяц
        }
    });
    
});




function monthloader(thisYear: number, thisMonth: number): void {

    const months =['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
                     'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const month = document.querySelector ('.header h2');
    const year = document.querySelector ('.header h1');
    if (month) {
        month.textContent = `${months[thisMonth]}`; // Текущий месяц
    }
    if (year) {
        year.textContent = `${thisYear}`;
    }

    
    // Функция для получения количества дней в месяце
    const getDaysInMonth = (year: number, month: number): number => {
        // month: 0-11, где 0 - январь
        // month + 1 - следующий месяц, день 0 - последний день текущего месяца
        return new Date(year, month + 1, 0).getDate();
    };  

    // Функция для получения дня недели первого дня месяца
    const getFirstDayOfMonth = (year: number, month: number): number => {
        // Создаем дату первого дня месяца
        const firstDay = new Date(year, month, 1);
        // getDay() возвращает день недели (0-6)
        // 0 - воскресенье, 1 - понедельник, ..., 6 - суббота
        return firstDay.getDay();
    }

    const currentDate: Date = new Date(); // Текущая дата
    const firstDayOfMonth = getFirstDayOfMonth(thisYear, thisMonth); // день недели первого дня месяца
    const daysInMonth = getDaysInMonth(thisYear, thisMonth); // количество дней в месяце

    const day = document.querySelectorAll('.block .content .days button') as NodeListOf<HTMLButtonElement>;
    day.forEach((button: HTMLButtonElement) => {
        if (button.textContent === `${currentDate.getDate()}`) {
            button.textContent = 'gjgfj';
            button.style.backgroundColor = 'red';
        }
    });


    


    const days = document.querySelector('.block .content .days');
    // исключение для первого дня месяца, если он приходится на воскресенье (0),
    if (firstDayOfMonth == 0) {
        for (let i = 0; i < 6; i++) {
            const emptyButton = document.createElement('button');
            emptyButton.className = 'empty';
            emptyButton.textContent = ''; // пустой текст
            days?.appendChild(emptyButton);
        }
        const emptyButton = document.createElement('button');
        emptyButton.textContent = '1'; // пустой текст
        emptyButton.className = 'current_day';
        days?.appendChild(emptyButton);
        for (let i = 2; i <= daysInMonth; i++) {
            const dayButton = document.createElement('button');
            dayButton.textContent = i.toString();
            days?.appendChild(dayButton);
        }
    // остальные случаи, когда первый день месяца приходится на понедельник (1) - субботу (6)
   }else {
        for(let i = 0; i < firstDayOfMonth -1; i++) {
            const emptyButton = document.createElement('button');
            emptyButton.className = 'empty';
            emptyButton.textContent = ''; // пустой текст
            days?.appendChild(emptyButton);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            const dayButton = document.createElement('button');
            dayButton.className = 'current_day';
            dayButton.textContent = i.toString();
            days?.appendChild(dayButton);
        }
    }


}

