// console.log("hello world")
// load data function ---
const allDataIssue = () => {
  fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then((res) => res.json())
    .then((data) => {
      allIssue = data.data;
      allDataDisplay(allIssue);
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
    // console.log(detail); ---
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="p-10 space-y-8 max-w-md bg-[white] rounded-2xl h-full ${getBorderColor(detail.status)} grow flex-col" >
        <div class="flex justify-between">
          <span><i class=" outline-2 outline-offset-3 outline-green-800-950 rounded-full fa-solid fa-circle text-green-400"></i></span>
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
        <div class="flex items-center gap-2">
          <span class="px-4 py-1 bg-red-300 rounded-2xl border-2 border-red-600"
            ><i class="fa-solid fa-bug text-red-600"></i> Bug</span
          >
          <span
            class="px-3 py-1 bg-yellow-200 rounded-2xl border-2 border-yellow-600"
            ><i class="fa-brands fa-slack text-yellow-600"></i> help wanted</span
          >
        </div>
        <span class="flex grow border-b-2 text-slate-300"></span>
        <div class="text-[#000000a8] font-semibold">
          <p>#1 by john_doe</p>
          <p>1/15/2024</p>
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
// allButton -------------------------------
document.getElementById('allBtn').addEventListener('click', function () {
  removeActive();
  this.classList.add('active_btn');
  allDataDisplay(allIssue);
});
// openButton
document.getElementById('openBtn').addEventListener('click', function () {
  removeActive();
  this.classList.add('active_btn');
  const openButton = allIssue.filter((data) => data.status === 'open');
  allDataDisplay(openButton);
});

//closedButton
document.getElementById('closedBtn').addEventListener('click', function () {
  removeActive();
  this.classList.add('active_btn');
  const closeButton = allIssue.filter((data) => data.status === 'closed');
  allDataDisplay(closeButton);
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
document.getElementById('newIssueBtn').addEventListener("click", function () {
  const userInput = document.getElementById('getDataUser');
  const findData = userInput.value.trim().toLowerCase();
  console.log(findData);

  const filterWord = allIssue.filter((data) =>
    data.title.toLowerCase().includes(findData)
  );
  allDataDisplay(filterWord);
})

allDataIssue();
