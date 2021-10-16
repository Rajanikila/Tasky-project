//parent element to store cards
const taskContainer = document.querySelector(".task__container");


//Global store
let globalStore =[];

console.log(taskContainer);
const newCard = ({id,imageUrl,taskTitle,taskDescription,taskType}) => `<div class="col-md-6 col-lg-4" id=${id}>
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" id=${id} class="btn btn-outline-success">
    <i class="fas fa-pencil-alt" id=${id} onclick = "editCard.apply(this,arguments)"></i></button>
    <button type="button" id=${id} class="btn btn-outline-danger" onclick = "deleteCard.apply(this,arguments)" >
    <i class="fas fa-trash-alt" id=${id} onclick = "deleteCard.apply(this,arguments)" ></i></button>

  </div>
  <img src=${imageUrl}
  class="card-img-top rounded" alt="image">
  <div class="card-body">
    <h5 class="card-title">${taskTitle}</h5>
    <p class="card-text">${taskDescription}</p>
    <span class="badge bg-primary">${taskType}</span>
  </div>
  <div class="card-footer text-muted">
    <button type="button" id=${id}  class="btn btn-outline-primary float-end">Open Task</button>

  </div>
</div>
</div>`;
const loadInitialTaskCards = () => {
 
  // access localStorage
  const getInitialData = (localStorage.tasky);
  if(!getInitialData) return;

  // convert stringified-object to object(normal)
 const { cards } = JSON.parse(getInitialData);
 cards.map((card) => {
  const createNewCard= newCard(card);
  taskContainer.insertAdjacentHTML("beforeend",createNewCard);
  globalStore.push(card);

 });

 //map around the array to generate HTML Card and inject it to DOM


}

const updateLocalStorage = () =>      
 localStorage.setItem("tasky", JSON.stringify({cards:globalStore}));


const saveChanges = () => {
    const taskData = {
        id:`${Date.now()}`,  //unique number for card id number  
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskDescription: document.getElementById("taskdescription").value,
        taskType: document.getElementById("tasktype").value,

    };
    const createNewCard = newCard(taskData);
    taskContainer.insertAdjacentHTML("beforeend",createNewCard);
      globalStore.push(taskData);
    
      updateLocalStorage();

  };
  const deleteCard = (event)  => {
    // id
   event = window.event;
   const targetID = event.target.id;
   const tagname = event.target.tagName; //BUTTON

    //search the globalcard,remove the object which matches with id
    const newUpdatedArray = globalStore.filter(  (cardObject) => cardObject.id !== targetID);
    updateLocalStorage();       
    
    //Access DOM to remove them
    if(tagname === "BUTTON"){
       return taskContainer.removeChild(
        event.target.parentNode.parentNode.parentNode
    );
    }
    return taskContainer.removeChild(
      event.target.parentNode.parentNode.parentNode.parentNode
    );

    
 };
      //content-editable
      const editCard = (event) => {
        event = window.event;
        const targetID = event.target.id;
        const tagname = event.target.tagName; 
      
        let parentElement;
      
        if (tagname === "BUTTON"){
           parentElement = event.target.parentNode.parentNode;
        }  else {
           parentElement = event.target.parentNode.parentNode.parentNode;
       }
       
       let taskTitle = parentElement.childNodes[5].childNodes[1];
       let taskDescription = parentElement.childNodes[5].childNodes[3];
       let taskType = parentElement.childNodes[5].childNodes[5];
       let submitButton = parentElement.childNodes[7].childNodes[1];
      
       taskTitle.setAttribute("contenteditable", "true");
       taskDescription.setAttribute("contenteditable", "true");
       taskType.setAttribute("contenteditable","true");
       submitButton.setAttribute(
         "onclick",
         "saveEditChanges.apply(this,arguments)"
         );
       submitButton.innerHTML= "save Changes";
      
         
       };
       const saveEditChanges = (event) => {
        event = window.event;
        const targetID = event.target.id;
        const tagname = event.target.tagName; 
      
        let parentElement;
      
        if (tagname === "BUTTON"){
           parentElement = event.target.parentNode.parentNode;
        }  else {
           parentElement = event.target.parentNode.parentNode.parentNode;
       }
       
       let taskTitle = parentElement.childNodes[5].childNodes[1];
       let taskDescription = parentElement.childNodes[5].childNodes[3];
       let taskType = parentElement.childNodes[5].childNodes[5];
       let submitButton = parentElement.childNodes[7].childNodes[1];
        
       const updatedData = {
         taskTitle: taskTitle.innerHTML,
         taskType: taskType.innerHTML,
         taskDescription: taskDescription.innerHTML,

       };
         globalStore = globalStore.map((task) => {
           if (task.id === targetID){
            return {
              id:task.id,  //unique number for card id number  
              imageUrl: task.imageUrl,
              taakTitle: updatedData.taskTitle,
              taskType: updatedData.taskType,
              taskDescription: updatedData.taskDescription,      
              
            }
           }
           return task;
         });
          updateLocalStorage();

          taskTitle.setAttribute("contenteditable", "false");
          taskDescription.setAttribute("contenteditable", "false");
          taskType.setAttribute("contenteditable","false");
          submitButton.removeAttribute("onclick");
          submitButton.innerHTML= "Open Task";
   
       };
      

 