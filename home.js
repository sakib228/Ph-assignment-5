// console.log("hello world")
// const htmlElement = (arr) => {
//   const element = arr.map((data) => `<span> ${data}</span>`);
//   return(element.join(" "));
// };
// load data function ---
const allDataIssue = () => {
  fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then((res) => res.json())
    .then((data) => {
      allIssue = data.data;
      allDataDisplay(allIssue);
      updateCount(allIssue);
    });
};
// display data function ---
const allDataDisplay = (details) => {
  // console.log(details);
  // get main section container ---
  const mainContainer = document.getElementById('main_container');
  // empty the main container  ---
  mainContainer.innerHTML = '';
  // create card elements --- with for loop
  for (const detail of details) {
    // console.log(detail.id)
    // console.log(detail); ---
    const div = document.createElement('div');
    div.innerHTML = `
    <div onclick="loadDataDetails(${detail.id})" class="p-8 space-y-8 max-w-md bg-[white] rounded-2xl h-full ${getBorderColor(detail.status)} grow flex-col" >
        <div class="flex justify-between">
          <img src="./assets/Open-Status.png" alt="png" />
          <span class=" px-6 py-1 rounded-xl ${getPriority(detail.priority)} ">
            ${detail.priority}
          </span>
        </div>
        <div class="space-y-3">
          <h1 class="text-xl font-bold">
            ${detail.title}
          </h1>
          <p class="text-[#17174aaa]">
            ${detail.description}
          </p>
        </div>
       <div class=" flex flex-wrap gap-2 mt-auto md:flex-row lg:flex-col ">
       <button class="btn flex items-center gap-1 bg-red-300 px-3 py-0.5 rounded-xl outline-1">
         <i class="fa-solid fa-bug text-red-600"></i>
           <span>${detail.labels[0]}</span>
         </button>

       <button class="btn flex items-center gap-1 bg-amber-200 px-3 py-0.5      rounded-xl outline-1 ">
         <i class="fa-brands fa-slack text-yellow-600"></i>
         <span>${detail.labels[1]}</span>
       </button>
     </div>
        <span class="flex grow border-b-2 text-slate-300"></span>
        <div class="text-[#000000a8] font-semibold">
          <p>${detail.author}</p>
          <p>${detail.createdAt} </p>
          <p>${detail.updatedAt} </p>
        </div>
      </div>
    `;
    mainContainer.appendChild(div);
  }
};

// color priority function ---------------------------
function getPriority(priority) {
  if (priority === 'high') {
    return 'bg-red-300 text-red-600';
  }
  if (priority === 'medium') {
    return 'bg-yellow-300 text-yellow-600';
  }
  if (priority === 'low') {
    return ' bg-gray-300 text-gray-600';
  }
}
// count function  ---
function updateCount(data) {
  const count = document.getElementById('countCard');
  const countData = (count.innerText = data.length);
  console.log(countData);
}

// allButton -------------------------------
document.getElementById('allBtn').addEventListener('click', function () {
  removeActive();
  this.classList.add('active_btn');
  allDataDisplay(allIssue);
  updateCount(allIssue);
});
// openButton
document.getElementById('openBtn').addEventListener('click', function () {
  removeActive();
  this.classList.add('active_btn');
  const openButton = allIssue.filter((data) => data.status === 'open');
  allDataDisplay(openButton);
  updateCount(openButton);
});

//closedButton
document.getElementById('closedBtn').addEventListener('click', function () {
  removeActive();
  this.classList.add('active_btn');
  const closeButton = allIssue.filter((data) => data.status === 'closed');
  allDataDisplay(closeButton);
  updateCount(closeButton);
});
// get border card color
function getBorderColor(status) {
  if (status === 'open') {
    return 'border-y-4 border-green-500';
  }
  if (status === 'closed') {
    return 'border-y-4 border-red-500';
  }
}

// button click and focus status use js ---
function removeActive() {
  const removeActiveButton = document.querySelectorAll('.btn');
  removeActiveButton.forEach((data) => {
    data.classList.remove('active_btn');
  });
}

// data Searching --- >
document.getElementById('newIssueBtn').addEventListener('click', function () {
  const userInput = document.getElementById('getDataUser');
  const findData = userInput.value.trim().toLowerCase();
  userInput.value = '';
  console.log(findData);
  removeActive();

  const filterWord = allIssue.filter((data) =>
    data.title.toLowerCase().includes(findData)
  );

  // main container , there i will show my cards and not found cards ---

  const container = document.getElementById('main_container');

  if (filterWord.length === 0) {
    container.innerHTML = `
    <div class="text-center py-10 mx-auto col-span-6">
      <h2 class="text-2xl font-bold text-red-500">❌ No Issue Found</h2>
    </div>
  `;
    return;
  }
  allDataDisplay(filterWord);
});
// modal display function --- load function ---
const loadDataDetails = async (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  displayModal(data.data);
};
// modal dispAly function ---
const displayModal = (word) => {
  console.log(word);
  const mainBox = document.getElementById('main_containers');
  mainBox.innerHTML = `
   <div class="space-y-6 bg-amber-100 p-6 rounded-xl">
            <h1 class="text-xl font-bold">${word.title}</h1>
            <div class="flex gap-3 items-center">
              <button class="py-1 px-3 rounded-2xl border-2 border-amber-700">
                opened
              </button>
              <p class="text-[12px] text-center ">
                <i class="fa-solid fa-caret-right"></i> Opened by '${word.author}'
              </p>
              <p class="text-[12px] text-center ">
                <i class="fa-solid fa-caret-right"></i> ${word.updatedAt}
              </p>
            </div>
            <button
              class="px-4 py-1 bg-red-300 rounded-2xl border-2 border-red-600"
              ><i class="fa-solid fa-bug text-red-600"></i> ${word.labels[0]}</button
            >
            <button
              class="px-3 py-1 bg-yellow-200 rounded-2xl border-2 border-yellow-600"
              ><i class="fa-brands fa-slack text-yellow-600"></i> ${word.labels[1]}
          </div>
          <p>
            The navigation menu doesn't collapse properly on mobile devices.
            Need to fix the responsive behavior.
          </p>
          <div
            class="grid grid-cols-2 space-y-3 justify-evenly bg-[#ebd9d9eb] p-4 rounded-xl"
          >
            <div>
              <p>Assignee:</p>
              <p> ${word.author} </p>
            </div>
            <div>
              <p>Priority:</p>
              <span class="bg-red-300 py-0.5 px-3 rounded-3xl mt-1">${word.priority}</span>
            </div>
          </div>

  `;
  document.getElementById('my_modal_5').showModal();
};
allDataIssue();
