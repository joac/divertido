var data = {"name":"App","tag":"div","parent":null,"children":[{"name":"App-child-1","tag":"h1","parent":null,"children":[]},{"name":"App-child-2","tag":"div","parent":null,"children":[]},{"name":"Tags-child-1","tag":"div","parent":null,"children":[]},{"name":"App-child-3","tag":"div","parent":null,"children":[]},{"name":"Workspace-child-1","tag":"div","parent":null,"children":[]},{"name":"Element-child-1","tag":"div","parent":null,"children":[]},{"name":"Element-child-2","tag":"div","parent":null,"children":[]},{"name":"App-child-4","tag":"div","parent":null,"children":[]},{"name":"Output-child-1","tag":"textarea","parent":null,"children":[]}]};

all = [];

function traverse(element) {
    for (var i=0, l=element.children.length; i<l; i++) {
        traverse(element.children[i]);
    }
    all.push(element.name);
}

traverse(data);

console.log(all);
