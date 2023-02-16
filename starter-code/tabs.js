const tabLists = document.querySelector('[role="tablist"]');
const tabs = tabLists.querySelectorAll('[role="tab"]');


tabLists.addEventListener('keydown', changeTabFocus)

tabs.forEach((tab) => {
	tab.addEventListener('click', changeTabPanel)
});

let tabFocus = 0

function changeTabFocus(e) {
	const keydownLeft = 37;
	const keydownRigth = 39;
	
	 // change the tabindex of the current tab to -1
    if (e.keyCode === keydownLeft || e.keyCode === keydownRigth){
		tabs[tabFocus].setAttribute('tabindex', -1)
		if (e.keyCode === keydownRigth) {
		  tabFocus++;
		  if (tabFocus >=tabs.length){
			  tabFocus = 0;
		  }
		}
		else {
		  tabFocus--;
		  if (tabFocus < 0) {
			  tabFocus = tabs.length - 1;
		  }
		}
		// if the left key is pushed, move to the next tab on the left
  
		tabs[tabFocus].setAttribute('tabindex', 0)
		tabs[tabFocus].focus()
	 }
    // if the right key is pushed, move to the next tab on the right
    
}

function changeTabPanel(e) {
	const targetBtn = e.target
	const targetPanel = targetBtn.getAttribute('aria-controls')
	const targetImage = targetBtn.getAttribute('data-image')

	const tabContainer = targetBtn.parentNode;
	const mainContainer = tabContainer.parentNode;

	tabContainer.querySelector('[aria-selected="true"]').setAttribute('aria-selected', false)

	targetBtn.setAttribute('aria-selected', true)

	mainContainer.querySelectorAll('[role="tabpanel"]').forEach(panel => {
		panel.setAttribute('hidden', true)
	})

	mainContainer.querySelector([`#${targetPanel}`]).removeAttribute('hidden')

	mainContainer.querySelectorAll('picture').forEach(pic => {
		pic.classList.add('sr-only')
	})

	mainContainer.querySelector([`#${targetImage}`]).classList.remove('sr-only')

	// console.log(mainContainer);
}



