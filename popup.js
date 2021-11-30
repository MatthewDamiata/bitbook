function store(name, address) {
    const addrVal = address.value.toString();
    const nameVal = name.value.toString();

    if(!nameVal || !addrVal){
      const errors = document.getElementById("errors");
      errors.innerHTML = "blank field"
      return
    }

    let keyValuePair = {};
    keyValuePair[addrVal] = nameVal;
    chrome.storage.sync.set(keyValuePair, function() {
      console.log('[bitbook] Stored: ' + addrVal + " --> " + nameVal);
    });
}

function addSubmitListener(){
  document.getElementById('submit').addEventListener('click',
    function() {
      let nameElm = document.getElementById('name');
      let addrElm = document.getElementById('address');
      store(nameElm, addrElm);
  });
}

function getMappings(){
  let ul = document.getElementById("mappings");

  chrome.storage.sync.get(null, function(result) {
    Object.entries(result).forEach(([key, value]) => {
      let li = document.createElement('li');
      li.appendChild(document.createTextNode(key + " -> " + value));
      ul.appendChild(li);
    });
  });
}

function setup() {
  addSubmitListener();
  getMappings();
}

document.addEventListener('DOMContentLoaded', setup, false);
