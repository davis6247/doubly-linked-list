const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = new Node();
        this._tail = new Node();
        this.length = 0;
    }

    append(data) {              //add new data to the end of list, if list is empty asign tail and head to a new Node
        if(this.isEmpty()){
            var newNode = new Node();

            newNode.data = data;
            this._head = this._tail = newNode;            
        }
        else{ var newNode = new Node();
            newNode.data = data;
            newNode.next = this._tail;
            this._tail.prev = newNode;
            this._tail = newNode;            
        }
        this.length++;   
        
        return this;
    }

    head() {            //return data from the this.head
        return this._head.data;
    }

    tail() {            //return data from the this.tail
        return this._tail.data;  
    }

    at(index) {         //return Node.data by index
        if(this.isEmpty()) return this;

        var i = 0;
        var currentNode = this._head;

        while(currentNode != null){
            if(i == index) return currentNode.data;
            i++;
            currentNode = currentNode.prev;
        }
        return null;
    }

    insertAt(index, data) {     //insert data by index
        if(this.isEmpty()){ this.append(data); return this;}
        
        var currentNode = this._head;
        var temp = null;
        var i = 0;
        var newNode = new Node;
        newNode.data = data;

        while(currentNode != null){
            if(i == index) break;
            i++;
            currentNode = currentNode.prev;
        }

        if(currentNode.prev == null){    //insertion insted last Node
            newNode.next = currentNode.next;
            currentNode.next.prev = newNode;
            currentNode.next = newNode;
            newNode.prev = currentNode;
        }
        else if(currentNode.next == null){      //insertion at the beggining
            currentNode.next = newNode;
            newNode.prev = currentNode;
            this._head = newNode;
        }else {  
            newNode.next = currentNode.next;
            newNode.prev = currentNode;
            currentNode.next.prev = newNode;
            currentNode.next = newNode;           
        }
        this.length++; 

        return this;
    }

    isEmpty() {     //check if list is empty
        return this.length == 0;
    }

    clear() {       //clear the list
        this._tail.prev = this._tail.next = this._tail.data = 
        this._head.prev = this._head.next = this._head.data = null;        
        this.length = 0;

        return this;
    }

    deleteAt(index) {
        if(this.length == 0) return this;
        else if(this.length == 1) {this.clear(); return this; }

        if(index == 0)this._head = this._head.prev;     //deleting at first index
        else if(index == this.length) this._tail = this._tail.next;     //deleting at last index
        else{
            var i = 0;
            var currentNode = this._head;        

            while(currentNode != null){
                if(i == index) break;
                i++;
                currentNode = currentNode.prev;
            }

            currentNode.next.prev = currentNode.prev;
            currentNode.prev.next = currentNode.next;
        
            currentNode = null;
            this.length--;
        }
        return this;
    }

    reverse() {
        var temp;
        var headNode = this._head;
        var tailNode = this._tail;
        var i = 0, i_end = this.length - 1;
        while(i++ < i_end--){
            temp = headNode.data;
            headNode.data = tailNode.data;
            tailNode.data = temp;
            headNode = headNode.prev;
            tailNode = tailNode.next;
        }
        return this;        
    }

    indexOf(data) {
        var i = 0;
        var currentNode = this._head;

        while(currentNode != null){
            if(currentNode.data == data) return i;
            i++;
            currentNode = currentNode.prev;
        }
        return -1;
    }
}

module.exports = LinkedList;
