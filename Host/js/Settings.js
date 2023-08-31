document.addEventListener('DOMContentLoaded', function() {
    const editButton = document.getElementById('editButton');
    const saveButton = document.getElementById('saveButton');
    const paragraphs = document.querySelectorAll('.settings p.value');
    const inputs = document.querySelectorAll('.settings input.edit-input');
    const saveButtonContainer = document.querySelector('.save-btn');
    
    saveButtonContainer.style.display = 'none'; // Hide the "Enviar" button initially
    
    editButton.addEventListener('click', function() {
        document.body.classList.add('edit-mode');
        
        paragraphs.forEach(p => p.style.display = 'none');
        inputs.forEach(input => input.style.display = 'block');
        
        editButton.style.display = 'none';
        saveButtonContainer.style.display = 'block'; // Show the "Enviar" button when in edit mode
    });
    
    saveButton.addEventListener('click', function() {
        document.body.classList.remove('edit-mode');
        
        paragraphs.forEach((p, i) => {
            p.textContent = inputs[i].value;
            p.style.display = 'block';
        });
        inputs.forEach(input => input.style.display = 'none');
        
        editButton.style.display = 'block';
        saveButtonContainer.style.display = 'none'; // Hide the "Enviar" button when changes are saved
    });
});
