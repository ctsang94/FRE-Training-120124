console.log("hello");

const btn = document.getElementById("btn");
const counterElement = document.getElementById("counter");

let counter = 0;
if (btn) {
	btn.addEventListener("click", () => {
		counterElement.innerHTML = ++counter;
		const ele = document.createElement("div");
		ele.textContent = "hello";
		document.getElementById("container").append(ele);
		btn.style.color = "blue";
	});
}
