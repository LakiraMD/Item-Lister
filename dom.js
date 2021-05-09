var addForm = document.getElementById('addForm');
var itemlist = document.getElementById('items');
var filter = document.getElementById('filter');


//from submit event
addForm.addEventListener('submit', addItem);
//delete ivent
itemlist.addEventListener('click', removeItem);
//filter event
filter.addEventListener('keyup', filterItems);



//add item
function addItem(e){
    e.preventDefault();

    //get input value
    var newItem = document.getElementById('item').value;

    //create new li element
    var li = document.createElement('li');
    //add class
    li.className = 'list-group-item';
    //add text node with input value
    li.append(document.createTextNode(newItem));
    
    
    //create delete btn element
    var deleteBtn = document.createElement('button');
    //add classes to del btn
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    //append text node 
    deleteBtn.appendChild(document.createTextNode('x'))

    //append btn to li
    li.appendChild(deleteBtn)

    //append li to list
    itemlist.appendChild(li);


    //Save items to local storage
    saveLocalItems(itemlist.value);

    //clear input 
    var item = document.getElementById('item').value = "";


    
}
//save item to local storage
function saveLocalItems(item) {
    let items;
    if (localStorage.getItem('items') === null) {
      items = [];
    } else {
      items = JSON.parse(localStorage.getItem('items'));
    }
  
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));

    console.log(item);
  }

function getItems() {
  let items;
  if (localStorage.getItem('items') === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem('items'));
  }
  items.forEach((item) => {
    // Create LI
    const newItem = document.createElement('li');
    newItem.innerHTML = `<span>${item}</span><button class="btn btn-danger"><i class="fas fa-trash"></i></button>`;
    newItem.classList.add('list-group-item');
    itemList.appendChild(newItem);
  });

  
}

//delete item
function removeItem(e){
    if(e.target.classList.contains('delete')){
      if(confirm('Are You Sure?')){
        var li = e.target.parentElement;
        itemlist.removeChild(li);

        
      }  
    }
}
//filter item
function filterItems(e){
    
    var text = e.target.value;
    //get lis
    var items = itemlist.getElementsByTagName('li');

    //convert to an array
    Array.from(items).forEach(function(item){
        var itemName = item.firstChild.textContent;
        if(itemName.toLowerCase().indexOf(text) != -1)
        {
            item.style.display = 'block';
        }
        else
        {
            item.style.display = 'none';
        }
    })
}