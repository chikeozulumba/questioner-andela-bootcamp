(() => {
	const meetups = document.getElementsByClassName('questions');
	for (let i = 0; i < meetups.length; i++) {
		const meetup = meetups[i];
		meetup.addEventListener('click', (e) => {
			if (e.target.tagName !== "SPAN") window.location.href = '../questions.html'
		});
	}
})()