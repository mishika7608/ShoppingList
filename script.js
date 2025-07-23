const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const items = itemList.querySelectorAll('li');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

function displayItems(){
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));
    checkUI();
}

function createIcon(classes){
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

function createButton(classes){
    const button = document.createElement('button')
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

function onAddItemSubmit(e){
    e.preventDefault();
    const newItem =itemInput.value;
    //validate input
    if (newItem === ''){
        alert('Please add an item');
        return ;
    }
    console.log("success");
    addItemToDOM(newItem);
    addItemToStorage(newItem);
    itemInput.value='';
    checkUI();
}

function addItemToDOM(item){
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    console.log(li);

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    itemList.appendChild(li);
}

function addItemToStorage(item){
    let itemsFromStorage;
    if (localStorage.getItem('items')===null){
        itemsFromStorage = [];
    }
    else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    itemsFromStorage.push(item);
    localStorage.setItem('items',JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage(){
    let itemsFromStorage;
    if (localStorage.getItem('items')===null){
        itemsFromStorage = [];
    }
    else{
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage;
}

function onClickItem(e){
    if (e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement);
    }
    else{
        setItemToEdit(e.target);
    }
}

function setItemToEdit(item){
    isEditMode = true;
    itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'));
    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pen></i> Update Item';
    formBtn.style.backgroundColor = '#228B22';
    itemInput.value = item.textContent;
}

function removeItem(item){
        if (confirm('Are you sure?')){
            //Remove Item from DOM
            item.remove();
            //Remove item from storage
            removeItemFromStorage(item.textContent)
            checkUI();
        }
    
}

function removeItemFromStorage(item){
    let itemsFromStorage = getItemsFromStorage();

    //filter out items to be removed
    itemsFromStorage = itemsFromStorage.filter((i)=> i !== item);

    //Reset to local storage
    localStorage.setItem('items',JSON.stringify(itemsFromStorage));
}

function clearItems(){
    while (itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
    //clear from localStorage
    localStorage.removeItem('items');
    checkUI();
}

function filterItems(e){
    const text = e.target.value.toLowerCase();
    const items = itemList.querySelectorAll('li');
    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if (itemName.indexOf(text) != -1){ 
            item.style.display = 'flex';
        }
        else{
            item.style.display = 'none';
        }
    });
    console.log(text);
}

function checkUI(){
    const items = itemList.querySelectorAll('li'); 
    if (items.length === 0){
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    }
    else{
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}

//Initialize app
function init(){
    //Event Listener
    itemForm.addEventListener('submit',onAddItemSubmit);
    itemList.addEventListener('click',onClickItem)
    clearBtn.addEventListener('click',clearItems)
    itemFilter.addEventListener('input',filterItems)
    document.addEventListener('DOMContentLoaded',displayItems)
    checkUI();
}

init();