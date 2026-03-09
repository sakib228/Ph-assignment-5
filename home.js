// console.log("hello world")

const allDataIssue = () => {
  fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then(data => allDataDisplay(data.data));
};

allDataIssue();

const allDataDisplay = (details) => {
  console.log(details);
};
