// Login Page JavaScript

function login() {

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

if (username === "admin" && password === "admin123") {
localStorage.setItem("login", "true");
window.location.href = "dashboard.html";
} 
else {
alert("Invalid Credentials");
}
}


// Dashboard Page JavaScript

const container = document.getElementById("issuesContainer");
const spinner = document.getElementById("spinner");

// search bar
function searchIssue() {

const input = document.getElementById("searchInput").value.toLowerCase();

const issues = document.querySelectorAll("#issuesContainer > div");

issues.forEach(issue => {

const text = issue.innerText.toLowerCase();

issue.style.display = text.includes(input) ? "block" : "none";

});

}

// live search while typing
document.getElementById("searchInput").addEventListener("input", searchIssue);


// Active Button Style
function setActive(btn){

document.querySelectorAll(".tabBtn").forEach(b => {

b.classList.remove("bg-blue-500","text-white");
b.classList.add("bg-gray-200");

});

btn.classList.remove("bg-gray-200");
btn.classList.add("bg-blue-500","text-white");

}



// Load Issues from API
async function loadIssues(type){

container.innerHTML = "";
spinner.classList.remove("hidden");

try{

const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
const data = await res.json();

let issues = data.data;


// Filter issues
if(type === "open"){
issues = issues.filter(issue => issue.status === "open");
}

if(type === "closed"){
issues = issues.filter(issue => issue.status === "closed");
}


// Update stats
updateIssueStats(issues);

// Display cards
displayIssues(issues);

}

catch(error){
console.error("Error loading issues:", error);
}

spinner.classList.add("hidden");

}



// Update Dashboard Stats
function updateIssueStats(issues){

const total = issues.length;

const open = issues.filter(issue => issue.status === "open").length;

const closed = issues.filter(issue => issue.status === "closed").length;

document.getElementById("totalIssues").innerText = total;
document.getElementById("openCount").innerText = open;
document.getElementById("closedCount").innerText = closed;

}



// Display Issues
function displayIssues(issues){

container.innerHTML = "";

issues.forEach(issue => {

container.innerHTML += createIssueCard(issue);

});

}


// Create Issue Card
function createIssueCard(issue){

const priority = issue.priority?.toLowerCase() || "low";
const status = issue.status?.toLowerCase() || "open";

let priorityColor = "bg-gray-100 text-gray-600";

let borderColor = status === "open"
? "border-t-4 border-green-500"
: "border-t-4 border-purple-500";

if(priority === "high"){
priorityColor = "bg-red-100 text-red-600";
}

if(priority === "medium"){
priorityColor = "bg-yellow-100 text-yellow-700";
}

if(priority === "low"){
priorityColor = "bg-green-100 text-green-600";
}

return `
<div onclick='openModal(${JSON.stringify(issue)})' 
class="bg-white ${borderColor} rounded-xl shadow-sm p-5 hover:shadow-md transition cursor-pointer">

<div class="flex justify-between items-center mb-3">

<span class="text-xs font-semibold px-3 py-1 rounded-full ${priorityColor}">
${priority.toUpperCase()}
</span>

</div>

<h3 class="font-semibold text-gray-800 mb-2">
${issue.title}
</h3>

<p class="text-sm text-gray-500 mb-4">
${issue.description?.substring(0,90) || "No description"}...
</p>

<div class="flex gap-2 mb-4">

<span class="text-xs bg-red-100 text-red-500 px-3 py-1 rounded-full"><i class="fa-solid fa-bug"></i>
 BUG
</span>

<span class="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
<i class="fa-solid fa-life-ring"></i> HELP WANTED
</span>

</div>

<div class="text-xs text-gray-400">
#${issue._id?.slice(-4)} by ${issue.author || "unknown"} <br>
${new Date(issue.createdAt).toLocaleDateString()}
</div>

</div>
`;
}


// Modal Functions
function openModal(issue){

document.getElementById("issueModal").classList.remove("hidden");
document.getElementById("issueModal").classList.add("flex");

document.getElementById("modalTitle").innerText = issue.title;

document.getElementById("modalDescription").innerText =
issue.description || "No description";

document.getElementById("modalAuthor").innerText =
issue.author || "unknown";

document.getElementById("modalAuthorName").innerText =
issue.author || "unknown";

document.getElementById("modalDate").innerText =
new Date(issue.createdAt).toLocaleDateString();

document.getElementById("modalPriority").innerText =
issue.priority?.toUpperCase() || "LOW";

document.getElementById("modalPriority").className =
"bg-red-500 text-white text-xs px-3 py-1 rounded-full";

}

function closeModal(){
document.getElementById("issueModal").classList.add("hidden");
}

// Load all issues when page loads
loadIssues("all");