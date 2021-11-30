document.addEventListener('DOMContentLoaded', handleClick, false);

function store(name, address) {
    const addrVal = address.value.toString();
    const nameVal = name.value.toString();
    let keyValuePair = {};
    keyValuePair[addrVal] = nameVal;
    chrome.storage.sync.set(keyValuePair, function() {
      console.log('[BitBook] Stored: ' + addrVal + " --> " + nameVal);
    });
}

function handleClick() {
  document.getElementById('submit').addEventListener('click',
    function() {
      let nameElm = document.getElementById('name');
      let addrElm = document.getElementById('address');
      store(nameElm, addrElm);
  });

}
