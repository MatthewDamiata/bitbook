// Handles text replacement
function handleText(nodeList){
  chrome.storage.sync.get(null, function(result) {
    nodeList.forEach((node) => {
      let v = node.nodeValue;
      if(v in result){
        let re = new RegExp(v, "g");
        v = v.replace(re, "[bitbook: " + result[v] + "] " + v);
        node.nodeValue = v;
      }
    });
  });

}

// Function to traverse DOM and grab nodetype 3 elements.
// https://stackoverflow.com/questions/5904914/javascript-regex-to-replace-text-not-in-html-attributes/5904945#5904945
function walk(node, nodeList){

	let child, next;

	switch(node.nodeType){
		case 1:
		case 9:
		case 11:
			child = node.firstChild;
			while(child){
				next = child.nextSibling;
				walk(child, nodeList);
				child = next;
			}
			break;

		case 3:
			nodeList.push(node);
			break;
	}

}

function setup(){

  let nodeList = [];

  walk(document.body, nodeList);

  handleText(nodeList)
}

// runs on document end
setup();
