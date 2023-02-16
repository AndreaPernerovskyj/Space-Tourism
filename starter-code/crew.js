const dotList = document.querySelector('[role="dotslist"]');
const dots = dotList.querySelectorAll('[role="dot"]');

dotList.addEventListener('keydown', changeDotFocus)

dots.forEach(dot => {
	dot.addEventListener('click', chnageDotPanel)
})

let dotFocus = 0

function changeDotFocus (e) {
	const keydownLeft = 37;
	const keydownRigth = 39;

	if(e.keyCode === keydownLeft || e.keyCode === keydownRigth){
		dots[dotFocus].setAttribute('tabindex', -1)
		if(e.keyCode === keydownRigth){
			dotFocus++
			if(dotFocus >= dots.length){
				dotFocus = 0
			}
		}else{
			dotFocus--
			if(dotFocus < 0){
				dotFocus = dots.length - 1;
			}
		}

		dots[dotFocus].setAttribute('tabindex', 0)
		dots[dotFocus].focus()
	}
} 

function chnageDotPanel(e) {
	const targetDot = e.target
	const targetPanel = targetDot.getAttribute('aria-controls')
	
	const dotContainer = targetDot.parentNode
	const mainContainer = dotContainer.parentNode

	dotContainer.querySelector('[aria-selected="true"]').setAttribute('aria-selected', false)

	targetDot.setAttribute('aria-selected', true)

	mainContainer.querySelectorAll('[role="dotpanel"]').forEach(dot => {
		dot.setAttribute('hidden', true)
	})

	mainContainer.querySelector([`#${targetPanel}`]).removeAttribute('hidden')
}