var btn =document.getElementById('add-book');
const cancelBtn=document.getElementById('cancel');
let myLibrary = [];
const displayDiv=document.getElementById('displayDiv');
btn.addEventListener('click',()=>{
    // document.getElementById('formulaire').style.display='block';
    document.getElementById('formulaire').style.display='grid';
    
})
cancelBtn.addEventListener('click',()=>hide());
function Book(title,author,pages,read){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
}
Book.prototype.showInfo=function(){
    console.log('Book title:'+this.title+'\nBook author:'+this.author+'\nNumber of pages:'+this.pages+'\nRead ?'+this.read)
}
Book.prototype.setRead=function(read){
this.read=read;
}
// Object.setPrototypeOf(Book.prototype,Object.prototype);
const submit =document.getElementById('submit');
submit.addEventListener('click',function(){
    // get the informations from the input
    // createDiv();

    const title=document.getElementById('title').value;
    const author=document.getElementById('author').value;
    const pages=document.getElementById('pages').value;
    const read=document.getElementById('read').value;

    if(title!=='' && author!=='' && pages!==''  ){
    // create new book object with inputs
    const book=new Book(title,author,pages,read);
   
    // add the new book to the array
    myLibrary.push(book);
    
    
    const display=document.createElement('div');
    display.classList.add('display')
    const displayT=document.createElement('li');
    const displayA=document.createElement('li');
    const displayP=document.createElement('li');
    const displayR=document.createElement('li');
    
    // change read button
    const changeBtn=document.createElement('button');
    changeBtn.textContent='Read';
    changeBtn.classList.add('changeBtn');
    changeBtn.setAttribute('id',`${myLibrary.indexOf(book)}`
    )
    // delete book button
    const deleteBtn=document.createElement('button');
    deleteBtn.textContent='X';
    deleteBtn.classList.add('deleteBtn');
   deleteBtn.setAttribute('id',`${myLibrary.indexOf(book)}`)
   
    
    displayT.textContent=book.title;
    displayA.textContent=book.author;
    displayP.textContent=book.pages;
    displayR.textContent=book.read;
    
    display.appendChild(deleteBtn);
    display.appendChild(displayT);
    display.appendChild(displayA);
    display.appendChild(displayP);
    display.appendChild(displayR);
    
    // appending the buttons to the card
    
    display.appendChild(changeBtn);

    displayDiv.appendChild(display);
    // remove book
    deleteBtn.addEventListener('click',function(){
        let result=confirm('you want to delete this book ?');
        if(result){

        
        displayDiv.removeChild(display)
        delete myLibrary[myLibrary.indexOf(book)]}
        // myLibrary.splice(myLibrary.indexOf(book),1);
    }
    )
    // change the read status
    changeBtn.addEventListener('click',function(){
        
    })

    // linking the dom with the array
    
display.dataset.position=myLibrary.indexOf(book);
            
    
   hide();
}
});

function hide(){
    
    document.getElementById('formulaire').style.display='none';
    document.getElementById('formulaire').reset();
}

function createBook(){

   
}