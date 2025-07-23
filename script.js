const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');

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

function addItem(e){
    e.preventDefault();
    const newItem =itemInput.value;
    //validate input
    if (newItem === ''){
        alert('Please add an item');
        return ;
    }
    console.log("success");
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));
    console.log(li);

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    itemList.appendChild(li);
    itemInput.value='';
}

function removeItem(e){
    if (e.target.parentElement.classList.contains('remove-item')){
        e.target.parentElement.parentElement.remove();
    }
}

function clearItems(){
    while (itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
}

//Event Listener
itemForm.addEventListener('submit',addItem);
itemList.addEventListener('click',removeItem)
clearBtn.addEventListener('click',clearItems)