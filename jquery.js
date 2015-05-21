function $$(identifierString, parent){
  var methodHolder = {};
  methodHolder.style = function(attribute,value){
    if (this.elements.length){
      for (var i = 0; i < this.elements.length; i++){
        this.elements[i].style[attribute] = value;
      }
    }
    else this.elements.style[attribute] = value;

    return this;
  };

  methodHolder.html = function(DOMString){
    if (this.elements.length){
      for(var i= 0; i < this.elements.length; i++){
        this.elements[i].innerHTML = DOMString;
      }
    }
    else this.innerHTML = DOMString;
    return this;
  };

  methodHolder.get = function(location, callback){
    var request = new XMLHttpRequest();
    request.open('GET',location,true);
    request.send(null);
    request.onreadystatechange = function(){
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        callback(request);
      } else {
        console.log('nuh uh');
      }
    }
  };
  return this;
  };

  var that = Object.create(methodHolder);
  var cleanIdentifier = identifierString.trim();
  var identifierArray = cleanIdentifier.split(' ');
  var target = parent || document;

  if (cleanIdentifier[0] === '#'){
    that.elements = [].slice.call(document.getElementById(identifierArray[0].slice(1)));
  }
  if (cleanIdentifier[0] === '.'){
    that.elements = [].slice.call(target.getElementsByClassName(identifierArray[0].slice(1)));
  }
  else that.elements = target.getElementsByTagName(identifierArray[0]);

  if (identifierArray.slice(1).length) that = $$(identifierArray.slice(1).join(' '),that);
  return that;
}
