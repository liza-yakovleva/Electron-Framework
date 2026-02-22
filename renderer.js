const fs = require('fs');
const path = require('path');

document.getElementById('surveyForm').addEventListener('submit', (e) => {
    e.preventDefault();

    // 1. Збір даних
    const name = document.getElementById('txtName').value;
    const age = document.getElementById('numAge').value;
    const source = document.getElementById('cmbSource').value;
    const rating = document.querySelector('input[name="rating"]:checked').value;
    
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const modules = Array.from(checkboxes).map(cb => cb.value).join(', ') || 'Не обрано';
    
    const comments = document.getElementById('txtComments').value;

    // 2. Формування звіту
    const report = `=== ELECTRON REPORT (${new Date().toLocaleString()}) ===\n` +
                   `Ім'я: ${name}\nВік: ${age}\nДжерело: ${source}\n` +
                   `Оцінка: ${rating}\nМодулі: ${modules}\nВідгук: ${comments}\n` +
                   `------------------------------------------\n`;

    // 3. Запис у файл на диск
    const filePath = path.join(__dirname, 'survey_electron.txt');
    
    fs.appendFile(filePath, report, (err) => {
        if (err) {
            alert('Помилка запису: ' + err.message);
        } else {
            alert('Дані успішно збережено в ' + filePath);
            document.getElementById('surveyForm').reset();
        }
    });
});