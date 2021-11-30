
function setup(){

  let globalDict = {}

  // get key/value pairs from storage and store in globalDict
  chrome.storage.sync.get(function(result) {
    globalDict = result;
  });

  if(!globalDict){
    return
  }
  console.log("setup: " + globalDict);

  walk(document.body, globalDict);
}

// Function to traverse DOM and grab nodetype 3 elements.
// https://stackoverflow.com/questions/5904914/javascript-regex-to-replace-text-not-in-html-attributes/5904945#5904945
function walk(node, globalDict){

	let child, next;

	switch ( node.nodeType )
	{
		case 1:
		case 9:
		case 11:
			child = node.firstChild;
			while ( child )
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3:
			handleText(node, globalDict);
			break;
	}
}

// Handles text replacement
function handleText(textNode, globalDict){

	let v = textNode.nodeValue;

  console.log(globalDict);
  for (const [key, value] of Object.entries(globalDict)) {
    let replace = key;
    let re = new RegExp(replace, "g");
    v = v.replace(re, value);
    textNode.nodeValue = v;
  }

}

// runs on document end
setup();
