const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

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

    itemList.appendChild(li);
    itemInput.value='';
}



//Event Listener
itemForm.addEventListener('submit',addItem);